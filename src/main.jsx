// main.jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './index.css'
import Lethu from './Users/Lethu.jsx'
import Ndivho from './Users/Ndivho.jsx'

const router = createBrowserRouter([
  {path: 'lethu_luv/:id?', element: <Lethu/>},
  {path: 'ndivho/:id?', element: <Ndivho/>}
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)