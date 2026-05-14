// Player Database for React Now FC Academy
// Comprehensive player data with profiles, stats, and achievements

export interface Player {
  id: string;
  name: string;
  age: number;
  position: string;
  jerseyNumber: number;
  joinDate: string;
  bio: string;
  image: string;
  stats: {
    goals: number;
    assists: number;
    matches: number;
    attendance: string;
    improvement: string;
  };
  achievements: string[];
  background: {
    hometown: string;
    school: string;
    familyBackground: string;
    aspirations: string;
  };
  skills: string[];
  personality: {
    strengths: string[];
    bestMemory: string;
    favoritePart: string;
  };
}

// Comprehensive player database
export const players: Player[] = [
  {
    id: "player-001",
    name: "Didi",
    age: 12,
    position: "Midfielder",
    jerseyNumber: 10,
    joinDate: "2024-01-15",
    bio: "Natural leader with exceptional vision and passing ability. Improved school attendance from 70% to 95% and became team captain.",
    image: "/images/React24.jpeg",
    stats: {
      goals: 8,
      assists: 12,
      matches: 15,
      attendance: "95%",
      improvement: "Leadership"
    },
    achievements: [
      "Player of the Week - 3 times",
      "Team Captain",
      "Most Improved Player",
      "Best Attendance Award"
    ],
    background: {
      hometown: "Nairobi, Kenya",
      school: "St. Joseph's Primary School",
      familyBackground: "From a refugee family, youngest of 4 children",
      aspirations: "Dreams of becoming a professional footballer and software engineer"
    },
    skills: ["Passing", "Vision", "Leadership", "Game Intelligence"],
    personality: {
      strengths: ["Natural leader", "Encourages teammates", "Academically focused"],
      bestMemory: "Scoring the winning goal in our first tournament",
      favoritePart: "Helping younger players learn new skills"
    }
  },
  {
    id: "player-002",
    name: "Dingo",
    age: 6,
    position: "Forward",
    jerseyNumber: 7,
    joinDate: "2024-02-01",
    bio: "Youngest team member with incredible speed and finishing ability. Top scorer with 8 goals and showing exceptional leadership potential.",
    image: "/images/React23.jpeg",
    stats: {
      goals: 8,
      assists: 3,
      matches: 12,
      attendance: "100%",
      improvement: "Confidence"
    },
    achievements: [
      "Top Scorer U12",
      "Rising Star Award",
      "Perfect Attendance",
      "Fastest Player Award"
    ],
    background: {
      hometown: "Kibera, Nairobi",
      school: "Kibera Primary School",
      familyBackground: "From a low-income family, loves football since age 3",
      aspirations: "Wants to play for Kenya national team"
    },
    skills: ["Speed", "Finishing", "Dribbling", "Agility"],
    personality: {
      strengths: ["Never gives up", "Always smiling", "Loves to learn"],
      bestMemory: "Scoring his first goal in a match",
      favoritePart: "Running fast and scoring goals"
    }
  },
  {
    id: "player-003",
    name: "Arietho",
    age: 11,
    position: "Defender",
    jerseyNumber: 4,
    joinDate: "2024-01-20",
    bio: "Rock-solid defender with amazing tackling ability. Scored 2 crucial goals in final minutes to secure comeback victory.",
    image: "/images/React22.jpeg",
    stats: {
      goals: 2,
      assists: 1,
      matches: 14,
      attendance: "92%",
      improvement: "Resilience"
    },
    achievements: [
      "Match Hero vs Eagles",
      "Best Defender Award",
      "Most Reliable Player",
      "Team Spirit Award"
    ],
    background: {
      hometown: "Eastlands, Nairobi",
      school: "Eastlands Primary School",
      familyBackground: "From a single-parent household, very responsible",
      aspirations: "Wants to become a coach and help other kids"
    },
    skills: ["Tackling", "Positioning", "Strength", "Leadership"],
    personality: {
      strengths: ["Very reliable", "Protective of teammates", "Hardworking"],
      bestMemory: "Scoring 2 goals to win the championship match",
      favoritePart: "Protecting the goal and celebrating with teammates"
    }
  },
  {
    id: "player-004",
    name: "Sammy",
    age: 10,
    position: "Goalkeeper",
    jerseyNumber: 1,
    joinDate: "2024-01-10",
    bio: "Fearless goalkeeper with amazing reflexes. Made crucial saves in penalty shootout to win tournament.",
    image: "/images/React21.jpeg",
    stats: {
      goals: 0,
      assists: 2,
      matches: 13,
      attendance: "96%",
      improvement: "Courage"
    },
    achievements: [
      "Penalty Hero",
      "Clean Sheet Award - 4 times",
      "Best Save of the Season",
      "Most Courageous Player"
    ],
    background: {
      hometown: "Mathare, Nairobi",
      school: "Mathare Primary School",
      familyBackground: "From a large family, learned to be brave early",
      aspirations: "Dreams of playing for a big European club"
    },
    skills: ["Reflexes", "Shot Stopping", "Communication", "Courage"],
    personality: {
      strengths: ["Brave", "Focused", "Good communicator", "Team player"],
      bestMemory: "Saving the final penalty in the tournament",
      favoritePart: "Making amazing saves and hearing the crowd cheer"
    }
  },
  {
    id: "player-005",
    name: "Grace",
    age: 9,
    position: "Midfielder",
    jerseyNumber: 8,
    joinDate: "2024-02-15",
    bio: "Creative midfielder with excellent ball control. First girl to join the team and has inspired many others.",
    image: "/images/React20.jpeg",
    stats: {
      goals: 4,
      assists: 6,
      matches: 11,
      attendance: "100%",
      improvement: "Creativity"
    },
    achievements: [
      "Breakthrough Player Award",
      "Best Dribbler",
      "Inspiration Award",
      "Perfect Attendance"
    ],
    background: {
      hometown: "Kawangware, Nairobi",
      school: "Kawangware Primary School",
      familyBackground: "Supportive family that encourages her football dreams",
      aspirations: "Wants to prove girls can play football just as well as boys"
    },
    skills: ["Dribbling", "Creativity", "Passing", "Agility"],
    personality: {
      strengths: ["Creative", "Determined", "Inspires others", "Hardworking"],
      bestMemory: "Scoring her first goal and everyone cheering",
      favoritePart: "Showing that girls can play football too"
    }
  },
  {
    id: "player-006",
    name: "Victor",
    age: 12,
    position: "Forward",
    jerseyNumber: 9,
    joinDate: "2024-01-05",
    bio: "Powerful striker with great heading ability. Team's vice-captain and leading goal scorer.",
    image: "/images/React2.jpeg",
    stats: {
      goals: 12,
      assists: 4,
      matches: 15,
      attendance: "93%",
      improvement: "Teamwork"
    },
    achievements: [
      "Top Scorer",
      "Vice-Captain",
      "Best Header Award",
      "Team Player Award"
    ],
    background: {
      hometown: "Dagoretti, Nairobi",
      school: "Dagoretti Primary School",
      familyBackground: "From a sports-loving family, older brother also plays football",
      aspirations: "Wants to play professionally and help his family"
    },
    skills: ["Heading", "Shooting", "Strength", "Teamwork"],
    personality: {
      strengths: ["Supportive", "Strong", "Good team player", "Motivated"],
      bestMemory: "Scoring a hat-trick in the championship final",
      favoritePart: "Scoring goals and celebrating with the team"
    }
  },
  {
    id: "player-007",
    name: "Brian",
    age: 8,
    position: "Defender",
    jerseyNumber: 5,
    joinDate: "2024-03-01",
    bio: "Young defender with great potential. Very disciplined and always follows instructions.",
    image: "/images/React19.jpeg",
    stats: {
      goals: 1,
      assists: 0,
      matches: 8,
      attendance: "100%",
      improvement: "Discipline"
    },
    achievements: [
      "Most Disciplined Player",
      "Best Newcomer",
      "Perfect Attendance",
      "Most Improved"
    ],
    background: {
      hometown: "Kibera, Nairobi",
      school: "Kibera Primary School",
      familyBackground: "From a supportive family that values education",
      aspirations: "Wants to become a professional footballer and doctor"
    },
    skills: ["Discipline", "Tackling", "Learning Ability", "Focus"],
    personality: {
      strengths: ["Disciplined", "Good listener", "Eager to learn", "Respectful"],
      bestMemory: "Making his first tackle in a real match",
      favoritePart: "Learning new skills from the coach"
    }
  },
  {
    id: "player-008",
    name: "Angel",
    age: 7,
    position: "Midfielder",
    jerseyNumber: 11,
    joinDate: "2024-03-10",
    bio: "Youngest midfielder with amazing energy. Always smiling and brings joy to the team.",
    image: "/images/React18.jpeg",
    stats: {
      goals: 2,
      assists: 3,
      matches: 7,
      attendance: "100%",
      improvement: "Confidence"
    },
    achievements: [
      "Most Energetic Player",
      "Best Smile Award",
      "Perfect Attendance",
      "Team Spirit Award"
    ],
    background: {
      hometown: "Kawangware, Nairobi",
      school: "Kawangware Primary School",
      familyBackground: "From a loving family that encourages her to play",
      aspirations: "Wants to have fun and make friends through football"
    },
    skills: ["Energy", "Enthusiasm", "Team Spirit", "Basic Skills"],
    personality: {
      strengths: ["Always happy", "Encourages others", "Never gives up", "Loves learning"],
      bestMemory: "Making her first friend on the team",
      favoritePart: "Playing with her friends and having fun"
    }
  }
];

