# YaYa Wallet Dashboard

A complete full-stack transaction management dashboard built with React and Node.js, designed to securely integrate with the YaYa Wallet API.

## Project Requirements Fulfillment

### Core Requirements Met

1. **Pagination** - Uses "p" as query parameter for page number
2. **Search Functionality** - Search by sender, receiver, cause, or transaction ID
3. **Required Fields Display** - All 7 fields: Transaction ID, Sender, Receiver, Amount, Currency, Cause, Created At
4. **Visual Transaction Indicators** - Green for incoming, red for outgoing transactions
5. **Security** - API credentials safely stored in backend, never exposed to frontend
6. **Responsive Design** - Works on all screen sizes (mobile, tablet, desktop)

## Features

### Transaction Management

- **Pagination** with "p" parameter and responsive controls
- **Debounced Search** (500ms delay) across multiple fields
- **Sortable Table** - Click headers to sort by any column
- **Visual Indicators** - Clear distinction between incoming/outgoing transactions
- **Clickable Rows** - Navigate to transaction details
- **Real-time Updates** - Live transaction data

### Security Implementation

- **HMAC-SHA256 Authentication** for YaYa Wallet API
- **Secure Credential Storage** - API keys in backend `.env` only
- **CORS Configuration** - Restricted to frontend origin
- **Error Handling** - Graceful fallback without data leakage
- **Input Validation** - Sanitized user inputs

### User Experience

- **Card-Based Layout** - Clean, modern interface
- **Responsive Design** - Mobile-first approach
- **Loading States** - Smooth loading indicators
- **Error Recovery** - Retry functionality
- **Summary Statistics** - Transaction overview cards

## 🛠 Technology Stack

### Frontend

- **React 18** - Functional components with hooks
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first styling
- **React Router** - Client-side navigation

### Backend

- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **Axios** - HTTP client for API requests
- **Crypto** - HMAC-SHA256 signature generation

## Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- Git

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/EliasDemlie/yaya-wallet-dashboard

   ```

2. **Setup backend**

   ```bash
   cd backend
   npm install
   npm run dev
   ```

3. **Setup frontend**

   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```
