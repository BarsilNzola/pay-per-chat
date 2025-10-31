# Pay-per-Response AI Assistant

A real-time AI assistant that users can chat with — but each response is paywalled intelligently through Paywalls.ai, with FlowXO automating the entire purchase flow (confirmation, credits, receipts, etc.).

## 🚀 Features

- **Pay-per-Use Model**: Users pay $0.05 per AI assistant session
- **Multiple AI Modes**: Writer, Business, and Research modes
- **Seamless Payment Flow**: Integrated with Paywalls.ai for payment processing
- **Automated Delivery**: FlowXO automatically activates AI assistant after payment
- **Real-time Chat**: Professional chat interface via FlowXO
- **Email Collection**: Customer emails for delivery confirmation and receipts

## 🏗️ Architecture

User → React Frontend → Paywalls.ai Payment → FlowXO AI Assistant

## ↘️ Backend API (Payment Tracking) ↗️

### Tech Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| Frontend | React + Vite | Chat UI + payment initiation |
| Backend | Node.js + Express | Payment session creation + status tracking |
| Database | Supabase PostgreSQL | Transaction and user data storage |
| Payment | Paywalls.ai | Payment processing and paywalls |
| AI Assistant | FlowXO | AI conversation handling and delivery |
| Styling | Custom CSS | Professional gradient design |

## 📁 Project Structure

payperchat/
├── backend/
│ ├── routes/
│ │ ├── payment.js # Paywalls.ai session creation
│ │ └── webhook.js # Payment status webhooks
│ ├── db.js # Supabase database connection
│ ├── index.js # Express server
│ └── .env # Backend environment variables
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ │ └── ChatBox.jsx # Payment initiation UI
│ │ ├── App.jsx # Main application
│ │ ├── main.jsx # React entry point
│ │ └── styles.css # Custom styling
│ ├── index.html # HTML template
│ └── vite.config.js # Vite configuration
├── .env # Root environment variables
└── package.json # Root package with concurrent scripts


## 🛠️ Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- Supabase account
- Paywalls.ai account
- FlowXO account
- OpenAI API key (for FlowXO AI assistant)

### 1. Clone and Install

```bash
# Install all dependencies
npm run install:all

# Or manually:
npm install
cd backend && npm install
cd ../frontend && npm install
```

### 2. Environment Configuration
Create .env in the root directory:

```env
# Database
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key

# Paywalls.ai
PAYWALLS_API_KEY=your_paywalls_api_key

# Server URLs
BACKEND_URL=http://localhost:3001
FRONTEND_URL=http://localhost:3000
```

### 3. Database Setup
Run this SQL in your Supabase SQL editor:

```sql
-- Transactions table
CREATE TABLE transactions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    session_id VARCHAR(255) UNIQUE NOT NULL,
    paywalls_session_id VARCHAR(255),
    amount DECIMAL(10,2) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending',
    payment_url TEXT,
    checkout_url TEXT,
    customer_email VARCHAR(255),
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE
);

-- Create indexes
CREATE INDEX idx_transactions_paywalls_session_id ON transactions(paywalls_session_id);
CREATE INDEX idx_transactions_status ON transactions(status);
CREATE INDEX idx_transactions_customer_email ON transactions(customer_email);
```

### 4. FlowXO Setup

Create AI Assistant in FlowXO:

    - Configure with your OpenAI API key

    - Set up Paywalls.ai as the AI connection

    - Define persona and instructions for each mode

Create Web Bot in FlowXO:

    - Choose "Web [beta]" platform

    - Assign your AI assistant

    - Customize appearance

Get Integration URLs:

    - Direct link: https://fxo.io/m/your-bot-id

    - Embed code for iframe

    - Widget code for floating chat

### 5. Run the Application

``` bash
# Start both frontend and backend simultaneously
npm run dev

```
This will start:

- Frontend: http://localhost:3000

- Backend: http://localhost:3001

### 💰 Payment Flow

User Initiation:

- User selects AI mode (Writer/Business/Research)

- Enters email address

- Clicks "Pay $0.05 & Start Chat"

Payment Processing:

- Backend creates Paywalls.ai session

- User redirected to Paywalls.ai checkout

- Payment processed securely

AI Access:

- Upon successful payment, FlowXO activates AI assistant

- User can access chat via:

- Direct FlowXO link

- Embedded iframe on success page

- Floating widget (if configured)

Automated Delivery:

- FlowXO handles entire AI conversation

- No backend AI processing required

- Seamless user experience

### 🔧 API Endpoints

Backend Routes

- POST /api/payment/create-session - Create Paywalls.ai payment session

- GET /api/payment/status/:sessionId - Check payment status

- POST /api/webhook/paywalls - Paywalls.ai webhook for payment updates

Frontend Routes

- / - Main application with mode selection

- /payment-success - Payment success page with chat access

### 🎨 Customization

AI Modes

Edit the mode configurations in the frontend:

```jsx
const modes = [
  { id: 'writer', name: '✍️ Writer Mode', description: 'Content generation' },
  { id: 'business', name: '🧑‍💼 Business Mode', description: 'Professional emails' },
  { id: 'research', name: '🧩 Research Mode', description: 'Summaries & analysis' }
];
```

### 🐛 Troubleshooting
Common Issues

- "Missing Supabase environment variables"

    - Check .env file location and variable names

- Frontend 404 errors

    - Ensure index.html exists in frontend root

    - Verify Vite dev server is running

- Payment failures

    - Check Paywalls.ai API key configuration

    - Verify webhook URLs in Paywalls.ai settings

- FlowXO bot not activating

    - Confirm Paywalls.ai integration in FlowXO AI connection

    - Test bot directly via FlowXO provided URL

### 📄 License

MIT License - feel free to use this project for your own pay-per-use AI applications!

### 🤝 Contributing

- Fork the repository

- Create a feature branch

- Commit your changes

- Push to the branch

- Create a Pull Request

### 📞 Support

For issues and questions:

    Check the troubleshooting section above

    Review Paywalls.ai and FlowXO documentation

    Open an issue in the repository