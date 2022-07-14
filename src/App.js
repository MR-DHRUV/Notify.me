import Navbar from './components/Navbar';
import About from './components/About';
import NoteState from './context/notes/NoteState';

import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import {
  HashRouter as Router,
  Switch,
  Route,
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



function App() {
  const [alert, setAlert] = useState(null);
  const [email, setEmail] = useState('');
  const [noteData, setnoteData] = useState({})
  const[viewNoteTheme, setViewNoteTheme] = useState(null)
  const showAlert = (message, type) => {
    setAlert({ msg: message, type: type })

    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }


  return (
    <>
      <ReminderState>
        <NoteState>
          <Router>
            <ScrollHandler />
            <Navbar showAlert={showAlert} />
            <Alert alert={alert} />
            <Switch>
              <Route exact path='/dashboard'><Home setnoteData={setnoteData} setViewNoteTheme={setViewNoteTheme}/></Route>
              <Route exact path='/reminder'><Reminder theme ={viewNoteTheme}/></Route>
              <Route exact path='/notes'><Notes setnoteData={setnoteData} setViewNoteTheme={setViewNoteTheme}/></Route>
              <Route exact path='/about'><About /></Route>
              <Route exact path='/addreminder'><AddReminder /></Route>
              <Route exact path='/newnote'><NewNote /></Route>
              <Route exact path='/contact'><Contact /></Route>
              <Route exact path='/note' ><ViewNote data={noteData} theme ={viewNoteTheme}/></Route>
              <Route exact path='/resetpassword'><ForgetPassword /></Route>
              <Route exact path='/myaccount' ><User showAlert={showAlert} /></Route>
              <Route exact path='/'><HomePromotion emailUpdater={setEmail} /></Route>
              <Route exact path='/signin'><Login showAlert={showAlert} /></Route>
              <Route exact path='/signup'><Signup showAlert={showAlert} email={email} /></Route>
              <Route path='/auth/v2/google' component={() => {
                window.location.href = 'https://api-authify.herokuapp.com/auth/google';
                return null;
              }} />
            </Switch>
            {/* <BottomNav /> */}
            <Footer />
          </Router>
        </NoteState>
      </ReminderState>
    </>
  );
}

export default App;
