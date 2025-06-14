import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Home } from './pages/Home';
import { About } from './pages/About';
// import { Archive } from './pages/Archive';
// import { Post, type PostPageProps } from './pages/Post';
// import { NotFound } from './pages/NotFound';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {/*
    path: "/archive",
    element: <Archive />,
  },
  {
      path: "/post/:slug",
      element: <Post />,
      loader: ({ params }) => ({ slug: params.slug }) as PostPageProps
  },
  {
    path: "*",
    element: <NotFound />,
  */},
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

