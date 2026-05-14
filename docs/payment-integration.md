# Payment Integration Guide

This document provides comprehensive information about the payment system integration for React Now FC Academy, supporting M-Pesa, Stripe, PayPal, and internal donations.

## Overview

The payment system is designed to handle multiple payment methods with market-standard security and functionality:
- **M-Pesa** - Kenyan mobile money integration with STK Push
- **Stripe** - Global credit/debit card processing
- **PayPal** - International payment gateway
- **Internal Donations** - Manual donation processing for internal use

## Architecture

### Database Schema

#### Payment Schema (`payments` collection)
```typescript
interface Payment {
  _id: string;
  transactionId: string;
  reference: string;
  amount: number;
  currency: 'KES' | 'USD' | 'EUR' | 'GBP' | 'JPY' | 'CNY' | 'INR' | 'AUD' | 'CAD';
  paymentMethod: 'mpesa' | 'stripe' | 'paypal' | 'bank_transfer' | 'cash' | 'cheque' | 'mobile_money' | 'crypto' | 'internal_donation';
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled' | 'refunded' | 'partially_refunded';
  type: 'donation' | 'registration_fee' | 'training_fee' | 'tournament_fee' | 'merchandise' | 'sponsorship' | 'grant' | 'fundraising';
  payer: {
    name: string;
    email?: string;
    phone?: string;
    address?: string;
    isAnonymous: boolean;
  };
  // Method-specific details, timestamps, fees, metadata, etc.
}
```

#### Donor Schema (`donors` collection)
- Donor classification and contact management
- Donation history and recognition tracking
- Communication preferences

#### Campaign Schema (`campaigns` collection)
- Fundraising campaign management
- Goal tracking and progress monitoring
- Social sharing and recognition features

## API Endpoints

### Core Payment Endpoints

#### `/api/payments`
- `GET` - List payments with filtering and pagination
- `POST` - Create a new payment record

#### `/api/payments/mpesa`
- `POST` - Initiate M-Pesa STK Push payment

#### `/api/payments/stripe`
- `POST` - Create Stripe payment intent
- `POST /confirm` - Confirm Stripe payment

#### `/api/payments/paypal`
- `POST` - Create PayPal payment
- `POST /confirm` - Confirm PayPal payment

#### `/api/payments/internal`
- `POST` - Process internal donation

#### `/api/payments/mpesa/callback`
- `POST` - M-Pesa callback handler for payment status updates

### Query Parameters
```typescript
// Filtering and pagination
GET /api/payments?page=1&limit=20&method=mpesa&status=completed&type=donation

// Search functionality
GET /api/payments?search=john&startDate=2024-01-01&endDate=2024-01-31

// Statistics
GET /api/payments?statistics=true
```

## Payment Methods

### 1. M-Pesa Integration

#### Configuration
```env
MPESA_CONSUMER_KEY=your-mpesa-consumer-key
MPESA_CONSUMER_SECRET=your-mpesa-consumer-secret
MPESA_PASSKEY=your-mpesa-passkey
MPESA_SHORTCODE=174379
MPESA_ENVIRONMENT=sandbox
```

#### STK Push Flow
1. Client initiates payment with phone number and amount
2. Server generates STK Push request to Safaricom API
3. Customer receives prompt on phone and enters PIN
4. Safaricom sends callback to our endpoint with payment status
5. Database is updated with payment result

#### Example Request
```javascript
POST /api/payments/mpesa
{
  "phoneNumber": "0712345678",
  "amount": 1000,
  "payerName": "John Doe",
  "payerEmail": "john@example.com",
  "type": "donation",
  "accountReference": "RNFC-DONATION"
}
```

#### Callback Handling
```javascript
POST /api/payments/mpesa/callback
{
  "Body": {
    "stkCallback": {
      "MerchantRequestID": "...",
      "CheckoutRequestID": "...",
      "ResultCode": "0", // 0 = success
      "ResultDesc": "Success",
      "CallbackMetadata": {
        "Item": [
          { "Name": "Amount", "Value": 1000 },
          { "Name": "MpesaReceiptNumber", "Value": "ABC123" },
          { "Name": "TransactionDate", "Value": "20240115123456" }
        ]
      }
    }
  }
}
```

