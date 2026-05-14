import { z } from 'zod';

// Blog post status
export const BlogStatusEnum = z.enum([
  'Draft',
  'Published',
  'Scheduled',
  'Archived',
  'Private'
]);

// Blog category
export const BlogCategoryEnum = z.enum([
  'News',
  'Match Report',
  'Player Spotlight',
  'Coach Interview',
  'Training Tips',
  'Club Announcement',
  'Community',
  'Development',
  'Success Story',
  'Event',
  'Tutorial'
]);

// Blog post schema
export const BlogSchema = z.object({
  _id: z.string().optional(),
  title: z.string().min(1, 'Title is required').max(200, 'Title must be less than 200 characters'),
  slug: z.string().min(1, 'Slug is required'),
  excerpt: z.string().max(500, 'Excerpt must be less than 500 characters').optional(),
  content: z.string().min(1, 'Content is required'),
  
  // Author information
  author: z.object({
    name: z.string(),
    id: z.string(),
    role: z.string().optional(),
    bio: z.string().optional(),
    avatar: z.string().optional()
  }),
  
  // Metadata
  category: BlogCategoryEnum,
  tags: z.array(z.string()).default([]),
  status: BlogStatusEnum.default('Draft'),
  featured: z.boolean().default(false),
  
  // Media
  featuredImage: z.string().optional(),
  images: z.array(z.object({
    url: z.string(),
    alt: z.string(),
    caption: z.string().optional()
  })).default([]),
  
  // SEO
  seo: z.object({
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
    keywords: z.array(z.string()).default([]),
    ogImage: z.string().optional()
  }).optional(),
  
  // Publishing schedule
  publishedAt: z.string().optional(),
  scheduledFor: z.string().optional(),
  
  // Engagement metrics
  metrics: z.object({
    views: z.number().default(0),
    likes: z.number().default(0),
    comments: z.number().default(0),
    shares: z.number().default(0),
    readTime: z.number().optional()
  }).default(() => ({
    views: 0,
    likes: 0,
    comments: 0,
    shares: 0
  })),
  
  // Comments
  comments: z.array(z.object({
    id: z.string(),
    author: z.object({
      name: z.string(),
      email: z.string().email(),
      avatar: z.string().optional()
    }),
    content: z.string(),
    createdAt: z.string(),
    status: z.enum(['Approved', 'Pending', 'Rejected']).default('Approved'),
    parentId: z.string().optional(), // For nested comments
    replies: z.array(z.string()).default([]) // Comment IDs
  })).default([]),
  
  // Related content
  relatedPosts: z.array(z.string()).default([]), // Post IDs
  series: z.object({
    name: z.string(),
    part: z.number().optional(),
    totalParts: z.number().optional()
  }).optional(),
  
  // Access control
  visibility: z.enum(['Public', 'Members', 'Coaches', 'Admin']).default('Public'),
  password: z.string().optional(),
  
  // Social media integration
  social: z.object({
    autoPost: z.boolean().default(false),
    platforms: z.array(z.enum(['Facebook', 'Twitter', 'Instagram', 'LinkedIn'])).default([]),
    customMessage: z.string().optional()
  }).optional(),
  
  // Analytics
  analytics: z.object({
    source: z.string().optional(),
    campaign: z.string().optional(),
    medium: z.string().optional()
  }).optional(),
  
  createdAt: z.string().default(new Date().toISOString()),
  updatedAt: z.string().default(new Date().toISOString()),
  
  // Revision history
  revisions: z.array(z.object({
    id: z.string(),
    author: z.string(),
    changes: z.string(),
    timestamp: z.string()
  })).default([])
});

// Blog comment schema
export const BlogCommentSchema = z.object({
  _id: z.string().optional(),
  postId: z.string(),
  author: z.object({
    name: z.string(),
    email: z.string().email(),
    avatar: z.string().optional(),
    userId: z.string().optional()
  }),
  content: z.string().min(1, 'Comment content is required'),
  parentId: z.string().optional(),
  status: z.enum(['Approved', 'Pending', 'Rejected']).default('Pending'),
  createdAt: z.string().default(new Date().toISOString()),
  updatedAt: z.string().default(new Date().toISOString()),
  replies: z.array(z.string()).default([]),
  likes: z.number().default(0),
  reports: z.number().default(0)
});

// Type inference
export type Blog = z.infer<typeof BlogSchema>;
export type BlogStatus = z.infer<typeof BlogStatusEnum>;
export type BlogCategory = z.infer<typeof BlogCategoryEnum>;
export type BlogComment = z.infer<typeof BlogCommentSchema>;

// Utility functions
export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
};

export const calculateReadTime = (content: string): number => {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
};

export const getBlogUrl = (blog: Blog): string => {
  return `/blog/${blog.slug}`;
};

export const isBlogPublished = (blog: Blog): boolean => {
  if (blog.status !== 'Published') return false;
  if (!blog.publishedAt) return false;
  
  const publishedDate = new Date(blog.publishedAt);
  const now = new Date();
  return publishedDate <= now;
};

export const getBlogExcerpt = (content: string, maxLength: number = 150): string => {
  const plainText = content.replace(/<[^>]*>/g, ''); // Remove HTML tags
  if (plainText.length <= maxLength) return plainText;
  
  return plainText.substring(0, maxLength).replace(/\s+\S*$/, '') + '...';
};

export const getRelatedBlogs = (blog: Blog, allBlogs: Blog[], limit: number = 3): Blog[] => {
  return allBlogs
    .filter(b => 
      b._id !== blog._id && 
      b.status === 'Published' &&
      (b.category === blog.category || b.tags.some(tag => blog.tags.includes(tag)))
    )
    .slice(0, limit);
};

export const getPopularBlogs = (blogs: Blog[], limit: number = 5): Blog[] => {
  return blogs
    .filter(blog => blog.status === 'Published')
    .sort((a, b) => {
      const scoreA = a.metrics.views + a.metrics.likes * 2 + a.metrics.comments * 3;
      const scoreB = b.metrics.views + b.metrics.likes * 2 + b.metrics.comments * 3;
      return scoreB - scoreA;
    })
    .slice(0, limit);
};

export const getRecentBlogs = (blogs: Blog[], limit: number = 5): Blog[] => {
  return blogs
    .filter(blog => blog.status === 'Published')
    .sort((a, b) => new Date(b.publishedAt || '').getTime() - new Date(a.publishedAt || '').getTime())
    .slice(0, limit);
};

export const getBlogBySlug = (blogs: Blog[], slug: string): Blog | undefined => {
  return blogs.find(blog => blog.slug === slug);
};

export const searchBlogs = (blogs: Blog[], query: string): Blog[] => {
  const searchTerm = query.toLowerCase();
  return blogs.filter(blog => 
    blog.status === 'Published' &&
    (
      blog.title.toLowerCase().includes(searchTerm) ||
      blog.content.toLowerCase().includes(searchTerm) ||
      blog.excerpt?.toLowerCase().includes(searchTerm) ||
      blog.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
      blog.category.toLowerCase().includes(searchTerm)
    )
  );
};
