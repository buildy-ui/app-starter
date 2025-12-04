/// <reference types="vite/client" />

import type { WPFastyContext } from '../wpfasty/types';

type PostsCollection = {
  posts: (WPFastyContext['archive']['posts'] & { tags?: { id: number; name: string; slug: string }[]; author?: { id: number; name: string; slug: string } })[];
};

// GraphQL API configuration
const GRAPHQL_ENDPOINT = import.meta.env.VITE_GRAPHQL_ENDPOINT || 'https://example.com/graphql';

interface GraphQLPost {
  id: string;
  postId: number;
  date: string;
  title: string;
  content: string;
  excerpt: string;
  categories: {
    nodes: Array<{
      id: string;
      categoryId: number;
      name: string;
    }>;
  };
  tags: {
    nodes: Array<{
      id: string;
      tagId: number;
      name: string;
    }>;
  };
  featuredImage?: {
    node: {
      id: string;
      sourceUrl: string;
      altText: string;
      caption?: string;
    };
  };
  postFields?: Array<{
    key: string;
    value: string;
  }>;
}

interface GraphQLResponse {
  data: {
    posts: {
      nodes: GraphQLPost[];
    };
  };
}

// Function to fetch posts from GraphQL API
async function fetchPostsFromAPI(): Promise<GraphQLPost[]> {
  const query = `
    {
      posts(first: 50) {
        nodes {
          id
          postId
          date
          title
          content
          excerpt
          categories {
            nodes {
              id
              categoryId
              name
            }
          }
          tags {
            nodes {
              id
              tagId
              name
            }
          }
          featuredImage {
            node {
              id
              sourceUrl
              altText
              caption
            }
          }
          postFields {
            key
            value
          }
        }
      }
    }
  `;

  try {
    const response = await fetch(GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      throw new Error(`GraphQL API error: ${response.status}`);
    }

    const result: GraphQLResponse = await response.json();
    return result.data.posts.nodes;
  } catch (error) {
    console.error('Failed to fetch posts from GraphQL API:', error);
    return [];
  }
}

// Transform GraphQL post to our internal format
function transformGraphQLPostToInternal(post: GraphQLPost): any {
  return {
    title: post.title,
    content: post.content,
    slug: `post-${post.postId}`, // Generate slug from ID
    url: `/posts/post-${post.postId}`,
    id: post.postId,
    excerpt: post.excerpt,
    featuredImage: post.featuredImage ? {
      url: post.featuredImage.node.sourceUrl,
      width: 800, // Default dimensions
        height: 600,
      alt: post.featuredImage.node.altText
    } : null,
    thumbnail: post.featuredImage ? {
      url: post.featuredImage.node.sourceUrl.replace('/w=800&h=600&fit=crop', '/w=300&h=200&fit=crop'),
        width: 300,
        height: 200,
      alt: post.featuredImage.node.altText
    } : null,
      meta: {
        _edit_last: '1',
      _edit_lock: `${Date.now()}:1`
    },
    categories: post.categories.nodes.map(cat => ({
      name: cat.name,
      url: `/category/${cat.name.toLowerCase().replace(/\s+/g, '-')}`,
      id: cat.categoryId,
      slug: cat.name.toLowerCase().replace(/\s+/g, '-'),
      description: `${cat.name} posts`,
      count: 1 // We don't have actual count from API
    })),
    tags: post.tags.nodes.map(tag => ({
      id: tag.tagId,
      name: tag.name,
      slug: tag.name.toLowerCase().replace(/\s+/g, '-')
    })),
    author: {
      id: 1, // Default author
      name: 'Admin',
      slug: 'admin'
    },
      date: {
      formatted: new Date(post.date).toISOString(),
      display: new Date(post.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      modified: new Date(post.date).toISOString(),
      modified_display: new Date(post.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      timestamp: Math.floor(new Date(post.date).getTime() / 1000),
      year: new Date(post.date).getFullYear().toString(),
      month: (new Date(post.date).getMonth() + 1).toString().padStart(2, '0'),
      day: new Date(post.date).getDate().toString().padStart(2, '0')
    }
  };
}

// Async function to get posts (for dynamic loading)
export async function getPosts(): Promise<PostsCollection> {
  const apiPosts = await fetchPostsFromAPI();
  const transformedPosts = apiPosts.map(transformGraphQLPostToInternal);

  return {
    posts: transformedPosts
  };
}

// Static posts for backward compatibility (fallback)
export const posts: PostsCollection = {
  posts: []
};

// Export async function as default for dynamic loading
export default getPosts;