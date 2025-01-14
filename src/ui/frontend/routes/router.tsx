import { createBrowserRouter } from 'react-router-dom'
import { DefaultLayout } from '../layouts/DefaultLayout'
import { HomePage } from '../pages/home'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
    ],
  },
])
