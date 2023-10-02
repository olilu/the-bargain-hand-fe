import { Link, useNavigate, useMatch, useLocation } from 'react-router-dom';
import { Nav, Navbar, Container, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import logo from '../../assets/bargain_hand_white.png';

function MainHeader({title}) {
  const location = useLocation();
  const navigate = useNavigate();
  function addWishlistHandler() {
    navigate('/add-wishlist')
  }

  function checkPricesHandler() {
    console.log("check prices");
  }

  function doneHandler() {
    navigate(location.pathname.replace('search', 'games'));
  }

  return (
    <Navbar expand="lg" bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand as={Link} href="/"><img src={logo} alt='Bargain Hand' /></Navbar.Brand>
        <Navbar.Text className="text-white">Bargain Hand</Navbar.Text>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse>
          <Nav className="me-auto">
            <Nav.Link as={Link} href="/">Home</Nav.Link>
              {useMatch('/') && (
                    <>
                        <Nav.Item className="ms-2"><Button variant='light' onClick={addWishlistHandler}>Add Wishlist</Button></Nav.Item>
                    </> 
              )}
              {useMatch(':uuid/games') && (
                    <>
                        <Nav.Item className="ms-2"><Button variant='light' onClick={checkPricesHandler}>Check Prices</Button></Nav.Item>
                    </> 
              )}
              {useMatch(':uuid/search') && (
                    <>
                        <Nav.Item className="ms-2"><Button variant='success' onClick={doneHandler}>Done</Button></Nav.Item>
                    </> 
              )}
          </Nav>
            <Nav.Item className="ms-2 text-white"><h4>{title}</h4></Nav.Item>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MainHeader;