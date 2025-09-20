import { useState } from 'react';
import { Link, useNavigate, useMatch, useLocation } from 'react-router-dom';
import { Nav, Navbar, Container, Button, Spinner } from 'react-bootstrap';
import { MdCached } from 'react-icons/md';
import 'bootstrap/dist/css/bootstrap.min.css';

import logo from '../../assets/bargain_hand_white.png';

function Navigation() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  function addWishlistHandler() {
    navigate('/add-wishlist')
  }

  async function checkPricesHandler() {
    setIsLoading(true);
    const wishlistUuid = location.pathname.split('/')[1];
    const url = `/api/wishlist/${wishlistUuid}/check-prices`;
    const res = await fetch(url);
    if (!res.ok) {
      console.log(`${res.url} returned ${res.status} ${res.statusText}`);
    }
    setIsLoading(false);
    navigate(location.pathname, { replace: true });
  }

  function reloadHandler() {
    navigate(location.pathname);
  }

  function doneHandler() {
    navigate(location.pathname.replace('search', 'games'));
  }

  return (
    <Navbar expand="lg" style={{
      background: 'linear-gradient(135deg, #2d3748 0%, #1a202c 100%)',
      boxShadow: 'var(--card-shadow-medium)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
    }} data-bs-theme="dark">
      <Container>
        <Navbar.Brand as={Link} href="/" style={{ textDecoration: 'none' }}>
          <div className="d-flex align-items-center">
            <img src={logo} alt='Bargain Hand' style={{ 
              height: '40px', 
              marginRight: 'var(--spacing-sm)',
              filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))'
            }} />
            <span style={{ 
              color: 'white', 
              fontSize: '1.5rem',
              fontWeight: 'var(--font-weight-semibold)',
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
            }}>
              Bargain Hand
            </span>
          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" style={{
          border: 'none',
          boxShadow: 'none'
        }} />
        <Navbar.Collapse>
          <Nav className="ms-auto gap-2">
            <Nav.Link as={Link} href="/" style={{ padding: '0' }}>
              <button className="enhanced-btn enhanced-btn-primary" style={{
                minWidth: '80px',
                fontSize: '0.9rem'
              }}>
                Home
              </button>
            </Nav.Link>
            {useMatch('/') && (
              <Nav.Link style={{ padding: '0' }}>
                <button className="enhanced-btn enhanced-btn-primary" onClick={addWishlistHandler} style={{
                  minWidth: '120px',
                  fontSize: '0.9rem'
                }}>
                  Add Wishlist
                </button>
              </Nav.Link>
            )}
            {useMatch(':uuid/games') && (
              <>
                <Nav.Link style={{ padding: '0' }}>
                  <button 
                    className="enhanced-btn enhanced-btn-primary" 
                    onClick={checkPricesHandler} 
                    disabled={isLoading}
                    style={{
                      minWidth: '120px',
                      fontSize: '0.9rem',
                      opacity: isLoading ? '0.7' : '1',
                      cursor: isLoading ? 'not-allowed' : 'pointer'
                    }}
                  >
                    {isLoading && (
                      <Spinner 
                        as="span" 
                        animation="border" 
                        variant="light" 
                        size="sm" 
                        className='me-2' 
                        style={{ width: '16px', height: '16px' }}
                      />
                    )}
                    Check Prices
                  </button>
                </Nav.Link>
                <Nav.Link style={{ padding: '0' }}>
                  <button className="enhanced-btn enhanced-btn-primary" onClick={reloadHandler} style={{
                    minWidth: '100px',
                    fontSize: '0.9rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <MdCached size={18} className='me-2' />
                    Reload
                  </button>
                </Nav.Link>
              </>
            )}
            {useMatch(':uuid/search') && (
              <Nav.Link style={{ padding: '0' }}>
                <button className="enhanced-btn enhanced-btn-success-light" onClick={doneHandler} style={{
                  minWidth: '80px',
                  fontSize: '0.9rem',
                  background: 'var(--bg-gradient-success-light)',
                  color: 'white'
                }}>
                  Done
                </button>
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;