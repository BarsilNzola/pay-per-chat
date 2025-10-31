const express = require('express');
const OpenAI = require('openai');
const { supabase } = require('../db');

const router = express.Router();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const AI_MODES = {
  writer: "You are a professional content writer. Create engaging, well-structured content with proper formatting.",
  business: "You are a business communication expert. Write professional emails, pitches, and business documents.",
  research: "You are a research assistant. Provide detailed explanations, summaries, and analysis with proper context."
};

router.post('/', async (req, res) => {
  try {
    const { message, mode = 'writer', conversationId } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Generate AI response
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: AI_MODES[mode] || AI_MODES.writer },
        { role: "user", content: message }
      ],
      max_tokens: 500
    });

    const fullResponse = completion.choices[0].message.content;
    
    // Create preview (first 2-3 lines)
    const previewLines = fullResponse.split('\n').slice(0, 3).join('\n');
    const preview = previewLines.length < fullResponse.length ? 
      previewLines + '...' : previewLines;

    // Save to database - INCLUDING FULL RESPONSE for FlowXO to access
    let convId = conversationId;
    if (!convId) {
      const { data: newConv, error } = await supabase
        .from('conversations')
        .insert([{ 
          user_message: message,
          full_response: fullResponse, // This gets passed to Paywalls.ai metadata
          mode: mode,
          status: 'preview'
        }])
        .select()
        .single();

      if (error) throw error;
      convId = newConv.id;
    } else {
      const { error } = await supabase
        .from('conversations')
        .update({ 
          user_message: message,
          full_response: fullResponse,
          mode: mode,
          status: 'preview'
        })
        .eq('id', convId);

      if (error) throw error;
    }

    res.json({
      preview,
      fullResponse: fullResponse, // Still don't send to frontend
      conversationId: convId,
      requiresPayment: true
    });

  } catch (error) {
    console.error('Preview error:', error);
    res.status(500).json({ error: 'Failed to generate preview' });
  }
});

module.exports = router;