import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'


import RootLayout from './routes/RootLayout'
import Wishlists, {loader as wishlistLoader} from './routes/Wishlists'
import './index.css'


const router = createBrowserRouter(
  [
    { path: '/', element: <RootLayout />, children: [
      { path: '/', element: <Wishlists/>, loader: wishlistLoader},
    ]},
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
