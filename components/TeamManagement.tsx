"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface Player {
  _id: string;
  firstName: string;
  lastName: string;
  age: number;
  position: string;
  skillLevel: string;
  status: string;
  jerseyNumber?: number;
  profileImage?: string;
  statistics: {
    matchesPlayed: number;
    goalsScored: number;
    assists: number;
    yellowCards: number;
    redCards: number;
  };
  joinDate: string;
}

interface TeamStats {
  totalPlayers: number;
  activePlayers: number;
  averageAge: number;
  ageDistribution: Record<string, number>;
  positionDistribution: Record<string, number>;
  skillLevelDistribution: Record<string, number>;
}

export default function TeamManagement() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [teamStats, setTeamStats] = useState<TeamStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<string>('all');
  const [selectedPosition, setSelectedPosition] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const ageGroups = ['all', 'U6', 'U8', 'U10', 'U12', 'U14', 'U16', 'U18', 'U20', 'U23', 'Senior'];
  const positions = ['all', 'Goalkeeper', 'Defender', 'Midfielder', 'Forward'];
  const statuses = ['all', 'Active', 'Inactive', 'Injured', 'Suspended'];

  useEffect(() => {
    fetchTeamData();
  }, []);

  useEffect(() => {
    fetchPlayers();
  }, [selectedAgeGroup, selectedPosition, selectedStatus]);

  const fetchTeamData = async () => {
    try {
      const [playersResponse, statsResponse] = await Promise.all([
        fetch('/api/players'),
        fetch('/api/players?statistics=true')
      ]);

      const playersData = await playersResponse.json();
      const statsData = await statsResponse.json();

      if (playersData.success) {
        setPlayers(playersData.data);
      }

      if (statsData.success) {
        setTeamStats(statsData.data);
      }
    } catch (err) {
      setError('Failed to fetch team data');
    } finally {
      setLoading(false);
    }
  };

  const fetchPlayers = async () => {
    try {
      const params = new URLSearchParams();
      
      if (selectedAgeGroup !== 'all') params.append('ageGroup', selectedAgeGroup);
      if (selectedPosition !== 'all') params.append('position', selectedPosition);
      if (selectedStatus !== 'all') params.append('status', selectedStatus);

      const response = await fetch(`/api/players?${params}`);
      const data = await response.json();

      if (data.success) {
        setPlayers(data.data);
      }
    } catch (err) {
      setError('Failed to fetch players');
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getPositionColor = (position: string) => {
    const colors: Record<string, string> = {
      'Goalkeeper': 'bg-yellow-100 text-yellow-800',
      'Defender': 'bg-blue-100 text-blue-800',
      'Midfielder': 'bg-green-100 text-green-800',
      'Forward': 'bg-red-100 text-red-800'
    };
    return colors[position] || 'bg-gray-100 text-gray-800';
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'Active': 'bg-green-100 text-green-800',
      'Inactive': 'bg-gray-100 text-gray-800',
      'Injured': 'bg-red-100 text-red-800',
      'Suspended': 'bg-orange-100 text-orange-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getSkillLevelColor = (level: string) => {
    const colors: Record<string, string> = {
      'Beginner': 'bg-gray-100 text-gray-800',
      'Intermediate': 'bg-blue-100 text-blue-800',
      'Advanced': 'bg-purple-100 text-purple-800',
      'Elite': 'bg-yellow-100 text-yellow-800'
    };
    return colors[level] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-64 bg-gray-200 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white p-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchTeamData}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Team Management</h1>
          <p className="text-gray-600">Manage players, track statistics, and monitor team performance</p>
        </div>

        {/* Team Statistics */}
        {teamStats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow p-6"
            >
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <span className="text-2xl">👥</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Players</p>
                  <p className="text-2xl font-bold text-gray-900">{teamStats.totalPlayers}</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-lg shadow p-6"
            >
              <div className="flex items-center">
                <div className="p-3 bg-green-100 rounded-lg">
                  <span className="text-2xl">✅</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Active Players</p>
                  <p className="text-2xl font-bold text-gray-900">{teamStats.activePlayers}</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-lg shadow p-6"
            >
              <div className="flex items-center">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <span className="text-2xl">📊</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Average Age</p>
                  <p className="text-2xl font-bold text-gray-900">{teamStats.averageAge}</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-lg shadow p-6"
            >
              <div className="flex items-center">
                <div className="p-3 bg-orange-100 rounded-lg">
                  <span className="text-2xl">🎯</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Most Common Position</p>
                  <p className="text-lg font-bold text-gray-900">
                    {Object.entries(teamStats.positionDistribution).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A'}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Filters</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Age Group</label>
              <select
                value={selectedAgeGroup}
                onChange={(e) => setSelectedAgeGroup(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                {ageGroups.map((group) => (
                  <option key={group} value={group}>
                    {group === 'all' ? 'All Age Groups' : group}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Position</label>
              <select
                value={selectedPosition}
                onChange={(e) => setSelectedPosition(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                {positions.map((position) => (
                  <option key={position} value={position}>
                    {position === 'all' ? 'All Positions' : position}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status === 'all' ? 'All Statuses' : status}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Players Grid */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Players ({players.length})
            </h2>
          </div>

          {players.length === 0 ? (
            <div className="p-12 text-center">
              <span className="text-4xl mb-4 block">🔍</span>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No players found</h3>
              <p className="text-gray-600">Try adjusting your filters to see more results.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
              {players.map((player, index) => (
                <motion.div
                  key={player._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                >
                  {/* Player Header */}
                  <div className="p-4 bg-gradient-to-r from-primary/10 to-secondary/10">
                    <div className="flex items-center space-x-4">
                      {player.profileImage ? (
                        <Image
                          src={player.profileImage}
                          alt={`${player.firstName} ${player.lastName}`}
                          width={48}
                          height={48}
                          className="rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                          <span className="text-lg font-bold text-gray-600">
                            {player.firstName[0]}{player.lastName[0]}
                          </span>
                        </div>
                      )}
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">
                          {player.firstName} {player.lastName}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {player.jerseyNumber ? `#${player.jerseyNumber} • ` : ''}
                          Age {player.age}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Player Details */}
                  <div className="p-4 space-y-3">
                    {/* Position and Status */}
                    <div className="flex items-center justify-between">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPositionColor(player.position)}`}>
                        {player.position}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(player.status)}`}>
                        {player.status}
                      </span>
                    </div>

                    {/* Skill Level */}
                    <div>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getSkillLevelColor(player.skillLevel)}`}>
                        {player.skillLevel}
                      </span>
                    </div>

                    {/* Statistics */}
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="bg-gray-50 rounded p-2">
                        <p className="text-gray-600">Matches</p>
                        <p className="font-semibold">{player.statistics.matchesPlayed}</p>
                      </div>
                      <div className="bg-gray-50 rounded p-2">
                        <p className="text-gray-600">Goals</p>
                        <p className="font-semibold">{player.statistics.goalsScored}</p>
                      </div>
                      <div className="bg-gray-50 rounded p-2">
                        <p className="text-gray-600">Assists</p>
                        <p className="font-semibold">{player.statistics.assists}</p>
                      </div>
                      <div className="bg-gray-50 rounded p-2">
                        <p className="text-gray-600">Cards</p>
                        <p className="font-semibold">{player.statistics.yellowCards + player.statistics.redCards}</p>
                      </div>
                    </div>

                    {/* Join Date */}
                    <div className="text-xs text-gray-500">
                      Joined: {formatDate(player.joinDate)}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
