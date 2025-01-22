import { RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { MusicsProvider } from '../contexts/MusicsProvider'
import { router } from '../routes/router'

export function App() {
  return (
    <MusicsProvider>
      <RouterProvider router={router} />
      <ToastContainer />
    </MusicsProvider>
  )
}
