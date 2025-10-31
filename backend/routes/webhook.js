const express = require('express');
const { supabase } = require('../db');

const router = express.Router();

// Optional: If you want Paywalls.ai to notify you directly
router.post('/paywalls', async (req, res) => {
  try {
    const { id, type, data } = req.body;

    console.log('Paywalls.ai webhook received:', { id, type });

    if (type === 'session.completed') {
      const sessionId = data.id;
      
      // Update transaction status
      const { error } = await supabase
        .from('transactions')
        .update({ 
          status: 'completed',
          completed_at: new Date().toISOString(),
          customer_email: data.customer_email
        })
        .eq('paywalls_session_id', sessionId);

      if (error) throw error;

      console.log(`✅ Payment completed for session: ${sessionId}`);
    }

    res.status(200).json({ received: true });

  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
});

module.exports = router;