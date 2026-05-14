import { z } from 'zod';

// Payment methods
export const PaymentMethodEnum = z.enum([
  'mpesa',
  'stripe',
  'paypal',
  'bank_transfer',
  'cash',
  'cheque',
  'mobile_money',
  'crypto',
  'internal_donation'
]);

// Payment status
export const PaymentStatusEnum = z.enum([
  'pending',
  'processing',
  'completed',
  'failed',
  'cancelled',
  'refunded',
  'partially_refunded'
]);

// Payment type
export const PaymentTypeEnum = z.enum([
  'donation',
  'registration_fee',
  'training_fee',
  'tournament_fee',
  'merchandise',
  'sponsorship',
  'grant',
  'fundraising'
]);

// Currency
export const CurrencyEnum = z.enum([
  'KES', 'USD', 'EUR', 'GBP', 'EUR', 'JPY', 'CNY', 'INR', 'AUD', 'CAD'
]);

// Payment schema
export const PaymentSchema = z.object({
  _id: z.string().optional(),
  
  // Transaction details
  transactionId: z.string().optional(),
  reference: z.string().min(1, 'Reference is required'),
  description: z.string().optional(),
  
  // Amount and currency
  amount: z.number().min(1, 'Amount must be greater than 0'),
  currency: CurrencyEnum.default('KES'),
  
  // Payment method and status
  paymentMethod: PaymentMethodEnum,
  status: PaymentStatusEnum.default('pending'),
  type: PaymentTypeEnum,
  
  // Payer information
  payer: z.object({
    name: z.string().min(1, 'Payer name is required'),
    email: z.string().email().optional(),
    phone: z.string().optional(),
    address: z.string().optional(),
    isAnonymous: z.boolean().default(false)
  }).default(() => ({
    name: '',
    isAnonymous: false
  })),
  
  // Recipient information (for internal tracking)
  recipient: z.object({
    name: z.string().optional(),
    accountNumber: z.string().optional(),
    bankName: z.string().optional(),
    branch: z.string().optional()
  }).optional(),
  
  // Method-specific details
  mpesaDetails: z.object({
    phoneNumber: z.string().optional(),
    checkoutRequestID: z.string().optional(),
    merchantRequestID: z.string().optional(),
    resultCode: z.string().optional(),
    resultDesc: z.string().optional()
  }).optional(),
  
  stripeDetails: z.object({
    paymentIntentId: z.string().optional(),
    stripeCustomerId: z.string().optional(),
    last4: z.string().optional(),
    brand: z.string().optional(),
    country: z.string().optional()
  }).optional(),
  
  paypalDetails: z.object({
    paymentId: z.string().optional(),
    payerId: z.string().optional(),
    paymentToken: z.string().optional(),
    saleId: z.string().optional()
  }).optional(),
  
  bankTransferDetails: z.object({
    bankName: z.string(),
    accountNumber: z.string(),
    transactionReference: z.string(),
    depositSlipUrl: z.string().optional()
  }).optional(),
  
  // Timestamps
  initiatedAt: z.string().default(new Date().toISOString()),
  completedAt: z.string().optional(),
  expiresAt: z.string().optional(),
  
  // Fees and taxes
  fees: z.object({
    processingFee: z.number().default(0),
    platformFee: z.number().default(0),
    taxAmount: z.number().default(0),
    totalFees: z.number().default(0)
  }).default(() => ({
    processingFee: 0,
    platformFee: 0,
    taxAmount: 0,
    totalFees: 0
  })),
  
  // Metadata
  metadata: z.object({
    campaignId: z.string().optional(),
    playerId: z.string().optional(),
    teamId: z.string().optional(),
    eventId: z.string().optional(),
    donationType: z.string().optional(),
    recurringPayment: z.boolean().default(false),
    frequency: z.enum(['once', 'daily', 'weekly', 'monthly', 'yearly']).optional(),
    nextPaymentDate: z.string().optional()
  }).default(() => ({
    recurringPayment: false
  })),
  
  // Refund information
  refunds: z.array(z.object({
    amount: z.number(),
    reason: z.string(),
    processedAt: z.string(),
    refundId: z.string(),
    status: z.enum(['pending', 'completed', 'failed'])
  })).default([]),
  
  // Notes and additional information
  notes: z.string().optional(),
  internalNotes: z.string().optional(),
  
  // Receipt and confirmation
  receiptUrl: z.string().optional(),
  confirmationSent: z.boolean().default(false),
  
  createdAt: z.string().default(new Date().toISOString()),
  updatedAt: z.string().default(new Date().toISOString())
});

