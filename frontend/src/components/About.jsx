import React,{useEffect} from 'react'
import { NAME } from '../config'
import Footer from './Footer'
import NavbarComponent from './NavbarComponent'

const About = () => {
  useEffect(()=>{
    document.title = `${NAME} - About`
  },[])
  return (
    <>
    <NavbarComponent/>
    <div>About</div>
    <Footer/>
    </>
  )
}

export default About