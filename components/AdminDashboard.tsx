"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface DashboardStats {
  payments: {
    totalAmount: number;
    totalPayments: number;
    completedPayments: number;
    averageAmount: number;
  };
  donors: {
    totalDonors: number;
    activeDonors: number;
    totalDonated: number;
    averageDonation: number;
  };
  campaigns: {
    totalCampaigns: number;
    activeCampaigns: number;
    totalRaised: number;
    totalGoal: number;
    averageProgress: number;
  };
  recent: {
    payments: any[];
    donors: any[];
    campaigns: any[];
  };
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'payments' | 'donors' | 'campaigns'>('overview');

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      
      // Fetch all statistics in parallel
      const [paymentsRes, donorsRes, campaignsRes] = await Promise.all([
        fetch('/api/payments?statistics=true&limit=5'),
        fetch('/api/donors?statistics=true&limit=5'),
        fetch('/api/campaigns?statistics=true&limit=5')
      ]);

      const paymentsData = await paymentsRes.json();
      const donorsData = await donorsRes.json();
      const campaignsData = await campaignsRes.json();

      if (paymentsData.success && donorsData.success && campaignsData.success) {
        setStats({
          payments: paymentsData.data.statistics,
          donors: donorsData.data.statistics,
          campaigns: campaignsData.data.statistics,
          recent: {
            payments: paymentsData.data.data || [],
            donors: donorsData.data.data || [],
            campaigns: campaignsData.data.data || []
          }
        });
      }
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number, currency: string = 'KES') => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'completed': 'bg-green-100 text-green-800',
      'pending': 'bg-yellow-100 text-yellow-800',
      'failed': 'bg-red-100 text-red-800',
      'active': 'bg-green-100 text-green-800',
      'inactive': 'bg-gray-100 text-gray-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="mt-2 text-gray-600">
          Welcome to React Now FC Academy Admin Panel
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-lg shadow">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            {[
              { id: 'overview', name: 'Overview', icon: '📊' },
              { id: 'payments', name: 'Payments', icon: '💰' },
              { id: 'donors', name: 'Donors', icon: '👥' },
              { id: 'campaigns', name: 'Campaigns', icon: '🎯' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`${
                  activeTab === tab.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2`}
              >
                <span>{tab.icon}</span>
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && stats && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <span className="text-2xl">💰</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Total Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {formatCurrency(stats.payments.totalAmount)}
                  </p>
                  <p className="text-xs text-gray-500">{stats.payments.totalPayments} payments</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-3 bg-green-100 rounded-lg">
                  <span className="text-2xl">👥</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Total Donors</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.donors.totalDonors}</p>
                  <p className="text-xs text-gray-500">{stats.donors.activeDonors} active</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <span className="text-2xl">🎯</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Campaigns</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.campaigns.totalCampaigns}</p>
                  <p className="text-xs text-gray-500">{stats.campaigns.activeCampaigns} active</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-3 bg-orange-100 rounded-lg">
                  <span className="text-2xl">📈</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Avg Donation</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {formatCurrency(stats.donors.averageDonation)}
                  </p>
                  <p className="text-xs text-gray-500">Per donor</p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Recent Payments</h3>
              </div>
              <div className="p-6 space-y-4">
                {stats.recent.payments.slice(0, 5).map((payment: any) => (
                  <div key={payment._id} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{payment.payer.name}</p>
                      <p className="text-xs text-gray-500">{payment.reference}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">
                        {formatCurrency(payment.amount, payment.currency)}
                      </p>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(payment.status)}`}>
                        {payment.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-6 py-4 border-t border-gray-200">
                <Link
                  href="/admin/payments"
                  className="text-sm text-indigo-600 hover:text-indigo-900"
                >
                  View all payments →
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Recent Donors</h3>
              </div>
              <div className="p-6 space-y-4">
                {stats.recent.donors.slice(0, 5).map((donor: any) => (
                  <div key={donor._id} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {donor.isAnonymous ? 'Anonymous' : donor.name}
                      </p>
                      <p className="text-xs text-gray-500">{donor.type}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">
                        {formatCurrency(donor.totalDonated)}
                      </p>
                      <p className="text-xs text-gray-500">{donor.donationCount} donations</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-6 py-4 border-t border-gray-200">
                <Link
                  href="/admin/donors"
                  className="text-sm text-indigo-600 hover:text-indigo-900"
                >
                  View all donors →
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Recent Campaigns</h3>
              </div>
              <div className="p-6 space-y-4">
                {stats.recent.campaigns.slice(0, 5).map((campaign: any) => {
                  const progress = Math.round((campaign.current?.amount || 0) / (campaign.goal?.amount || 1) * 100);
                  return (
                    <div key={campaign._id}>
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm font-medium text-gray-900 truncate">{campaign.title}</p>
                        <span className="text-xs text-gray-500">{progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div
                          className="bg-blue-500 h-1.5 rounded-full"
                          style={{ width: `${Math.min(progress, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="px-6 py-4 border-t border-gray-200">
                <Link
                  href="/admin/campaigns"
                  className="text-sm text-indigo-600 hover:text-indigo-900"
                >
                  View all campaigns →
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href="/donate"
            className="flex items-center p-4 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <span className="text-2xl mr-3">💝</span>
            <div>
              <p className="font-medium text-gray-900">Make Donation</p>
              <p className="text-sm text-gray-500">Test payment system</p>
            </div>
          </Link>

          <Link
            href="/admin/payments"
            className="flex items-center p-4 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <span className="text-2xl mr-3">💰</span>
            <div>
              <p className="font-medium text-gray-900">View Payments</p>
              <p className="text-sm text-gray-500">Manage transactions</p>
            </div>
          </Link>

          <Link
            href="/admin/donors"
            className="flex items-center p-4 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <span className="text-2xl mr-3">👥</span>
            <div>
              <p className="font-medium text-gray-900">Manage Donors</p>
              <p className="text-sm text-gray-500">Donor database</p>
            </div>
          </Link>

          <Link
            href="/admin/campaigns"
            className="flex items-center p-4 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <span className="text-2xl mr-3">🎯</span>
            <div>
              <p className="font-medium text-gray-900">Campaigns</p>
              <p className="text-sm text-gray-500">Fundraising drives</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
