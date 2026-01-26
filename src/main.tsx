import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom"
import App from './App.tsx'
import './index.css'
import { DarkmodeProvider } from "./providers/DarkmodeProvider.tsx"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <DarkmodeProvider>
        <App />
      </DarkmodeProvider>
    </BrowserRouter>
  </StrictMode>,
)
