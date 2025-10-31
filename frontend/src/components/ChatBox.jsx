import React, { useState, useEffect } from 'react'
import axios from 'axios'

const ChatBox = ({ currentMode }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [paymentStatus, setPaymentStatus] = useState('')
  const [customerEmail, setCustomerEmail] = useState('')
  const [showEmailInput, setShowEmailInput] = useState(false)

  // Check for payment success on page load
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get('session_id');
    
    if (sessionId && paymentStatus !== 'completed') {
      checkPaymentStatus(sessionId);
    }
  }, []);

  const handlePayment = async () => {
    if (!customerEmail) {
      setShowEmailInput(true);
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post('/api/payment/create-session', {
        amount: 0.05,
        customerEmail: customerEmail,
        description: `AI Assistant Response - ${currentMode} Mode`
      });

      // Redirect to Paywalls.ai checkout
      window.location.href = response.data.paymentUrl;
      
    } catch (error) {
      console.error('Payment error:', error);
      alert('Failed to initiate payment. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const checkPaymentStatus = async (sessionId) => {
    try {
      const statusResponse = await axios.get(`/api/payment/status/${sessionId}`);
      
      if (statusResponse.data.status === 'completed') {
        setPaymentStatus('completed');
      }
    } catch (error) {
      console.error('Status check error:', error);
    }
  };

  const resetChat = () => {
    setCustomerEmail('');
    setShowEmailInput(false);
    setPaymentStatus('');
    window.history.replaceState({}, '', window.location.pathname);
  };

  // AFTER PAYMENT SUCCESS - Show FlowXO bot
  if (paymentStatus === 'completed') {
    return (
      <div className="chat-card">
        <div className="success-section">
          <h2>✅ Payment Successful!</h2>
          <p>You now have access to the AI Assistant.</p>
          
          <div className="bot-options">
            <h3>Choose how to chat:</h3>
            
            {/* Option 1: Direct Link */}
            <div className="bot-option">
              <h4>Open in New Tab</h4>
              <p>Chat in a dedicated window</p>
              <a 
                href="https://fxo.io/m/algorithm-bears-9371" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bot-link"
              >
                Open AI Assistant
              </a>
            </div>

            {/* Option 2: Embedded */}
            <div className="bot-option">
              <h4>Chat Here</h4>
              <p>Chat directly on this page</p>
              <iframe 
                src="https://fxo.io/m/algorithm-bears-9371" 
                width="100%" 
                height="500" 
                style={{ border: '3px solid #f9f9fb', borderRadius: '10px' }}
                allowFullScreen
              ></iframe>
            </div>
          </div>

          <button onClick={resetChat} className="new-chat-btn">
            Start New Session
          </button>
        </div>
      </div>
    );
  }

  // PAYMENT INITIATION
  return (
    <div className="chat-card">
      <div className="payment-section">
        <h2>Access AI Assistant</h2>
        <p>Pay $0.05 to chat with our AI assistant in <strong>{currentMode}</strong> mode</p>
        
        {showEmailInput ? (
          <div className="email-input-section">
            <p>Enter your email to get started:</p>
            <input
              type="email"
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
              placeholder="your.email@example.com"
              className="email-input"
            />
            <div className="email-buttons">
              <button 
                onClick={handlePayment}
                disabled={!customerEmail || isLoading}
                className="payment-btn"
              >
                {isLoading ? 'Processing...' : 'Pay $0.05 & Start Chat'}
              </button>
              <button 
                onClick={() => setShowEmailInput(false)}
                className="cancel-btn"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button 
            onClick={() => setShowEmailInput(true)}
            className="payment-btn"
          >
            Start AI Chat - $0.05
          </button>
        )}
      </div>
    </div>
  );
};

export default ChatBox;