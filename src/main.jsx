// main.jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './index.css'
import Lethu from './Users/Lethu.jsx'
import Ndivho from './Users/Ndivho.jsx'
import Cecilia from './Users/Cecilia.jsx'
import Roto from './Users/Roto.jsx'
import Pfano from './Users/Pfano.jsx'

const router = createBrowserRouter([
  {path: 'lethu_luv/:id?', element: <Lethu/>},
  {path: 'ndivho/:id?', element: <Ndivho/>},
  {path: 'cecilia_oluga/:id?', element: <Cecilia/>},
  {path: 'roto/:id?', element: <Roto/>},
  {path: 'pfano/:id?', element: <Pfano/>}
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)