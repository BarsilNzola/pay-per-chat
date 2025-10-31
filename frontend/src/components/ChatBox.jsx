import React, { useState, useEffect } from 'react'
import axios from 'axios'

const ChatBox = ({ currentMode }) => {
  const [message, setMessage] = useState('')
  const [preview, setPreview] = useState('')
  const [fullResponse, setFullResponse] = useState('')
  const [conversationId, setConversationId] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [paymentStatus, setPaymentStatus] = useState('')
  const [paymentSession, setPaymentSession] = useState(null)
  const [customerEmail, setCustomerEmail] = useState('')
  const [showEmailInput, setShowEmailInput] = useState(false)

  // Check for payment success on page load
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get('session_id');
    
    if (sessionId) {
      checkPaymentStatus(sessionId);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!message.trim()) return

    setIsLoading(true)
    try {
      const response = await axios.post('/api/preview', {
        message: message,
        mode: currentMode,
        conversationId: conversationId
      })

      setPreview(response.data.preview)
      setFullResponse(response.data.fullResponse)
      setConversationId(response.data.conversationId)
      setPaymentStatus('preview_ready')
    } catch (error) {
      console.error('Error generating preview:', error)
      alert('Failed to generate preview. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handlePayment = async () => {
    if (!conversationId) return

    // Show email input if not provided
    if (!customerEmail) {
      setShowEmailInput(true)
      return
    }

    setIsLoading(true)
    try {
      const response = await axios.post('/api/payment/create-session', {
        conversationId: conversationId,
        amount: 0.05,
        customerEmail: customerEmail
      })

      // REDIRECT TO REAL PAYWALLS.AI CHECKOUT
      window.location.href = response.data.paymentUrl
      
    } catch (error) {
      console.error('Payment error:', error)
      alert('Failed to initiate payment. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const checkPaymentStatus = async (sessionId) => {
    try {
      const statusResponse = await axios.get(`/api/payment/status/${sessionId}`)
      
      if (statusResponse.data.status === 'completed') {
        setPaymentStatus('completed')
        // Show the full response (in real scenario, FlowXO sends email)
        // For demo purposes, we'll show it in the UI too
        setFullResponse(fullResponse) // This would come from your API
      } else if (statusResponse.data.status === 'pending') {
        // Payment still processing, check again in a few seconds
        setTimeout(() => checkPaymentStatus(sessionId), 2000)
      }
    } catch (error) {
      console.error('Status check error:', error)
    }
  }

  const resetChat = () => {
    setMessage('')
    setPreview('')
    setFullResponse('')
    setConversationId('')
    setPaymentStatus('')
    setPaymentSession(null)
    setCustomerEmail('')
    setShowEmailInput(false)
    
    // Clear URL parameters
    window.history.replaceState({}, '', window.location.pathname)
  }

  return (
    <div className="chat-card">
      <form onSubmit={handleSubmit} className="chat-form">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={`Ask me anything in ${currentMode} mode...`}
          disabled={isLoading}
        />
        
        <button type="submit" disabled={isLoading || !message.trim()}>
          {isLoading ? 'Generating Preview...' : 'Get Preview'}
        </button>
      </form>

      {preview && (
        <div className="preview-section">
          <h3>Preview:</h3>
          <div className="preview">
            {preview}
          </div>
          
          {paymentStatus !== 'completed' ? (
            <div className="payment-section">
              {showEmailInput ? (
                <div className="email-input-section">
                  <p>Enter your email to receive the full response:</p>
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
                      {isLoading ? 'Processing...' : 'Continue to Payment'}
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
                <>
                  <p className="price">Unlock full response for $0.05</p>
                  <button 
                    onClick={handlePayment} 
                    disabled={isLoading}
                    className="payment-btn"
                  >
                    {isLoading ? 'Processing...' : 'Unlock Full Response'}
                  </button>
                  <p className="email-note">
                    You'll be asked for your email to receive the full response
                  </p>
                </>
              )}
            </div>
          ) : (
            <div className="full-response">
              <h3>Full Response:</h3>
              <div className="response-content">
                {fullResponse}
              </div>
              <div className="delivery-notice">
                <p>📧 The full response has also been sent to your email address.</p>
              </div>
              <button onClick={resetChat} className="new-chat-btn">
                Start New Chat
              </button>
            </div>
          )}
        </div>
      )}

      {paymentStatus === 'completed' && (
        <div className="success-message">
          ✅ Payment successful! The full response has been sent to your email.
        </div>
      )}
    </div>
  )
}

export default ChatBox