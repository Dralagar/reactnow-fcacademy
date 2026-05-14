import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import ProfessionalGrid, { 
  StatsGrid, 
  FeatureGrid, 
  HeroGrid, 
  MasonryGrid, 
  TimelineGrid, 
  ShowcaseGrid,
  ProfessionalCard 
} from "@/components/ProfessionalGrid";
import { Trophy, Users, Target, BookOpen, Heart, Zap, Calendar, Star } from "lucide-react";

// SEO metadata
export const metadata: Metadata = {
  title: "Grid Layout Showcase | React Now FC Academy",
  description: "Professional grid layout demonstrations for React Now FC Academy website.",
  keywords: ["grid layouts", "web design", "professional components", "React Now FC"],
};

export default function GridShowcasePage() {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Grid Showcase", href: "/grid-showcase" }
  ];

  const stats = [
    { value: "15+", label: "Youth Players", description: "Active participants" },
    { value: "5", label: "Countries", description: "Diverse backgrounds" },
    { value: "100%", label: "Free Access", description: "No cost barrier" },
    { value: "95%", label: "Satisfaction", description: "Parent approval" },
  ];

  const features = [
    {
      icon: <Trophy className="h-6 w-6" />,
      title: "Professional Training",
      description: "Expert coaching with structured development pathways for young athletes.",
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Community Focus",
      description: "Building strong relationships and teamwork through inclusive programs.",
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: "Goal Achievement",
      description: "Setting and reaching personal and team milestones with proper guidance.",
    },
    {
      icon: <BookOpen className="h-6 w-6" />,
      title: "Educational Support",
      description: "Academic mentoring and digital literacy programs alongside sports.",
    },
    {
      icon: <Heart className="h-6 w-6" />,
      title: "Character Building",
      description: "Developing discipline, leadership, and emotional intelligence.",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Energy & Passion",
      description: "Creating an environment where young players thrive and excel.",
    },
  ];

  const timelineEvents = [
    {
      id: "1",
      date: "2024",
      title: "Academy Founded",
      description: "React Now FC Academy established with vision for accessible youth development.",
    },
    {
      id: "2", 
      date: "2024 Q2",
      title: "First Training Session",
      description: "Initial cohort of 15 players began structured football training programs.",
    },
    {
      id: "3",
      date: "2024 Q3", 
      title: "Community Partnership",
      description: "Formalized partnerships with local schools and community organizations.",
    },
    {
      id: "4",
      date: "2024 Q4",
      title: "First Tournament",
      description: "Academy teams participated in their first competitive matches.",
    },
  ];

  const showcaseItems = [
    {
      id: "1",
      title: "Match Day Victory",
      subtitle: "Under 12 Championship",
      image: "/images/React1.jpeg",
    },
    {
      id: "2", 
      title: "Training Session",
      subtitle: "Skills Development",
      image: "/images/React2.jpeg",
    },
    {
      id: "3",
      title: "Team Building",
      subtitle: "Community Event",
      image: "/images/React3.jpeg",
    },
    {
      id: "4",
      title: "Award Ceremony",
      subtitle: "Player Recognition",
      image: "/images/React4.jpeg",
    },
    {
      id: "5",
      title: "Coach Workshop",
      subtitle: "Professional Development",
      image: "/images/React5.jpeg",
    },
    {
      id: "6",
      title: "Family Day",
      subtitle: "Community Celebration",
      image: "/images/React6.jpeg",
    },
  ];

  const masonryItems = [
    {
      id: "1",
      content: (
        <ProfessionalCard variant="featured">
          <div className="p-6">
            <h3 className="text-xl font-bold mb-2">Featured Achievement</h3>
            <p className="text-text-secondary">Our under-12 team won their first tournament with outstanding teamwork and sportsmanship.</p>
          </div>
        </ProfessionalCard>
      ),
      size: "large" as const,
    },
    {
      id: "2",
      content: (
        <ProfessionalCard variant="default">
          <div className="p-4">
            <Calendar className="h-8 w-8 text-primary mb-2" />
            <h4 className="font-semibold">Upcoming Match</h4>
            <p className="text-sm text-text-secondary">Saturday vs. Eagles FC</p>
          </div>
        </ProfessionalCard>
      ),
      size: "small" as const,
    },
    {
      id: "3",
      content: (
        <ProfessionalCard variant="default">
          <div className="p-4">
            <Star className="h-8 w-8 text-primary mb-2" />
            <h4 className="font-semibold">Player of Week</h4>
            <p className="text-sm text-text-secondary">Didi - Midfielder</p>
          </div>
        </ProfessionalCard>
      ),
      size: "small" as const,
    },
    {
      id: "4",
      content: (
        <ProfessionalCard variant="bordered">
          <div className="p-6">
            <h3 className="text-lg font-bold mb-2">Training Schedule</h3>
            <ul className="text-sm text-text-secondary space-y-1">
              <li>• Monday: 4-6 PM</li>
              <li>• Wednesday: 4-6 PM</li>
              <li>• Saturday: 9-11 AM</li>
            </ul>
          </div>
        </ProfessionalCard>
      ),
      size: "medium" as const,
    },
  ];

  return (
    <main className="flex min-h-screen flex-col bg-white">
      {/* Hero Section */}
      <div className="relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary to-secondary min-h-[60vh]">
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 text-center px-4 py-16">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Professional Grid Layouts
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Showcase of responsive, accessible, and beautiful grid layouts for React Now FC Academy
          </p>
        </div>
      </div>

      {/* Stats Grid Section */}
      <section className="py-16 bg-surface">
        <div className="container-custom mx-auto max-w-7xl px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Academy Statistics</h2>
          <StatsGrid stats={stats} />
        </div>
      </section>

      {/* Feature Grid Section */}
      <section className="py-16 bg-white">
        <div className="container-custom mx-auto max-w-7xl px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Programs</h2>
          <FeatureGrid features={features} columns={3} />
        </div>
      </section>

      {/* Hero Grid Section */}
      <section className="py-16 bg-surface">
        <div className="container-custom mx-auto max-w-7xl px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Hero Layout</h2>
          <HeroGrid featured>
            <ProfessionalCard variant="elevated">
              <h3 className="text-2xl font-bold mb-4">Football Excellence</h3>
              <p className="text-text-secondary mb-4">
                Professional training methods tailored for young athletes focusing on technical skills, tactical understanding, and physical development.
              </p>
              <Link href="/programs" className="inline-flex items-center text-primary font-semibold hover:underline">
                Learn More →
              </Link>
            </ProfessionalCard>
            <ProfessionalCard variant="featured">
              <div className="text-center">
                <Trophy className="h-16 w-16 text-primary mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-4">Championship Mindset</h3>
                <p className="text-text-secondary">
                  Building winners on and off the pitch through discipline, teamwork, and perseverance.
                </p>
              </div>
            </ProfessionalCard>
          </HeroGrid>
        </div>
      </section>

      {/* Masonry Grid Section */}
      <section className="py-16 bg-white">
        <div className="container-custom mx-auto max-w-7xl px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Masonry Layout</h2>
          <MasonryGrid items={masonryItems} />
        </div>
      </section>

      {/* Timeline Grid Section */}
      <section className="py-16 bg-surface">
        <div className="container-custom mx-auto max-w-7xl px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Journey</h2>
          <TimelineGrid events={timelineEvents} />
        </div>
      </section>

      {/* Showcase Grid Section */}
      <section className="py-16 bg-white">
        <div className="container-custom mx-auto max-w-7xl px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Gallery Showcase</h2>
          <ShowcaseGrid items={showcaseItems} />
        </div>
      </section>

      {/* Back to Home */}
      <section className="py-16 bg-surface text-center">
        <div className="container-custom mx-auto max-w-4xl px-4">
          <Link 
            href="/"
            className="inline-flex items-center px-8 py-3 bg-primary text-white font-semibold rounded-full hover:bg-primary-600 transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </section>
    </main>
  );
}
