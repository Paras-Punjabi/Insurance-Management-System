import React, { useEffect,useState } from 'react'
import { NAME, SERVER_URL } from '../config'
import Footer from './Footer'
import NavbarComponent from './NavbarComponent'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

const Contact = () => {
  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const [data,setData] = useState("")

  function changeName(e){
    setName(e.target.value)
  }
  function changeEmail(e){
    setEmail(e.target.value)
  }
  function changeData(e){
    setData(e.target.value)
  }

  function reset(){
    setName("")
    setEmail("")
    setData("")
  }

  async function submitData(){
    let body = {name,email,data}
    let d = await fetch(`${SERVER_URL}/api/contact`,{
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
  }
  
  useEffect(()=>{
      document.title = `${NAME} - Contact`
  },[])

  return (
    <>
    <NavbarComponent/>
    <div className='forms'>
    <Form>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" onChange={changeName} value={name} placeholder="John Richard" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Email</Form.Label>
        <Form.Control value={email} onChange={changeEmail} type="email" placeholder="name@example.com" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Your Concern</Form.Label>
        <Form.Control as="textarea" onChange={changeData} value={data} placeholder='Write about your concern...' rows={5} />
      </Form.Group>
      <ButtonGroup>
      <Button className='my-2 mx-1' onClick={submitData} variant="success">Submit</Button>
      <Button className='my-2 mx-1' onClick={reset} variant="danger">Reset</Button>
      </ButtonGroup>
    </Form>
    </div>
    <Footer/>
    </>
  )
}

export default Contact