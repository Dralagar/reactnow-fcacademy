"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { getCampaignImage, campaignImages } from '@/lib/imageLibrary';
import { validateImageFile, createImagePreview } from '@/lib/images';

interface Campaign {
  _id: string;
  title: string;
  description: string;
  goal: {
    amount: number;
    currency: string;
    deadline: string;
  };
  current: {
    amount: number;
    donors: number;
  };
  status: 'active' | 'completed' | 'paused' | 'cancelled';
  type: 'donation' | 'sponsorship' | 'equipment' | 'tournament' | 'general';
  featured: boolean;
  enablePublicRecognition: boolean;
  socialSharing: {
    enabled: boolean;
    shareMessage?: string;
    hashtags: string[];
  };
  organizer: {
    name: string;
    email: string;
    phone?: string;
  };
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

interface CampaignStats {
  totalCampaigns: number;
  activeCampaigns: number;
  totalRaised: number;
  totalGoal: number;
  averageProgress: number;
  campaignTypes: Record<string, number>;
}

export default function CampaignManagement() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [stats, setStats] = useState<CampaignStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState<Campaign | null>(null);
  const [filters, setFilters] = useState({
    status: '',
    type: '',
    featured: ''
  });

  useEffect(() => {
    fetchCampaigns();
    fetchStats();
  }, [filters]);

