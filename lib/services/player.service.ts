import { createDatabaseService } from './database';
import { PlayerSchema, Player } from '@/lib/schemas/player';
import { getAgeGroup, isEligibleForAgeGroup } from '@/lib/schemas/player';

export class PlayerService {
  private db = createDatabaseService('players', PlayerSchema);

  // Player CRUD operations
  async createPlayer(playerData: Omit<Player, '_id' | 'createdAt' | 'updatedAt'>): Promise<Player> {
    // Calculate age from date of birth
    const age = this.calculateAge(playerData.dateOfBirth);
    
    // Validate age eligibility
    if (age < 6 || age > 25) {
      throw new Error('Player age must be between 6 and 25 years');
    }

    return await this.db.create({
      ...playerData,
      age,
      joinDate: new Date().toISOString()
    });
  }

  async getAllPlayers(): Promise<Player[]> {
    return await this.db.findAll();
  }

  async getPlayerById(id: string): Promise<Player | null> {
    return await this.db.findById(id);
  }

  async updatePlayer(id: string, updateData: Partial<Player>): Promise<Player | null> {
    // If date of birth is being updated, recalculate age
    if (updateData.dateOfBirth) {
      updateData.age = this.calculateAge(updateData.dateOfBirth);
    }

    return await this.db.update(id, updateData);
  }

  async deletePlayer(id: string): Promise<boolean> {
    return await this.db.delete(id);
  }

  // Player search and filtering
  async searchPlayers(query: string): Promise<Player[]> {
    return await this.db.search(query, ['firstName', 'lastName', 'position']);
  }

  async getPlayersByAge(age: number): Promise<Player[]> {
    return await this.db.find({ age });
  }

  async getPlayersByPosition(position: string): Promise<Player[]> {
    return await this.db.find({ position });
  }

  async getPlayersBySkillLevel(skillLevel: string): Promise<Player[]> {
    return await this.db.find({ skillLevel });
  }

  async getPlayersByStatus(status: string): Promise<Player[]> {
    return await this.db.find({ status });
  }

  async getPlayersByAgeGroup(ageGroup: string): Promise<Player[]> {
    const ageRanges: Record<string, { min: number; max: number }> = {
      'U6': { min: 4, max: 5 },
      'U8': { min: 6, max: 7 },
      'U10': { min: 8, max: 9 },
      'U12': { min: 10, max: 11 },
      'U14': { min: 12, max: 13 },
      'U16': { min: 14, max: 15 },
      'U18': { min: 16, max: 17 },
      'U20': { min: 18, max: 19 },
      'U23': { min: 20, max: 22 },
      'Senior': { min: 23, max: 25 }
    };

    const range = ageRanges[ageGroup];
    if (!range) return [];

    return await this.db.aggregate([
      {
        $addFields: {
          ageNum: { $toInt: '$age' }
        }
      },
      {
        $match: {
          ageNum: { $gte: range.min, $lte: range.max }
        }
      }
    ]);
  }

  // Player statistics and analytics
  async getPlayerStatistics(playerId: string): Promise<any> {
    const player = await this.getPlayerById(playerId);
    if (!player) throw new Error('Player not found');

    return {
      basic: {
        name: `${player.firstName} ${player.lastName}`,
        age: player.age,
        position: player.position,
        skillLevel: player.skillLevel,
        status: player.status,
        joinDate: player.joinDate
      },
      statistics: player.statistics,
      achievements: player.achievements,
      ageGroup: getAgeGroup(player.age)
    };
  }

