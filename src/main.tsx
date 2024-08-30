
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import RC from './RC.tsx'
import './index.css'
import ErrorPage from './error-page.tsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router  = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <ErrorPage />,
  },
  {
    path: "/Cloud-Resume",
    element:<RC/>
  }
]);
createRoot(document.getElementById('root')!).render(
  <>
    <RouterProvider router = {router}/>
  </>
)
