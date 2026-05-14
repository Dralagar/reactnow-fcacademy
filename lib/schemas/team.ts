import { z } from 'zod';

// Team categories
export const TeamCategoryEnum = z.enum([
  'Academy',
  'Senior',
  'Youth',
  'Junior',
  'Development'
]);

// Age groups for teams
export const AgeGroupEnum = z.enum([
  'U6', 'U8', 'U10', 'U12', 'U14', 'U16', 'U18', 'U20', 'U23', 'Senior'
]);

// Team status
export const TeamStatusEnum = z.enum([
  'Active',
  'Inactive',
  'In Season',
  'Off Season',
  'Suspended'
]);

// Competition level
export const CompetitionLevelEnum = z.enum([
  'Recreational',
  'Development',
  'Competitive',
  'Elite',
  'Professional'
]);

// Team schema
export const TeamSchema = z.object({
  _id: z.string().optional(),
  name: z.string().min(1, 'Team name is required'),
  displayName: z.string().min(1, 'Display name is required'),
  category: TeamCategoryEnum,
  ageGroup: AgeGroupEnum,
  competitionLevel: CompetitionLevelEnum,
  status: TeamStatusEnum.default('Active'),
  
  // Team management
  headCoach: z.string().optional(), // Coach ID
  assistantCoaches: z.array(z.string()).default([]), // Coach IDs
  teamManager: z.string().optional(), // Coach ID
  captain: z.string().optional(), // Player ID
  
  // Team roster
  players: z.array(z.object({
    playerId: z.string(),
    jerseyNumber: z.number().min(1).max(99),
    position: z.string(),
    joinDate: z.string(),
    status: z.enum(['Active', 'Injured', 'Suspended', 'On Loan']).default('Active')
  })).default([]),
  
  // Team details
  description: z.string().optional(),
  philosophy: z.string().optional(),
  goals: z.array(z.string()).default([]),
  
  // Team colors and branding
  primaryColor: z.string().default('#10b981'),
  secondaryColor: z.string().default('#3b82f6'),
  accentColor: z.string().default('#ffffff'),
  teamLogo: z.string().optional(),
  teamPhoto: z.string().optional(),
  
  // Training schedule
  trainingSchedule: z.array(z.object({
    day: z.enum(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']),
    startTime: z.string(),
    endTime: z.string(),
    location: z.string(),
    focus: z.string().optional()
  })).default([]),
  
  // Home ground
  homeGround: z.object({
    name: z.string(),
    address: z.string(),
    coordinates: z.object({
      lat: z.number(),
      lng: z.number()
    }).optional()
  }).optional(),
  
  // Season information
  currentSeason: z.object({
    year: z.string(),
    league: z.string().optional(),
    division: z.string().optional(),
    startDate: z.string(),
    endDate: z.string()
  }).optional(),
  
  // Team statistics
  statistics: z.object({
    matchesPlayed: z.number().default(0),
    wins: z.number().default(0),
    draws: z.number().default(0),
    losses: z.number().default(0),
    goalsFor: z.number().default(0),
    goalsAgainst: z.number().default(0),
    points: z.number().default(0),
    cleanSheets: z.number().default(0)
  }).default(() => ({
    matchesPlayed: 0,
    wins: 0,
    draws: 0,
    losses: 0,
    goalsFor: 0,
    goalsAgainst: 0,
    points: 0,
    cleanSheets: 0
  })),
  
  // Achievements and trophies
  achievements: z.array(z.object({
    title: z.string(),
    competition: z.string(),
    year: z.number(),
    description: z.string().optional()
  })).default([]),
  
  // Contact information
  contactInfo: z.object({
    email: z.string().email().optional(),
    phone: z.string().optional(),
    socialMedia: z.object({
      facebook: z.string().optional(),
      twitter: z.string().optional(),
      instagram: z.string().optional()
    }).optional()
  }).optional(),
  
  // Requirements and fees
  requirements: z.object({
    minAge: z.number().optional(),
    maxAge: z.number().optional(),
    skillLevel: z.enum(['Beginner', 'Intermediate', 'Advanced', 'Elite']).optional(),
    tryoutRequired: z.boolean().default(false),
    monthlyFee: z.number().optional(),
    registrationFee: z.number().optional(),
    equipmentNeeded: z.array(z.string()).default([])
  }).optional(),
  
  // Parent/guardian information for youth teams
  parentInfo: z.object({
    parentInvolvement: z.boolean().default(false),
    parentMeetings: z.boolean().default(false),
    communicationMethod: z.enum(['Email', 'WhatsApp', 'SMS', 'App']).default('WhatsApp')
  }).optional(),
  
  createdAt: z.string().default(new Date().toISOString()),
  updatedAt: z.string().default(new Date().toISOString())
});

// Type inference
export type Team = z.infer<typeof TeamSchema>;
export type TeamCategory = z.infer<typeof TeamCategoryEnum>;
export type AgeGroup = z.infer<typeof AgeGroupEnum>;
export type TeamStatus = z.infer<typeof TeamStatusEnum>;
export type CompetitionLevel = z.infer<typeof CompetitionLevelEnum>;

// Utility functions
export const getTeamAgeRange = (ageGroup: AgeGroup): { min: number; max: number } => {
  const ageRanges: Record<AgeGroup, { min: number; max: number }> = {
    'U6': { min: 4, max: 5 },
    'U8': { min: 6, max: 7 },
    'U10': { min: 8, max: 9 },
    'U12': { min: 10, max: 11 },
    'U14': { min: 12, max: 13 },
    'U16': { min: 14, max: 15 },
    'U18': { min: 16, max: 17 },
    'U20': { min: 18, max: 19 },
    'U23': { min: 20, max: 22 },
    'Senior': { min: 23, max: 35 }
  };
  
  return ageRanges[ageGroup];
};

export const calculateTeamStats = (statistics: Team['statistics']): {
  winRate: number;
  goalsPerGame: number;
  goalsConcededPerGame: number;
  pointsPerGame: number;
} => {
  const totalMatches = statistics.matchesPlayed;
  
  if (totalMatches === 0) {
    return {
      winRate: 0,
      goalsPerGame: 0,
      goalsConcededPerGame: 0,
      pointsPerGame: 0
    };
  }
  
  return {
    winRate: Math.round((statistics.wins / totalMatches) * 100),
    goalsPerGame: Math.round((statistics.goalsFor / totalMatches) * 10) / 10,
    goalsConcededPerGame: Math.round((statistics.goalsAgainst / totalMatches) * 10) / 10,
    pointsPerGame: Math.round((statistics.points / totalMatches) * 10) / 10
  };
};

export const isPlayerEligibleForTeam = (playerAge: number, teamAgeGroup: AgeGroup): boolean => {
  const ageRange = getTeamAgeRange(teamAgeGroup);
  return playerAge >= ageRange.min && playerAge <= ageRange.max;
};

export const getTeamFullName = (team: Team): string => {
  return `${team.displayName} (${team.ageGroup})`;
};

export const getLeaguePosition = (points: number, teamsInLeague: number): string => {
  if (teamsInLeague === 0) return 'N/A';
  
  // This is a simplified calculation - in reality, you'd need to compare with other teams
  const position = Math.max(1, Math.ceil((teamsInLeague * (100 - points)) / 100));
  const suffix = position === 1 ? 'st' : position === 2 ? 'nd' : position === 3 ? 'rd' : 'th';
  return `${position}${suffix}`;
};