// Helper functions
export const getPlayerById = (id: string): Player | undefined => {
  return players.find(player => player.id === id);
};

export const getPlayersByPosition = (position: string): Player[] => {
  return players.filter(player => player.position.toLowerCase() === position.toLowerCase());
};

export const getTopScorers = (limit: number = 5): Player[] => {
  return [...players].sort((a, b) => b.stats.goals - a.stats.goals).slice(0, limit);
};

export const getPlayersByAge = (minAge: number, maxAge: number): Player[] => {
  return players.filter(player => player.age >= minAge && player.age <= maxAge);
};

export const searchPlayers = (query: string): Player[] => {
  const lowercaseQuery = query.toLowerCase();
  return players.filter(player => 
    player.name.toLowerCase().includes(lowercaseQuery) ||
    player.position.toLowerCase().includes(lowercaseQuery) ||
    player.background.hometown.toLowerCase().includes(lowercaseQuery)
  );
};

// Statistics
export const getTeamStats = () => {
  const totalGoals = players.reduce((sum, player) => sum + player.stats.goals, 0);
  const totalAssists = players.reduce((sum, player) => sum + player.stats.assists, 0);
  const totalMatches = Math.max(...players.map(player => player.stats.matches));
  const averageAttendance = players.reduce((sum, player) => {
    const attendance = parseInt(player.stats.attendance.replace('%', ''));
    return sum + attendance;
  }, 0) / players.length;

  return {
    totalPlayers: players.length,
    totalGoals,
    totalAssists,
    totalMatches,
    averageAttendance: Math.round(averageAttendance) + '%',
    ageRange: {
      youngest: Math.min(...players.map(p => p.age)),
      oldest: Math.max(...players.map(p => p.age))
    }
  };
};

export default players;
