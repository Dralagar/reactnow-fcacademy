import { NextRequest, NextResponse } from 'next/server';
import { createDatabaseService } from '@/lib/services/database';
import { BlogSchema } from '@/lib/schemas/blog';
import { 
  generateSlug, 
  getPopularBlogs, 
  getRecentBlogs, 
  searchBlogs,
  isBlogPublished 
} from '@/lib/schemas/blog';

const blogService = createDatabaseService('blogs', BlogSchema);

// GET /api/blog - Get all blog posts
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Parse query parameters
    const search = searchParams.get('search');
    const category = searchParams.get('category');
    const status = searchParams.get('status') || 'Published';
    const featured = searchParams.get('featured') === 'true';
    const popular = searchParams.get('popular') === 'true';
    const recent = searchParams.get('recent') === 'true';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const slug = searchParams.get('slug');

    // Get single blog by slug
    if (slug) {
      const blogs = await blogService.findAll();
      const blog = blogs.find(b => b.slug === slug && isBlogPublished(b));
      
      if (!blog) {
        return NextResponse.json(
          { success: false, error: 'Blog post not found' },
          { status: 404 }
        );
      }

      return NextResponse.json({ success: true, data: blog });
    }

    // Get all blogs first for filtering
    let blogs = await blogService.findAll();

    // Filter by status
    blogs = blogs.filter(blog => blog.status === status);

    // Filter by category
    if (category) {
      blogs = blogs.filter(blog => blog.category === category);
    }

    // Filter featured
    if (featured) {
      blogs = blogs.filter(blog => blog.featured);
    }

    // Search functionality
    if (search) {
      blogs = searchBlogs(blogs, search);
    }

    // Get popular blogs
    if (popular) {
      blogs = getPopularBlogs(blogs, limit);
      return NextResponse.json({ 
        success: true, 
        data: blogs,
        pagination: {
          page: 1,
          limit: blogs.length,
          total: blogs.length,
          totalPages: 1
        }
      });
    }

    // Get recent blogs
    if (recent) {
      blogs = getRecentBlogs(blogs, limit);
      return NextResponse.json({ 
        success: true, 
        data: blogs,
        pagination: {
          page: 1,
          limit: blogs.length,
          total: blogs.length,
          totalPages: 1
        }
      });
    }

    // Sort by published date (newest first)
    blogs.sort((a, b) => {
      const dateA = new Date(a.publishedAt || '').getTime();
      const dateB = new Date(b.publishedAt || '').getTime();
      return dateB - dateA;
    });

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedBlogs = blogs.slice(startIndex, endIndex);

    return NextResponse.json({ 
      success: true, 
      data: paginatedBlogs,
      pagination: {
        page,
        limit,
        total: blogs.length,
        totalPages: Math.ceil(blogs.length / limit)
      }
    });

  } catch (error) {
    console.error('Error in GET /api/blog:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch blog posts' },
      { status: 500 }
    );
  }
}

// POST /api/blog - Create a new blog post
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Generate slug from title if not provided
    if (!body.slug) {
      body.slug = generateSlug(body.title);
    }

    // Validate request body
    const validatedData = BlogSchema.omit({ _id: true, createdAt: true, updatedAt: true }).parse(body);
    
    // Create blog post
    const blog = await blogService.create(validatedData);
    
    return NextResponse.json(
      { success: true, data: blog },
      { status: 201 }
    );

  } catch (error) {
    console.error('Error in POST /api/blog:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create blog post' },
      { status: 500 }
    );
  }
}
