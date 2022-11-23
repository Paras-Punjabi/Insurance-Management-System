import React, { useEffect, useState } from 'react'
import { SERVER_URL } from '../config'
import LogedInNavBar from './LogedInNavBar'
import Card from 'react-bootstrap/Card';
import Rupee from './Rupee'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';

const NewPolicy = ({data}) => {
    const [policies,setPolicies] = useState()
    const [lgShow, setLgShow] = useState(false);
    const [policy,setPolicy] = useState("");
    const [renew,setRenew] = useState("");
    const [amount,setAmount] = useState("");
    const [ramount,setRAmount] = useState("");
    const [agents,setAgents] = useState([])
    const [aid,setAid] = useState("")
    const [pid,setPid] = useState("")
    const [showAlert,setAlert] = useState(false)
    const [showDangerAlert,setDangerAlert] = useState(false)
    const [msg,setMsg]= useState("")
    useEffect(()=>{
      document.title = "New Policy"
    },[])

    useEffect(()=>{
        fetch(`${SERVER_URL}/api/policy/fetch`,{method:"GET"}).then(d=>{
            return d.json()
        }).then(s=>{
            if(s.status)
            setPolicies(s.result)
        })
    },[])

    useEffect(()=>{
          fetch(`${SERVER_URL}/api/agent/fetch`,{method:"GET"}).then(d=>{
            return d.json()
        }).then(s=>{
            if(s.status)
            setAgents(s.result)
        })
    },[])

    function showModal(e){
      setPolicy(e.target.parentElement.children[0].innerHTML)
      setRenew(e.target.parentElement.children[2].lastElementChild.innerHTML)
      setAmount(e.target.parentElement.children[3].lastElementChild.innerHTML)
      setRAmount(e.target.parentElement.children[4].lastElementChild.innerHTML)
      setPid(e.target.id)
      setLgShow(true)
    }

    async function submit(){
      let body = {pid:pid,aid:aid,cid:data.cid,amount:amount,paydate:`${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`,time:`${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`}

      let d = await fetch(`${SERVER_URL}/api/customer/buy`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
        },
        body:JSON.stringify(body)
      })

      let res = await d.json()
      console.log(res);
      if(res.status){
        setLgShow(false)
        setAlert(true)
        setTimeout(()=>{
          setAlert(false)
        },1500)
      }
      else{
        setMsg(res.message)
        setLgShow(false)
        setDangerAlert(true)
        setTimeout(()=>{
          setDangerAlert(false)
        },1500)
      }
      
    }
  return (
   <>
   <LogedInNavBar data={data}/>
   {showAlert && <Alert  variant="success">Policy Bought Successfully...</Alert>}
   {showDangerAlert && <Alert  variant="danger">{msg}</Alert>}
   <Modal size="lg" show={lgShow} onHide={() => setLgShow(false)}aria-labelledby="example-modal-sizes-title-lg">
        <Modal.Header closeButton>
          <Modal.Title className='text-center' id="example-modal-sizes-title-lg">
            {policy}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            <Form.Select onChange={(e)=>{setAid(e.target.value)}} aria-label="Select Your Agent">
              <option id="dummy" key="dummy" value="Select your Agent">Select Your Agents </option>
            {
              agents && agents.map((item,idx)=>{
                return(
                  <option id={item.aid} key={item.aid} value={item.aid}>{item.name} - {item.contact}</option>
                )
              })
            }
            </Form.Select>
          </p>
          <p>Renew Within - {renew}</p>
          <p>Amount - <Rupee/>{amount}</p>
          <p>Return Amount- <Rupee/>{ramount}</p>


        </Modal.Body>
        <Modal.Footer>
          <Button onClick={submit} variant="success">
            Confirm
          </Button>
        <Button variant="danger" onClick={()=>{setLgShow(false)}}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

   <div className='policy d-flex flex-wrap flex-row justify-content-center'>
    {
        policies && policies.map((item,idx)=>{
            return(
                <Card key={idx} className="mx-2 my-2" style={{ width: '40%' }}>
                <Card.Body>
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Text>
                    {item.description}
                  </Card.Text>
                  <Card.Subtitle className="mb-2 text-muted"><span>Renew Within -</span> <span>{item.duration} months</span></Card.Subtitle>
                  <Card.Subtitle className="mb-2 text-muted"><span>Amount - </span><Rupee/><span>{item.amount}</span></Card.Subtitle>
                  <Card.Subtitle className="mb-2 text-muted"><span>Return Amount -</span> <Rupee/><span>{item.ramount}</span></Card.Subtitle>
                  <Button id={item.pid} onClick={showModal} variant='success'>Buy Now</Button>
                </Card.Body>
              </Card>
            )
        })
    }
   </div>
   </>
  )
}

export default NewPolicy