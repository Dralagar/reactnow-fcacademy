import { z } from 'zod';

// Training session types
export const TrainingTypeEnum = z.enum([
  'Practice',
  'Match',
  'Fitness',
  'Technical',
  'Tactical',
  'Recovery',
  'Assessment',
  'Team Building'
]);

// Training intensity levels
export const IntensityEnum = z.enum([
  'Low',
  'Medium',
  'High',
  'Maximum'
]);

// Weather conditions
export const WeatherEnum = z.enum([
  'Sunny',
  'Cloudy',
  'Rainy',
  'Windy',
  'Cold',
  'Hot',
  'Indoor'
]);

// Training session schema
export const TrainingSchema = z.object({
  _id: z.string().optional(),
  
  // Basic session info
  title: z.string().min(1, 'Session title is required'),
  description: z.string().optional(),
  type: TrainingTypeEnum,
  
  // Schedule
  date: z.string(),
  startTime: z.string(),
  endTime: z.string(),
  duration: z.number().optional(), // in minutes
  
  // Location
  location: z.object({
    name: z.string(),
    address: z.string().optional(),
    coordinates: z.object({
      lat: z.number(),
      lng: z.number()
    }).optional(),
    isIndoor: z.boolean().default(false)
  }),
  
  // Weather
  weather: WeatherEnum.optional(),
  temperature: z.number().optional(),
  
  // Training details
  intensity: IntensityEnum.default('Medium'),
  focusAreas: z.array(z.string()).default([]),
  objectives: z.array(z.string()).default([]),
  
  // Coach information
  leadCoach: z.object({
    id: z.string(),
    name: z.string(),
    qualifications: z.array(z.string()).default([])
  }),
  assistantCoaches: z.array(z.object({
    id: z.string(),
    name: z.string(),
    role: z.string().optional()
  })).default([]),
  
  // Participants
  attendees: z.array(z.object({
    playerId: z.string(),
    playerName: z.string(),
    age: z.number(),
    position: z.string(),
    status: z.enum(['Present', 'Absent', 'Late', 'Excused']).default('Present'),
    arrivalTime: z.string().optional(),
    notes: z.string().optional()
  })).default([]),
  
  // Training activities
  activities: z.array(z.object({
    name: z.string(),
    description: z.string(),
    duration: z.number(), // in minutes
    type: z.enum(['Warm-up', 'Drill', 'Game', 'Cool-down', 'Theory']),
    equipment: z.array(z.string()).default([]),
    objectives: z.array(z.string()).default([]),
    coachNotes: z.string().optional()
  })).default([]),
  
  // Equipment and resources
  equipment: z.array(z.object({
    name: z.string(),
    quantity: z.number().min(1),
    condition: z.enum(['Excellent', 'Good', 'Fair', 'Poor']).default('Good'),
    notes: z.string().optional()
  })).default([]),
  
  // Player assessments
  assessments: z.array(z.object({
    playerId: z.string(),
    playerName: z.string(),
    technicalSkills: z.object({
      passing: z.number().min(1).max(10).default(5),
      shooting: z.number().min(1).max(10).default(5),
      dribbling: z.number().min(1).max(10).default(5),
      defending: z.number().min(1).max(10).default(5),
      overall: z.number().min(1).max(10).default(5)
    }).default({}),
    physicalAttributes: z.object({
      speed: z.number().min(1).max(10).default(5),
      stamina: z.number().min(1).max(10).default(5),
      strength: z.number().min(1).max(10).default(5),
      agility: z.number().min(1).max(10).default(5),
      overall: z.number().min(1).max(10).default(5)
    }).default({}),
    mentalAttributes: z.object({
      teamwork: z.number().min(1).max(10).default(5),
      communication: z.number().min(1).max(10).default(5),
      discipline: z.number().min(1).max(10).default(5),
      leadership: z.number().min(1).max(10).default(5),
      overall: z.number().min(1).max(10).default(5)
    }).default({}),
    attitude: z.object({
      effort: z.number().min(1).max(10).default(5),
      focus: z.number().min(1).max(10).default(5),
      coachability: z.number().min(1).max(10).default(5),
      sportsmanship: z.number().min(1).max(10).default(5),
      overall: z.number().min(1).max(10).default(5)
    }).default({}),
    notes: z.string().optional(),
    improvements: z.array(z.string()).default([]),
    strengths: z.array(z.string()).default([])
  })).default([]),
  
  // Session outcomes
  outcomes: z.object({
    objectivesMet: z.array(z.string()).default([]),
    objectivesNotMet: z.array(z.string()).default([]),
    keyLearnings: z.array(z.string()).default([]),
    challenges: z.array(z.string()).default([]),
    successes: z.array(z.string()).default([])
  }).default({}),
  
  // Health and safety
  injuries: z.array(z.object({
    playerId: z.string(),
    playerName: z.string(),
    type: z.string(),
    severity: z.enum(['Minor', 'Moderate', 'Major']),
    description: z.string(),
    actionTaken: z.string(),
    followUpRequired: z.boolean().default(false)
  })).default([]),
  
  incidents: z.array(z.object({
    description: z.string(),
    severity: z.enum(['Low', 'Medium', 'High']),
    actionTaken: z.string(),
    reportedTo: z.string().optional(),
    timestamp: z.string()
  })).default([]),
  
  // Media and documentation
  photos: z.array(z.object({
    url: z.string(),
    caption: z.string().optional(),
    timestamp: z.string()
  })).default([]),
  
  videos: z.array(z.object({
    url: z.string(),
    title: z.string(),
    duration: z.number().optional(),
    description: z.string().optional()
  })).default([]),
  
  // Feedback
  coachFeedback: z.string().optional(),
  playerFeedback: z.array(z.object({
    playerId: z.string(),
    playerName: z.string(),
    rating: z.number().min(1).max(5).default(3),
    comments: z.string().optional(),
    timestamp: z.string()
  })).default([]),
  
  // Follow-up actions
  followUpActions: z.array(z.object({
    action: z.string(),
    assignedTo: z.string(),
    dueDate: z.string(),
    status: z.enum(['Pending', 'In Progress', 'Completed']).default('Pending'),
    notes: z.string().optional()
  })).default([]),
  
  // Status
  status: z.enum(['Scheduled', 'In Progress', 'Completed', 'Cancelled']).default('Scheduled'),
  
  createdAt: z.string().default(new Date().toISOString()),
  updatedAt: z.string().default(new Date().toISOString())
});

