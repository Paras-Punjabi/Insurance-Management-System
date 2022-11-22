import React, { useEffect, useState } from 'react'
import LogedInNavBar from './LogedInNavBar'
import { SERVER_URL } from '../config'
import Table from 'react-bootstrap/Table';

const Agents = ({data}) => {
  const [agents,setAgents] = useState([])
  useEffect(()=>{
    document.title = "User Agents"
  },[])

  useEffect(()=>{
    let body = {cid:data.cid};
    fetch(`${SERVER_URL}/api/customer/agents`,{
      method:"POST",
      "mode":"cors",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(body)
    }).then(d=>{return d.json()}).then(s=>{
      if(s.status)
      setAgents(s.result)
      console.log(s.result);
    })
  },[data.cid])

  return (
    <>
    <LogedInNavBar data={data}/>
    <h1 className='text-center my-3'>Your Agents</h1>
    <div className='optedPolicies my-2'>
    <Table striped>
      <thead>
        <tr>
          <th>Sno.</th>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Gender</th>
          <th>Contact</th>
          <th>Address</th>
          <th>Pincode</th>
        </tr>
      </thead>
      <tbody>
        {
          agents && agents.map((item,idx)=>{
              return(
                <tr key={idx}>
                  <td>{idx+1}</td>
                  <td>{item.aid}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.gender === "M" ? "Male" : "Female"}</td>
                  <td>{item.contact}</td>
                  <td>{item.address}</td>
                  <td>{item.pincode}</td>
                </tr>
              )
          })
        }
      </tbody>
    </Table>
    </div>
    </>
  )
}

export default Agents