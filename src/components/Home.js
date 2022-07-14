import React, { useContext } from 'react';
import noteContext from '../context/notes/noteContext';
import Noteitem from './Noteitem';
// import AddNote from './AddNote';
import { useEffect } from 'react';
// import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useState } from 'react';
import Reminder from './Reminder';




const Home = (props) => {
  const [latestNotes, setLatestNotes] = useState([])
  const history = useHistory();
  const context = useContext(noteContext);

  const { notes, getAllNotes } = context;
  let theme = 0;

  // const [note, setNote] = useState({ id: '', editedtitle: "", editeddescription: "", editedtag: "general" })

  useEffect(() => {
    if (localStorage.getItem('token')) {
      getAllNotes()
      const setNotes = async () => {
        let newNotes = notes.slice(0, 6)
        setLatestNotes(newNotes)
      }
      setNotes()
    }
    else {
      history.push('/signin');
    }
    // eslint-disable-next-line
  }, [notes])

  return (
    <>
      <div className='minheight my-3 py-3'>

        <Reminder hide={'hide'} />
        <div className="container link d-flex w-100 justify-content-start mb-5 pb-4">
          <Link className='btn btn-primary d-flex justify-content-start' to='/reminder'>View All Reminders</Link>
        </div>
        <div className="container">
          <h1 className='haedingTop border-bottom display-4 fw-bold'>Notes</h1>
          <section class="">
            <div class="py-5">
              <div class="row mx-auto">
                <div class="reflow-product-list ref-cards">
                  <div class="ref-products">

                    {latestNotes.map((note) => {
                      let send = theme
                      theme = theme + 1;
                      if (theme === 4) {
                        theme = 0;
                      }
                      return <Noteitem note={note} key={note._id} setnoteData={props.setnoteData} theme={send} setViewNoteTheme={props.setViewNoteTheme} />
                    })}

                  </div>
                  <div className="link d-flex w-100 justify-content-start">
                    <Link className='btn btn-primary d-flex justify-content-start' to='/notes'>View All Notes</Link>
                  </div>
                </div>
              </div>

            </div>
          </section>
          {notes.length === 0 && "Create a note by clicking on add icon !! 😁😁"}
          <div className='row'>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home