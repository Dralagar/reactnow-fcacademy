import { Metadata } from 'next';
import CampaignManagement from '@/components/CampaignManagement';

// SEO metadata for campaigns page
export const metadata: Metadata = {
  title: 'Campaign Management | React Now FC Academy Admin',
  description: 'Comprehensive campaign management system for React Now FC Academy. Create and manage fundraising campaigns, track progress, and analyze campaign performance.',
  keywords: [
    'campaign management',
    'React Now FC admin',
    'fundraising campaigns',
    'campaign tracking',
    'donation campaigns',
    'fundraising analytics'
  ],
  robots: {
    index: false,
    follow: false
  }
};

export default function CampaignsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Campaign Management</h1>
          <p className="mt-2 text-gray-600">
            Create and manage fundraising campaigns, track progress, and analyze performance
          </p>
        </div>
        
        <CampaignManagement />
      </div>
    </div>
  );
}
