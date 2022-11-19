import React from 'react'
import Nav from 'react-bootstrap/Nav';
import Navbar  from 'react-bootstrap/Navbar';
import Button  from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { NAME } from '../config';

const NavbarComponent = ({hideSignUp,hideLogin}) => {
  return (
     <Navbar className='px-1 py-1' bg="dark" variant="dark">
          <Navbar.Brand className="mx-2" ><Link style={{"fontFamily":"monospace"}} className='h3 text-white text-decoration-none' to="/">{NAME.split(" ").join("-")}</Link></Navbar.Brand>

          <Nav className="me-auto d-flex flex-row">
            <Nav.Link><Link className=' text-white text-decoration-none' to="/">Home</Link></Nav.Link>

            <Nav.Link><Link className='text-decoration-none text-white' to="/about">About</Link></Nav.Link>

            <Nav.Link  ><Link className='text-decoration-none text-white' to="/contact">Contact Us</Link></Nav.Link>

          </Nav>

          { !hideLogin && <Link to="/login"><Button className="mx-2" size="sm"  variant="light">Login</Button></Link>}
          { !hideSignUp && <Link to="/signup"><Button className="mx-2" size="sm"  variant="light">Sign Up</Button></Link>}
      </Navbar>
  )
}

export default NavbarComponent