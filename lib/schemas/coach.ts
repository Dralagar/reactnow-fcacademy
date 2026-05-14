import { z } from 'zod';

// Coaching qualification levels
export const QualificationEnum = z.enum([
  'None',
  'Basic',
  'Intermediate',
  'Advanced',
  'Professional',
  'UEFA C',
  'UEFA B',
  'UEFA A',
  'UEFA Pro'
]);

// Coach specialization areas
export const SpecializationEnum = z.enum([
  'Goalkeeping',
  'Defensive',
  'Midfield',
  'Attacking',
  'Fitness',
  'Technical',
  'Tactical',
  'Youth Development',
  'Mental Coaching',
  'General'
]);

// Employment status
export const EmploymentStatusEnum = z.enum([
  'Full-time',
  'Part-time',
  'Volunteer',
  'Contract',
  'Assistant'
]);

// Coach schema
export const CoachSchema = z.object({
  _id: z.string().optional(),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  dateOfBirth: z.string().refine((date) => {
    const parsedDate = new Date(date);
    return !isNaN(parsedDate.getTime());
  }, 'Invalid date format'),
  age: z.number().min(18, 'Coach must be at least 18 years old').max(70, 'Coach must be 70 or younger'),
  specialization: SpecializationEnum.array(),
  primarySpecialization: SpecializationEnum,
  qualifications: z.array(z.object({
    name: z.string(),
    level: QualificationEnum,
    institution: z.string(),
    year: z.number().min(1950).max(new Date().getFullYear()),
    certificateUrl: z.string().optional()
  })).default([]),
  experience: z.object({
    totalYears: z.number().min(0).default(0),
    youthCoaching: z.number().min(0).default(0),
    seniorCoaching: z.number().min(0).default(0),
    previousClubs: z.array(z.object({
      name: z.string(),
      position: z.string(),
      startDate: z.string(),
      endDate: z.string().optional(),
      achievements: z.array(z.string()).default([])
    })).default([])
  }).default({}),
  employmentStatus: EmploymentStatusEnum.default('Volunteer'),
  contactInfo: z.object({
    phone: z.string(),
    email: z.string().email(),
    address: z.string().optional(),
    emergencyContact: z.object({
      name: z.string(),
      relationship: z.string(),
      phone: z.string()
    }).optional()
  }),
  skills: z.object({
    technicalSkills: z.array(z.string()).default([]),
    softSkills: z.array(z.string()).default([]),
    languages: z.array(z.string()).default(['English']),
    certifications: z.array(z.string()).default([])
  }).default({}),
  availability: z.object({
    weekdays: z.boolean().default(true),
    weekends: z.boolean().default(false),
    evenings: z.boolean().default(false),
    maxHoursPerWeek: z.number().min(1).max(60).default(20)
  }).default({}),
  bio: z.string().optional(),
  philosophy: z.string().optional(),
  achievements: z.array(z.object({
    title: z.string(),
    description: z.string(),
    date: z.string(),
    type: z.enum(['Award', 'Recognition', 'Championship', 'Milestone'])
  })).default([]),
  profileImage: z.string().optional(),
  socialMedia: z.object({
    linkedin: z.string().optional(),
    twitter: z.string().optional(),
    instagram: z.string().optional(),
    facebook: z.string().optional()
  }).optional(),
  backgroundCheck: z.object({
    completed: z.boolean().default(false),
    date: z.string().optional(),
    certificateUrl: z.string().optional(),
    expiryDate: z.string().optional()
  }).default({}),
  salary: z.object({
    amount: z.number().optional(),
    currency: z.string().default('KES'),
    frequency: z.enum(['hourly', 'weekly', 'monthly', 'annually']).default('monthly')
  }).optional(),
  joinDate: z.string().default(new Date().toISOString()),
  status: z.enum(['Active', 'Inactive', 'On Leave', 'Suspended']).default('Active'),
  notes: z.string().optional(),
  createdAt: z.string().default(new Date().toISOString()),
  updatedAt: z.string().default(new Date().toISOString())
});

// Type inference
export type Coach = z.infer<typeof CoachSchema>;
export type Qualification = z.infer<typeof QualificationEnum>;
export type Specialization = z.infer<typeof SpecializationEnum>;
export type EmploymentStatus = z.infer<typeof EmploymentStatusEnum>;

// Utility functions
export const calculateCoachingAge = (dateOfBirth: string): number => {
  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
};

export const getQualificationLevel = (qualifications: Coach['qualifications']): Qualification => {
  if (qualifications.length === 0) return 'None';
  
  const levelHierarchy = {
    'None': 0,
    'Basic': 1,
    'Intermediate': 2,
    'Advanced': 3,
    'Professional': 4,
    'UEFA C': 5,
    'UEFA B': 6,
    'UEFA A': 7,
    'UEFA Pro': 8
  };
  
  const highestLevel = qualifications.reduce((highest, qual) => {
    const currentLevel = levelHierarchy[qual.level];
    const highestLevelNum = levelHierarchy[highest];
    return currentLevel > highestLevelNum ? qual.level : highest;
  }, 'None' as Qualification);
  
  return highestLevel;
};

export const isBackgroundCheckValid = (backgroundCheck: Coach['backgroundCheck']): boolean => {
  if (!backgroundCheck.completed || !backgroundCheck.expiryDate) return false;
  
  const expiryDate = new Date(backgroundCheck.expiryDate);
  const today = new Date();
  return expiryDate > today;
};

export const getCoachingExperience = (experience: Coach['experience']): string => {
  const years = experience.totalYears;
  if (years === 0) return 'No experience';
  if (years < 2) return 'Junior Coach';
  if (years < 5) return 'Assistant Coach';
  if (years < 10) return 'Senior Coach';
  if (years < 15) return 'Head Coach';
  return 'Master Coach';
};
