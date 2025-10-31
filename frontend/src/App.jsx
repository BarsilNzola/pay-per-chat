import React, { useState } from 'react'
import ChatBox from './components/ChatBox'

function App() {
  const [currentMode, setCurrentMode] = useState('writer')

  const modes = [
    { id: 'writer', name: '✍️ Writer Mode', description: 'Content generation & writing' },
    { id: 'business', name: '🧑‍💼 Business Mode', description: 'Emails, pitches & business docs' },
    { id: 'research', name: '🧩 Research Mode', description: 'Summaries & explanations' }
  ]

  return (
    <div className="app">
      <header className="app-header">
        <h1>Pay-per-Response AI Assistant</h1>
        <p>Get AI assistance for just $0.05 per response</p>
      </header>

      <div className="mode-selector">
        {modes.map(mode => (
          <button
            key={mode.id}
            className={`mode-btn ${currentMode === mode.id ? 'active' : ''}`}
            onClick={() => setCurrentMode(mode.id)}
          >
            <div className="mode-name">{mode.name}</div>
            <div className="mode-desc">{mode.description}</div>
          </button>
        ))}
      </div>

      <ChatBox currentMode={currentMode} />
    </div>
  )
}

export default App