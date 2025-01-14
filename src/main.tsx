import { createRoot } from 'react-dom/client'
import { App } from './ui/frontend/app'
import './ui/frontend/styles/globals.scss'

createRoot(document.getElementById('root')!).render(<App />)