### 2. Stripe Integration

#### Configuration
```env
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

#### Payment Flow
1. Create payment intent on server
2. Client uses Stripe.js to collect card details
3. Stripe confirms payment and returns status
4. Server updates database with payment result

#### Example Implementation
```javascript
// Server-side
POST /api/payments/stripe
{
  "amount": 2000,
  "currency": "KES",
  "payerName": "John Doe",
  "payerEmail": "john@example.com"
}

// Response
{
  "success": true,
  "data": {
    "clientSecret": "pi_123_secret_abc",
    "publishableKey": "pk_test_..."
  }
}
```

### 3. PayPal Integration

#### Configuration
```env
PAYPAL_CLIENT_ID=your-paypal-client-id
PAYPAL_CLIENT_SECRET=your-paypal-client-secret
PAYPAL_ENVIRONMENT=sandbox
```

#### Payment Flow
1. Create PayPal payment on server
2. Redirect user to PayPal for approval
3. PayPal redirects back with approval token
4. Execute payment and update database

### 4. Internal Donations

#### Use Cases
- Cash donations received at the academy
- Bank transfers processed manually
- Sponsor payments handled offline
- Grant funding received

#### Processing
```javascript
POST /api/payments/internal
{
  "amount": 5000,
  "donorName": "Company XYZ",
  "donorEmail": "contact@company.com",
  "description": "Sponsorship for U14 team",
  "type": "sponsorship"
}
```

## Frontend Integration

### PaymentSystem Component

```typescript
import PaymentSystem from '@/components/PaymentSystem';

// Usage
<PaymentSystem 
  type="donation"
  suggestedAmounts={[500, 1000, 2500, 5000, 10000]}
  campaignId="campaign-123"
  onSuccess={(payment) => {
    console.log('Payment successful:', payment);
    // Show success message or redirect
  }}
  onError={(error) => {
    console.error('Payment error:', error);
    // Show error message
  }}
/>
```

### Props
- `type`: Payment type ('donation', 'registration', 'training', etc.)
- `suggestedAmounts`: Array of suggested donation amounts
- `campaignId`: Optional campaign identifier
- `onSuccess`: Callback for successful payments
- `onError`: Callback for payment errors

## Security Features

### 1. Input Validation
- All inputs validated using Zod schemas
- Phone number formatting and validation
- Amount limits and currency validation

### 2. Payment Security
- HTTPS required for all payment endpoints
- Webhook signature verification for Stripe
- M-Pesa callback validation
- Rate limiting on payment endpoints

### 3. Data Protection
- Sensitive data encrypted in database
- PCI compliance for card payments
- GDPR compliance for donor data
- Audit logging for all transactions

## Error Handling

### Common Error Scenarios

#### M-Pesa Errors
```javascript
{
  "success": false,
  "error": "Invalid phone number format"
}

{
  "success": false,
  "error": "M-Pesa service temporarily unavailable"
}
```

#### Stripe Errors
```javascript
{
  "success": false,
  "error": "Card declined by bank"
}

{
  "success": false,
  "error": "Insufficient funds"
}
```

#### General Errors
```javascript
{
  "success": false,
  "error": "Payment processing failed. Please try again."
}
```

## Testing

### Local Development
```bash
# Start development server
npm run dev

# Test M-Pesa with sandbox credentials
# Test Stripe with test keys
# Test PayPal with sandbox accounts
```

### Test Cards for Stripe
- **Success**: 4242 4242 4242 4242
- **Decline**: 4000 0000 0000 0002
- **Insufficient Funds**: 4000 0000 0000 9995

### M-Pesa Testing
- Use sandbox environment
- Test with phone number: 254708374149

## Monitoring and Analytics

### Key Metrics
- Payment success rates by method
- Average transaction values
- Conversion funnel analytics
- Error rates and types

### Monitoring Setup
```javascript
// Track payment events
analytics.track('payment_initiated', {
  method: 'mpesa',
  amount: 1000,
  type: 'donation'
});

