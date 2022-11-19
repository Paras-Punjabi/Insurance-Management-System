import React from 'react'
import { Link } from 'react-router-dom'
import { NAME } from '../config'

const Footer = () => {
  return (
    <footer className="w-100 py-4 flex-shrink-0">
        <div className="container py-4">
            <div className="row gy-4 gx-5">
                <div className="col-lg-4 col-md-6">
                    <h5 className="h1 text-warning">{NAME.toUpperCase()}</h5>
                    <p className="small text-white">This application is designed for a group of insurance agents, which supports the maintenance activities of insurance policies and their procedures in maintaining various types of policies, with the corresponding details of policy holders, associated agents,etc...</p>
                </div>
                <div className="col-lg-2 col-md-6">
                    <h5 className="text-warning mb-3 font-bold">Quick links</h5>
                    <ul className="list-unstyled text-muted">
                        <li className='my-1 links'><Link className='text-decoration-none text-white' to="/">Home</Link></li>
                        <li className='my-1 links'> <Link className='text-decoration-none text-white' to="/about">About</Link></li> 
                        <li className='my-1 links'> <Link className='text-decoration-none text-white' to="/contact">Contact Us</Link></li> 
                        <li className='my-1 links'> <Link className='text-decoration-none text-white' to="/login">Login</Link></li> 
                        <li className='my-1 links'> <Link className='text-decoration-none text-white' to="/signup">Sign Up</Link></li> 
                    </ul>
                </div>
                <div className="col-lg-4 col-md-6">
                    <h5 className="text-warning mb-3">Newsletter</h5>
                    <p className="small text-white">We'll keep you up-to-date with the latest new policies, cutting edge opinion, and expert analysis affecting both your present and future...</p>
                    <form action="#">
                        <div className="input-group mb-3">
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </footer>
  )
}

export default Footer