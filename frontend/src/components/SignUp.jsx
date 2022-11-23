import React,{useEffect,useState} from 'react'
import {useNavigate} from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { NAME,SERVER_URL } from '../config';
import Footer from './Footer';
import NavbarComponent from './NavbarComponent';
import Alert from 'react-bootstrap/Alert';

const SignUp = () => {
  const history = useNavigate()
  const[name,setName] = useState("")
  const[email,setEmail] = useState("")
  const[dob,setDob] = useState("")
  const[gender,setGender] = useState("")
  const[address,setAddress] = useState("")
  const[pincode,setPincode] = useState("")
  const[contact,setContact] = useState("")
  const[mothername,setMotherName] = useState("")
  const[fathername,setFatherName] = useState("")
  const[password,setPassword] = useState("")
  const[confirmpassword,setConfirmPassword] = useState("")
  const[show,setShow] = useState(false)

  function changeName(e) {
    setName(e.target.value)
  }

  function changeEmail(e) {
    setEmail(e.target.value)
  }

  function changeDob(e) {
    setDob(e.target.value)
  }

  function changeGender(e) {
    setGender(e.target.value)
  }

  function changeAddress(e) {
    setAddress(e.target.value)
  }

  function changePincode(e) {
    setPincode(e.target.value)
  }

  function changeContact(e) {
    setContact(e.target.value)
  }

  function changeMotherName(e) {
    setMotherName(e.target.value)
  }

  function changeFatherName(e) {
    setFatherName(e.target.value)
  }

  function changePassword(e) {
    setPassword(e.target.value)
  }

  function changeConfirmPassword(e) {
    setConfirmPassword(e.target.value)
  }

  function reset() {
    setName("")
    setAddress("")
    setConfirmPassword("")
    setContact("")
    setDob("")
    setEmail("")
    setFatherName("")
    setGender("")
    setMotherName("")
    setPassword("")
    setPincode("")
  }

  async function submitData(e) {
    if(password !== confirmpassword || password===""){
      return
    }
    let body = {name,email,dob,gender,address,pincode,contact,mothername,fathername,password,confirmpassword}
    let d = await fetch(`${SERVER_URL}/api/customer/signup`,{
      method:"POST",
      mode:"cors",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(body)
    })
    let res = await d.json()
    console.log(res)
    window.scrollTo(0,0)
    setShow(true)
    reset()
    setTimeout(()=>{
      history("/")
    },2000)

  }
    useEffect(()=>{
        document.title = `${NAME} - SignUp`
    },[])
  return (
    <>
    <NavbarComponent hideSignUp={true} hideLogin={false} />
    {show && <Alert  variant="success">Success Account Created! Moving to Home Page.... so that, you can Login their.</Alert>}
    <h1 className='text-center my-2'> Customer Registration </h1>
    <div className='signupForm'>
    <Form className='my-3'>
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label> Name </Form.Label>
      <Form.Control required={true} type="text" value={name} onChange={changeName} placeholder="Ghost Rider" />
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label> Email </Form.Label>
      <Form.Control required={true} type="email" value={email} onChange={changeEmail} placeholder="ghostrider@gmail.com" />
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label> Date of Birth </Form.Label>
      <Form.Control required={true} type="date" value={dob} onChange={changeDob} />
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label> Gender </Form.Label>
        <Form.Select required={true} onChange={changeGender} value={gender}>
            <option> Male </option>
            <option> Female </option>
            <option> Non Binary </option>
        </Form.Select>
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label> Address </Form.Label>
      <Form.Control required={true} as="textarea" rows={3} value={address} onChange={changeAddress} />
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label> Pincode </Form.Label>
      <Form.Control required={true} type="number" value={pincode} onChange={changePincode} />
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label> Contact Number </Form.Label>
      <Form.Control required={true} type="number" value={contact} onChange={changeContact} />
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label> Mother Name </Form.Label>
      <Form.Control required={true} type="text" value={mothername} onChange={changeMotherName} />
    </Form.Group>
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label> Father Name </Form.Label>
      <Form.Control required={true} type="text" value={fathername} onChange={changeFatherName} />
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicPassword">
      <Form.Label> Password </Form.Label>
      <Form.Control required={true} type="password" value={password} onChange={changePassword} placeholder="Password" />
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicPassword">
      <Form.Label> Confirm Password </Form.Label>
      <Form.Control required={true} type="password" value={confirmpassword} onChange={changeConfirmPassword} placeholder="Password" />
    </Form.Group>

    {(password !== "" || confirmpassword!== "") && <h6 style={{"marginTop":"-10px","marginBottom":"22px","color":`${password === confirmpassword ? "green" : "red"}`}}>{password!== "" && password === confirmpassword ? "Password are Same" : "Password are not Same"}</h6>}

    <Button className='mx-2' variant="success" onClick={submitData}> Submit </Button>
    <Button variant="danger" className='mx-2' onClick={reset}> Reset </Button>
    </Form>
    </div>
  <Footer/>
  </>
  )
}

export default SignUp