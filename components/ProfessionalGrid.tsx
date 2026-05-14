"use client";

import React, { ReactNode } from "react";
import { motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

type ProfessionalGridProps = {
  children: ReactNode;
  className?: string;
  columns?: 1 | 2 | 3 | 4 | "auto";
  gap?: "sm" | "md" | "lg" | "xl";
  animated?: boolean;
  layout?: "default" | "masonry" | "featured" | "cards" | "stats";
  responsive?: boolean;
};

/**
 * Professional grid layout component with consistent spacing and animations
 */
export default function ProfessionalGrid({
  children,
  className,
  columns = 3,
  gap = "lg",
  animated = true,
  layout = "default",
  responsive = true,
}: ProfessionalGridProps) {
  const gridClasses = {
    1: "grid-cols-1",
    2: responsive ? "grid-cols-1 md:grid-cols-2" : "grid-cols-2",
    3: responsive ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-3",
    4: responsive ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" : "grid-cols-4",
    auto: responsive ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-4",
  };

  const layoutClasses = {
    default: "",
    masonry: "items-start",
    featured: "auto-rows-fr",
    cards: "auto-rows-min",
    stats: "items-stretch",
  };

  const gapClasses = {
    sm: "gap-4",
    md: "gap-6",
    lg: "gap-8",
    xl: "gap-10",
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  const GridWrapper = animated ? motion.div : "div";
  const ItemWrapper = animated ? motion.div : "div";

  return (
    <GridWrapper
      className={cn(
        "grid w-full",
        gridClasses[columns],
        gapClasses[gap],
        layoutClasses[layout],
        className
      )}
      {...(animated && {
        initial: "hidden",
        whileInView: "visible",
        viewport: { once: true, amount: 0.1 },
        variants: containerVariants,
      })}
    >
      {animated
        ? // @ts-ignore
          React.Children.map(children, (child, index) => (
            <ItemWrapper key={index} variants={itemVariants}>
              {child}
            </ItemWrapper>
          ))
        : children}
    </GridWrapper>
  );
}

type ProfessionalCardProps = {
  children: ReactNode;
  className?: string;
  variant?: "default" | "featured" | "bordered" | "elevated";
  hover?: boolean;
  clickable?: boolean;
  onClick?: () => void;
};

/**
 * Professional card component with consistent styling
 */
export function ProfessionalCard({
  children,
  className,
  variant = "default",
  hover = true,
  clickable = false,
  onClick,
}: ProfessionalCardProps) {
  const variantClasses = {
    default: "bg-white border border-border rounded-2xl p-6 shadow-sm",
    featured: "bg-gradient-to-br from-primary-50 to-primary-100 border border-primary-200 rounded-2xl p-6 shadow-md",
    bordered: "bg-transparent border-2 border-border rounded-2xl p-6",
    elevated: "bg-white border border-border rounded-2xl p-6 shadow-lg",
  };

  const hoverClasses = hover
    ? "transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-primary/30"
    : "";

  const clickableClasses = clickable
    ? "cursor-pointer active:scale-[0.98]"
    : "";

  return (
    <div
      className={cn(
        variantClasses[variant],
        hoverClasses,
        clickableClasses,
        className
      )}
      onClick={onClick}
      role={clickable ? "button" : undefined}
      tabIndex={clickable ? 0 : undefined}
      onKeyDown={(e) => {
        if (clickable && (e.key === "Enter" || e.key === " ")) {
          onClick?.();
        }
      }}
    >
      {children}
    </div>
  );
}

type StatsGridProps = {
  stats: Array<{
    value: string;
    label: string;
    description?: string;
  }>;
  className?: string;
};

/**
 * Professional stats grid component
 */
export function StatsGrid({ stats, className }: StatsGridProps) {
  return (
    <ProfessionalGrid columns={4} gap="lg" className={className}>
      {stats.map((stat, index) => (
        <ProfessionalCard
          key={index}
          variant="elevated"
          className="text-center"
        >
          <div className="mb-2 text-3xl font-bold text-primary sm:text-4xl lg:text-5xl">
            {stat.value}
          </div>
          <div className="text-sm font-medium text-text-secondary sm:text-base">
            {stat.label}
          </div>
          {stat.description && (
            <div className="mt-2 text-xs text-text-muted">
              {stat.description}
            </div>
          )}
        </ProfessionalCard>
      ))}
    </ProfessionalGrid>
  );
}

type FeatureGridProps = {
  features: Array<{
    icon: ReactNode;
    title: string;
    description: string;
    href?: string;
  }>;
  className?: string;
  columns?: 2 | 3 | 4;
};

/**
 * Professional feature grid component
 */
export function FeatureGrid({ features, className, columns = 3 }: FeatureGridProps) {
  return (
    <ProfessionalGrid columns={columns} gap="lg" className={className}>
      {features.map((feature, index) => (
        <ProfessionalCard
          key={index}
          variant="default"
          clickable={!!feature.href}
          onClick={() => feature.href && window.open(feature.href, "_blank")}
        >
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-100 text-primary">
            {feature.icon}
          </div>
          <h3 className="mb-2 text-lg font-semibold text-text-primary">
            {feature.title}
          </h3>
          <p className="text-sm leading-relaxed text-text-secondary">
            {feature.description}
          </p>
        </ProfessionalCard>
      ))}
    </ProfessionalGrid>
  );
}

type HeroGridProps = {
  children: ReactNode;
  className?: string;
  featured?: boolean;
};

/**
 * Hero grid layout for main content sections
 */
export function HeroGrid({ children, className, featured = false }: HeroGridProps) {
  return (
    <ProfessionalGrid 
      columns={2} 
      gap="xl" 
      layout={featured ? "featured" : "default"}
      className={cn("py-12", className)}
    >
      {children}
    </ProfessionalGrid>
  );
}

type MasonryGridProps = {
  items: Array<{
    id: string;
    content: ReactNode;
    size?: "small" | "medium" | "large";
  }>;
  className?: string;
};

/**
 * Masonry grid layout for varied content sizes
 */
export function MasonryGrid({ items, className }: MasonryGridProps) {
  const sizeClasses = {
    small: "row-span-1",
    medium: "row-span-2",
    large: "row-span-3",
  };

  return (
    <ProfessionalGrid 
      columns={3} 
      gap="md" 
      layout="masonry"
      className={cn("py-8", className)}
    >
      {items.map((item) => (
        <div
          key={item.id}
          className={cn(
            "w-full",
            sizeClasses[item.size || "medium"]
          )}
        >
          {item.content}
        </div>
      ))}
    </ProfessionalGrid>
  );
}

type TimelineGridProps = {
  events: Array<{
    id: string;
    date: string;
    title: string;
    description: string;
    image?: string;
  }>;
  className?: string;
};

/**
 * Timeline grid layout for chronological content
 */
export function TimelineGrid({ events, className }: TimelineGridProps) {
  return (
    <div className={cn("relative py-12", className)}>
      {/* Timeline line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-border transform -translate-x-1/2" />
      
      <div className="relative space-y-12">
        {events.map((event, index) => (
          <div
            key={event.id}
            className={cn(
              "flex items-center",
              index % 2 === 0 ? "flex-row-reverse" : "flex-row"
            )}
          >
            {/* Content */}
            <div className="w-5/12">
              <ProfessionalCard variant="default">
                <div className="text-sm font-medium text-primary mb-2">
                  {event.date}
                </div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">
                  {event.title}
                </h3>
                <p className="text-sm text-text-secondary">
                  {event.description}
                </p>
              </ProfessionalCard>
            </div>
            
            {/* Timeline dot */}
            <div className="w-2/12 flex justify-center">
              <div className="w-4 h-4 bg-primary rounded-full border-4 border-white shadow-md" />
            </div>
            
            {/* Spacer */}
            <div className="w-5/12" />
          </div>
        ))}
      </div>
    </div>
  );
}

type ShowcaseGridProps = {
  items: Array<{
    id: string;
    title: string;
    subtitle?: string;
    image: string;
    href?: string;
  }>;
  className?: string;
};

/**
 * Showcase grid for portfolios and galleries
 */
export function ShowcaseGrid({ items, className }: ShowcaseGridProps) {
  return (
    <ProfessionalGrid 
      columns={3} 
      gap="md" 
      layout="masonry"
      className={className}
    >
      {items.map((item, index) => (
        <ProfessionalCard
          key={item.id}
          variant="bordered"
          clickable={!!item.href}
          onClick={() => item.href && window.open(item.href, "_blank")}
          className="overflow-hidden p-0 group"
        >
          <div className="relative aspect-[4/3] overflow-hidden">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-text-primary group-hover:text-primary transition-colors">
              {item.title}
            </h3>
            {item.subtitle && (
              <p className="text-sm text-text-secondary mt-1">
                {item.subtitle}
              </p>
            )}
          </div>
        </ProfessionalCard>
      ))}
    </ProfessionalGrid>
  );
}
