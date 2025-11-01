import React from 'react'
import './styles.css'

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <div className="premium-badge">AI ASSISTANT</div>
        <h1>SmartChat AI</h1>
        <p>Professional AI assistance powered by advanced language models</p>
      </header>

      <div className="chat-container">
        <div className="chat-header">
          <h2>Start Chatting with AI</h2>
          <p>Pay-per-use AI assistant.</p>
        </div>
        
        <div className="iframe-container">
          <iframe 
            src="https://fxo.io/m/algorithm-bears-9371" 
            width="100%" 
            height="100%" 
            style={{ 
              border: '3px solid #2D5C3D', 
              width: '100%', 
              height: '100%',
              borderRadius: '12px'
            }} 
            allowFullScreen
            title="AI Assistant Chat"
          ></iframe>
        </div>
      </div>
      
      <footer className="app-footer">
        <p>© 2025 SmartChat AI. Premium artificial intelligence assistance.</p>
        <p className="footer-subtitle">Powered by FlowXO</p>
      </footer>
    </div>
  )
}

export default App