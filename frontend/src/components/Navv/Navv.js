import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './Navv.css'

function ColorSchemesExample() {
  return (
    <>
      <Navbar className='navv' bg="light" variant="dark">
        <Container>
          <Navbar.Brand className='text-primary' href="#home">Borsa</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link className='text-dark' href="#home">Home</Nav.Link>
            <Nav.Link className = 'text-dark' href="#features">Features</Nav.Link>
            <Nav.Link className='text-dark' href="#pricing">Pricing</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default ColorSchemesExample;