// Donor schema for internal donor management
export const DonorSchema = z.object({
  _id: z.string().optional(),
  name: z.string().min(1, 'Donor name is required'),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  
  // Donor classification
  type: z.enum(['individual', 'corporate', 'foundation', 'government', 'ngo']),
  category: z.enum(['one_time', 'recurring', 'major_donor', 'sponsor', 'partner']),
  
  // Contact preferences
  contactPreferences: z.object({
    email: z.boolean().default(true),
    phone: z.boolean().default(false),
    sms: z.boolean().default(false),
    post: z.boolean().default(false)
  }).default(() => ({
    email: true,
    phone: false,
    sms: false,
    post: false
  })),
  
  // Donation history summary
  totalDonated: z.number().default(0),
  donationCount: z.number().default(0),
  firstDonationDate: z.string().optional(),
  lastDonationDate: z.string().optional(),
  
  // Recognition and acknowledgments
  recognitionLevel: z.enum(['bronze', 'silver', 'gold', 'platinum', 'diamond']).optional(),
  acknowledgments: z.array(z.object({
    type: z.string(),
    date: z.string(),
    description: z.string()
  })).default([]),
  
  // Status and preferences
  status: z.enum(['active', 'inactive', 'blacklisted']).default('active'),
  isAnonymous: z.boolean().default(false),
  preferredPaymentMethod: PaymentMethodEnum.optional(),
  
  // Additional information
  notes: z.string().optional(),
  tags: z.array(z.string()).default([]),
  
  createdAt: z.string().default(new Date().toISOString()),
  updatedAt: z.string().default(new Date().toISOString())
});

// Payment campaign schema
export const PaymentCampaignSchema = z.object({
  _id: z.string().optional(),
  title: z.string().min(1, 'Campaign title is required'),
  description: z.string().min(1, 'Campaign description is required'),
  
  // Campaign goals and targets
  targetAmount: z.number().min(1, 'Target amount must be greater than 0'),
  currency: CurrencyEnum.default('KES'),
  currentAmount: z.number().default(0),
  
  // Campaign timeline
  startDate: z.string(),
  endDate: z.string(),
  
  // Campaign status
  status: z.enum(['draft', 'active', 'paused', 'completed', 'cancelled']).default('draft'),
  
  // Campaign details
  category: z.enum(['general', 'infrastructure', 'equipment', 'scholarships', 'tournament', 'events']),
  featuredImage: z.string().optional(),
  images: z.array(z.string()).default([]),
  
  // Payment settings
  allowedPaymentMethods: z.array(PaymentMethodEnum).default(['mpesa', 'stripe', 'paypal']),
  suggestedAmounts: z.array(z.number()).default([]),
  minimumAmount: z.number().min(1).default(1),
  
  // Recurring donations
  allowRecurring: z.boolean().default(true),
  recurringFrequencies: z.array(z.enum(['daily', 'weekly', 'monthly', 'yearly'])).default(['monthly']),
  
  // Recognition settings
  enablePublicRecognition: z.boolean().default(true),
  recognitionLevels: z.array(z.object({
    name: z.string(),
    minAmount: z.number(),
    benefits: z.array(z.string())
  })).default([]),
  
  // Campaign organizer
  organizer: z.object({
    name: z.string(),
    email: z.string().email(),
    phone: z.string().optional()
  }),
  
  // Analytics and tracking
  totalDonors: z.number().default(0),
  averageDonation: z.number().default(0),
  conversionRate: z.number().default(0),
  
  // Social sharing
  socialSharing: z.object({
    enabled: z.boolean().default(true),
    shareMessage: z.string().optional(),
    hashtags: z.array(z.string()).default([])
  }).default(() => ({
    enabled: true,
    hashtags: []
  })),
  
  createdAt: z.string().default(new Date().toISOString()),
  updatedAt: z.string().default(new Date().toISOString())
});

