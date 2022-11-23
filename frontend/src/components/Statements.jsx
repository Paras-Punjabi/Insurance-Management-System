import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { SERVER_URL } from '../config'
import LogedInNavBar from './LogedInNavBar'
import Rupee from './Rupee';

const Statements = ({data}) => {
  const [statements,setStatements] = useState([])
  useEffect(()=>{
    document.title = "Statements"
  },[])

  useEffect(()=>{
    let body = {cid:data.cid};
      fetch(`${SERVER_URL}/api/customer/statements`,{
        method:"POST",
        "mode":"cors",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(body)
      }).then(d=>{return d.json()}).then(s=>{
        if(s.status)
        setStatements(s.result)
        console.log(s.result);
      })
  },[data.cid])
  return (
    <>
    <LogedInNavBar data={data}/>
    <h1 className='text-center my-3'>{statements && statements.length !== 0 ? "Your Transactions" : "No Statements"}</h1>
    <div className='optedPolicies my-2'>
    {statements && statements.length !== 0 && <Table striped>
      <thead>
        <tr>
          <th>Sno.</th>
          <th>Transaction ID</th>
          <th>Policy ID</th>
          <th>Amount</th>
          <th>Due Date</th>
          <th>Pay Date</th>
          <th>Time</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {
          statements && statements.map((item,idx)=>{
              return(
                <tr key={idx}>
                  <td>{idx+1}</td>
                  <td>{item.tid}</td>
                  <td>{item.pid}</td>
                  <td><Rupee/>{item.amount}</td>
                  <td>{new Date(item.duedate).toDateString()}</td>
                  <td>{new Date(item.paydate).toDateString()}</td>
                  <td>{item.time}</td>
                  <td>{item.status === "paid" ? "PAID" : <Button variant="success" className="btn-sm"  >Pay Now</Button>}</td>
                </tr>
              )
          })
        }
      </tbody>
    </Table>}
    </div>
    </>
  )
}

export default Statements