import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ThemeProvider } from "@/providers/theme"
import App from '@/App'
import NotFound from '@/exceptions/NotFound'
import ErrorBoundary from '@/exceptions/ErrorBoundary'
// routes
import Home from '@/routes/Home'
import About from '@/routes/About'
import Blog from '@/routes/Blog'
import Post from '@/routes/Post'
import Category from '@/routes/Category'
import Tag from '@/routes/Tag'
import Author from '@/routes/Author'
import Categories from '@/routes/Categories'
import Tags from '@/routes/Tags'
import Authors from '@/routes/Authors'
import Search from '@/routes/Search'
import Test from '@/routes/Test'
// styles
import './assets/css/index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorBoundary />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'blog', element: <Blog /> },
      { path: 'search', element: <Search /> },
      { path: 'categories', element: <Categories /> },
      { path: 'tags', element: <Tags /> },
      { path: 'authors', element: <Authors /> },
      { path: 'category/:slug', element: <Category /> },
      { path: 'tag/:slug', element: <Tag /> },
      { path: 'author/:slug', element: <Author /> },
      { path: 'posts/:slug', element: <Post /> },
      { path: '*', element: <NotFound /> }
    ]
  },
  {
    path: '/test',
    element: <Test />
  }
])

// LesseUI Theme
export const lesseUITheme = {
  name: "LesseUI",
  rounded: {
    // none | default | sm | md | lg | xl | "2xl" | "3xl" | full
    default: "2xl" as const,
    button: "lg" as const,
    badge: "full" as const
  },
  buttonSize: {
    // xs | sm | default | md | lg | xl | icon
    default: "sm" as const,
    badge: "sm" as const
  },
  isNavFixed: true
} as const;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={lesseUITheme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>
)
