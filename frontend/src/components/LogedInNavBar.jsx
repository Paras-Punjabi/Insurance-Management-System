import React from 'react'
import Nav from 'react-bootstrap/Nav';
import Navbar  from 'react-bootstrap/Navbar';
import Button  from 'react-bootstrap/Button';
import { Link, useNavigate } from 'react-router-dom';
import { NAME } from '../config';

const LogedInNavBar = ({data}) => {
    const history = useNavigate();
    function logout(){
        history("/")
    }
  return (
     <Navbar className='px-1 py-1' bg="dark" variant="dark">
          <Navbar.Brand className="mx-2" ><Link style={{"fontFamily":"monospace"}} className='h3 text-white text-decoration-none' to="/">{NAME.split(" ").join("-")}</Link></Navbar.Brand>

          <Nav className="me-auto d-flex flex-row">

          <Link to={`/user/${data.email}/`}><Button className="mx-2 mt-1" size="sm"  variant="light">Profile</Button></Link>

          <Link to={`/user/${data.email}/new`}><Button className="mx-2 mt-1" size="sm"  variant="light">New Policy</Button></Link>

          <Link to={`/user/${data.email}/policies`}><Button className="mx-2 mt-1" size="sm"  variant="light">Your Policies</Button></Link>

          <Link to={`/user/${data.email}/statements`}><Button className="mx-2 mt-1" size="sm"  variant="light">Statements</Button></Link>

          <Link to={`/user/${data.email}/agents`}><Button className="mx-2 mt-1" size="sm"  variant="light">Your Agents</Button></Link>

          </Nav>
            <Button className="mx-2" onClick={()=>{logout()}} size="sm" variant="danger">Logout</Button>
      </Navbar>
  )
}

export default LogedInNavBar