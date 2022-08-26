import Navbar from './components/Navbar';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useLocation,
} from 'react-router-dom'
import { useState } from 'react';
import ForgetPassword from './components/ForgetPassword';
import Footer from './components/Footer';
import HomePromotion from './components/HomePromotion';
import User from './components/User';
import NewNote from './components/NewNote';
// import BottomNav from './components/BottomNav';
import ViewNote from './components/ViewNote';
import Notes from './components/Notes';
import Reminder from './components/Reminder';
import ReminderState from './context/notes/ReminderState';
import ScrollHandler from './ScrollHandler';
import AddReminder from './components/AddReminder';
import Home from './components/Home';
import Contact from './components/Contact';
import { Notifications } from 'react-push-notification';
import { useEffect } from 'react';
import NavSidebar from './components/NavSidebar';
import "./components/CSS/style.css"
import './components/CSS/app.css'
import BottomNav from './components/BottomNav';
import ToDo from './components/ToDo';
import ToDoSate from './context/notes/ToDoState';

function App() {
  const [alert, setAlert] = useState(null);
  const [email, setEmail] = useState('');
  const [noteData, setnoteData] = useState({})
  const [viewNoteTheme, setViewNoteTheme] = useState(null)
  const showAlert = (message, type) => {
    setAlert({ msg: message, type: type })

    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }


  const [name, setName] = useState('');

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
  useEffect(() => {
    if (localStorage.getItem('token')) {

      fetchData()
      console.log("fetching");
    }
    // eslint-disable-next-line
  }, [])


  // useEffect(() => {

  //   setLocation(window.location.pathname);
  //   console.log("set location");

  // }, [[]])


  return (
    <>
      <Notifications />
      <ReminderState>
        <NoteState>
          <ToDoSate>
            <Router>
              <ScrollHandler />
              {!window.localStorage.getItem('token') ? <Navbar showAlert={showAlert} /> : ''}
              {/* <NavSidebar /> */}
              <Alert alert={alert} />
              <Switch>
                {/* Render Schema */}
                {window.localStorage.getItem('token') ? <>
                  {window.innerWidth > 999 ? <div class="container-scroller">
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
                          <li class={window.location.pathname === '/dashboard' ? "nav-item active" : 'nav-item'}>
                            <Link class="nav-link" to="/dashboard">
                              <svg xmlns="http://www.w3.org/2000/svg" width="21" fill="currentColor" class="bi bi-grid bottom_nav_icon side_nav_icon" viewBox="0 0 16 16">
                                <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zM2.5 2a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zM1 10.5A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3z" />
                              </svg>
                              <span class="menu-title">Dashboard</span>
                            </Link>
                          </li>
                          <li class="nav-item">
                            <Link class="nav-link" to="/notes">
                              <svg xmlns="http://www.w3.org/2000/svg" width="21" fill="currentColor" className="bi bi-stickies bottom_nav_icon side_nav_icon" viewBox="0 0 16 16">
                                <path d="M1.5 0A1.5 1.5 0 0 0 0 1.5V13a1 1 0 0 0 1 1V1.5a.5.5 0 0 1 .5-.5H14a1 1 0 0 0-1-1H1.5z" />
                                <path d="M3.5 2A1.5 1.5 0 0 0 2 3.5v11A1.5 1.5 0 0 0 3.5 16h6.086a1.5 1.5 0 0 0 1.06-.44l4.915-4.914A1.5 1.5 0 0 0 16 9.586V3.5A1.5 1.5 0 0 0 14.5 2h-11zM3 3.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 .5.5V9h-4.5A1.5 1.5 0 0 0 9 10.5V15H3.5a.5.5 0 0 1-.5-.5v-11zm7 11.293V10.5a.5.5 0 0 1 .5-.5h4.293L10 14.793z" />
                              </svg>
                              <span class="menu-title">Notes</span>
                            </Link>
                          </li>
                          <li class="nav-item">
                            <Link class="nav-link" to="/reminder">
                              <svg xmlns="http://www.w3.org/2000/svg" width="21" fill="currentColor" className="bi bi-calendar-check bottom_nav_icon side_nav_icon" viewBox="0 0 16 16">
                                <path d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z" />
                                <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
                              </svg>
                              <span class="menu-title">Reminders</span>
                            </Link>
                          </li>
                          <li class="nav-item">
                            <Link class="nav-link" to="/todo">
                              <svg xmlns="http://www.w3.org/2000/svg" width="21" fill="currentColor" class="bi bi-ui-checks bottom_nav_icon side_nav_icon" viewBox="0 0 16 16">
                                <path d="M7 2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5v-1zM2 1a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2H2zm0 8a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2H2zm.854-3.646a.5.5 0 0 1-.708 0l-1-1a.5.5 0 1 1 .708-.708l.646.647 1.646-1.647a.5.5 0 1 1 .708.708l-2 2zm0 8a.5.5 0 0 1-.708 0l-1-1a.5.5 0 0 1 .708-.708l.646.647 1.646-1.647a.5.5 0 0 1 .708.708l-2 2zM7 10.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5v-1zm0-5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0 8a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z" />
                              </svg>
                              <span class="menu-title">To Do</span>
                            </Link>
                          </li>
                          <li class="nav-item">
                            <Link class="nav-link" to="/contact">
                              <svg xmlns="http://www.w3.org/2000/svg" width="21" fill="currentColor" class="bi bi-chat-right-text bottom_nav_icon side_nav_icon" viewBox="0 0 16 16">
                                <path d="M2 1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h9.586a2 2 0 0 1 1.414.586l2 2V2a1 1 0 0 0-1-1H2zm12-1a2 2 0 0 1 2 2v12.793a.5.5 0 0 1-.854.353l-2.853-2.853a1 1 0 0 0-.707-.293H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12z" />
                                <path d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6zm0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z" />
                              </svg>
                              <span class="menu-title">Contact</span>
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
                                    <div class="bg-white rounded-3 border-1 primaryRender">
                                      {/* <!-- Content here --> */}
                                      {/* <Notes /> */}
                                      <Route exact path='/dashboard'><Home fetchData={fetchData} setnoteData={setnoteData} setViewNoteTheme={setViewNoteTheme} /></Route>
                                      <Route exact path='/reminder'><Reminder theme={viewNoteTheme} /></Route>
                                      <Route exact path='/notes'><Notes setnoteData={setnoteData} setViewNoteTheme={setViewNoteTheme} /></Route>
                                      <Route exact path='/addreminder'><AddReminder /></Route>
                                      <Route exact path='/newnote'><NewNote /></Route>
                                      <Route exact path='/contact'><Contact /></Route>
                                      <Route exact path='/note' ><ViewNote data={noteData} theme={viewNoteTheme} /></Route>
                                      <Route exact path='/myaccount' ><User showAlert={showAlert} /></Route>
                                      <Route exact path='/'><Home /></Route>
                                      <Route exact path='/todo'><ToDo /></Route>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div> : <>
                    <Route exact path='/dashboard'><Home fetchData={fetchData} setnoteData={setnoteData} setViewNoteTheme={setViewNoteTheme} /></Route>
                    <Route exact path='/reminder'><Reminder theme={viewNoteTheme} /></Route>
                    <Route exact path='/notes'><Notes setnoteData={setnoteData} setViewNoteTheme={setViewNoteTheme} /></Route>
                    <Route exact path='/addreminder'><AddReminder /></Route>
                    <Route exact path='/newnote'><NewNote /></Route>
                    <Route exact path='/contact'><Contact /></Route>
                    <Route exact path='/note' ><ViewNote data={noteData} theme={viewNoteTheme} /></Route>
                    <Route exact path='/myaccount' ><User showAlert={showAlert} /></Route>
                    <Route exact path='/'><Home /></Route>
                    <Route exact path='/todo'><ToDo /></Route>
                    <BottomNav />
                  </>}

                </> : ''}



                <Route exact path='/resetpassword'><ForgetPassword /></Route>
                <Route exact path='/'><HomePromotion emailUpdater={setEmail} /></Route>
                <Route exact path='/signin'><Login showAlert={showAlert} /></Route>
                <Route exact path='/signup'><Signup showAlert={showAlert} email={email} /></Route>
                <Route path='/auth/v2/google' component={() => {
                  window.location.href = 'http://localhost:5000/auth/google';
                  return null;
                }} />
              </Switch>
              {/* <BottomNav /> */}
              {!window.localStorage.getItem('token') ? <Footer /> : ""}
              {/* <Footer /> */}
            </Router>
          </ToDoSate>
        </NoteState>
      </ReminderState>
    </>
  );
}

export default App;
