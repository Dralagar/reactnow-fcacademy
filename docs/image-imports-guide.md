# Complete Image Import Guide

## 📸 **Centralized Image Library System**

This guide explains how to correctly import and use images across all pages in the React Now FC Academy application.

## 🏗️ **Image Library Structure**

### **Central Library** (`/lib/imageLibrary.ts`)
```typescript
// All images organized by category
export const campaignImages = {
  default: '/images/React8.jpeg',
  donation: '/images/React7.jpeg',
  sponsorship: '/images/React6.jpeg',
  equipment: '/images/React5.jpeg',
  tournament: '/images/React4.jpeg',
  general: '/images/React8.jpeg'
} as const;

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

export const playerImages = {
  action1: '/images/React24.jpeg',
  action2: '/images/React23.jpeg',
  // ... more player images
} as const;

export const testimonialImages = {
  maryAtieno: '/testimonials/mary-atieno.jpg',
  georgeDralagar: '/testimonials/george-dralagar.jpg',
  coachKeroro: '/testimonials/coach-keroro.jpg'
} as const;
```

## 📄 **Page-by-Page Image Updates**

### **1. Home Page** (`/app/page.tsx`)
```typescript
// Import from image library
import { 
  academyImages, 
  playerImages, 
  testimonialImages, 
  getRandomAcademyImage, 
  getRandomPlayerImage 
} from "@/lib/imageLibrary";

// Hero images
const HERO_IMAGES = [
  { src: academyImages.teamPhoto1, alt: "React Now FC players in action" },
  { src: academyImages.teamPhoto2, alt: "Young players and families" },
  { src: academyImages.training1, alt: "Coach Keroro leading training" },
];

// Testimonials
const TESTIMONIALS = [
  {
    quote: "React Now FC has given my son structure and purpose...",
    author: "Mary Atieno",
    role: "Parent",
    image: testimonialImages.maryAtieno,
    alt: "Mary Atieno - Parent",
  },
  {
    quote: "These kids aren't just learning football...",
    author: "Keroro - Nicolas Wol Atak",
    role: "Head Coach",
    image: testimonialImages.coachKeroro,
    alt: "Coach Keroro - Nicolas Wol Atak",
  },
  {
    quote: "Football is the entry point, not the goal...",
    author: "George Dralagar",
    role: "Founder & Executive Director",
    image: testimonialImages.georgeDralagar,
    alt: "George Dralagar - Founder",
  },
];
```

### **2. Donate Page** (`/app/donate/page.tsx`)
```typescript
import { academyImages } from '@/lib/imageLibrary';

// SEO metadata with proper image
export const metadata: Metadata = {
  title: 'Donate | React Now FC Academy Nairobi',
  openGraph: {
    title: 'Support React Now FC Academy | Make a Donation',
    images: [
      {
        url: academyImages.teamPhoto1,
        width: 1200,
        height: 630,
        alt: 'Donate to React Now FC Academy'
      }
    ]
  },
};
```

### **3. Join Page** (`/app/join/page.tsx`)
```typescript
import { academyImages } from "@/lib/imageLibrary";

// SEO metadata with training image
export const metadata: Metadata = {
  title: "Join | React Now FC Academy Nairobi",
  openGraph: {
    title: "Join React Now FC Academy | Become Part of Our Community",
    images: [
      {
        url: academyImages.training2,
        width: 1200,
        height: 630,
        alt: "Join React Now FC Academy - Become Part of Our Community"
      }
    ]
  },
};
```

### **4. About Page** (`/app/about/page.tsx`)
```typescript
import { academyImages } from "@/lib/imageLibrary";

// SEO metadata with team photo
export const metadata: Metadata = {
  title: "About | React Now FC Academy Nairobi",
  openGraph: {
    title: "About React Now FC Academy | Our Mission & Vision",
    images: [
      {
        url: academyImages.teamPhoto3,
        width: 1200,
        height: 630,
        alt: "About React Now FC Academy - Mission and Vision"
      }
    ]
  },
};
```

### **5. Campaign Management** (`/components/CampaignManagement.tsx`)
```typescript
import { 
  getCampaignImage, 
  validateImageFile, 
  createImagePreview, 
  campaignImages 
} from '@/lib/imageLibrary';

// Campaign card with type-based image
<Image
  src={campaign.imageUrl || getCampaignImage(campaign.type)}
  alt={campaign.title}
  fill
  className="object-cover"
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  onError={(e) => {
    const target = e.target as HTMLImageElement;
    target.src = getCampaignImage(campaign.type);
  }}
/>
```

## 🎯 **Best Practices for Image Imports**

### **1. Always Import from Library**
```typescript
// ✅ Correct
import { academyImages } from '@/lib/imageLibrary';
const image = academyImages.teamPhoto1;

// ❌ Incorrect
const image = '/images/React36.jpeg';
```

### **2. Use Type-Safe Imports**
```typescript
// ✅ Type-safe
import type { AcademyImageType } from '@/lib/imageLibrary';
const imageName: AcademyImageType = 'teamPhoto1';

// ❌ Not type-safe
const imageName = 'teamPhoto1';
```

### **3. Helper Functions**
```typescript
// Get image by type
const campaignImage = getCampaignImage('donation'); // Returns '/images/React7.jpeg'

// Get random image
const randomAcademyImage = getRandomAcademyImage();

// Validate uploaded files
const isValid = validateImageFile(file);
```

## 📱 **Component Usage Examples**

### **Hero Section Component**
```typescript
import Image from 'next/image';
import { academyImages } from '@/lib/imageLibrary';

export function HeroSection() {
  return (
    <div className="relative h-96">
      <Image
        src={academyImages.teamPhoto1}
        alt="React Now FC Academy"
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />
    </div>
  );
}
```

