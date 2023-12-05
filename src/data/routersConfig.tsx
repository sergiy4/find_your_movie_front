import Collection from '../features/collection/pages/Collection';
import Collections from '../features/collection/pages/Collections';
import RandomCollection from '../features/collection/pages/RandomCollections';
import FindYourMovie from '../features/findYourMovie/pages/FindFourMovie';
import Home from '../features/home/pages/Home';
import Login from '../features/auth/pages/Login';
import SignUp from '../features/auth/pages/SignUp';
import Movie from '../features/movie/pages/Movie';
import Layout from '../components/Layout';
import FoundMoviePage from '../features/findYourMovie/pages/FoundMoviePage';
import ErrorBoundary from '../components/ErrorBoundary';

export const routesConfig = [
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorBoundary />,
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
        path: 'FYM/movie',
        element: <FoundMoviePage />,
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
        path: 'collections/:collectionID/movies/:movieID',
        element: <Movie />,
      },
      {
        path: 'randomCollections',
        element: <RandomCollection />,
      },
    ],
  },
];
