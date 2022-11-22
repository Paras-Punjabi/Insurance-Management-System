import React from 'react'
import LogedInNavBar from './LogedInNavBar'
import UserProfile from './UserProfile'

const LogedInHome = ({data}) => {
  return (
    <>
    <LogedInNavBar data={data}/>
    <UserProfile data={data}/>
    </>
  )
}

export default LogedInHome