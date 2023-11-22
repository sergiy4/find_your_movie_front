import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Collection from './features/collection/pages/Collection';
import Collections from './features/collection/pages/Collections';
import RandomCollection from './features/collection/pages/RandomCollections';
import FindYourMovie from './features/findYourMovie/pages/FindFourMovie';
import Home from './features/home/pages/Home';
import Login from './features/auth/pages/Login';
import SignUp from './features/auth/pages/SignUp';
import Movie from './features/movie/pages/Movie';
import Layout from './components/Layout';

const Router = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      // errorElement: <ErrorBoundary />,
      children: [
        {
          index: true,
          element: <Home />,
        },

        {
          path: 'login',
          element: <Login />,
        },
        {
          path: 'signUp',
          element: <SignUp />,
        },
        {
          path: 'FYM',
          element: <FindYourMovie />,
        },
        {
          path: 'collections',
          element: <Collections />,
        },
        {
          path: 'collections/:collectionID',
          element: <Collection />,
        },
        {
          path: 'randomCollections',
          element: <RandomCollection />,
        },
        {
          path: 'movie/:movieID',
          element: <Movie />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