// Type inference
export type Payment = z.infer<typeof PaymentSchema>;
export type PaymentMethod = z.infer<typeof PaymentMethodEnum>;
export type PaymentStatus = z.infer<typeof PaymentStatusEnum>;
export type PaymentType = z.infer<typeof PaymentTypeEnum>;
export type Currency = z.infer<typeof CurrencyEnum>;
export type Donor = z.infer<typeof DonorSchema>;
export type PaymentCampaign = z.infer<typeof PaymentCampaignSchema>;

// Utility functions
export const formatCurrency = (amount: number, currency: Currency = 'KES'): string => {
  const formatters: Record<Currency, Intl.NumberFormat> = {
    'KES': new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES' }),
    'USD': new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }),
    'EUR': new Intl.NumberFormat('en-EU', { style: 'currency', currency: 'EUR' }),
    'GBP': new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }),
    'JPY': new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }),
    'CNY': new Intl.NumberFormat('zh-CN', { style: 'currency', currency: 'CNY' }),
    'INR': new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }),
    'AUD': new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD' }),
    'CAD': new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' })
  };
  
  return formatters[currency]?.format(amount) || `${currency} ${amount.toLocaleString()}`;
};

export const getPaymentMethodDisplayName = (method: PaymentMethod): string => {
  const displayNames: Record<PaymentMethod, string> = {
    'mpesa': 'M-Pesa',
    'stripe': 'Credit/Debit Card',
    'paypal': 'PayPal',
    'bank_transfer': 'Bank Transfer',
    'cash': 'Cash',
    'cheque': 'Cheque',
    'mobile_money': 'Mobile Money',
    'crypto': 'Cryptocurrency',
    'internal_donation': 'Internal Donation'
  };
  
  return displayNames[method];
};

export const isPaymentComplete = (status: PaymentStatus): boolean => {
  return status === 'completed';
};

export const isPaymentPending = (status: PaymentStatus): boolean => {
  return status === 'pending' || status === 'processing';
};

export const canBeRefunded = (payment: Payment): boolean => {
  return isPaymentComplete(payment.status) && 
         payment.refunds.length === 0 && 
         !payment.metadata.recurringPayment;
};

export const calculateProcessingFee = (amount: number, method: PaymentMethod): number => {
  const feeStructures: Record<PaymentMethod, number> = {
    'mpesa': 0, // M-Pesa fees are usually borne by the sender
    'stripe': 0.029 + 0.30, // 2.9% + $0.30
    'paypal': 0.034 + 0.30, // 3.4% + $0.30
    'bank_transfer': 0,
    'cash': 0,
    'cheque': 0,
    'mobile_money': 0.02, // 2%
    'crypto': 0.01, // 1%
    'internal_donation': 0
  };
  
  const feeRate = feeStructures[method] || 0;
  return Math.round((amount * feeRate + (method === 'stripe' || method === 'paypal' ? 0.30 : 0)) * 100) / 100;
};

export const generateTransactionReference = (type: PaymentType, prefix?: string): string => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  const typePrefix = prefix || type.substring(0, 3).toUpperCase();
  return `${typePrefix}${timestamp}${random}`;
};

export const validatePhoneNumber = (phone: string, country: string = 'KE'): boolean => {
  // Basic phone number validation - can be enhanced per country
  const phoneRegex = {
    'KE': /^(?:\+254|0)?[17]\d{8}$/,
    'US': /^\+1\d{10}$/,
    'UK': /^\+44\d{10,11}$/,
    'UG': /^(?:\+256|0)?[37]\d{8}$/,
    'TZ': /^(?:\+255|0)?[67]\d{8}$/
  };
  
  const regex = phoneRegex[country as keyof typeof phoneRegex] || phoneRegex['KE'];
  return regex.test(phone.replace(/\s+/g, ''));
};

export const sanitizePhoneNumber = (phone: string, country: string = 'KE'): string => {
  // Remove all non-digit characters
  let cleaned = phone.replace(/\D/g, '');
  
  // Add country code if missing
  if (country === 'KE' && cleaned.length === 9 && cleaned.startsWith('7')) {
    cleaned = '254' + cleaned;
  } else if (country === 'KE' && cleaned.length === 10 && cleaned.startsWith('07')) {
    cleaned = '254' + cleaned.substring(1);
  }
  
  return cleaned;
};
