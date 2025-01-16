import { RouterProvider } from 'react-router-dom'
import { router } from '../routes/router'
import { MusicsProvider } from '../contexts/MusicsProvider'

export function App() {
  return (
    <MusicsProvider>
      <RouterProvider router={router} />
    </MusicsProvider>
  )
}
