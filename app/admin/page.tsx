import { Metadata } from 'next';
import AdminDashboard from '@/components/AdminDashboard';

// SEO metadata for admin dashboard
export const metadata: Metadata = {
  title: 'Admin Dashboard | React Now FC Academy',
  description: 'Comprehensive admin dashboard for React Now FC Academy. Manage payments, donors, campaigns, and monitor system performance.',
  keywords: [
    'admin dashboard',
    'React Now FC admin',
    'payment management',
    'donor management',
    'campaign management',
    'football academy admin'
  ],
  robots: {
    index: false,
    follow: false
  }
};

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AdminDashboard />
      </div>
    </div>
  );
}
