import React, { useState } from 'react'
import ChatBox from './components/ChatBox'

function App() {
  const [currentMode, setCurrentMode] = useState('writer')

  const modes = [
    { 
      id: 'writer', 
      name: '✍️ Creative Writer', 
      description: 'Compelling content, stories, and creative copy',
      icon: '📝'
    },
    { 
      id: 'business', 
      name: '💼 Business Pro', 
      description: 'Professional emails, strategies, and business communications',
      icon: '🚀'
    },
    { 
      id: 'research', 
      name: '🔬 Research Expert', 
      description: 'In-depth analysis, summaries, and technical explanations',
      icon: '🎯'
    }
  ]

  const features = [
    { icon: '⚡', title: 'Instant Access', desc: 'Start chatting immediately after payment' },
    { icon: '🔒', title: 'Secure Payment', desc: 'Protected by Paywalls.ai security' },
    { icon: '🎨', title: 'Smart AI', desc: 'Context-aware responses in real-time' },
    { icon: '📧', title: 'Email Delivery', desc: 'Full conversations sent to your inbox' }
  ]

  return (
    <div className="app">
      <header className="app-header">
        <div className="premium-badge">PREMIUM AI</div>
        <h1>IntelliChat AI</h1>
        <p>Professional AI assistance powered by advanced language models</p>
      </header>

      <div className="feature-grid">
        {features.map((feature, index) => (
          <div key={index} className="feature-item">
            <div className="feature-icon">{feature.icon}</div>
            <h4>{feature.title}</h4>
            <p>{feature.desc}</p>
          </div>
        ))}
      </div>

      <div className="mode-selector">
        {modes.map(mode => (
          <button
            key={mode.id}
            className={`mode-btn ${currentMode === mode.id ? 'active' : ''}`}
            onClick={() => setCurrentMode(mode.id)}
          >
            <div className="mode-icon" style={{fontSize: '2rem', marginBottom: '12px'}}>
              {mode.icon}
            </div>
            <div className="mode-name">{mode.name}</div>
            <div className="mode-desc">{mode.description}</div>
          </button>
        ))}
      </div>

      <ChatBox currentMode={currentMode} />
      
      <footer style={{
        textAlign: 'center',
        marginTop: '60px',
        padding: '40px 0',
        color: 'var(--light-text)',
        borderTop: '1px solid rgba(0,0,0,0.1)'
      }}>
        <p>© 2024 IntelliChat AI. Premium artificial intelligence assistance.</p>
        <p style={{fontSize: '0.9rem', opacity: 0.7}}>Powered by FlowXO & Paywalls.ai</p>
      </footer>
    </div>
  )
}

export default App