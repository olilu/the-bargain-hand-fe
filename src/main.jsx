import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';


import RootLayout from './routes/RootLayout'
import Wishlists, {loader as wishlistLoader} from './routes/wishlists/Wishlists'
import AddWishlist, {action as newWishlistAction} from './routes/wishlists/AddWishlist'
import EditWishlist, {loader as editWishlistLoader, action as editWishlistAction} from './routes/wishlists/EditWishlist'
import WishlistRoot, {loader as wishlistRootLoader} from './routes/wishlistGames/WishlistRoot'
import WishlistGames, {loader as wishlistGamesLoader} from './routes/wishlistGames/WishlistGames'
import WishlistSearch, {loader as wishlistSearchLoader} from './routes/wishlistGames/WishlistSearch'


const router = createBrowserRouter(
  [
    { path: '/', element: <RootLayout />, children: [
      { path: '/', element: <Wishlists/>, loader: wishlistLoader, children: [
        { path: 'add-wishlist', element: <AddWishlist />, action: newWishlistAction},
        { path: ':uuid/edit-wishlist', element: <EditWishlist/>, loader: editWishlistLoader, action: editWishlistAction},
      ]},
      { path: ':uuid', element: <WishlistRoot/>, loader: wishlistRootLoader, children: [
        { path: 'games', element: <WishlistGames />, loader: wishlistGamesLoader},
        { path: 'search', element: <WishlistSearch />, loader: wishlistSearchLoader},
      ]},
    ]},
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
