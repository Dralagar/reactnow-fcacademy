// Centralized Image Library for React Now FC Academy
// This file exports all images used throughout the application

// Campaign Images
export const campaignImages = {
  default: '/images/React8.jpeg',
  donation: '/images/React7.jpeg',
  sponsorship: '/images/React6.jpeg',
  equipment: '/images/React5.jpeg',
  tournament: '/images/React4.jpeg',
  general: '/images/React8.jpeg'
} as const;

// Academy/Team Images
export const academyImages = {
  logo: '/images/reactnowlog.png',
  teamPhoto1: '/images/React36.jpeg',
  teamPhoto2: '/images/React35.jpeg',
  teamPhoto3: '/images/React34.jpeg',
  teamPhoto4: '/images/React33.jpeg',
  training1: '/images/React32.jpeg',
  training2: '/images/React30.jpeg',
  training3: '/images/React3.jpeg',
  match1: '/images/React29.jpeg',
  match2: '/images/React28.jpeg',
  match3: '/images/React27.jpeg',
  celebration1: '/images/React26.jpeg',
  celebration2: '/images/React25.jpeg'
} as const;

// Player/Action Images
export const playerImages = {
  action1: '/images/React24.jpeg',
  action2: '/images/React23.jpeg',
  action3: '/images/React22.jpeg',
  action4: '/images/React21.jpeg',
  action5: '/images/React20.jpeg',
  action6: '/images/React2.jpeg',
  action7: '/images/React19.jpeg',
  action8: '/images/React18.jpeg',
  action9: '/images/React17.jpeg',
  action10: '/images/React15.jpeg',
  action11: '/images/React14.jpeg',
  action12: '/images/React13.jpeg',
  action13: '/images/React12.jpeg',
  action14: '/images/React11.jpeg'
} as const;

// Testimonial Images
export const testimonialImages = {
  maryAtieno: '/testimonials/mary-atieno.jpg',
  georgeDralagar: '/testimonials/george-dralagar.jpg',
  coachKeroro: '/testimonials/coach-keroro.jpg'
} as const;

// Social Media Images
export const socialImages = {
  xLogo: '/images/Xlogo.png',
  tiktok: '/images/Tiktok.jpeg',
  slack: '/images/slack.png'
} as const;

// Utility Images
export const utilityImages = {
  nextjs: '/next.svg',
  vercel: '/vercel.svg',
  window: '/window.svg'
} as const;

// Helper Functions
export const getCampaignImage = (type: keyof typeof campaignImages): string => {
  return campaignImages[type] || campaignImages.default;
};

export const getAcademyImage = (name: keyof typeof academyImages): string => {
  return academyImages[name];
};

export const getPlayerImage = (name: keyof typeof playerImages): string => {
  return playerImages[name];
};

export const getTestimonialImage = (name: keyof typeof testimonialImages): string => {
  return testimonialImages[name];
};

export const getSocialImage = (name: keyof typeof socialImages): string => {
  return socialImages[name];
};

// Get random image from category
export const getRandomCampaignImage = (): string => {
  const images = Object.values(campaignImages);
  return images[Math.floor(Math.random() * images.length)];
};

export const getRandomAcademyImage = (): string => {
  const images = Object.values(academyImages);
  return images[Math.floor(Math.random() * images.length)];
};

export const getRandomPlayerImage = (): string => {
  const images = Object.values(playerImages);
  return images[Math.floor(Math.random() * images.length)];
};

// Type exports for TypeScript
export type CampaignImageType = keyof typeof campaignImages;
export type AcademyImageType = keyof typeof academyImages;
export type PlayerImageType = keyof typeof playerImages;
export type TestimonialImageType = keyof typeof testimonialImages;
export type SocialImageType = keyof typeof socialImages;

// Default exports
export default {
  campaign: campaignImages,
  academy: academyImages,
  player: playerImages,
  testimonial: testimonialImages,
  social: socialImages,
  utility: utilityImages,
  getCampaignImage,
  getAcademyImage,
  getPlayerImage,
  getTestimonialImage,
  getSocialImage,
  getRandomCampaignImage,
  getRandomAcademyImage,
  getRandomPlayerImage
};