### **Testimonial Card Component**
```typescript
import Image from 'next/image';
import { testimonialImages } from '@/lib/imageLibrary';

interface TestimonialCardProps {
  name: 'maryAtieno' | 'georgeDralagar' | 'coachKeroro';
}

export function TestimonialCard({ name }: TestimonialCardProps) {
  return (
    <div className="bg-white rounded-lg p-6">
      <Image
        src={testimonialImages[name]}
        alt={`${name} testimonial`}
        width={80}
        height={80}
        className="rounded-full mx-auto mb-4"
      />
      {/* Testimonial content */}
    </div>
  );
}
```

### **Campaign Card Component**
```typescript
import Image from 'next/image';
import { getCampaignImage } from '@/lib/imageLibrary';

interface CampaignCardProps {
  campaign: {
    type: 'donation' | 'sponsorship' | 'equipment' | 'tournament' | 'general';
    title: string;
    imageUrl?: string;
  };
}

export function CampaignCard({ campaign }: CampaignCardProps) {
  return (
    <div className="relative h-48">
      <Image
        src={campaign.imageUrl || getCampaignImage(campaign.type)}
        alt={campaign.title}
        fill
        className="object-cover"
      />
    </div>
  );
}
```

## 🔧 **Advanced Usage**

### **Dynamic Image Selection**
```typescript
import { academyImages, getRandomAcademyImage } from '@/lib/imageLibrary';

// Select image based on context
const getAcademyImage = (section: 'hero' | 'training' | 'match') => {
  switch (section) {
    case 'hero': return academyImages.teamPhoto1;
    case 'training': return academyImages.training1;
    case 'match': return academyImages.match1;
    default: return getRandomAcademyImage();
  }
};
```

### **Image Optimization with Next.js**
```typescript
import Image from 'next/image';
import { academyImages } from '@/lib/imageLibrary';

export function OptimizedImage({ imageName, alt }: { 
  imageName: keyof typeof academyImages; 
  alt: string; 
}) {
  return (
    <Image
      src={academyImages[imageName]}
      alt={alt}
      width={800}
      height={600}
      className="object-cover"
      sizes="(max-width: 768px) 100vw, 50vw"
      loading="lazy"
    />
  );
}
```

## 📊 **Image Categories and Uses**

### **Campaign Images**
- **Purpose**: Campaign cards, fundraising pages
- **Types**: donation, sponsorship, equipment, tournament, general
- **Location**: `/images/React4.jpeg` to `/images/React8.jpeg`

### **Academy Images**
- **Purpose**: Team photos, training sessions, matches
- **Types**: teamPhoto1-4, training1-3, match1-3, celebration1-2
- **Location**: `/images/React25.jpeg` to `/images/React36.jpeg`

### **Player Images**
- **Purpose**: Action shots, player showcases
- **Types**: action1-14
- **Location**: `/images/React2.jpeg` to `/images/React24.jpeg`

### **Testimonial Images**
- **Purpose**: Author photos for testimonials
- **Types**: maryAtieno, georgeDralagar, coachKeroro
- **Location**: `/testimonials/`

## 🚀 **Performance Optimization**

### **Next.js Image Component Benefits**
- **Automatic Optimization**: Resizes and optimizes images
- **Format Conversion**: Serves WebP when supported
- **Lazy Loading**: Loads images as needed
- **Blur Placeholders**: Shows placeholder while loading

### **Best Practices**
```typescript
// ✅ Optimized image
<Image
  src={academyImages.teamPhoto1}
  alt="Team photo"
  fill
  className="object-cover"
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  priority // For above-the-fold images
  loading="lazy" // For below-the-fold images
/>

// ✅ Responsive image with specific dimensions
<Image
  src={playerImages.action1}
  alt="Player action"
  width={400}
  height={300}
  className="object-cover"
  sizes="(max-width: 768px) 100vw, 400px"
/>
```

## 🔒 **Type Safety**

### **TypeScript Integration**
```typescript
// Import types for better development experience
import type { 
  CampaignImageType, 
  AcademyImageType, 
  PlayerImageType 
} from '@/lib/imageLibrary';

// Type-safe function
function getImage(type: CampaignImageType): string {
  return campaignImages[type];
}

// Type-safe props
interface CampaignProps {
  imageType: CampaignImageType;
  title: string;
}
```

## 📝 **Maintenance Guidelines**

### **Adding New Images**
1. Add image to appropriate directory (`/public/images/` or `/public/testimonials/`)
2. Update the corresponding image object in `/lib/imageLibrary.ts`
3. Add type definitions if needed
4. Update documentation

### **Updating Existing Images**
1. Replace image file in `/public/` directory
2. No code changes needed if filename remains the same
3. Clear browser cache to see changes

### **Removing Images**
1. Remove image file from `/public/` directory
2. Remove from image library object
3. Update any components using the removed image
4. Update type definitions

## 🆘 **Troubleshooting**

### **Common Issues**
- **Images Not Loading**: Check import paths and file existence
- **Type Errors**: Ensure correct type imports from library
- **Build Errors**: Verify all image paths are correct
- **Performance Issues**: Use Next.js Image component properly

### **Debug Commands**
```bash
# Check if images exist
ls public/images/
ls public/testimonials/

# Test TypeScript compilation
npm run build

# Check for unused imports
npm run lint
```

## 📞 **Support**

For image-related issues:
1. Check `/lib/imageLibrary.ts` for correct exports
2. Verify image files exist in `/public/` directories
3. Check TypeScript types for correct usage
4. Review component imports and usage

---

This comprehensive image import system ensures consistent, type-safe, and optimized image usage across all pages of the React Now FC Academy application.
