import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { routesConfig } from './data/routersConfig';

export const router = createBrowserRouter(routesConfig);
const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
