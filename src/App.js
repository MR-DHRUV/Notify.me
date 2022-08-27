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

    const response = await fetch('https://api-data-notify.herokuapp.com/auth/verifyuser', {

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

  let today = new Date();
  let todayHours = today.getHours();
  let greet;

  if (4 <= todayHours && todayHours <= 11) {
    greet = 'Good Morning';
  }

  else if (11 < todayHours && todayHours <= 16) {
    greet = 'Good Afternoon';
  }
  else {
    greet = 'Good Evening';
  }



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
                            <h1 class="welcome-text">{greet}, <span class="text-black fw-bold">{name}</span></h1>
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
                      <NavSidebar />
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
                  window.location.href = 'https://api-data-notify.herokuapp.com/auth/google';
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