analytics.track('payment_completed', {
  method: 'mpesa',
  amount: 1000,
  transactionId: 'ABC123'
});
```

## Refund Management

### Processing Refunds
```javascript
POST /api/payments/:id/refund
{
  "amount": 1000,
  "reason": "Customer request"
}
```

### Refund Policies
- Full refunds within 7 days
- Partial refunds for specific circumstances
- Processing fees may apply
- Refund status tracking

## Compliance and Legal

### Kenyan Regulations
- M-Pesa compliance with Central Bank of Kenya
- Data protection under Kenya Data Protection Act
- Tax compliance for donations

### International Standards
- PCI DSS compliance for card payments
- GDPR compliance for EU donors
- Anti-money laundering (AML) checks

## Performance Optimization

### Database Optimization
```javascript
// Indexes for performance
db.payments.createIndex({ "status": 1, "createdAt": -1 })
db.payments.createIndex({ "paymentMethod": 1 })
db.payments.createIndex({ "payer.email": 1 })
db.payments.createIndex({ "reference": 1 }, { unique: true })
```

### Caching Strategy
- Redis for frequently accessed payment data
- CDN for static payment assets
- Database connection pooling

## Troubleshooting

### Common Issues

#### M-Pesa Not Working
1. Check API credentials
2. Verify callback URL is accessible
3. Check phone number format
4. Verify sandbox vs production environment

#### Stripe Payments Failing
1. Check API keys
2. Verify webhook configuration
3. Check card testing limitations
4. Review Stripe dashboard for errors

#### PayPal Integration Issues
1. Verify client ID and secret
2. Check return URL configuration
3. Test with sandbox accounts
4. Review API permissions

### Debug Mode
```javascript
// Enable debug logging
DEBUG=payments:* npm run dev

// Check payment status
GET /api/payments/123456
```

## Deployment

### Environment Variables
```bash
# Production
MONGODB_URI=mongodb+srv://...
MPESA_ENVIRONMENT=production
STRIPE_SECRET_KEY=sk_live_...
PAYPAL_ENVIRONMENT=live

# Development
MPESA_ENVIRONMENT=sandbox
STRIPE_SECRET_KEY=sk_test_...
PAYPAL_ENVIRONMENT=sandbox
```

### Database Migration
```javascript
// Run migration script
npm run migrate:payments

