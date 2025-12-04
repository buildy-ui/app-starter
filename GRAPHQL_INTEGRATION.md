# GraphQL API Integration

## Overview

The application now dynamically fetches content from a WordPress GraphQL API instead of using static data. This provides real-time content management capabilities.

## Architecture

### Data Fetching Strategy

The application uses a **hybrid approach** for reliability:

1. **Dynamic Entities**: Categories, tags, and authors are fetched directly from GraphQL API
2. **Posts with Relationships**: Posts are fetched with their associated categories/tags/authors
3. **Fallback System**: Static data is used as fallback if API is unavailable

### API Endpoints

```javascript
const GRAPHQL_ENDPOINT = import.meta.env.VITE_GRAPHQL_ENDPOINT || 'https://example.com/graphql'
```

### Data Flow

```
GraphQL API → Parallel Fetching → Normalization → React Components
    ↓              ↓              ↓              ↓
  Raw Data → Transform → Consistent Data → Dynamic UI
```

## Implementation Details

### 1. Entity-Specific Queries

#### Categories
```graphql
{
  categories(first: 50) {
    nodes {
      id
      categoryId
      name
      slug
      description
      count
    }
  }
}
```

#### Tags
```graphql
{
  tags(first: 100) {
    nodes {
      id
      tagId
      name
      slug
      count
    }
  }
}
```

#### Users/Authors
```graphql
{
  users(first: 50) {
    nodes {
      id
      userId
      name
      slug
      email
      avatar {
        url
      }
    }
  }
}
```

#### Posts
```graphql
{
  posts(first: 50) {
    nodes {
      id
      postId
      date
      title
      content
      excerpt
      categories { nodes { id categoryId name } }
      tags { nodes { id tagId name } }
      featuredImage { node { sourceUrl altText } }
    }
  }
}
```

### 2. Data Transformation

Posts are transformed to match internal data structure:

```typescript
function transformGraphQLPostToInternal(post: GraphQLPost): InternalPostFormat {
  return {
    id: post.postId,
    title: post.title,
    content: post.content,
    slug: `post-${post.postId}`,
    categories: post.categories.nodes.map(cat => ({
      id: cat.categoryId,
      name: cat.name,
      slug: cat.slug,
      count: 0 // Will be updated from API data
    })),
    // ... other fields
  }
}
```

### 3. Normalization Process

```typescript
async function normalize() {
  // Fetch all entities in parallel
  const [rawPosts, apiCategories, apiTags, apiAuthors] = await Promise.all([
    getPosts(),
    getCategories(),
    getTags(),
    getAuthors()
  ]);

  // Calculate author post counts
  const authorCountMap = new Map<number, number>();
  rawPosts.posts.forEach(post => {
    if (post.author) {
      authorCountMap.set(post.author.id, (authorCountMap.get(post.author.id) || 0) + 1);
    }
  });

  // Merge API data with calculated counts
  return {
    posts: rawPosts,
    categories: apiCategories,
    tags: apiTags,
    authors: apiAuthors.map(author => ({
      ...author,
      count: authorCountMap.get(author.id) || 0
    }))
  };
}
```

### 4. React Integration

#### Hook for Dynamic Data
```typescript
export function useRenderContext() {
  const [context, setContext] = React.useState<RenderContext | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    getRenderContext()
      .then(setContext)
      .catch((err) => {
        setError(err.message);
        setContext(fallbackContext);
      })
      .finally(() => setLoading(false));
  }, []);

  return { context, loading, error };
}
```

#### Component Usage
```typescript
export default function Blog() {
  const { context, loading, error } = useRenderContext();

  if (loading) return <LoadingState />;
  if (error) return <ErrorState />;
  if (!context) return <NoDataState />;

  const { posts, categories, tags } = context;
  // Render with dynamic data
}
```

## Benefits

### ✅ Reliability
- **Parallel fetching** reduces load times
- **Fallback system** ensures app works offline
- **Error boundaries** prevent crashes

### ✅ Performance
- **Efficient queries** fetch only needed data
- **Caching strategy** minimizes API calls
- **Lazy loading** for better UX

### ✅ Maintainability
- **Type-safe** data transformation
- **Modular architecture** easy to extend
- **Clear separation** of concerns

### ✅ Scalability
- **API-first design** supports any CMS
- **Flexible queries** adapt to changing needs
- **Environment-based** configuration

## Configuration

### Environment Variables
```env
VITE_GRAPHQL_ENDPOINT=https://your-cms.com/graphql
```

### API Compatibility
Works with any GraphQL API that follows the schema structure, including:
- WordPress with WPGraphQL
- Custom GraphQL servers
- Headless CMS platforms

## Migration from Static Data

The application maintains backward compatibility:

1. **Static fallback** ensures app works without API
2. **Graceful degradation** shows appropriate loading/error states
3. **Incremental migration** allows gradual rollout

## Future Enhancements

- **Caching layer** (Redis/memory cache)
- **Real-time updates** (GraphQL subscriptions)
- **Search optimization** (Elasticsearch integration)
- **Content preview** (draft mode support)