  const fetchCampaigns = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        ...(filters.status && { status: filters.status }),
        ...(filters.type && { type: filters.type }),
        ...(filters.featured && { featured: filters.featured })
      });

      const response = await fetch(`/api/campaigns?${params}`);
      const data = await response.json();
      
      if (data.success) {
        setCampaigns(data.data);
      }
    } catch (error) {
      console.error('Error fetching campaigns:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/campaigns?statistics=true');
      const data = await response.json();
      
      if (data.success) {
        setStats(data.data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
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
      'active': 'bg-green-100 text-green-800',
      'completed': 'bg-blue-100 text-blue-800',
      'paused': 'bg-yellow-100 text-yellow-800',
      'cancelled': 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      'donation': 'bg-purple-100 text-purple-800',
      'sponsorship': 'bg-green-100 text-green-800',
      'equipment': 'bg-blue-100 text-blue-800',
      'tournament': 'bg-orange-100 text-orange-800',
      'general': 'bg-gray-100 text-gray-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  const calculateProgress = (current: number, goal: number) => {
    return Math.min(Math.round((current / goal) * 100), 100);
  };

  const getProgressBarColor = (progress: number) => {
    if (progress >= 100) return 'bg-green-500';
    if (progress >= 75) return 'bg-blue-500';
    if (progress >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  
  const handleAddCampaign = (campaignData: Partial<Campaign>) => {
    console.log('Adding campaign:', campaignData);
    setShowAddModal(false);
    fetchCampaigns();
  };

  const handleEditCampaign = (campaignData: Partial<Campaign>) => {
    console.log('Editing campaign:', campaignData);
    setEditingCampaign(null);
    fetchCampaigns();
  };

  const handleDeleteCampaign = async (campaignId: string) => {
    if (!confirm('Are you sure you want to delete this campaign?')) return;
    
    try {
      const response = await fetch(`/api/campaigns/${campaignId}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        fetchCampaigns();
        fetchStats();
      }
    } catch (error) {
      console.error('Error deleting campaign:', error);
    }
  };

  const handleToggleFeatured = async (campaignId: string, featured: boolean) => {
    try {
      const response = await fetch(`/api/campaigns/${campaignId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ featured: !featured })
      });
      
      if (response.ok) {
        fetchCampaigns();
      }
    } catch (error) {
      console.error('Error toggling featured:', error);
    }
  };

  if (loading && campaigns.length === 0) {
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4"
        >
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <span className="text-2xl">🎯</span>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total Campaigns</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalCampaigns}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <span className="text-2xl">🟢</span>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Active</p>
                <p className="text-2xl font-bold text-gray-900">{stats.activeCampaigns}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <span className="text-2xl">💰</span>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total Raised</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(stats.totalRaised)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <span className="text-2xl">🎯</span>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total Goal</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(stats.totalGoal)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <span className="text-2xl">📊</span>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Avg Progress</p>
                <p className="text-2xl font-bold text-gray-900">{stats.averageProgress}%</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Filters and Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-lg shadow p-6"
      >
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 lg:mb-0">Campaign Management</h3>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            Create Campaign
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="paused">Paused</option>
            <option value="cancelled">Cancelled</option>
          </select>

          <select
            value={filters.type}
            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="">All Types</option>
            <option value="donation">Donation</option>
            <option value="sponsorship">Sponsorship</option>
            <option value="equipment">Equipment</option>
            <option value="tournament">Tournament</option>
            <option value="general">General</option>
          </select>

          <select
            value={filters.featured}
            onChange={(e) => setFilters({ ...filters, featured: e.target.value })}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="">All Campaigns</option>
            <option value="true">Featured Only</option>
            <option value="false">Not Featured</option>
          </select>
        </div>
      </motion.div>

      {/* Campaigns Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {campaigns.map((campaign) => {
          const progress = calculateProgress(campaign.current.amount, campaign.goal.amount);
          const progressColor = getProgressBarColor(progress);
          
          return (
            <motion.div
              key={campaign._id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              {/* Campaign Header */}
              <div className="relative">
                {campaign.featured && (
                  <div className="absolute top-2 right-2 z-10">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      ⭐ Featured
                    </span>
                  </div>
                )}
                
                {/* Campaign Image */}
                <div className="relative h-48 w-full">
                  <Image
                    src={campaign.imageUrl || getCampaignImage(campaign.type)}
                    alt={campaign.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    onError={(e) => {
                      // Fallback to type-based image if upload fails
                      const target = e.target as HTMLImageElement;
                      target.src = getCampaignImage(campaign.type);
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-lg font-semibold text-gray-900 line-clamp-2">
                      {campaign.title}
                    </h4>
                    <div className="flex space-x-1 ml-2">
                      <button
                        onClick={() => setEditingCampaign(campaign)}
                        className="text-gray-400 hover:text-indigo-600"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => handleDeleteCampaign(campaign._id)}
                        className="text-gray-400 hover:text-red-600"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 mb-3">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(campaign.status)}`}>
                      {campaign.status}
                    </span>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(campaign.type)}`}>
                      {campaign.type}
                    </span>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {campaign.description}
                  </p>

                  {/* Progress Section */}
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-medium text-gray-900">{progress}%</span>
                    </div>
                    
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`${progressColor} h-2 rounded-full transition-all duration-300`}
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        {formatCurrency(campaign.current.amount)}
                      </span>
                      <span className="text-gray-600">
                        of {formatCurrency(campaign.goal.amount)}
                      </span>
                    </div>

                    <div className="flex justify-between text-sm text-gray-500">
                      <span>{campaign.current.donors} donors</span>
                      <span>Deadline: {new Date(campaign.goal.deadline).toLocaleDateString()}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => handleToggleFeatured(campaign._id, campaign.featured)}
                        className={`text-sm ${campaign.featured ? 'text-yellow-600' : 'text-gray-400'} hover:text-yellow-600`}
                      >
                        {campaign.featured ? '⭐ Featured' : '☆ Feature'}
                      </button>
                      <button className="text-sm text-indigo-600 hover:text-indigo-900">
                        View Details →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Add/Edit Campaign Modal */}
      {(showAddModal || editingCampaign) && (
        <CampaignModal
          campaign={editingCampaign}
          onSave={editingCampaign ? handleEditCampaign : handleAddCampaign}
          onClose={() => {
            setShowAddModal(false);
            setEditingCampaign(null);
          }}
        />
      )}
    </div>
  );
}

// Campaign Modal Component
function CampaignModal({ campaign, onSave, onClose }: {
  campaign?: Campaign | null;
  onSave: (data: Partial<Campaign>) => void;
  onClose: () => void;
}) {
  const [formData, setFormData] = useState({
    title: campaign?.title || '',
    description: campaign?.description || '',
    goalAmount: campaign?.goal.amount || 0,
    goalCurrency: campaign?.goal.currency || 'KES',
    goalDeadline: campaign?.goal.deadline || '',
    type: campaign?.type || 'donation',
    featured: campaign?.featured || false,
    enablePublicRecognition: campaign?.enablePublicRecognition || false,
    organizerName: campaign?.organizer.name || '',
    organizerEmail: campaign?.organizer.email || '',
    organizerPhone: campaign?.organizer.phone || '',
    imageUrl: campaign?.imageUrl || ''
  });
  
  const [imagePreview, setImagePreview] = useState<string>(campaign?.imageUrl || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const campaignData = {
      ...formData,
      goal: {
        amount: formData.goalAmount,
        currency: formData.goalCurrency,
        deadline: formData.goalDeadline
      },
      organizer: {
        name: formData.organizerName,
        email: formData.organizerEmail,
        phone: formData.organizerPhone
      }
    };

    onSave(campaignData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {campaign ? 'Edit Campaign' : 'Create New Campaign'}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Campaign Title *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description *
            </label>
            <textarea
              required
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Campaign Image
            </label>
            <div className="space-y-2">
              {imagePreview && (
                <div className="relative h-32 w-full rounded-lg overflow-hidden">
                  <Image
                    src={imagePreview}
                    alt="Campaign preview"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    if (!validateImageFile(file)) {
                      alert('Please select a valid image file (JPG, PNG, GIF, WebP) under 5MB');
                      return;
                    }
                    
                    try {
                      const preview = await createImagePreview(file);
                      setImagePreview(preview);
                      setFormData({ ...formData, imageUrl: preview });
                    } catch (error) {
                      alert('Failed to load image preview');
                      console.error('Image preview error:', error);
                    }
                  }
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
              />
              <p className="text-xs text-gray-500">
                Upload a campaign image (JPG, PNG, GIF, WebP)
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Goal Amount *
              </label>
              <input
                type="number"
                required
                min="1"
                value={formData.goalAmount}
                onChange={(e) => setFormData({ ...formData, goalAmount: parseInt(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Currency
              </label>
              <select
                value={formData.goalCurrency}
                onChange={(e) => setFormData({ ...formData, goalCurrency: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="KES">KES</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Deadline *
              </label>
              <input
                type="date"
                required
                value={formData.goalDeadline}
                onChange={(e) => setFormData({ ...formData, goalDeadline: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Campaign Type
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="donation">Donation</option>
                <option value="sponsorship">Sponsorship</option>
                <option value="equipment">Equipment</option>
                <option value="tournament">Tournament</option>
                <option value="general">General</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Organizer Name *
              </label>
              <input
                type="text"
                required
                value={formData.organizerName}
                onChange={(e) => setFormData({ ...formData, organizerName: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Organizer Email *
              </label>
              <input
                type="email"
                required
                value={formData.organizerEmail}
                onChange={(e) => setFormData({ ...formData, organizerEmail: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Organizer Phone
              </label>
              <input
                type="tel"
                value={formData.organizerPhone}
                onChange={(e) => setFormData({ ...formData, organizerPhone: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="featured"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="mr-2"
              />
              <label htmlFor="featured" className="text-sm text-gray-700">
                Featured campaign
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="publicRecognition"
                checked={formData.enablePublicRecognition}
                onChange={(e) => setFormData({ ...formData, enablePublicRecognition: e.target.checked })}
                className="mr-2"
              />
              <label htmlFor="publicRecognition" className="text-sm text-gray-700">
                Enable public recognition
              </label>
            </div>
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
              {campaign ? 'Update' : 'Create'} Campaign
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
