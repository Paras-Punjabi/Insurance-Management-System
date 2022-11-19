import React,{useEffect} from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { NAME } from '../config';
import Footer from './Footer';
import NavbarComponent from './NavbarComponent';

const SignUp = () => {
    useEffect(()=>{
        document.title = `${NAME} - SignUp`
    },[])
  return (
    <>
    <NavbarComponent hideSignUp={true} hideLogin={false} />
    <h1 className='text-center my-2'>Customer Registration</h1>
    <div className='signupForm'>
    <Form className='my-3'>
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Name</Form.Label>
      <Form.Control type="text" placeholder="Ghost Rider" />
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Email</Form.Label>
      <Form.Control type="email" placeholder="ghostrider@gmail.com" />
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Date of Birth</Form.Label>
      <Form.Control type="date" />
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Gender</Form.Label>
        <Form.Select>
            <option>Male</option>
            <option>Female</option>
            <option>Non Binary</option>
        </Form.Select>
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Address</Form.Label>
      <Form.Control as="textarea" rows={3} />
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Pincode</Form.Label>
      <Form.Control type="number" />
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Contact Number</Form.Label>
      <Form.Control type="number" />
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Mother Name</Form.Label>
      <Form.Control type="text" />
    </Form.Group>
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Father Number</Form.Label>
      <Form.Control type="text" />
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicPassword">
      <Form.Label>Password</Form.Label>
      <Form.Control type="password" placeholder="Password" />
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicPassword">
      <Form.Label>Confirm Password</Form.Label>
      <Form.Control type="password" placeholder="Password" />
    </Form.Group>

    <Button className='mx-2' variant="success">Submit</Button>
    <Button variant="danger" className='mx-2'>Reset</Button>
    </Form>
    </div>
  <Footer/>
  </>
  )
}

export default SignUp