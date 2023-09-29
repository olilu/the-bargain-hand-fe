import { Link, useNavigate } from 'react-router-dom';
import { Nav, Navbar, Container, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import logo from '../../assets/bargain_hand_white.png';

function MainHeader() {
  const navigate = useNavigate();
  function addWishlistHandler() {
    navigate('/add-wishlist')
  }

  return (
    <Navbar expand="lg" bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand as={Link} href="/"><img src={logo} alt='Bargain Hand' /></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} href="/">Home</Nav.Link>
            <Nav.Item className="ms-2"><Button variant='light' onClick={addWishlistHandler}>Add Wishlist</Button></Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MainHeader;