# Image Management Guide

## 📸 **Campaign Image System**

This guide explains how images are managed and used throughout the React Now FC Academy payment system, particularly for campaigns.

## 🏗️ **Architecture Overview**

### **Image Storage Strategy**
- **Static Images**: Stored in `/public/images/` directory
- **Dynamic Images**: Base64 encoded for immediate storage
- **Fallback System**: Type-based default images for all campaigns
- **Optimization**: Next.js Image component for automatic optimization

### **Image Categories**

#### **Campaign Type Images**
```
/images/React8.jpeg  - Default/General campaigns
/images/React7.jpeg  - Donation campaigns
/images/React6.jpeg  - Sponsorship campaigns
/images/React5.jpeg  - Equipment campaigns
/images/React4.jpeg  - Tournament campaigns
```

#### **Testimonial Images**
```
/testimonials/mary-atieno.jpg
/testimonials/george-dralagar.jpg
/testimonials/coach-keroro.jpg
```

#### **Social Media Images**
```
/images/Xlogo.png
/images/Tiktok.jpeg
/images/slack.png
/images/reactnowlog.png
```

## 🔧 **Technical Implementation**

### **Image Utility Functions** (`/lib/images.ts`)

```typescript
import { CAMPAIGN_IMAGES } from '@/lib/images';

// Get campaign image by type
const image = getCampaignImage('donation'); // Returns '/images/React7.jpeg'

// Validate uploaded image
const isValid = validateImageFile(file); // Checks type and size

// Create image preview
const preview = await createImagePreview(file); // Returns base64 string

// Get placeholder image
const placeholder = getPlaceholderImage('tournament'); // Returns fallback image
```

### **Campaign Image Upload**

#### **Frontend Implementation**
```typescript
// In CampaignManagement.tsx
const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (file && validateImageFile(file)) {
    const preview = await createImagePreview(file);
    setImagePreview(preview);
    setFormData({ ...formData, imageUrl: preview });
  }
};
```

#### **Image Display**
```typescript
// Campaign card with fallback
<Image
  src={campaign.imageUrl || getCampaignImage(campaign.type)}
  alt={campaign.title}
  fill
  className="object-cover"
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  onError={(e) => {
    // Fallback to type-based image
    const target = e.target as HTMLImageElement;
    target.src = getCampaignImage(campaign.type);
  }}
/>
```

## 📱 **Image Specifications**

### **Supported Formats**
- **JPEG/JPG**: Best for photographs
- **PNG**: Best for graphics with transparency
- **GIF**: For simple animations
- **WebP**: Modern format with better compression

### **Size Requirements**
- **Maximum File Size**: 5MB
- **Recommended Dimensions**: 1920x1080px (16:9 ratio)
- **Minimum Dimensions**: 800x450px
- **Aspect Ratio**: 16:9 recommended

### **Optimization Guidelines**
- **Compression**: 80-90% quality for JPEG
- **Progressive Loading**: Enabled by Next.js
- **Responsive Sizes**: Multiple sizes generated automatically
- **Format Conversion**: WebP preferred when supported

## 🎨 **Design System Integration**

### **Campaign Card Layout**
```
┌─────────────────────────────┐
│        Image (16:9)         │
│  ┌─────────────────────┐    │
│  │ ⭐ Featured Badge   │    │
│  └─────────────────────┘    │
├─────────────────────────────┤
│ Title                       │
│ Status | Type               │
│ Description                 │
│ Progress Bar                │
│ Amount / Goal               │
│ Donors | Deadline           │
├─────────────────────────────┤
│ Actions: Edit | Delete      │
└─────────────────────────────┘
```

### **Image Overlay Effects**
```css
/* Gradient overlay for text readability */
.campaign-image::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.5), transparent);
}
```

## 🔄 **Image Fallback System**

### **Priority Order**
1. **Uploaded Image**: Custom image uploaded by admin
2. **Type-Based Image**: Default image for campaign type
3. **Default Image**: Fallback to general campaign image
4. **Error State**: Shows broken image icon

