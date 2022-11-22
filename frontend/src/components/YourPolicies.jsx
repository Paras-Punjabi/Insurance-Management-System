import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import { SERVER_URL } from '../config'
import LogedInNavBar from './LogedInNavBar'
import Rupee from './Rupee';

const YourPolicies = ({data}) => {

    const [policies,setPolicies] = useState([])
    useEffect(()=>{
      document.title = "Your Policy"
    },[])
    useEffect(()=>{
      let body = {cid:data.cid};
        fetch(`${SERVER_URL}/api/customer/policies`,{
          method:"POST",
          "mode":"cors",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify(body)
        }).then(d=>{return d.json()}).then(s=>{
          if(s.status)
          setPolicies(s.result)
          console.log(s.result);
        })
    },[data.cid])

  return (
    <>
    <LogedInNavBar data={data}/>
    <h1 className='text-center my-3'>Your Policies</h1>
    <div className='optedPolicies my-2'>
    <Table striped>
      <thead>
        <tr>
          <th>Sno.</th>
          <th>Policy ID</th>
          <th>Policy Name</th>
          <th>Agent ID</th>
          <th>Agent Name</th>
          <th>Return Amount</th>
          <th>Interval(years)</th>
          <th>Payment(per interval)</th>
          <th>Total Amount Paid</th>
        </tr>
      </thead>
      <tbody>
        {
          policies && policies.map((item,idx)=>{
              return(
                <tr key={idx}>
                  <td>{idx+1}</td>
                  <td>{item.pid}</td>
                  <td>{item.pname}</td>
                  <td>{item.aid}</td>
                  <td>{item.aname}</td>
                  <td><Rupee/>{item.ramount}</td>
                  <td>{item.duration/12}</td>
                  <td><Rupee/>{item.amount}</td>
                  <td><Rupee/>{item.total}</td>
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

export default YourPolicies