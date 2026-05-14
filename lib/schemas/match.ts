import { z } from 'zod';

// Match status
export const MatchStatusEnum = z.enum([
  'Scheduled',
  'Live',
  'Completed',
  'Postponed',
  'Cancelled',
  'Abandoned'
]);

// Match type
export const MatchTypeEnum = z.enum([
  'League',
  'Cup',
  'Friendly',
  'Tournament',
  'Training',
  'Playoff',
  'Final'
]);

// Result type
export const ResultEnum = z.enum([
  'Win',
  'Loss',
  'Draw',
  'Pending'
]);

// Match schema
export const MatchSchema = z.object({
  _id: z.string().optional(),
  
  // Basic match info
  title: z.string().optional(),
  matchType: MatchTypeEnum,
  competition: z.string().optional(),
  season: z.string().optional(),
  
  // Teams
  homeTeam: z.object({
    id: z.string(),
    name: z.string(),
    logo: z.string().optional(),
    score: z.number().default(0)
  }),
  
  awayTeam: z.object({
    id: z.string(),
    name: z.string(),
    logo: z.string().optional(),
    score: z.number().default(0)
  }),
  
  // Date and time
  date: z.string(),
  time: z.string(),
  timezone: z.string().default('Africa/Nairobi'),
  
  // Venue
  venue: z.object({
    name: z.string(),
    address: z.string(),
    city: z.string(),
    coordinates: z.object({
      lat: z.number(),
      lng: z.number()
    }).optional()
  }),
  
  // Status and result
  status: MatchStatusEnum.default('Scheduled'),
  result: ResultEnum.default('Pending'),
  
  // Match details
  duration: z.number().optional(), // in minutes
  attendance: z.number().optional(),
  referee: z.object({
    name: z.string(),
    license: z.string().optional()
  }).optional(),
  
  // Weather conditions
  weather: z.object({
    temperature: z.number().optional(),
    condition: z.string().optional(),
    humidity: z.number().optional()
  }).optional(),
  
  // Lineups
  homeLineup: z.array(z.object({
    playerId: z.string(),
    playerName: z.string(),
    jerseyNumber: z.number(),
    position: z.string(),
    captain: z.boolean().default(false),
    substituted: z.boolean().default(false),
    substitutionTime: z.number().optional(),
    goals: z.number().default(0),
    assists: z.number().default(0),
    yellowCards: z.number().default(0),
    redCards: z.number().default(0)
  })).default([]),
  
  awayLineup: z.array(z.object({
    playerId: z.string(),
    playerName: z.string(),
    jerseyNumber: z.number(),
    position: z.string(),
    captain: z.boolean().default(false),
    substituted: z.boolean().default(false),
    substitutionTime: z.number().optional(),
    goals: z.number().default(0),
    assists: z.number().default(0),
    yellowCards: z.number().default(0),
    redCards: z.number().default(0)
  })).default([]),
  
  // Substitutions
  substitutions: z.array(z.object({
    team: z.enum(['home', 'away']),
    playerOut: z.object({
      id: z.string(),
      name: z.string(),
      jerseyNumber: z.number()
    }),
    playerIn: z.object({
      id: z.string(),
      name: z.string(),
      jerseyNumber: z.number()
    }),
    minute: z.number(),
    reason: z.enum(['Tactical', 'Injury', 'Fatigue', 'Other']).default('Tactical')
  })).default([]),
  
  // Goals
  goals: z.array(z.object({
    team: z.enum(['home', 'away']),
    playerId: z.string(),
    playerName: z.string(),
    minute: z.number(),
    type: z.enum(['Normal', 'Penalty', 'Free Kick', 'Header', 'Own Goal', 'Volley']),
    assisted: z.boolean().default(false),
    assistPlayerId: z.string().optional(),
    assistPlayerName: z.string().optional()
  })).default([]),
  
  // Cards
  cards: z.array(z.object({
    team: z.enum(['home', 'away']),
    playerId: z.string(),
    playerName: z.string(),
    jerseyNumber: z.number(),
    minute: z.number(),
    type: z.enum(['Yellow', 'Red', 'Second Yellow']),
    reason: z.string().optional()
  })).default([]),
  
  // Match events
  events: z.array(z.object({
    minute: z.number(),
    type: z.enum(['Goal', 'Card', 'Substitution', 'Injury', 'VAR', 'Penalty', 'Kickoff', 'Halftime', 'Fulltime']),
    description: z.string(),
    team: z.enum(['home', 'away']).optional(),
    playerId: z.string().optional(),
    playerName: z.string().optional()
  })).default([]),
  
  // Statistics
  statistics: z.object({
    possession: z.object({
      home: z.number().default(0),
      away: z.number().default(0)
    }),
    shots: z.object({
      home: z.object({
        total: z.number().default(0),
        onTarget: z.number().default(0),
        offTarget: z.number().default(0),
        blocked: z.number().default(0)
      }),
      away: z.object({
        total: z.number().default(0),
        onTarget: z.number().default(0),
        offTarget: z.number().default(0),
        blocked: z.number().default(0)
      })
    }),
    corners: z.object({
      home: z.number().default(0),
      away: z.number().default(0)
    }),
    fouls: z.object({
      home: z.number().default(0),
      away: z.number().default(0)
    }),
    offsides: z.object({
      home: z.number().default(0),
      away: z.number().default(0)
    })
  }).default(() => ({
    possession: { home: 0, away: 0 },
    shots: { 
      home: { total: 0, onTarget: 0, offTarget: 0, blocked: 0 },
      away: { total: 0, onTarget: 0, offTarget: 0, blocked: 0 }
    },
    corners: { home: 0, away: 0 },
    fouls: { home: 0, away: 0 },
    offsides: { home: 0, away: 0 }
  })),
  
  // Media
  highlights: z.array(z.object({
    url: z.string(),
    title: z.string(),
    duration: z.number().optional(),
    type: z.enum(['video', 'image'])
  })).default([]),
  
  matchReport: z.string().optional(),
  manOfTheMatch: z.object({
    playerId: z.string(),
    playerName: z.string(),
    team: z.enum(['home', 'away']),
    reason: z.string().optional()
  }).optional(),
  
  // Notes and comments
  notes: z.string().optional(),
  
  createdAt: z.string().default(new Date().toISOString()),
  updatedAt: z.string().default(new Date().toISOString())
});