### **Error Handling**
```typescript
// Automatic fallback on error
<Image
  src={imageUrl}
  alt="Campaign"
  onError={(e) => {
    const target = e.target as HTMLImageElement;
    target.src = getFallbackImage(type);
  }}
/>
```

## 📊 **Performance Optimization**

### **Next.js Image Optimization**
- **Automatic Resizing**: Creates multiple sizes
- **Format Conversion**: Serves WebP when supported
- **Lazy Loading**: Loads images as needed
- **Blur Placeholder**: Shows placeholder while loading

### **CDN Integration** (Future)
```typescript
// Planned CDN integration
export const optimizeImageUrl = (url: string, width?: number, height?: number) => {
  const cdnUrl = 'https://cdn.reactnowfc.academy';
  return `${cdnUrl}/images/${url}?w=${width}&h=${height}&format=webp`;
};
```

## 🛠️ **Development Guidelines**

### **Adding New Campaign Types**
1. Add image to `/public/images/` directory
2. Update `CAMPAIGN_IMAGES` in `/lib/images.ts`
3. Update campaign schema if needed
4. Test fallback system

### **Image Upload Testing**
```typescript
// Test image validation
const testImage = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
console.log(validateImageFile(testImage)); // Should return true
```

### **Performance Monitoring**
- Monitor image load times
- Track fallback usage
- Measure compression ratios
- Check Core Web Vitals impact

## 🔒 **Security Considerations**

### **File Upload Security**
- **Type Validation**: Only allow image formats
- **Size Limits**: Prevent large file uploads
- **Content Validation**: Verify actual file content
- **Sanitization**: Remove EXIF data from images

### **XSS Prevention**
- **Base64 Validation**: Validate encoded content
- **Content-Type Headers**: Set proper headers
- **CSP Headers**: Content Security Policy for images

## 📈 **Analytics & Monitoring**

### **Image Performance Metrics**
- **Load Times**: Track image loading speed
- **Error Rates**: Monitor failed image loads
- **Fallback Usage**: Track fallback image usage
- **User Engagement**: Measure interaction with image content

### **A/B Testing Opportunities**
- Test different image sizes
- Compare compression levels
- Measure engagement with custom vs default images
- Optimize image placement in campaigns

## 🚀 **Future Enhancements**

### **Planned Features**
- **Cloud Storage**: AWS S3 or CloudFront integration
- **Image Editor**: Built-in image editing tools
- **AI Optimization**: Automatic image optimization
- **Video Support**: Campaign video uploads
- **Image Galleries**: Multiple images per campaign

### **Advanced Features**
- **Dynamic Image Generation**: Create images from templates
- **Personalization**: Dynamic images based on user data
- **AR/VR Support**: 3D and immersive content
- **Real-time Processing**: Image processing on upload

## 📝 **Best Practices**

### **Image Selection**
- Use high-quality, relevant images
- Maintain consistent aspect ratios
- Consider mobile viewing experience
- Test across different devices

### **File Management**
- Organize images in logical directories
- Use descriptive filenames
- Maintain image library documentation
- Regular cleanup of unused images

### **User Experience**
- Show loading states for images
- Provide meaningful alt text
- Implement graceful degradation
- Optimize for slow connections

## 🆘 **Troubleshooting**

### **Common Issues**
- **Images Not Loading**: Check file paths and permissions
- **Slow Loading**: Optimize image sizes and formats
- **Fallback Not Working**: Verify fallback image paths
- **Upload Failing**: Check file size and type validation

### **Debug Commands**
```bash
# Check image optimization
npm run build
npm run start

# Test image loading
curl -I http://localhost:3000/images/React8.jpeg

# Monitor performance
npm run dev -- --profile
```

## 📞 **Support**

For image-related issues:
1. Check console for error messages
2. Verify image file paths
3. Test with different image formats
4. Check file size limits
5. Review browser network tab for failed requests

---

This image management system ensures a robust, performant, and user-friendly experience for all campaign imagery in the React Now FC Academy platform.
