import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './CSS/navbar.css'

const Navbar = (props) => {

    let location = useLocation() // this will return current path
    useEffect(() => {
    }, [location])

    const closeNav = () => {
        if (window.innerWidth < 770) {
            // console.log('clicked');
            document.getElementById('toggleNav').click()
        }
        else {
            return
        }
    }

    const serviceScroll = ()=>{
        window.scrollTo(0,630)
    }
    const contactScroll = ()=>{
        window.scrollTo(0,2800)
    }

    return (
        <div className='sticky-top'>
            <nav class="navbar navbar-light navbar-expand-md navbar-shrink py-3" id="mainNav">
                <div class="container"><Link class="navbar-brand d-flex align-items-center" to="/"><span class="bs-icon-sm shadow d-flex justify-content-center mx-2 px-1 align-items-center me-2 bs-icon"><img className='navImg' src={require('./images/logo.png')} alt="" /></span><span>Notify.me</span></Link><button data-bs-toggle="collapse" class="navbar-toggler" id='toggleNav' data-bs-target="#navcol-1"><span class="visually-hidden">Toggle navigation</span><span class="navbar-toggler-icon"></span></button>
                    <div class="collapse navbar-collapse" id="navcol-1">
                        <ul class="navbar-nav mx-auto">
                            {!localStorage.getItem('token') ?
                                <>
                                    <li className="nav-item">
                                        <Link onClick={closeNav} className={`nav-link ${location.pathname === '/' ? '' : ''}`} aria-current="page" to="/">Home</Link>
                                    </li>
                                    <li className="nav-item" onClick={serviceScroll}>
                                        <Link onClick={closeNav} className={`nav-link ${location.pathname === '/' ? '' : ''}`} aria-current="page">Services</Link>
                                    </li>
                                    <li className="nav-item">
                                        {/* <Link onClick={closeNav} className={`nav-link ${location.pathname === '/about' ? '' : ''}`} to="/about">About</Link> */}
                                    </li>
                                    <li className="nav-item" onClick={contactScroll}>
                                        <Link onClick={closeNav} className={`nav-link ${location.pathname === '/' ? '' : ''}`} >Contact Us</Link>
                                    </li>
                                </> :
                                <>
                                    <li className="nav-item">
                                        <Link onClick={closeNav} className={`nav-link ${location.pathname === '/dashboard' ? 'text-primary' : ''}`} aria-current="page" to="/dashboard">Home</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link onClick={closeNav} className={`nav-link ${location.pathname === '/notes' ? 'text-primary' : ''}`} aria-current="page" to="/notes">Notes</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link onClick={closeNav} className={`nav-link ${location.pathname === '/reminder' ? 'text-primary' : ''}`} to="/reminder">Reminder</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link onClick={closeNav} className={`nav-link ${location.pathname === '/contact' ? 'text-primary' : ''}`} to="/contact">Contact Us</Link>
                                    </li>
                                </>}
                        </ul>
                        <div className="d-flex">
                            <Link onClick={closeNav} className="btn btn-primary my-profile-btn" to="/myaccount" role="button"><svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
                                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                            </svg></Link>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
