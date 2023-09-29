import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';


import RootLayout from './routes/RootLayout'
import Wishlists, {loader as wishlistLoader} from './routes/wishlists/Wishlists'
import AddWishlist, {action as newWishlistAction} from './routes/wishlists/AddWishlist'
import EditWishlist, {loader as editWishlistLoader, action as editWishlistAction} from './routes/wishlists/EditWishlist'
import WishlistRoot from './routes/wishlsitGames/WishlistRoot'


const router = createBrowserRouter(
  [
    { path: '/', element: <RootLayout />, children: [
      { path: '/', element: <Wishlists/>, loader: wishlistLoader, children: [
        { path: 'add-wishlist', element: <AddWishlist />, action: newWishlistAction},
        { path: ':uuid/edit-wishlist', element: <EditWishlist/>, loader: editWishlistLoader, action: editWishlistAction},
      ]},
      { path: ':uuid', element: <WishlistRoot/>},
    ]},
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
