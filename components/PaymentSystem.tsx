"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface PaymentSystemProps {
  type?: 'donation' | 'registration' | 'training' | 'tournament';
  suggestedAmounts?: number[];
  campaignId?: string;
  onSuccess?: (payment: any) => void;
  onError?: (error: string) => void;
}

interface Payment {
  _id: string;
  reference: string;
  amount: number;
  currency: string;
  paymentMethod: string;
  status: string;
  payer: {
    name: string;
    email?: string;
    phone?: string;
  };
  createdAt: string;
}

export default function PaymentSystem({ 
  type = 'donation', 
  suggestedAmounts = [500, 1000, 2500, 5000, 10000],
  campaignId,
  onSuccess,
  onError 
}: PaymentSystemProps) {
  const [selectedMethod, setSelectedMethod] = useState<'mpesa' | 'stripe' | 'paypal' | 'internal'>('mpesa');
  const [amount, setAmount] = useState<number>(1000);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [completedPayment, setCompletedPayment] = useState<Payment | null>(null);
  const [errors, setErrors] = useState<string>('');

  // Form state
  const [formData, setFormData] = useState({
    payerName: '',
    payerEmail: '',
    payerPhone: '',
    description: '',
    isAnonymous: false
  });

  const paymentMethods = [
    {
      id: 'mpesa',
      name: 'M-Pesa',
      description: 'Fast and secure mobile money',
      icon: '📱',
      currencies: ['KES']
    },
    {
      id: 'stripe',
      name: 'Credit/Debit Card',
      description: 'Visa, Mastercard, and more',
      icon: '💳',
      currencies: ['KES', 'USD', 'EUR', 'GBP']
    },
    {
      id: 'paypal',
      name: 'PayPal',
      description: 'Trusted global payments',
      icon: '🅿️',
      currencies: ['USD', 'EUR', 'GBP']
    },
    {
      id: 'internal',
      name: 'Internal Donation',
      description: 'For internal processing',
      icon: '🏢',
      currencies: ['KES']
    }
  ];

  const handleAmountSelect = (selectedAmount: number) => {
    setAmount(selectedAmount);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value);
    const numValue = parseInt(value);
    if (!isNaN(numValue) && numValue > 0) {
      setAmount(numValue);
    }
  };

  const validateForm = () => {
    if (!formData.payerName.trim()) {
      setErrors('Please enter your name');
      return false;
    }

    if (selectedMethod === 'mpesa' && !formData.payerPhone.trim()) {
      setErrors('Please enter your phone number for M-Pesa');
      return false;
    }

    if ((selectedMethod === 'stripe' || selectedMethod === 'paypal') && !formData.payerEmail.trim()) {
      setErrors('Please enter your email address');
      return false;
    }

    if (amount < 1) {
      setErrors('Please enter a valid amount');
      return false;
    }

    setErrors('');
    return true;
  };

  const processPayment = async () => {
    if (!validateForm()) return;

    setIsProcessing(true);
    setErrors('');

    try {
      const paymentData = {
        amount,
        payerName: formData.payerName,
        payerEmail: formData.payerEmail,
        payerPhone: formData.payerPhone,
        description: formData.description,
        type,
        metadata: {
          campaignId,
          isAnonymous: formData.isAnonymous
        }
      };

      let response;

      switch (selectedMethod) {
        case 'mpesa':
          response = await fetch('/api/payments/mpesa', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              ...paymentData,
              accountReference: `RNFC-${type.toUpperCase()}`,
              transactionDesc: `${type} to React Now FC Academy`
            })
          });
          break;

        case 'stripe':
          response = await fetch('/api/payments/stripe', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              ...paymentData,
              currency: 'KES'
            })
          });
          break;

        case 'paypal':
          response = await fetch('/api/payments/paypal', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              ...paymentData,
              currency: 'USD'
            })
          });
          break;

        case 'internal':
          response = await fetch('/api/payments/internal', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(paymentData)
          });
          break;

        default:
          throw new Error('Unsupported payment method');
      }

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'Payment failed');
      }

      // Handle different payment method responses
      if (selectedMethod === 'mpesa') {
        // M-Pesa STK Push initiated
        setCompletedPayment(result.data.payment);
        setShowSuccess(true);
        onSuccess?.(result.data.payment);
      } else if (selectedMethod === 'stripe') {
        // Stripe payment intent created - would redirect to Stripe Checkout
        console.log('Stripe client secret:', result.data.clientSecret);
        setCompletedPayment(result.data.payment);
        setShowSuccess(true);
        onSuccess?.(result.data.payment);
      } else if (selectedMethod === 'paypal') {
        // PayPal payment created - would redirect to PayPal
        console.log('PayPal approval URL:', result.data.approvalUrl);
        setCompletedPayment(result.data.payment);
        setShowSuccess(true);
        onSuccess?.(result.data.payment);
      } else if (selectedMethod === 'internal') {
        // Internal donation processed immediately
        setCompletedPayment(result.data);
        setShowSuccess(true);
        onSuccess?.(result.data);
      }

    } catch (error: any) {
      const errorMessage = error.message || 'Payment processing failed. Please try again.';
      setErrors(errorMessage);
      onError?.(errorMessage);
    } finally {
      setIsProcessing(false);
    }
  };

  const resetForm = () => {
    setFormData({
      payerName: '',
      payerEmail: '',
      payerPhone: '',
      description: '',
      isAnonymous: false
    });
    setAmount(1000);
    setCustomAmount('');
    setShowSuccess(false);
    setCompletedPayment(null);
    setErrors('');
  };

  const formatCurrency = (amount: number, currency: string = 'KES') => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0
    }).format(amount);
  };

  if (showSuccess && completedPayment) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8 text-center"
      >
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">✅</span>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Payment Successful!</h3>
        <p className="text-gray-600 mb-4">
          Thank you for your {type} of {formatCurrency(amount, completedPayment.currency)}
        </p>
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <p className="text-sm text-gray-600 mb-1">Reference: {completedPayment.reference}</p>
          <p className="text-sm text-gray-600">Status: {completedPayment.status}</p>
          <p className="text-sm text-gray-600">Method: {completedPayment.paymentMethod}</p>
        </div>
        {selectedMethod === 'mpesa' && (
          <p className="text-sm text-gray-500 mb-4">
            Please complete the payment on your phone when prompted.
          </p>
        )}
        <button
          onClick={resetForm}
          className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
        >
          Make Another Payment
        </button>
      </motion.div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Make a {type === 'donation' ? 'Donation' : 'Payment'}
      </h2>

      {/* Amount Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Select Amount (KES)
        </label>
        <div className="grid grid-cols-3 gap-2 mb-3">
          {suggestedAmounts.map((suggestedAmount) => (
            <button
              key={suggestedAmount}
              onClick={() => handleAmountSelect(suggestedAmount)}
              className={`px-3 py-2 rounded-lg border-2 text-sm font-medium transition-colors ${
                amount === suggestedAmount && !customAmount
                  ? 'border-primary bg-primary text-white'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              {formatCurrency(suggestedAmount)}
            </button>
          ))}
        </div>
        <input
          type="number"
          placeholder="Custom amount"
          value={customAmount}
          onChange={(e) => handleCustomAmountChange(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          min="1"
        />
      </div>

      {/* Payment Method Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Payment Method
        </label>
        <div className="space-y-2">
          {paymentMethods.map((method) => (
            <button
              key={method.id}
              onClick={() => setSelectedMethod(method.id as any)}
              className={`w-full p-3 rounded-lg border-2 text-left transition-colors ${
                selectedMethod === method.id
                  ? 'border-primary bg-primary/5'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center">
                <span className="text-2xl mr-3">{method.icon}</span>
                <div>
                  <div className="font-medium">{method.name}</div>
                  <div className="text-sm text-gray-500">{method.description}</div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Payer Information */}
      <div className="mb-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name *
          </label>
          <input
            type="text"
            value={formData.payerName}
            onChange={(e) => setFormData({ ...formData, payerName: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="John Doe"
          />
        </div>

        {selectedMethod === 'mpesa' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number *
            </label>
            <input
              type="tel"
              value={formData.payerPhone}
              onChange={(e) => setFormData({ ...formData, payerPhone: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="07XX XXX XXX"
            />
          </div>
        )}

        {(selectedMethod === 'stripe' || selectedMethod === 'paypal') && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address *
            </label>
            <input
              type="email"
              value={formData.payerEmail}
              onChange={(e) => setFormData({ ...formData, payerEmail: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="john@example.com"
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description (Optional)
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            rows={2}
            placeholder="Add a note or special instructions..."
          />
        </div>

        {type === 'donation' && (
          <div className="flex items-center">
            <input
              type="checkbox"
              id="anonymous"
              checked={formData.isAnonymous}
              onChange={(e) => setFormData({ ...formData, isAnonymous: e.target.checked })}
              className="mr-2"
            />
            <label htmlFor="anonymous" className="text-sm text-gray-700">
              Make this donation anonymous
            </label>
          </div>
        )}
      </div>

      {/* Error Display */}
      {errors && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
          {errors}
        </div>
      )}

      {/* Submit Button */}
      <button
        onClick={processPayment}
        disabled={isProcessing}
        className="w-full px-4 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
      >
        {isProcessing ? (
          <span className="flex items-center justify-center">
            <span className="animate-spin mr-2">⏳</span>
            Processing...
          </span>
        ) : (
          `Pay ${formatCurrency(amount)}`
        )}
      </button>

      {/* Security Notice */}
      <div className="mt-4 text-center text-xs text-gray-500">
        <p>🔒 Secure payment processing</p>
        <p>Your information is protected and encrypted</p>
      </div>
    </div>
  );
}
