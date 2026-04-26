/**
 * Central paths for public/ assets — single source of truth for heroes, portraits, and logo.
 * Files must exist under public/ with matching spelling (e.g. Geo.JPG on case-sensitive hosts).
 */
export const SITE_IMAGES = {
  hero: "/images/React1.jpeg",
  /** Second hero slide / alternate header */
  heroSecondary: "/images/React2.jpeg",
  /** Youth & community imagery */
  heroYouth: "/images/React4.jpeg",
  /** Match / pitch moment */
  heroPitch: "/images/React.5",
  coachSession: "/images/React6.jpeg",
  logo: "/images/reactnowlog.png",
  /**
   * Portrait-style shots for quotes (replace with /testimonials/*.jpg when you have
   * named headshots; these paths use your current public/images assets).
   */
  testimonialParent: "/images/React4.jpeg",
  testimonialCoach: "/images/Geo.JPG",
  testimonialFounder: "/images/postpen.jpeg",
} as const;

export type SiteImageKey = keyof typeof SITE_IMAGES;