// Type inference
export type Match = z.infer<typeof MatchSchema>;
export type MatchStatus = z.infer<typeof MatchStatusEnum>;
export type MatchType = z.infer<typeof MatchTypeEnum>;
export type Result = z.infer<typeof ResultEnum>;

// Utility functions
export const getMatchResult = (match: Match): Result => {
  if (match.status !== 'Completed') return 'Pending';
  
  const homeScore = match.homeTeam.score;
  const awayScore = match.awayTeam.score;
  
  if (homeScore > awayScore) return 'Win';
  if (homeScore < awayScore) return 'Loss';
  return 'Draw';
};

export const isMatchLive = (match: Match): boolean => {
  return match.status === 'Live';
};

export const isMatchUpcoming = (match: Match): boolean => {
  return match.status === 'Scheduled' && new Date(match.date) > new Date();
};

export const getMatchDuration = (match: Match): string => {
  if (!match.duration) return 'N/A';
  return `${match.duration} minutes`;
};

export const getMatchScore = (match: Match): string => {
  return `${match.homeTeam.score} - ${match.awayTeam.score}`;
};

export const getMatchUrl = (match: Match): string => {
  return `/matches/${match._id}`;
};

export const getUpcomingMatches = (matches: Match[], limit: number = 5): Match[] => {
  return matches
    .filter(match => isMatchUpcoming(match))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, limit);
};

export const getRecentMatches = (matches: Match[], limit: number = 5): Match[] => {
  return matches
    .filter(match => match.status === 'Completed')
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
};

export const getTeamMatches = (matches: Match[], teamId: string): Match[] => {
  return matches.filter(match => 
    match.homeTeam.id === teamId || match.awayTeam.id === teamId
  );
};

export const getTeamForm = (matches: Match[], teamId: string, lastMatches: number = 5): string[] => {
  const teamMatches = getTeamMatches(matches, teamId)
    .filter(match => match.status === 'Completed')
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, lastMatches);
  
  return teamMatches.map(match => {
    const isHome = match.homeTeam.id === teamId;
    const homeScore = match.homeTeam.score;
    const awayScore = match.awayTeam.score;
    
    if (isHome) {
      if (homeScore > awayScore) return 'W';
      if (homeScore < awayScore) return 'L';
      return 'D';
    } else {
      if (awayScore > homeScore) return 'W';
      if (awayScore < homeScore) return 'L';
      return 'D';
    }
  });
};

export const calculateTeamStatistics = (matches: Match[], teamId: string): {
  played: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  points: number;
  form: string[];
} => {
  const teamMatches = getTeamMatches(matches, teamId).filter(match => match.status === 'Completed');
  
  let wins = 0, draws = 0, losses = 0;
  let goalsFor = 0, goalsAgainst = 0;
  
  teamMatches.forEach(match => {
    const isHome = match.homeTeam.id === teamId;
    const homeScore = match.homeTeam.score;
    const awayScore = match.awayTeam.score;
    
    if (isHome) {
      goalsFor += homeScore;
      goalsAgainst += awayScore;
      if (homeScore > awayScore) wins++;
      else if (homeScore < awayScore) losses++;
      else draws++;
    } else {
      goalsFor += awayScore;
      goalsAgainst += homeScore;
      if (awayScore > homeScore) wins++;
      else if (awayScore < homeScore) losses++;
      else draws++;
    }
  });
  
  const points = wins * 3 + draws;
  const form = getTeamForm(matches, teamId);
  
  return {
    played: teamMatches.length,
    wins,
    draws,
    losses,
    goalsFor,
    goalsAgainst,
    points,
    form
  };
};
