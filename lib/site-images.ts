/**
 * Central paths for public/ assets — single source of truth for heroes, portraits, and logo.
 * Files must exist under public/ with matching spelling (e.g. Geo.JPG on case-sensitive hosts).
 */
export const SITE_IMAGES = {
  hero: "/images/Hero1.jpeg",
  /** Second hero slide / alternate header */
  heroSecondary: "/images/Hero2.jpeg",
  /** Youth & community imagery */
  heroYouth: "/images/Africankid.jpeg",
  /** Match / pitch moment */
  heroPitch: "/images/postpen.jpeg",
  coachSession: "/images/Geo.JPG",
  logo: "/images/reactnowlog.png",
  /**
   * Portrait-style shots for quotes (replace with /testimonials/*.jpg when you have
   * named headshots; these paths use your current public/images assets).
   */
  testimonialParent: "/images/Africankid.jpeg",
  testimonialCoach: "/images/Geo.JPG",
  testimonialFounder: "/images/postpen.jpeg",
} as const;

export type SiteImageKey = keyof typeof SITE_IMAGES;
