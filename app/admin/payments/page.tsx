import { Metadata } from 'next';
import PaymentDashboard from '@/components/PaymentDashboard';

// SEO metadata for payments page
export const metadata: Metadata = {
  title: 'Payment Management | React Now FC Academy Admin',
  description: 'Comprehensive payment management dashboard for React Now FC Academy. Monitor transactions, view analytics, and manage all payment methods.',
  keywords: [
    'payment management',
    'React Now FC admin',
    'M-Pesa payments',
    'Stripe payments',
    'PayPal payments',
    'donation tracking',
    'payment analytics'
  ],
  robots: {
    index: false,
    follow: false
  }
};

export default function PaymentsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Payment Management</h1>
          <p className="mt-2 text-gray-600">
            Monitor and manage all payments, donations, and transactions
          </p>
        </div>
        
        <PaymentDashboard />
      </div>
    </div>
  );
}
