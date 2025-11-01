# SmartChat AI

A beautiful, professional AI assistant interface that embeds a FlowXO chatbot with automatic pay-per-use payments handled by Paywalls.ai.

## 🚀 Features

- **Pay-per-Use Model**: Automatic payment handling via Paywalls.ai integration
- **Professional Design**: Beautiful dark forest theme with premium styling
- **Seamless Integration**: Direct FlowXO chatbot embedding
- **Zero Backend**: Pure static site - no server required
- **Fully Responsive**: Works perfectly on all devices

## 🏗️ Architecture

User → React Frontend → FlowXO Bot (with Paywalls.ai payment integration)


### Tech Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| Frontend | React + Vite | Beautiful landing page with embedded bot |
| Payment | Paywalls.ai | Automatic payment processing |
| AI Assistant | FlowXO | AI conversation handling and delivery |
| Styling | Custom CSS | Professional dark forest design |

## 📁 Project Structure
```text
payperchat/
├── frontend/
│ ├── src/
│ │ ├── App.jsx # Main application component
│ │ ├── main.jsx # React entry point
│ │ └── styles.css # Dark forest theme styling
│ ├── index.html # HTML template
│ ├── package.json # Frontend dependencies
│ └── vite.config.js # Vite configuration
└── README.md
```


## 🛠️ Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- FlowXO account with AI assistant
- Paywalls.ai account (connected to FlowXO)

### 1. Install Dependencies

```bash
# Install frontend dependencies
cd frontend
npm install
```

### 2. Configure FlowXO Bot
- Create your AI Assistant in FlowXO:
    - Configure with OpenAI API key
    - Set up Paywalls.ai as the AI connection
    - Define your assistant's personality and instructions

- Create Web Bot in FlowXO:
    - Choose "Web [beta]" platform
    - Assign your AI assistant
    - Customize appearance and colors

- Get Embed URL:
    - Copy the iframe embed URL from FlowXO
    - Update the src in App.jsx with your bot URL

### 3. Run the Application
``` bash
# Start the development server
npm run dev
```

### Common Issues

- FlowXO bot not loading

    - Check if the bot is published in FlowXO dashboard
    - Verify the embed URL is correct
    - Test the URL directly in browser

- Payments not working

    - Ensure Paywalls.ai is properly connected in FlowXO
    - Check Paywalls.ai account configuration
    - Verify API keys in FlowXO AI connection

- Styling issues

    - Clear browser cache
    - Check CSS file is loading properly
    - Verify all color variables are defined

### 📄 License

MIT License - feel free to use this project for your own AI assistant applications!

### 🤝 Contributing

- Fork the repository

- Create a feature branch

- Commit your changes

- Push to the branch

- Create a Pull Request

### 📞 Support

For issues and questions:

    - Check FlowXO documentation for bot setup
    - Review Paywalls.ai integration guide
    - Open an issue in the repository