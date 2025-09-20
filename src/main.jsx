import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

// Custom CSS Variables and Global Styles
const customStyles = `
:root {
  /* === CARD DIMENSIONS === */
  --card-width-standard: 280px;
  --card-height-game: 360px;
  --card-height-wishlist: 180px;
  --card-image-height: 200px;
  --card-border-radius: 12px;
  
  /* === SHADOW SYSTEM === */
  --card-shadow-light: 0 2px 8px rgba(0, 0, 0, 0.08);
  --card-shadow-medium: 0 4px 20px rgba(0, 0, 0, 0.12);
  --card-shadow-heavy: 0 8px 32px rgba(0, 0, 0, 0.16);
  --card-shadow-hover: 0 12px 48px rgba(0, 0, 0, 0.2);
  
  /* === COLORS & GRADIENTS === */
  --bg-gradient-primary: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --bg-gradient-secondary: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  --bg-gradient-success: linear-gradient(135deg, #1e3a8a 0%, #3730a3 100%);
  --bg-gradient-success-light: linear-gradient(135deg, #10b981 0%, #059669 100%);
  --bg-gradient-nintendo: linear-gradient(135deg, #e3342f 0%, #f6993f 100%);
  --bg-gradient-playstation: linear-gradient(135deg, #003791 0%, #00d4ff 100%);
  --bg-gradient-added: linear-gradient(135deg, #10b981 0%, #059669 100%);
  
  /* === BACKDROP & OVERLAYS === */
  --backdrop-blur: blur(10px);
  --overlay-dark: rgba(0, 0, 0, 0.3);
  --overlay-light: rgba(255, 255, 255, 0.1);
  
  /* === SPACING === */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;
  --spacing-card-gap: 1.5rem;
  
  /* === TRANSITIONS === */
  --transition-fast: all 0.2s cubic-bezier(0.4, 0.0, 0.2, 1);
  --transition-smooth: all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1);
  --transition-slow: all 0.4s cubic-bezier(0.4, 0.0, 0.2, 1);
  
  /* === TYPOGRAPHY === */
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
}

/* === GLOBAL CARD STYLES === */
.enhanced-card {
  width: var(--card-width-standard);
  border-radius: var(--card-border-radius);
  border: none;
  box-shadow: var(--card-shadow-light);
  transition: var(--transition-smooth);
  overflow: hidden;
  background: #fff;
}

.enhanced-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--card-shadow-hover);
}

.enhanced-card-image-container {
  width: 100%;
  height: var(--card-image-height);
  overflow: hidden;
  position: relative;
  background: #f8f9fa;
}

.enhanced-card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: var(--transition-smooth);
}

.enhanced-card:hover .enhanced-card-image {
  transform: scale(1.05);
}

/* === PLATFORM-SPECIFIC STYLING === */
.platform-nintendo {
  border-left: 4px solid #e3342f;
}

.platform-nintendo .enhanced-card-image-container::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, transparent 70%, rgba(227, 52, 47, 0.1) 100%);
  pointer-events: none;
}

.platform-playstation {
  border-left: 4px solid #003791;
}

.platform-playstation .enhanced-card-image-container::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, transparent 70%, rgba(0, 55, 145, 0.1) 100%);
  pointer-events: none;
}

/* === BUTTON ENHANCEMENTS === */
.enhanced-btn {
  border-radius: 8px;
  font-weight: var(--font-weight-medium);
  transition: var(--transition-fast);
  border: none;
  padding: 0.5rem 1rem;
}

.enhanced-btn:hover {
  transform: translateY(-1px);
  box-shadow: var(--card-shadow-medium);
}

.enhanced-btn-primary {
  background: var(--bg-gradient-primary);
  color: white;
}

.enhanced-btn-success {
  background: var(--bg-gradient-success);
  color: white;
}

.enhanced-btn-danger {
  background: var(--bg-gradient-secondary);
  color: white;
}

.enhanced-btn-success-light {
  background: var(--bg-gradient-success-light);
  color: white;
}

/* === ADDED TO WISHLIST STYLING === */
.enhanced-card-added {
  background: var(--bg-gradient-added) !important;
  border-left: 4px solid #059669 !important;
  box-shadow: 0 4px 20px rgba(16, 185, 129, 0.3) !important;
}

.enhanced-card-added .enhanced-card-image-container::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, transparent 70%, rgba(16, 185, 129, 0.2) 100%);
  pointer-events: none;
}

/* === RESPONSIVE GRID SYSTEM === */
.enhanced-card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(var(--card-width-standard), 1fr));
  gap: var(--spacing-card-gap);
  padding: var(--spacing-md);
}

@media (max-width: 576px) {
  .enhanced-card-grid {
    grid-template-columns: 1fr;
    justify-items: center;
  }
}

/* === LOADING ANIMATIONS === */
.enhanced-loading {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
}

@keyframes loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* === ENHANCED FORM STYLES === */
.form-control:focus {
  border-color: #667eea !important;
  box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.25) !important;
}

.form-control:hover {
  border-color: #adb5bd !important;
}

.enhanced-form-card {
  background: white;
  box-shadow: var(--card-shadow-medium);
  border-radius: var(--card-border-radius);
  overflow: hidden;
}

/* === NAVBAR ENHANCEMENTS === */
.navbar-toggler {
  border: 1px solid rgba(255, 255, 255, 0.2) !important;
  border-radius: 8px !important;
}

.navbar-toggler:focus {
  box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.25) !important;
}

.navbar-toggler-icon {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%28255, 255, 255, 0.8%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e") !important;
}

/* === PLATFORM RADIO BUTTONS === */
.platform-radio-label:hover {
  transform: translateY(-1px) !important;
  box-shadow: var(--card-shadow-medium) !important;
}

.platform-radio-input:focus + .platform-radio-label {
  outline: 2px solid #667eea;
  outline-offset: 2px;
}
`;

// Inject custom styles
const styleElement = document.createElement('style');
styleElement.textContent = customStyles;
document.head.appendChild(styleElement);

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
