import React,{useEffect} from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { NAME,SERVER_URL } from '../config';
import Footer from './Footer';
import NavbarComponent from './NavbarComponent';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const[email, setEmail] = useState("")
  const[password, setPassword] = useState("")
  const history = useNavigate()

  function reset(){
    setEmail("")
    setPassword("")
  }

  function changeEmail(e){
    setEmail(e.target.value)
  }

  function changePassword(e){
    setPassword(e.target.value)
  }

  async function submitData(e){
    e.preventDefault()
    let body = {email, password}
    console.log(body)
    let d = await fetch(`${SERVER_URL}/api/customer/login`,{
      method:"POST",
      mode:"cors",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(body)
    })
    let res = await d.json()
    console.log(res);
    reset()
    if(res.status){
        history(`/user/${res.user.email}`)
    }
  }

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
        <Form.Control type="email" value={email} onChange={changeEmail} placeholder="Enter email" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" value={password} onChange={changePassword} placeholder="Password" />
      </Form.Group>
      <Button variant="success" onClick={submitData} className='mx-1' type="submit">
        Submit
      </Button>
      <Button variant="danger" type="submit" onClick={reset} className='mx-1'>
        Reset
      </Button>
    </Form>
    </div>
    <Footer />
    </>
  )
}

export default Login