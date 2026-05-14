import { Metadata } from 'next';
import DonorManagement from '@/components/DonorManagement';

// SEO metadata for donors page
export const metadata: Metadata = {
  title: 'Donor Management | React Now FC Academy Admin',
  description: 'Comprehensive donor management system for React Now FC Academy. Track donors, manage donations, and analyze donor engagement.',
  keywords: [
    'donor management',
    'React Now FC admin',
    'donor tracking',
    'donation management',
    'donor analytics',
    'fundraising management'
  ],
  robots: {
    index: false,
    follow: false
  }
};

export default function DonorsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Donor Management</h1>
          <p className="mt-2 text-gray-600">
            Manage donors, track donations, and analyze donor engagement
          </p>
        </div>
        
        <DonorManagement />
      </div>
    </div>
  );
}
