import React, { useEffect, useState } from 'react'
import { SERVER_URL } from '../config'
import LogedInNavBar from './LogedInNavBar'
import Card from 'react-bootstrap/Card';
import Rupee from './Rupee'
import { Button } from 'react-bootstrap';

const NewPolicy = ({data}) => {
    const [policies,setPolicies] = useState()
    useEffect(()=>{
      document.title = "New Policy"
    },[])
    useEffect(()=>{
        fetch(`${SERVER_URL}/api/policy/fetch`,{method:"GET"}).then(d=>{
            return d.json()
        }).then(s=>{
            if(s.status)
            setPolicies(s.result)
            console.log(s.result);
        })
    },[])
  return (
   <>
   <LogedInNavBar data={data}/>
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
                  <Card.Subtitle className="mb-2 text-muted">Renew Within - {item.duration/12} years</Card.Subtitle>
                  <Card.Subtitle className="mb-2 text-muted">Amount - <Rupee/>{item.amount}</Card.Subtitle>
                  <Card.Subtitle className="mb-2 text-muted">Return Amount - <Rupee/>{item.ramount}</Card.Subtitle>
                  <Button variant='success'>Buy Now</Button>
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