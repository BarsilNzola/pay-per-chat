const express = require('express');
const axios = require('axios');
const { supabase } = require('../db');

const router = express.Router();

const PAYWALLS_API_BASE = 'https://api.paywalls.ai/v1';
const PAYWALLS_API_KEY = process.env.PAYWALLS_API_KEY;

router.post('/create-session', async (req, res) => {
  try {
    const { conversationId, amount = 0.05, customerEmail } = req.body;

    if (!conversationId) {
      return res.status(400).json({ error: 'Conversation ID is required' });
    }

    // Get conversation details
    const { data: conversation, error: convError } = await supabase
      .from('conversations')
      .select('*')
      .eq('id', conversationId)
      .single();

    if (convError || !conversation) {
      return res.status(404).json({ error: 'Conversation not found' });
    }

    // Create Paywalls.ai payment session
    const paymentSessionData = {
      amount: amount * 100, // Convert to cents
      currency: 'usd',
      metadata: {
        conversation_id: conversationId,
        mode: conversation.mode,
        user_message: conversation.user_message.substring(0, 200),
        full_response: conversation.full_response // Include the full response in metadata
      },
      success_url: `${process.env.FRONTEND_URL}/payment-success?session_id={SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/payment-cancelled`,
      // NO webhook_url needed - FlowXO handles this internally
      product_data: {
        name: 'AI Assistant Response',
        description: `Unlock full AI response for: "${conversation.user_message.substring(0, 50)}..."`,
        images: []
      },
      customer_email: customerEmail || null,
      expires_in: 1800 // 30 minutes
    };

    // Call Paywalls.ai API
    const paywallsResponse = await axios.post(
      `${PAYWALLS_API_BASE}/sessions`,
      paymentSessionData,
      {
        headers: {
          'Authorization': `Bearer ${PAYWALLS_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const paywallsSession = paywallsResponse.data;

    // Save to database
    const { data: transaction, error: dbError } = await supabase
      .from('transactions')
      .insert([{
        conversation_id: conversationId,
        session_id: paywallsSession.id,
        paywalls_session_id: paywallsSession.id,
        amount: amount,
        status: paywallsSession.status || 'pending',
        payment_url: paywallsSession.payment_url,
        checkout_url: paywallsSession.checkout_url,
        customer_email: customerEmail,
        metadata: paymentSessionData.metadata
      }])
      .select()
      .single();

    if (dbError) throw dbError;

    res.json({
      sessionId: paywallsSession.id,
      paymentUrl: paywallsSession.payment_url || paywallsSession.checkout_url,
      amount: amount,
      expiresAt: paywallsSession.expires_at
    });

  } catch (error) {
    console.error('Payment session error:', error.response?.data || error.message);
    res.status(500).json({ 
      error: 'Failed to create payment session',
      details: error.response?.data?.message || error.message
    });
  }
});

// Status check endpoint
router.get('/status/:sessionId', async (req, res) => {
  try {
    const { sessionId } = req.params;

    const { data: transaction, error } = await supabase
      .from('transactions')
      .select('*')
      .eq('session_id', sessionId)
      .single();

    if (error) throw error;

    res.json({
      status: transaction.status,
      conversationId: transaction.conversation_id,
      amount: transaction.amount
    });

  } catch (error) {
    console.error('Payment status error:', error);
    res.status(500).json({ error: 'Failed to get payment status' });
  }
});

module.exports = router;