  async getTeamStatistics(): Promise<{
    totalPlayers: number;
    activePlayers: number;
    averageAge: number;
    ageDistribution: Record<string, number>;
    positionDistribution: Record<string, number>;
    skillLevelDistribution: Record<string, number>;
  }> {
    const players = await this.getAllPlayers();
    const activePlayers = players.filter(p => p.status === 'Active');

    const averageAge = players.length > 0 
      ? Math.round(players.reduce((sum, p) => sum + p.age, 0) / players.length * 10) / 10
      : 0;

    const ageDistribution = players.reduce((acc, player) => {
      const ageGroup = getAgeGroup(player.age);
      acc[ageGroup] = (acc[ageGroup] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const positionDistribution = players.reduce((acc, player) => {
      acc[player.position] = (acc[player.position] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const skillLevelDistribution = players.reduce((acc, player) => {
      acc[player.skillLevel] = (acc[player.skillLevel] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      totalPlayers: players.length,
      activePlayers: activePlayers.length,
      averageAge,
      ageDistribution,
      positionDistribution,
      skillLevelDistribution
    };
  }

  // Player management operations
  async updatePlayerStatus(playerId: string, status: Player['status']): Promise<Player | null> {
    return await this.updatePlayer(playerId, { status });
  }

  async updatePlayerStatistics(playerId: string, statistics: Partial<Player['statistics']>): Promise<Player | null> {
    const player = await this.getPlayerById(playerId);
    if (!player) throw new Error('Player not found');

    const updatedStats = {
      ...player.statistics,
      ...statistics
    };

    return await this.updatePlayer(playerId, { statistics: updatedStats });
  }

  async addPlayerAchievement(playerId: string, achievement: Player['achievements'][0]): Promise<Player | null> {
    const player = await this.getPlayerById(playerId);
    if (!player) throw new Error('Player not found');

    const updatedAchievements = [...player.achievements, achievement];

    return await this.updatePlayer(playerId, { achievements: updatedAchievements });
  }

  async transferPlayer(playerId: string, transferData: {
    newTeam?: string;
    transferDate: string;
    notes?: string;
  }): Promise<Player | null> {
    const player = await this.getPlayerById(playerId);
    if (!player) throw new Error('Player not found');

    return await this.updatePlayer(playerId, {
      status: 'Transferred',
      notes: transferData.notes || `Transferred on ${transferData.date}`
    });
  }

  // Player health and medical
  async updateMedicalInfo(playerId: string, medicalInfo: Partial<Player['medicalInfo']>): Promise<Player | null> {
    const player = await this.getPlayerById(playerId);
    if (!player) throw new Error('Player not found');

    const updatedMedicalInfo = {
      ...player.medicalInfo,
      ...medicalInfo
    };

    return await this.updatePlayer(playerId, { medicalInfo: updatedMedicalInfo });
  }

  async getPlayersWithMedicalConditions(): Promise<Player[]> {
    return await this.db.aggregate([
      {
        $match: {
          'medicalInfo.medicalConditions': { $exists: true, $ne: [] }
        }
      }
    ]);
  }

  // Player contact management
  async updateContactInfo(playerId: string, contactInfo: Partial<Player['contactInfo']>): Promise<Player | null> {
    const player = await this.getPlayerById(playerId);
    if (!player) throw new Error('Player not found');

    const updatedContactInfo = {
      ...player.contactInfo,
      ...contactInfo
    };

    return await this.updatePlayer(playerId, { contactInfo: updatedContactInfo });
  }

  // Advanced queries
  async getPlayersWithFilters(filters: {
    ageGroup?: string;
    position?: string;
    skillLevel?: string;
    status?: string;
    minAge?: number;
    maxAge?: number;
  }): Promise<Player[]> {
    const query: any = {};

    if (filters.position) query.position = filters.position;
    if (filters.skillLevel) query.skillLevel = filters.skillLevel;
    if (filters.status) query.status = filters.status;

    if (filters.ageGroup) {
      const ageGroup = getAgeGroup(parseInt(filters.ageGroup.replace('U', '')) + 5);
      const range = this.getAgeRange(ageGroup);
      query.age = { $gte: range.min, $lte: range.max };
    } else if (filters.minAge || filters.maxAge) {
      query.age = {};
      if (filters.minAge) query.age.$gte = filters.minAge;
      if (filters.maxAge) query.age.$lte = filters.maxAge;
    }

    return await this.db.find(query);
  }

  async getPlayersWithUpcomingBirthdays(days: number = 30): Promise<Player[]> {
    const today = new Date();
    const futureDate = new Date(today.getTime() + (days * 24 * 60 * 60 * 1000));

    return await this.db.aggregate([
      {
        $addFields: {
          birthday: {
            $dateFromParts: {
              year: { $year: today },
              month: { $month: { $dateFromString: { dateString: '$dateOfBirth' } } },
              day: { $dayOfMonth: { $dateFromString: { dateString: '$dateOfBirth' } } }
            }
          }
        }
      },
      {
        $match: {
          birthday: { $gte: today, $lte: futureDate }
        }
      }
    ]);
  }

  // Utility methods
  private calculateAge(dateOfBirth: string): number {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  }

  private getAgeRange(ageGroup: string): { min: number; max: number } {
    const ageRanges: Record<string, { min: number; max: number }> = {
      'U6': { min: 4, max: 5 },
      'U8': { min: 6, max: 7 },
      'U10': { min: 8, max: 9 },
      'U12': { min: 10, max: 11 },
      'U14': { min: 12, max: 13 },
      'U16': { min: 14, max: 15 },
      'U18': { min: 16, max: 17 },
      'U20': { min: 18, max: 19 },
      'U23': { min: 20, max: 22 },
      'Senior': { min: 23, max: 25 }
    };
    
    return ageRanges[ageGroup] || { min: 0, max: 25 };
  }
}

// Export singleton instance
export const playerService = new PlayerService();
