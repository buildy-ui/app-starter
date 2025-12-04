import { Elysia } from 'elysia'
import { Database } from 'lmdb'

// Конфигурация
const GRAPHQL_ENDPOINT = process.env.GRAPHQL_ENDPOINT || 'https://maxql.app-server.ru/graphql'
const LMDB_PATH = process.env.LMDB_PATH || './data/lmdb'

// Инициализация LmDB
const db = new Database(LMDB_PATH, {
  cacheSize: 100 * 1024 * 1024, // 100MB cache
})

// GraphQL клиент
async function queryGraphQL(query: string, variables?: any) {
  const response = await fetch(GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables })
  })

  if (!response.ok) {
    throw new Error(`GraphQL Error: ${response.status}`)
  }

  return response.json()
}

// Кэширование с TTL
async function getCachedData<T>(key: string, ttlMs: number, fetcher: () => Promise<T>): Promise<T> {
  const cached = db.get(key) as { data: T; timestamp: number } | undefined

  if (cached && Date.now() - cached.timestamp < ttlMs) {
    return cached.data
  }

  const data = await fetcher()
  db.put(key, { data, timestamp: Date.now() })

  return data
}

// API эндпоинты
const app = new Elysia()
  .get('/api/posts', async () => {
    return await getCachedData(
      'posts',
      5 * 60 * 1000, // 5 минут кэша
      async () => {
        const query = `
          {
            posts(first: 50) {
              nodes {
                id
                postId
                title
                content
                excerpt
                categories { nodes { id categoryId name } }
                tags { nodes { id tagId name } }
                featuredImage { node { sourceUrl altText } }
                date
              }
            }
          }
        `

        const result = await queryGraphQL(query)
        return result.data.posts.nodes
      }
    )
  })

  .get('/api/post/:id', async ({ params: { id } }) => {
    return await getCachedData(
      `post-${id}`,
      10 * 60 * 1000, // 10 минут кэша
      async () => {
        const query = `
          query GetPost($id: ID!) {
            post(id: $id) {
              id
              title
              content
              excerpt
              categories { nodes { name } }
              tags { nodes { name } }
              featuredImage { node { sourceUrl altText } }
              date
            }
          }
        `

        const result = await queryGraphQL(query, { id })
        return result.data.post
      }
    )
  })

  .get('/ssr/:path', async ({ params: { path } }) => {
    // SSR рендеринг страниц
    const posts = await getCachedData('posts', 5 * 60 * 1000, async () => {
      // Получить посты
      const result = await queryGraphQL('{ posts(first: 10) { nodes { id title excerpt } } }')
      return result.data.posts.nodes
    })

    // Рендерить HTML с данными
    return `
      <!DOCTYPE html>
      <html>
        <head><title>SSR Page</title></head>
        <body>
          <h1>Server-Side Rendered Content</h1>
          <div id="posts">
            ${posts.map((post: any) => `<article><h2>${post.title}</h2><p>${post.excerpt}</p></article>`).join('')}
          </div>
        </body>
      </html>
    `
  })

app.listen(3000)
console.log('🚀 Server running on http://localhost:3000')

export type { Elysia }
