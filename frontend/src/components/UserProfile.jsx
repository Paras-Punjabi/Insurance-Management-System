import React,{useEffect} from 'react'
import Table from 'react-bootstrap/Table';

const UserProfile = ({data}) => {
  useEffect(()=>{
    document.title = "User Profile"
  },[])
  return (
    <>
    <h1 className='text-center my-2'>User Profile</h1>
    <div className='userProlfile'>
    <Table striped>
      <thead>
      </thead>
      <tbody>
        <tr className='my-1'>
          <td className='font-weight-bold '>Name</td>
          <td>{data.name}</td>
        </tr>
        <tr className='my-1'>
          <td className='font-weight-bold '>Email</td>
          <td>{data.email}</td>
        </tr>
        <tr className='my-1'>
          <td className='font-weight-bold '>Customer's ID</td>
          <td>{data.cid}</td>
        </tr>
        <tr className='my-1'>
          <td className='font-weight-bold '>Contact</td>
          <td>{data.contact}</td>
        </tr>
        <tr className='my-1'>
          <td className='font-weight-bold '>Gender</td>
          <td>{data.gender === "F" ? "Female" : "Male" }</td>
        </tr>
        <tr className='my-1'>
          <td>Date of Birth</td>
          <td>{new Date(data.dob).toDateString()}</td>
        </tr>
        <tr className='my-1'>
          <td className='font-weight-bold '>Mother's Name</td>
          <td>{data.mname}</td>
        </tr>
        <tr className='my-1'>
          <td className='font-weight-bold '>Father's Name</td>
          <td>{data.fname}</td>
        </tr>
        <tr className='my-1'>
          <td className='font-weight-bold '>Address</td>
          <td>{data.address}</td>
        </tr>
        <tr className='my-1'>
          <td className='font-weight-bold '>Pincode</td>
          <td>{data.pincode}</td>
        </tr>
        
      </tbody>
    </Table>
    </div>
    </>
  )
}

export default UserProfile