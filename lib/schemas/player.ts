import { z } from 'zod';

// Position enum for football players
export const PositionEnum = z.enum([
  'Goalkeeper',
  'Defender',
  'Center Back',
  'Full Back',
  'Wing Back',
  'Midfielder',
  'Defensive Midfielder',
  'Central Midfielder',
  'Attacking Midfielder',
  'Winger',
  'Forward',
  'Striker',
  'Center Forward'
]);

// Skill level enum
export const SkillLevelEnum = z.enum([
  'Beginner',
  'Intermediate',
  'Advanced',
  'Elite'
]);

// Status enum for players
export const PlayerStatusEnum = z.enum([
  'Active',
  'Inactive',
  'Injured',
  'Suspended',
  'Transferred'
]);

// Player schema
export const PlayerSchema = z.object({
  _id: z.string().optional(),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  dateOfBirth: z.string().refine((date) => {
    const parsedDate = new Date(date);
    return !isNaN(parsedDate.getTime());
  }, 'Invalid date format'),
  age: z.number().min(6, 'Player must be at least 6 years old').max(25, 'Player must be 25 or younger'),
  position: PositionEnum,
  secondaryPosition: PositionEnum.optional(),
  skillLevel: SkillLevelEnum,
  jerseyNumber: z.number().min(1).max(99).optional(),
  height: z.number().min(100, 'Height must be at least 100cm').max(220, 'Height must be less than 220cm').optional(),
  weight: z.number().min(30, 'Weight must be at least 30kg').max(120, 'Weight must be less than 120kg').optional(),
  dominantFoot: z.enum(['Left', 'Right', 'Both']).default('Right'),
  status: PlayerStatusEnum.default('Active'),
  joinDate: z.string().default(new Date().toISOString()),
  contactInfo: z.object({
    phone: z.string().optional(),
    email: z.string().email().optional(),
    parentName: z.string().optional(),
    parentPhone: z.string().optional(),
    parentEmail: z.string().email().optional(),
    address: z.string().optional()
  }).optional(),
  medicalInfo: z.object({
    allergies: z.array(z.string()).default([]),
    medications: z.array(z.string()).default([]),
    medicalConditions: z.array(z.string()).default([]),
    emergencyContact: z.object({
      name: z.string(),
      relationship: z.string(),
      phone: z.string()
    }).optional()
  }).optional(),
  statistics: z.object({
    matchesPlayed: z.number().default(0),
    goalsScored: z.number().default(0),
    assists: z.number().default(0),
    yellowCards: z.number().default(0),
    redCards: z.number().default(0),
    cleanSheets: z.number().default(0)
  }).default(() => ({
    matchesPlayed: 0,
    goalsScored: 0,
    assists: 0,
    yellowCards: 0,
    redCards: 0,
    cleanSheets: 0
  })),
  achievements: z.array(z.object({
    title: z.string(),
    description: z.string(),
    date: z.string(),
    type: z.enum(['Award', 'Recognition', 'Milestone'])
  })).default([]),
  profileImage: z.string().optional(),
  notes: z.string().optional(),
  createdAt: z.string().default(new Date().toISOString()),
  updatedAt: z.string().default(new Date().toISOString())
});

// Type inference
export type Player = z.infer<typeof PlayerSchema>;
export type Position = z.infer<typeof PositionEnum>;
export type SkillLevel = z.infer<typeof SkillLevelEnum>;
export type PlayerStatus = z.infer<typeof PlayerStatusEnum>;

// Utility functions
export const calculateAge = (dateOfBirth: string): number => {
  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
};

export const isEligibleForAgeGroup = (age: number, ageGroup: string): boolean => {
  const ageGroups: Record<string, { min: number; max: number }> = {
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
  
  const group = ageGroups[ageGroup];
  return group ? age >= group.min && age <= group.max : false;
};

export const getAgeGroup = (age: number): string => {
  if (age <= 5) return 'U6';
  if (age <= 7) return 'U8';
  if (age <= 9) return 'U10';
  if (age <= 11) return 'U12';
  if (age <= 13) return 'U14';
  if (age <= 15) return 'U16';
  if (age <= 17) return 'U18';
  if (age <= 19) return 'U20';
  if (age <= 22) return 'U23';
  return 'Senior';
};
