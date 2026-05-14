import { SITE_IMAGES } from "./site-images";

/**
 * Image validation utility to ensure all images exist and have proper fallbacks
 */

export interface ImageValidationResult {
  isValid: boolean;
  fallback?: string;
  error?: string;
}

export const FALLBACK_IMAGES = {
  hero: "/images/React1.jpeg",
  about: "/images/React2.jpeg", 
  blog: "/images/React3.jpeg",
  contact: "/images/Geo.JPG",
  faq: "/images/React4.jpeg",
  impact: "/images/React5.jpeg",
  join: "/images/React6.jpeg",
  team: "/images/React1.jpeg",
  default: "/images/React1.jpeg",
} as const;

export type FallbackImageKey = keyof typeof FALLBACK_IMAGES;

/**
 * Validates an image path and returns a fallback if needed
 */
export function validateImagePath(
  imagePath: string,
  fallbackKey: FallbackImageKey = "default"
): string {
  // Check if the image path exists in SITE_IMAGES
  const validImages = Object.values(SITE_IMAGES);
  const isValid = validImages.includes(imagePath as any);
  
  if (isValid && imagePath.startsWith("/images/")) {
    // Additional validation for common image extensions
    const validExtensions = [".jpg", ".jpeg", ".png", ".webp", ".avif"];
    const hasValidExtension = validExtensions.some(ext => 
      imagePath.toLowerCase().endsWith(ext)
    );
    
    if (hasValidExtension) {
      return imagePath;
    }
  }
  
  // Return fallback if validation fails
  return FALLBACK_IMAGES[fallbackKey];
}

/**
 * Gets the appropriate hero image for a page with fallback
 */
export function getHeroImageForPage(pageName: string): string {
  const pageImageMap: Record<string, string> = {
    home: SITE_IMAGES.hero,
    about: "/images/React1.jpeg",
    blog: "/images/React2.jpeg", 
    contact: "/images/Geo.JPG",
    faq: "/images/React3.jpeg",
    impact: "/images/React4.jpeg",
    join: "/images/React6.jpeg",
    team: "/images/React5.jpeg",
    donate: "/images/React7.jpeg",
    programs: "/images/React8.jpeg",
    privacy: "/images/React9.jpeg",
    terms: "/images/React10.jpeg",
  };
  
  const imagePath = pageImageMap[pageName.toLowerCase()] || FALLBACK_IMAGES.default;
  return validateImagePath(imagePath, pageName.toLowerCase() as FallbackImageKey);
}

/**
 * Image component with built-in error handling and fallbacks
 */
export interface SafeImageProps {
  src: string;
  alt: string;
  fallback?: string;
  className?: string;
  priority?: boolean;
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  onError?: (error: React.SyntheticEvent<HTMLImageElement>) => void;
}

export function getSafeImageProps(props: SafeImageProps): SafeImageProps {
  const { src, fallback, ...rest } = props;
  
  const validatedSrc = validateImagePath(src);
  const finalFallback = fallback || FALLBACK_IMAGES.default;
  
  return {
    ...rest,
    src: validatedSrc,
    fallback: finalFallback,
    onError: (error: React.SyntheticEvent<HTMLImageElement>) => {
      const target = error.target as HTMLImageElement;
      if (target.src !== finalFallback) {
        target.src = finalFallback;
      }
      props.onError?.(error);
    },
  };
}

/**
 * Validates all images in SITE_IMAGES and returns a report
 */
export function validateAllSiteImages(): Record<string, ImageValidationResult> {
  const results: Record<string, ImageValidationResult> = {};
  
  Object.entries(SITE_IMAGES).forEach(([key, path]) => {
    const isValid = validateImagePath(path) === path;
    results[key] = {
      isValid,
      error: isValid ? undefined : `Invalid image path: ${path}`,
      fallback: isValid ? undefined : FALLBACK_IMAGES.default,
    };
  });
  
  return results;
}
