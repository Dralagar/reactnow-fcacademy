"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Donor {
  _id: string;
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  type: 'individual' | 'corporate' | 'foundation' | 'government' | 'ngo';
  category: 'one_time' | 'recurring' | 'major_donor' | 'sponsor' | 'partner';
  totalDonated: number;
  donationCount: number;
  firstDonationDate?: string;
  lastDonationDate?: string;
  status: 'active' | 'inactive' | 'blacklisted';
  isAnonymous: boolean;
  preferredPaymentMethod?: string;
  notes?: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

interface DonorStats {
  totalDonors: number;
  activeDonors: number;
  totalDonated: number;
  averageDonation: number;
  donorTypes: Record<string, number>;
  donorCategories: Record<string, number>;
}

export default function DonorManagement() {
  const [donors, setDonors] = useState<Donor[]>([]);
  const [stats, setStats] = useState<DonorStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingDonor, setEditingDonor] = useState<Donor | null>(null);
  const [filters, setFilters] = useState({
    type: '',
    category: '',
    status: '',
    search: ''
  });

  useEffect(() => {
    fetchDonors();
    fetchStats();
  }, [filters]);

  const fetchDonors = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        ...(filters.type && { type: filters.type }),
        ...(filters.category && { category: filters.category }),
        ...(filters.status && { status: filters.status }),
        ...(filters.search && { search: filters.search })
      });

      const response = await fetch(`/api/donors?${params}`);
      const data = await response.json();
      
      if (data.success) {
        setDonors(data.data);
      }
    } catch (error) {
      console.error('Error fetching donors:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/donors?statistics=true');
      const data = await response.json();
      
      if (data.success) {
        setStats(data.data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      'individual': 'bg-blue-100 text-blue-800',
      'corporate': 'bg-purple-100 text-purple-800',
      'foundation': 'bg-green-100 text-green-800',
      'government': 'bg-red-100 text-red-800',
      'ngo': 'bg-yellow-100 text-yellow-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'one_time': 'bg-gray-100 text-gray-800',
      'recurring': 'bg-blue-100 text-blue-800',
      'major_donor': 'bg-purple-100 text-purple-800',
      'sponsor': 'bg-green-100 text-green-800',
      'partner': 'bg-orange-100 text-orange-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'active': 'bg-green-100 text-green-800',
      'inactive': 'bg-yellow-100 text-yellow-800',
      'blacklisted': 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const handleAddDonor = (donorData: Partial<Donor>) => {
    // Implementation for adding donor
    console.log('Adding donor:', donorData);
    setShowAddModal(false);
    fetchDonors();
  };

  const handleEditDonor = (donorData: Partial<Donor>) => {
    // Implementation for editing donor
    console.log('Editing donor:', donorData);
    setEditingDonor(null);
    fetchDonors();
  };

  const handleDeleteDonor = async (donorId: string) => {
    if (!confirm('Are you sure you want to delete this donor?')) return;
    
    try {
      const response = await fetch(`/api/donors/${donorId}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        fetchDonors();
        fetchStats();
      }
    } catch (error) {
      console.error('Error deleting donor:', error);
    }
  };

  if (loading && donors.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      {stats && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <span className="text-2xl">👥</span>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total Donors</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalDonors}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <span className="text-2xl">✅</span>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Active Donors</p>
                <p className="text-2xl font-bold text-gray-900">{stats.activeDonors}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <span className="text-2xl">💰</span>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total Donated</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(stats.totalDonated)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <span className="text-2xl">📊</span>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Average</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(stats.averageDonation)}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Donor Types Breakdown */}
      {stats && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Donor Types</h3>
            <div className="space-y-3">
              {Object.entries(stats.donorTypes).map(([type, count]) => (
                <div key={type} className="flex items-center justify-between">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(type)}`}>
                    {type}
                  </span>
                  <span className="text-sm text-gray-500">{count}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Donor Categories</h3>
            <div className="space-y-3">
              {Object.entries(stats.donorCategories).map(([category, count]) => (
                <div key={category} className="flex items-center justify-between">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(category)}`}>
                    {category.replace('_', ' ')}
                  </span>
                  <span className="text-sm text-gray-500">{count}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Filters and Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-lg shadow p-6"
      >
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 lg:mb-0">Donor Management</h3>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            Add Donor
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Search donors..."
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          
          <select
            value={filters.type}
            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="">All Types</option>
            <option value="individual">Individual</option>
            <option value="corporate">Corporate</option>
            <option value="foundation">Foundation</option>
            <option value="government">Government</option>
            <option value="ngo">NGO</option>
          </select>

          <select
            value={filters.category}
            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="">All Categories</option>
            <option value="one_time">One Time</option>
            <option value="recurring">Recurring</option>
            <option value="major_donor">Major Donor</option>
            <option value="sponsor">Sponsor</option>
            <option value="partner">Partner</option>
          </select>

          <select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="blacklisted">Blacklisted</option>
          </select>
        </div>
      </motion.div>

      {/* Donors Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-lg shadow overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Donor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Donated
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Donations
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {donors.map((donor) => (
                <motion.tr
                  key={donor._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-gray-50"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {donor.isAnonymous ? 'Anonymous' : donor.name}
                      </div>
                      {donor.email && !donor.isAnonymous && (
                        <div className="text-sm text-gray-500">{donor.email}</div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(donor.type)}`}>
                      {donor.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(donor.category)}`}>
                      {donor.category.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatCurrency(donor.totalDonated)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {donor.donationCount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(donor.status)}`}>
                      {donor.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setEditingDonor(donor)}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteDonor(donor._id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Add/Edit Donor Modal */}
      {(showAddModal || editingDonor) && (
        <DonorModal
          donor={editingDonor}
          onSave={editingDonor ? handleEditDonor : handleAddDonor}
          onClose={() => {
            setShowAddModal(false);
            setEditingDonor(null);
          }}
        />
      )}
    </div>
  );
}

// Donor Modal Component
function DonorModal({ donor, onSave, onClose }: {
  donor?: Donor | null;
  onSave: (data: Partial<Donor>) => void;
  onClose: () => void;
}) {
  const [formData, setFormData] = useState({
    name: donor?.name || '',
    email: donor?.email || '',
    phone: donor?.phone || '',
    address: donor?.address || '',
    type: donor?.type || 'individual',
    category: donor?.category || 'one_time',
    status: donor?.status || 'active',
    isAnonymous: donor?.isAnonymous || false,
    preferredPaymentMethod: donor?.preferredPaymentMethod || '',
    notes: donor?.notes || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-lg shadow-xl max-w-md w-full p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {donor ? 'Edit Donor' : 'Add New Donor'}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Type
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="individual">Individual</option>
                <option value="corporate">Corporate</option>
                <option value="foundation">Foundation</option>
                <option value="government">Government</option>
                <option value="ngo">NGO</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="one_time">One Time</option>
                <option value="recurring">Recurring</option>
                <option value="major_donor">Major Donor</option>
                <option value="sponsor">Sponsor</option>
                <option value="partner">Partner</option>
              </select>
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="isAnonymous"
              checked={formData.isAnonymous}
              onChange={(e) => setFormData({ ...formData, isAnonymous: e.target.checked })}
              className="mr-2"
            />
            <label htmlFor="isAnonymous" className="text-sm text-gray-700">
              Anonymous donor
            </label>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
            >
              {donor ? 'Update' : 'Add'} Donor
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