// Verify indexes
npm run db:indexes
```

## 🎯 **Comprehensive Management System**

### **Admin Dashboard Features**
- **Real-time Statistics**: Live payment, donor, and campaign metrics
- **Multi-tab Interface**: Overview, Payments, Donors, Campaigns
- **Quick Actions**: Direct access to key management functions
- **Recent Activity**: Latest payments, donors, and campaign updates

### **Payment Management** (`/admin/payments`)
- **Advanced Filtering**: By method, status, type, date range
- **Search Functionality**: Find payments by reference, payer, or amount
- **Statistics Dashboard**: Revenue, completion rates, method breakdown
- **Pagination**: Handle large datasets efficiently
- **Export Capabilities**: Download payment reports

### **Donor Management** (`/admin/donors`)
- **Donor Profiles**: Complete donor information and history
- **Classification System**: Individual, Corporate, Foundation, Government, NGO
- **Category Management**: One-time, Recurring, Major Donor, Sponsor, Partner
- **Donation Tracking**: Total donated, frequency, average donation
- **Contact Management**: Email, phone, address, preferences
- **Status Management**: Active, Inactive, Blacklisted

### **Campaign Management** (`/admin/campaigns`)
- **Campaign Creation**: Full-featured campaign setup
- **Goal Tracking**: Financial targets and progress monitoring
- **Status Management**: Active, Completed, Paused, Cancelled
- **Featured Campaigns**: Highlight important fundraising drives
- **Social Sharing**: Built-in social media integration
- **Progress Visualization**: Real-time progress bars and statistics

## 📊 **Analytics & Reporting**

### **Payment Analytics**
- **Revenue Trends**: Daily, weekly, monthly revenue tracking
- **Method Performance**: Success rates by payment method
- **Geographic Analysis**: Payment distribution by region
- **Conversion Metrics**: Payment completion and abandonment rates

### **Donor Analytics**
- **Donor Retention**: Repeat donation rates and patterns
- **Lifetime Value**: Total contribution per donor
- **Acquisition Channels**: How donors discover and contribute
- **Segmentation Analysis**: Performance by donor type and category

### **Campaign Analytics**
- **Campaign Performance**: Success rates and goal achievement
- **Engagement Metrics**: Donor participation and sharing
- **ROI Analysis**: Return on investment for campaigns
- **A/B Testing**: Compare different campaign approaches

## 🔧 **Advanced Features**

### **Automated Notifications**
- **Email Confirmations**: Automatic receipt generation
- **SMS Alerts**: Payment status updates via SMS
- **Donor Recognition**: Automated thank you messages
- **Campaign Updates**: Progress notifications to supporters

### **Integration Capabilities**
- **Accounting Software**: Export to QuickBooks, Xero
- **CRM Integration**: Sync with Salesforce, HubSpot
- **Email Marketing**: Connect with Mailchimp, SendGrid
- **Social Media**: Auto-post campaign updates

### **Security Enhancements**
- **Two-Factor Authentication**: Admin access protection
- **Role-Based Access**: Granular permission system
- **Audit Logging**: Complete activity tracking
- **Data Encryption**: End-to-end data protection

## 🚀 **Performance Optimizations**

### **Database Optimization**
- **Indexing Strategy**: Optimized queries for large datasets
- **Connection Pooling**: Efficient database connections
- **Caching Layer**: Redis for frequently accessed data
- **Backup Systems**: Automated data backup and recovery

### **Frontend Performance**
- **Lazy Loading**: Components load as needed
- **Code Splitting**: Optimized bundle sizes
- **CDN Integration**: Fast content delivery
- **Progressive Web App**: Offline capabilities

## 🌍 **Multi-Language Support**

### **Internationalization**
- **Currency Support**: 9+ currencies with automatic conversion
- **Language Localization**: Multiple language support
- **Regional Formatting**: Date, number, and currency formats
- **Time Zone Handling**: Automatic time zone detection

## 📱 **Mobile Experience**

### **Responsive Design**
- **Mobile-First**: Optimized for all screen sizes
- **Touch Interface**: Mobile-friendly payment forms
- **Biometric Support**: Fingerprint and Face ID payments
- **Progressive Enhancement**: Works on all devices

## 🔮 **Future Enhancements**

### **Planned Features**
- **Recurring Payments**: Subscription-based donations
- **Cryptocurrency Support**: Bitcoin, Ethereum integration
- **Apple Pay/Google Pay**: Native mobile payments
- **AI-Powered Insights**: Predictive analytics and recommendations
- **Blockchain Integration**: Transparent donation tracking

### **Scalability Considerations**
- **Microservices Architecture**: Modular payment processing
- **Event-Driven Processing**: Real-time payment notifications
- **Advanced Fraud Detection**: Machine learning security
- **Global CDN**: Worldwide content delivery
- **Load Balancing**: High-traffic handling

## Support

For payment-related issues:
1. Check application logs
2. Verify payment gateway status
3. Review error messages
4. Check configuration settings
5. Contact payment provider support

### Emergency Contacts
- M-Pesa: Safaricom Developer Support
- Stripe: stripe.com/support
- PayPal: paypal.com/support
- Internal: IT Support Team

---

This payment system is designed to be secure, scalable, and compliant with market standards. Regular updates and monitoring ensure continued reliability and performance.
