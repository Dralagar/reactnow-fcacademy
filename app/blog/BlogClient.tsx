"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import SitePageHero from '@/components/SitePageHero';
import { motion } from 'framer-motion';

interface Blog {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    id: string;
    role?: string;
    avatar?: string;
  };
  category: string;
  tags: string[];
  status: string;
  featured: boolean;
  featuredImage?: string;
  publishedAt?: string;
  metrics: {
    views: number;
    likes: number;
    comments: number;
  };
  createdAt: string;
  updatedAt: string;
}

interface BlogResponse {
  success: boolean;
  data: Blog[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export default function BlogClient() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);

  const categories = [
    'all',
    'News',
    'Match Report',
    'Player Spotlight',
    'Coach Interview',
    'Training Tips',
    'Club Announcement',
    'Community',
    'Development',
    'Success Story'
  ];

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog' }
  ];

  useEffect(() => {
    fetchBlogs();
  }, [selectedCategory, searchTerm, currentPage]);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '6',
        status: 'Published'
      });

      if (selectedCategory !== 'all') {
        params.append('category', selectedCategory);
      }

      if (searchTerm) {
        params.append('search', searchTerm);
      }

      const response = await fetch(`/api/blog?${params}`);
      const data: BlogResponse = await response.json();

      if (data.success) {
        setBlogs(data.data);
      } else {
        setError('Failed to fetch blog posts');
      }
    } catch (err) {
      setError('An error occurred while fetching blog posts');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'News': 'bg-blue-100 text-blue-800',
      'Match Report': 'bg-green-100 text-green-800',
      'Player Spotlight': 'bg-purple-100 text-purple-800',
      'Coach Interview': 'bg-orange-100 text-orange-800',
      'Training Tips': 'bg-red-100 text-red-800',
      'Club Announcement': 'bg-yellow-100 text-yellow-800',
      'Community': 'bg-pink-100 text-pink-800',
      'Development': 'bg-indigo-100 text-indigo-800',
      'Success Story': 'bg-emerald-100 text-emerald-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <main className="flex min-h-screen flex-col bg-white">
        <SitePageHero
          title="Academy Blog"
          subtitle="Loading stories from the pitch..."
          imageSrc="/images/React2.jpeg"
          imageAlt="React Now FC stories"
          showBreadcrumb={true}
          breadcrumbItems={breadcrumbItems}
        />
        <section className="section">
          <div className="container-custom mx-auto max-w-6xl px-4">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-[16/10] bg-gray-200 rounded-2xl mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-screen flex-col bg-white">
        <SitePageHero
          title="Academy Blog"
          subtitle="Match recaps, player spotlights, and honest notes from the people who live this work daily."
          imageSrc="/images/React2.jpeg"
          imageAlt="React Now FC stories"
          showBreadcrumb={true}
          breadcrumbItems={breadcrumbItems}
        />
        <section className="section">
          <div className="container-custom mx-auto max-w-6xl px-4">
            <div className="text-center py-12">
              <p className="text-red-600 mb-4">{error}</p>
              <button
                onClick={fetchBlogs}
                className="btn btn-primary"
              >
                Try Again
              </button>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col bg-white">
      <SitePageHero
        title="Academy Blog"
        subtitle="Match recaps, player spotlights, and honest notes from the people who live this work daily."
        imageSrc="/images/React2.jpeg"
        imageAlt="React Now FC stories"
        showBreadcrumb={true}
        breadcrumbItems={breadcrumbItems}
      />

      {/* Filters and Search */}
      <section className="section bg-gray-50">
        <div className="container-custom mx-auto max-w-6xl px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="w-full md:w-96">
              <input
                type="text"
                placeholder="Search blog posts..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    setSelectedCategory(category);
                    setCurrentPage(1);
                  }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-primary text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                  }`}
                >
                  {category === 'all' ? 'All Posts' : category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="section">
        <div className="container-custom mx-auto max-w-6xl px-4">
          {blogs.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No blog posts found
              </h3>
              <p className="text-gray-600 mb-4">
                {searchTerm || selectedCategory !== 'all'
                  ? 'Try adjusting your filters or search terms.'
                  : 'Check back soon for new stories from the academy!'}
              </p>
              {(searchTerm || selectedCategory !== 'all') && (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                    setCurrentPage(1);
                  }}
                  className="btn btn-outline"
                >
                  Clear Filters
                </button>
              )}
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {blogs.map((blog, index) => (
                <motion.article
                  key={blog._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                >
                  <Link href={`/blog/${blog.slug}`}>
                    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300">
                      {/* Featured Image */}
                      {blog.featuredImage ? (
                        <div className="relative aspect-[16/10] overflow-hidden">
                          <Image
                            src={blog.featuredImage}
                            alt={blog.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        </div>
                      ) : (
                        <div className="aspect-[16/10] bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                          <span className="text-4xl text-primary/30">📝</span>
                        </div>
                      )}

                      <div className="p-6">
                        {/* Category and Date */}
                        <div className="flex items-center gap-2 mb-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(blog.category)}`}>
                            {blog.category}
                          </span>
                          <span className="text-sm text-gray-500">
                            {blog.publishedAt && formatDate(blog.publishedAt)}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                          {blog.title}
                        </h3>

                        {/* Excerpt */}
                        <p className="text-gray-600 mb-4 line-clamp-3">
                          {blog.excerpt || blog.content.substring(0, 150) + '...'}
                        </p>

                        {/* Author and Read Time */}
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <div className="flex items-center gap-2">
                            {blog.author.avatar ? (
                              <Image
                                src={blog.author.avatar}
                                alt={blog.author.name}
                                width={24}
                                height={24}
                                className="rounded-full"
                              />
                            ) : (
                              <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
                                <span className="text-xs">👤</span>
                              </div>
                            )}
                            <span>{blog.author.name}</span>
                          </div>
                          <span>{getReadTime(blog.content)} min read</span>
                        </div>

                        {/* Tags */}
                        {blog.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-3">
                            {blog.tags.slice(0, 3).map((tag) => (
                              <span
                                key={tag}
                                className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
                              >
                                #{tag}
                              </span>
                            ))}
                            {blog.tags.length > 3 && (
                              <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                                +{blog.tags.length - 3}
                              </span>
                            )}
                          </div>
                        )}

                        {/* Metrics */}
                        <div className="flex items-center gap-4 mt-4 text-sm text-gray-500">
                          <span>👁️ {blog.metrics.views}</span>
                          <span>❤️ {blog.metrics.likes}</span>
                          <span>💬 {blog.metrics.comments}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="section bg-gray-50">
        <div className="container-custom mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Stay Updated
          </h2>
          <p className="text-gray-600 mb-6">
            Get the latest stories, match reports, and training insights delivered to your inbox.
          </p>
          <Link href="/contact" className="btn btn-primary">
            Subscribe for Updates
          </Link>
        </div>
      </section>
    </main>
  );
}