// Training program schema (for longer-term training plans)
export const TrainingProgramSchema = z.object({
  _id: z.string().optional(),
  
  // Program details
  name: z.string().min(1, 'Program name is required'),
  description: z.string().optional(),
  duration: z.number().min(1), // in weeks
  startDate: z.string(),
  endDate: z.string(),
  
  // Target audience
  targetAgeGroup: z.string(),
  targetSkillLevel: z.enum(['Beginner', 'Intermediate', 'Advanced', 'Elite']),
  maxParticipants: z.number().min(1),
  
  // Program goals
  goals: z.array(z.string()).default([]),
  learningOutcomes: z.array(z.string()).default([]),
  
  // Curriculum
  weeklyPlans: z.array(z.object({
    week: z.number().min(1),
    theme: z.string(),
    objectives: z.array(z.string()).default([]),
    sessions: z.array(z.string()), // Session IDs
    assessments: z.array(z.string()).default([])
  })).default([]),
  
  // Resources
  requiredEquipment: z.array(z.string()).default([]),
  facilities: z.array(z.string()).default([]),
  materials: z.array(z.object({
    name: z.string(),
    type: z.enum(['Document', 'Video', 'Image', 'Link']),
    url: z.string(),
    description: z.string().optional()
  })).default([]),
  
  // Coaching staff
  headCoach: z.object({
    id: z.string(),
    name: z.string(),
    qualifications: z.array(z.string()).default([])
  }),
  assistantCoaches: z.array(z.object({
    id: z.string(),
    name: z.string(),
    role: z.string()
  })).default([]),
  
  // Enrollment
  enrolledPlayers: z.array(z.object({
    playerId: z.string(),
    playerName: z.string(),
    enrollmentDate: z.string(),
    status: z.enum(['Active', 'Completed', 'Dropped', 'Suspended']).default('Active'),
    attendanceRate: z.number().min(0).max(100).default(0)
  })).default([]),
  
  // Pricing
  fee: z.object({
    amount: z.number().min(0),
    currency: z.string().default('KES'),
    paymentSchedule: z.enum(['One-time', 'Weekly', 'Monthly']).default('One-time'),
    includes: z.array(z.string()).default([])
  }).optional(),
  
  // Schedule
  schedule: z.array(z.object({
    day: z.enum(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']),
    startTime: z.string(),
    endTime: z.string(),
    location: z.string()
  })).default([]),
  
  status: z.enum(['Draft', 'Published', 'Active', 'Completed', 'Cancelled']).default('Draft'),
  
  createdAt: z.string().default(new Date().toISOString()),
  updatedAt: z.string().default(new Date().toISOString())
});

// Type inference
export type Training = z.infer<typeof TrainingSchema>;
export type TrainingType = z.infer<typeof TrainingTypeEnum>;
export type Intensity = z.infer<typeof IntensityEnum>;
export type Weather = z.infer<typeof WeatherEnum>;
export type TrainingProgram = z.infer<typeof TrainingProgramSchema>;

// Utility functions
export const getTrainingDuration = (training: Training): string => {
  if (training.duration) {
    return `${training.duration} minutes`;
  }
  
  if (training.startTime && training.endTime) {
    const start = new Date(`2000-01-01 ${training.startTime}`);
    const end = new Date(`2000-01-01 ${training.endTime}`);
    const diff = end.getTime() - start.getTime();
    const minutes = diff / (1000 * 60);
    return `${minutes} minutes`;
  }
  
  return 'N/A';
};

export const getAttendanceRate = (training: Training): number => {
  const total = training.attendees.length;
  if (total === 0) return 0;
  
  const present = training.attendees.filter(a => a.status === 'Present').length;
  return Math.round((present / total) * 100);
};

export const getAverageRating = (training: Training): number => {
  const feedback = training.playerFeedback;
  if (feedback.length === 0) return 0;
  
  const total = feedback.reduce((sum, f) => sum + f.rating, 0);
  return Math.round((total / feedback.length) * 10) / 10;
};

export const getPlayerAssessmentAverage = (assessment: Training['assessments'][0]): {
  technical: number;
  physical: number;
  mental: number;
  attitude: number;
  overall: number;
} => {
  const technical = (
    assessment.technicalSkills.passing +
    assessment.technicalSkills.shooting +
    assessment.technicalSkills.dribbling +
    assessment.technicalSkills.defending
  ) / 4;
  
  const physical = (
    assessment.physicalAttributes.speed +
    assessment.physicalAttributes.stamina +
    assessment.physicalAttributes.strength +
    assessment.physicalAttributes.agility
  ) / 4;
  
  const mental = (
    assessment.mentalAttributes.teamwork +
    assessment.mentalAttributes.communication +
    assessment.mentalAttributes.discipline +
    assessment.mentalAttributes.leadership
  ) / 4;
  
  const attitude = (
    assessment.attitude.effort +
    assessment.attitude.focus +
    assessment.attitude.coachability +
    assessment.attitude.sportsmanship
  ) / 4;
  
  const overall = (technical + physical + mental + attitude) / 4;
  
  return {
    technical: Math.round(technical * 10) / 10,
    physical: Math.round(physical * 10) / 10,
    mental: Math.round(mental * 10) / 10,
    attitude: Math.round(attitude * 10) / 10,
    overall: Math.round(overall * 10) / 10
  };
};

export const getUpcomingTrainings = (trainings: Training[], limit: number = 5): Training[] => {
  return trainings
    .filter(t => t.status === 'Scheduled' && new Date(t.date) > new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, limit);
};

export const getTrainingHistory = (trainings: Training[], playerId: string): Training[] => {
  return trainings
    .filter(t => t.attendees.some(a => a.playerId === playerId))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const getPlayerProgress = (trainings: Training[], playerId: string): {
  totalSessions: number;
  attendanceRate: number;
  averageRating: number;
  skillProgress: {
    technical: number[];
    physical: number[];
    mental: number[];
    attitude: number[];
  };
} => {
  const playerTrainings = getTrainingHistory(trainings, playerId);
  const totalSessions = playerTrainings.length;
  
  const attendedSessions = playerTrainings.filter(t => 
    t.attendees.some(a => a.playerId === playerId && a.status === 'Present')
  );
  
  const attendanceRate = totalSessions > 0 ? Math.round((attendedSessions.length / totalSessions) * 100) : 0;
  
  const allRatings = attendedSessions.flatMap(t => t.playerFeedback.filter(f => f.playerId === playerId));
  const averageRating = allRatings.length > 0 
    ? Math.round((allRatings.reduce((sum, f) => sum + f.rating, 0) / allRatings.length) * 10) / 10
    : 0;
  
  const skillProgress = {
    technical: [] as number[],
    physical: [] as number[],
    mental: [] as number[],
    attitude: [] as number[]
  };
  
  attendedSessions.forEach(training => {
    const assessment = training.assessments.find(a => a.playerId === playerId);
    if (assessment) {
      const averages = getPlayerAssessmentAverage(assessment);
      skillProgress.technical.push(averages.technical);
      skillProgress.physical.push(averages.physical);
      skillProgress.mental.push(averages.mental);
      skillProgress.attitude.push(averages.attitude);
    }
  });
  
  return {
    totalSessions,
    attendanceRate,
    averageRating,
    skillProgress
  };
};
