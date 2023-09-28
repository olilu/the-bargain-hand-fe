import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'


import RootLayout from './routes/RootLayout'
import Wishlists, {loader as wishlistLoader} from './routes/wishlists/Wishlists'
import AddWishlist, {action as newWishlistAction} from './routes/wishlists/AddWishlist'
import EditWishlist, {action as editWishlistAction} from './routes/wishlists/EditWishlist'
import './index.css'


const router = createBrowserRouter(
  [
    { path: '/', element: <RootLayout />, children: [
      { path: '/', element: <Wishlists/>, loader: wishlistLoader},
      { path: 'add-wishlist', element: <AddWishlist />, action: newWishlistAction},
      { path: 'edit-wishlist', element: <EditWishlist/>, action: editWishlistAction},
    ]},
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
