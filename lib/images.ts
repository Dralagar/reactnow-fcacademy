// Image utility functions for campaign management
// Re-exporting from the centralized image library

export { 
  campaignImages,
  getCampaignImage,
  getRandomCampaignImage,
  CampaignImageType
} from './imageLibrary';

export const validateImageFile = (file: File): boolean => {
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
  const maxSize = 5 * 1024 * 1024; // 5MB
  
  return validTypes.includes(file.type) && file.size <= maxSize;
};

export const createImagePreview = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result as string);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const optimizeImageUrl = (url: string, width?: number, height?: number): string => {
  // This would integrate with a CDN or image optimization service
  // For now, return the original URL
  return url;
};

export const getPlaceholderImage = (type: string): string => {
  const placeholders = {
    donation: '/images/React7.jpeg',
    sponsorship: '/images/React6.jpeg',
    equipment: '/images/React5.jpeg',
    tournament: '/images/React4.jpeg',
    general: '/images/React8.jpeg'
  };
  
  return placeholders[type as keyof typeof placeholders] || placeholders.general;
};
