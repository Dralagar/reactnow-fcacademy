"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import TeamManagement from '@/components/TeamManagement';

interface DashboardStats {
  totalPlayers: number;
  totalCoaches: number;
  totalTeams: number;
  totalMatches: number;
  totalBlogPosts: number;
  totalTrainingSessions: number;
  upcomingMatches: number;
  recentBlogPosts: number;
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  const tabs = [
    { id: 'overview', name: 'Overview', icon: '📊' },
    { id: 'players', name: 'Players', icon: '👥' },
    { id: 'teams', name: 'Teams', icon: '🏆' },
    { id: 'matches', name: 'Matches', icon: '⚽' },
    { id: 'training', name: 'Training', icon: '🏃' },
    { id: 'blog', name: 'Blog', icon: '📝' },
    { id: 'settings', name: 'Settings', icon: '⚙️' }
  ];

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      // Simulate API calls to get statistics
      const mockStats: DashboardStats = {
        totalPlayers: 45,
        totalCoaches: 8,
        totalTeams: 6,
        totalMatches: 23,
        totalBlogPosts: 15,
        totalTrainingSessions: 67,
        upcomingMatches: 3,
        recentBlogPosts: 5
      };
      setStats(mockStats);
    } catch (error) {
      console.error('Failed to fetch dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Players', value: stats?.totalPlayers || 0, icon: '👥', color: 'bg-blue-500' },
          { label: 'Total Coaches', value: stats?.totalCoaches || 0, icon: '👨‍🏫', color: 'bg-green-500' },
          { label: 'Total Teams', value: stats?.totalTeams || 0, icon: '🏆', color: 'bg-purple-500' },
          { label: 'Total Matches', value: stats?.totalMatches || 0, icon: '⚽', color: 'bg-orange-500' },
          { label: 'Blog Posts', value: stats?.totalBlogPosts || 0, icon: '📝', color: 'bg-pink-500' },
          { label: 'Training Sessions', value: stats?.totalTrainingSessions || 0, icon: '🏃', color: 'bg-indigo-500' },
          { label: 'Upcoming Matches', value: stats?.upcomingMatches || 0, icon: '📅', color: 'bg-yellow-500' },
          { label: 'Recent Posts', value: stats?.recentBlogPosts || 0, icon: '📰', color: 'bg-red-500' }
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg shadow p-6"
          >
            <div className="flex items-center">
              <div className={`p-3 ${stat.color} rounded-lg text-white`}>
                <span className="text-2xl">{stat.icon}</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <span className="text-2xl mb-2 block">➕</span>
            <span className="text-sm font-medium">Add New Player</span>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <span className="text-2xl mb-2 block">📝</span>
            <span className="text-sm font-medium">Create Blog Post</span>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <span className="text-2xl mb-2 block">🏃</span>
            <span className="text-sm font-medium">Schedule Training</span>
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {[
            { action: 'New player registered', time: '2 hours ago', icon: '👥' },
            { action: 'Blog post published', time: '5 hours ago', icon: '📝' },
            { action: 'Training session completed', time: '1 day ago', icon: '🏃' },
            { action: 'Match results updated', time: '2 days ago', icon: '⚽' }
          ].map((activity, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-xl">{activity.icon}</span>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                <p className="text-xs text-gray-500">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderTeams = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Team Management</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { name: 'U12 Academy', ageGroup: 'U12', players: 12, coach: 'John Doe' },
            { name: 'U14 Development', ageGroup: 'U14', players: 15, coach: 'Jane Smith' },
            { name: 'U16 Elite', ageGroup: 'U16', players: 18, coach: 'Mike Johnson' },
            { name: 'U18 Premier', ageGroup: 'U18', players: 20, coach: 'Sarah Wilson' },
            { name: 'Senior Team', ageGroup: 'Senior', players: 25, coach: 'David Brown' },
            { name: 'Girls U14', ageGroup: 'U14', players: 14, coach: 'Emily Davis' }
          ].map((team, index) => (
            <motion.div
              key={team.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow"
            >
              <h3 className="font-semibold text-gray-900 mb-2">{team.name}</h3>
              <div className="space-y-1 text-sm">
                <p className="text-gray-600">Age Group: {team.ageGroup}</p>
                <p className="text-gray-600">Players: {team.players}</p>
                <p className="text-gray-600">Coach: {team.coach}</p>
              </div>
              <button className="mt-3 w-full px-3 py-2 bg-primary text-white rounded hover:bg-primary/90 transition-colors">
                Manage Team
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderMatches = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Match Management</h2>
          <button className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 transition-colors">
            Schedule Match
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teams</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Competition</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[
                { date: '2024-01-15', teams: 'React Now FC vs City Eagles', competition: 'League', status: 'Upcoming' },
                { date: '2024-01-12', teams: 'React Now FC vs United Stars', competition: 'Cup', status: 'Completed' },
                { date: '2024-01-08', teams: 'React Now FC vs Thunder FC', competition: 'Friendly', status: 'Completed' }
              ].map((match, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{match.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{match.teams}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{match.competition}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      match.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {match.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-primary hover:text-primary/900">View Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderTraining = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Training Sessions</h2>
          <button className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 transition-colors">
            Schedule Session
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { date: '2024-01-15', time: '16:00', team: 'U12 Academy', focus: 'Dribbling Skills', coach: 'John Doe' },
            { date: '2024-01-15', time: '17:30', team: 'U14 Development', focus: 'Passing Drills', coach: 'Jane Smith' },
            { date: '2024-01-16', time: '16:00', team: 'U16 Elite', focus: 'Tactical Awareness', coach: 'Mike Johnson' },
            { date: '2024-01-16', time: '17:30', team: 'U18 Premier', focus: 'Shooting Practice', coach: 'Sarah Wilson' }
          ].map((session, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border border-gray-200 rounded-lg p-4"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-gray-900">{session.team}</h3>
                <span className="text-sm text-gray-500">{session.date}</span>
              </div>
              <div className="space-y-1 text-sm text-gray-600">
                <p>Time: {session.time}</p>
                <p>Focus: {session.focus}</p>
                <p>Coach: {session.coach}</p>
              </div>
              <div className="mt-3 flex space-x-2">
                <button className="px-3 py-1 bg-blue-100 text-blue-800 rounded text-xs hover:bg-blue-200">
                  Edit
                </button>
                <button className="px-3 py-1 bg-green-100 text-green-800 rounded text-xs hover:bg-green-200">
                  View Attendance
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderBlog = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Blog Management</h2>
          <button className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 transition-colors">
            New Post
          </button>
        </div>
        <div className="space-y-4">
          {[
            { title: 'Match Report: Thrilling Victory Against City Eagles', category: 'Match Report', status: 'Published', date: '2024-01-14' },
            { title: 'Player Spotlight: Rising Star John Kamau', category: 'Player Spotlight', status: 'Published', date: '2024-01-12' },
            { title: 'Training Tips: Improving Ball Control', category: 'Training Tips', status: 'Draft', date: '2024-01-10' }
          ].map((post, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">{post.title}</h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span className="px-2 py-1 bg-gray-100 rounded text-xs">{post.category}</span>
                    <span>{post.date}</span>
                    <span className={`px-2 py-1 rounded text-xs ${
                      post.status === 'Published' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {post.status}
                    </span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 bg-blue-100 text-blue-800 rounded text-xs hover:bg-blue-200">
                    Edit
                  </button>
                  <button className="px-3 py-1 bg-red-100 text-red-800 rounded text-xs hover:bg-red-200">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Settings</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-md font-medium text-gray-900 mb-3">Academy Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Academy Name</label>
                <input
                  type="text"
                  defaultValue="React Now FC Academy"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contact Email</label>
                <input
                  type="email"
                  defaultValue="info@reactnowfca.org"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-md font-medium text-gray-900 mb-3">Notification Settings</h3>
            <div className="space-y-2">
              <label className="flex items-center">
                <input type="checkbox" defaultChecked className="mr-2" />
                <span className="text-sm text-gray-700">Email notifications for new registrations</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" defaultChecked className="mr-2" />
                <span className="text-sm text-gray-700">SMS notifications for match reminders</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span className="text-sm text-gray-700">Weekly training summary reports</span>
              </label>
            </div>
          </div>

          <div className="pt-4">
            <button className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 transition-colors">
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview();
      case 'players':
        return <TeamManagement />;
      case 'teams':
        return renderTeams();
      case 'matches':
        return renderMatches();
      case 'training':
        return renderTraining();
      case 'blog':
        return renderBlog();
      case 'settings':
        return renderSettings();
      default:
        return renderOverview();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-8"></div>
            <div className="h-96 bg-gray-200 rounded-lg"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Manage React Now FC Academy operations</p>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {renderContent()}
        </motion.div>
      </div>
    </div>
  );
}
