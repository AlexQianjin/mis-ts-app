import { createBrowserRouter } from 'react-router-dom';
import Layout from '../layouts';
import Home from '../pages/Home';
import ErrorPage from '../components/ErrorPage';
import MultiEditors from '../pages/MultiEditors';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '',
        element: <Home />
      },
      {
        path: 'editor',
        element: <MultiEditors />
      }
    ]
  }
]);

export default router;
