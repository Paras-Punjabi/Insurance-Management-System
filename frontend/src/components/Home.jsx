import React, { useEffect } from 'react'
import NavbarComponent from './NavbarComponent'
import '../App.css'
import CarouselComponent from './CarouselComponent'
import Features from './Features.jsx'
import PolicyCard from './PolicyCard'
import Footer from './Footer'
import { NAME } from '../config'

const Home = () => {
  useEffect(()=>{
    document.title = `${NAME}`
  })
  return (
    <>
    <NavbarComponent/>
    <CarouselComponent/>
    <PolicyCard/>
    <Features/>
    <Footer/>
    </>
  )
}

export default Home