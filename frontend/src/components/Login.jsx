import React,{useEffect} from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { NAME } from '../config';
import Footer from './Footer';
import NavbarComponent from './NavbarComponent';

const Login = () => {
  useEffect(()=>{
    document.title = `${NAME} - Login`
  },[])
  return (
    <>
    <NavbarComponent hideLogin={true} hideSignUp={false}/>
    <h1 className='text-center my-2'>Customer Login</h1>
    <div className='loginForm my-3'>
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      <Button variant="success" className='mx-1' type="submit">
        Submit
      </Button>
      <Button variant="danger" type="submit" className='mx-1'>
        Reset
      </Button>
    </Form>
    </div>
    <Footer/>
    </>
  )
}

export default Login