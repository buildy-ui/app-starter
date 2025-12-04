# Environment Variables Setup

## GraphQL API Configuration

The application uses a GraphQL API to fetch posts dynamically. The API endpoint is configured via environment variables.

### Setup

1. Copy the example environment file:
   ```bash
   cp env.example .env
   ```

2. Or create a `.env` file with the following content:
   ```env
   # GraphQL API endpoint
   VITE_GRAPHQL_ENDPOINT=https://example.com/graphql
   ```

### Environment Variables

- `VITE_GRAPHQL_ENDPOINT`: URL of the GraphQL API endpoint (defaults to `https://example.com/graphql`)

### Development

The application will work with the default endpoint if no environment variable is set, but for production deployments, always set the appropriate GraphQL endpoint.

### Vite Configuration

The Vite config automatically loads environment variables prefixed with `VITE_` and makes them available in the client-side code via `import.meta.env`.
