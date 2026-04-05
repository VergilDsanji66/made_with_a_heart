// main.jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import TheGift from './Components/TheGift.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        
        {/* Direct gift routes - bypass landing page */}
        <Route path="/lethu" element={<TheGift />} />
        <Route path="/Ndivho" element={<TheGift />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)