import React, { useState, useEffect } from 'react'
import ChatBox from './components/ChatBox'

function App() {
  const [currentMode, setCurrentMode] = useState('writer')
  const [paymentCompleted, setPaymentCompleted] = useState(false)

  // Load FlowXO widget after payment
  useEffect(() => {
    if (paymentCompleted) {
      const script = document.createElement('script');
      script.src = "https://widget.flowxo.com/embed.js";
      script.setAttribute('data-fxo-widget', 'eyJ0aGVtZSI6IiM2N2MxOGUiLCJ3ZWIiOnsiYm90SWQiOiI2OTA0YmZkZGI3ZTNlZDAwNzVkZTRhOWYiLCJ0aGVtZSI6IiM2N2MxOGUifX0=');
      script.async = true;
      script.defer = true;
      
      document.body.appendChild(script);

      return () => {
        // Cleanup if needed
        document.body.removeChild(script);
      };
    }
  }, [paymentCompleted]);

  const modes = [
    { id: 'writer', name: '✍️ Writer Mode', description: 'Content generation & writing' },
    { id: 'business', name: '🧑‍💼 Business Mode', description: 'Emails, pitches & business docs' },
    { id: 'research', name: '🧩 Research Mode', description: 'Summaries & explanations' }
  ]

  return (
    <div className="app">
      <header className="app-header">
        <h1>Pay-per-Response AI Assistant</h1>
        <p>Get AI assistance for just $0.05 per session</p>
      </header>

      <div className="mode-selector">
        {modes.map(mode => (
          <button
            key={mode.id}
            className={`mode-btn ${currentMode === mode.id ? 'active' : ''}`}
            onClick={() => setCurrentMode(mode.id)}
          >
            <div className="mode-name">{mode.name}</div>
            <div className="mode-desc">{mode.desc}</div>
          </button>
        ))}
      </div>

      <ChatBox 
        currentMode={currentMode} 
        onPaymentComplete={() => setPaymentCompleted(true)}
      />
    </div>
  )
}

export default App