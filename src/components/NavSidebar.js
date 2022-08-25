import React, { useEffect, useState } from 'react';
import styles from './CSS/style.css'
import './CSS/sidebar.css'
import Home from './Home';
import Notes from './Notes';
import Reminder from './Reminder';
import { Link } from 'react-router-dom';

const NavSidebar = () => {

  const [name, setName] = useState('');

  useEffect(() => {
    if (localStorage.getItem('token')) {

      const fetchData = async () => {

        const response = await fetch('http://localhost:5000/auth/verifyuser', {

          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
          }
        });

        const data = await response.json();
        setName(data.name);

      }
      fetchData()
    }
    // eslint-disable-next-line
  }, [])



  return (
    <div class="container-scroller">
      <nav class="navbar default-layout col-lg-12 col-12 p-0 fixed-top d-flex align-items-top flex-row">
        <div class="text-center navbar-brand-wrapper d-flex align-items-center justify-content-start">
          <div class="me-3">
            <button class="navbar-toggler navbar-toggler align-self-center" type="button" data-bs-toggle="minimize">
              <span class="icon-menu"></span>
            </button>
          </div>
          <div>
            <a class="navbar-brand brand-logo" href="index.html">
              {/* <img src={require("./images/logo.png")} height="5px" alt="" /> */}
              <h3 className='fw-bold text-primary mb-0 pb-0'>Notify</h3>
            </a>
            <a class="navbar-brand brand-logo-mini" href="index.html">
              <img src="images/logo-mini.svg" alt="" />
            </a>
          </div>
        </div>
        <div class="navbar-menu-wrapper d-flex align-items-top">
          <ul class="navbar-nav">
            <li class="nav-item font-weight-semibold d-none d-lg-block ms-0">
              <h1 class="welcome-text">Good Morning, <span class="text-black fw-bold">{name}</span></h1>
            </li>
          </ul>
          <ul class="navbar-nav ms-auto">
            <li class="nav-item dropdown d-none d-lg-block user-dropdown">
              <Link class="nav-link" id="UserDropdown" to="/myaccount">
                {/* <img class="img-xs rounded-circle" src="images/faces/face8.jpg" alt="Profile image" /> */}
                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-person img-xs rounded-circle" viewBox="0 0 16 16">
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                </svg></Link>
            </li>
          </ul>
          <button class="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" data-bs-toggle="offcanvas">
            <span class="mdi mdi-menu"></span>
          </button>
        </div>
      </nav>
      <div class="container-fluid page-body-wrapper total_container">
        <nav class="sidebar sidebar-offcanvas" id="sidebar">
          <ul class="nav">
            <li class="nav-item">
              <Link class="nav-link" to="/dasboard">
                <i class="mdi mdi-grid-large menu-icon"></i>
                <span class="menu-title">Dashboard</span>
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/notes">
                <i class="menu-icon mdi mdi-floor-plan"></i>
                <span class="menu-title">Notes</span>
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/reminder">
                <i class="menu-icon mdi mdi-card-text-outline"></i>
                <span class="menu-title">Reminders</span>
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="todo">
                <i class="menu-icon mdi mdi-chart-line"></i>
                <span class="menu-title">To Do</span>
              </Link>
            </li>
          </ul>
        </nav>
        <div class="main-panel">
          <div class="content-wrapper">
            <div class="row">
              <div class="col-sm-12">
                <div class="home-tab">
                  <div class="tab-content tab-content-basic">
                    <div class="tab-pane fade show active" id="overview" role="tabpanel" aria-labelledby="overview">
                      <div class="h-100 bg-white rounded-3 border-1">
                        {/* <!-- Content here --> */}
                        {/* <Notes /> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NavSidebar
