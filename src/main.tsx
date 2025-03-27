import { createRoot } from 'react-dom/client'
import { Home } from './pages/Home/index';
import { Rubric } from './pages/Rubric/index';
import { RubricList } from './pages/RubricList/index';
import { Login } from './pages/Login/index';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './global.scss';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        index: true,
        element: <RubricList />
      },
      {
        path: "/rubric",
        element: <Rubric />
      }
    ]
  },
  {
    path: "/login",
    element: <Login />
  }
]);

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
)
