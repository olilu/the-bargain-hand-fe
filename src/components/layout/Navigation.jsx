import { useState } from 'react';
import { Link, useNavigate, useMatch, useLocation } from 'react-router-dom';
import { Nav, Navbar, Container, Button, Spinner } from 'react-bootstrap';
import { MdCached, MdCheckCircle } from 'react-icons/md';
import 'bootstrap/dist/css/bootstrap.min.css';

import logo from '../../assets/bargain_hand_white.png';

function Navigation() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();
  function addWishlistHandler() {
    navigate('/add-wishlist')
  }

  async function checkPricesHandler() {
    setIsLoading(true);
    const wishlistUuid = location.pathname.split('/')[1];
    console.log("wishlsit uuid: " + wishlistUuid);
    const url = `${import.meta.env.VITE_BACKEND_URL}/wishlist/${wishlistUuid}/check-prices`;
    console.log(url);
    const res = await fetch(url);
    if (!res.ok) {
      console.log(`${res.url} returned ${res.status} ${res.statusText}`);
    }
    setIsLoading(false);
    setChecked(true);
    navigate(location.pathname, { replace: true });
  }

  function reloadHandler() {
    navigate(location.pathname);
  }

  function doneHandler() {
    navigate(location.pathname.replace('search', 'games'));
  }

  return (
    <Navbar expand="lg" bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand as={Link} href="/"><img src={logo} alt='Bargain Hand' /></Navbar.Brand>
        <Navbar.Text className="text-white fs-5 me-2">Bargain Hand</Navbar.Text>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse>
          <Nav className="me-auto">
            <Nav.Link as={Link} href="/"><Button variant='light'>Home</Button></Nav.Link>
            {useMatch('/') && (
                <Nav.Link><Button variant='light' onClick={addWishlistHandler}>Add Wishlist</Button></Nav.Link>
            )}
            {useMatch(':uuid/games') && (
              <>
                <Nav.Link ><Button variant='light' onClick={checkPricesHandler} disabled={isLoading}>
                  {isLoading && (<Spinner as="span" animation="border" variant="dark" size="sm" className='me-1' />)}
                  Check Prices</Button>
                </Nav.Link>
                <Nav.Link ><Button variant='light' onClick={reloadHandler} >
                  <MdCached size={20} className='me-1' />
                  Reload</Button>
                </Nav.Link>
              </>
            )}
            {useMatch(':uuid/search') && (
              <>
                <Nav.Link><Button variant='success' onClick={doneHandler}>Done</Button></Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;