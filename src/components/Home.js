import React, { useContext } from 'react';
import noteContext from '../context/notes/noteContext';
import Noteitem from './Noteitem';
// import AddNote from './AddNote';
import { useEffect } from 'react';
// import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useState } from 'react';
import Reminder from './Reminder';
import "./CSS/bootstrap.min.css"
import todoContext from '../context/notes/todoContext';
import ListItem from './ListItem';




const Home = (props) => {
  const [latestNotes, setLatestNotes] = useState([])
  const [latestList, setLatestList] = useState([])
  const history = useHistory();
  const context = useContext(noteContext);
  const context1 = useContext(todoContext);

  const { lists, getAllList } = context1;


  const { notes, getAllNotes } = context;
  let theme = 0;

  // const [note, setNote] = useState({ id: '', editedtitle: "", editeddescription: "", editedtag: "general" })

  useEffect(() => {
    if (localStorage.getItem('token')) {
      getAllNotes()
      getAllList();

      const setNotes = async () => {
        let newNotes = notes.slice(0, 3)
        setLatestNotes(newNotes)

        let newlist = lists.slice(0, 2);
        setLatestList(newlist);
      }
      // props.fetchData();  
      setNotes();

    }
    else {
      history.push('/signin');
    }
    // eslint-disable-next-line
  }, [notes])

  return (
    <>
      <div className={window.innerWidth > 999 ? 'minheight my-3 py-3' : 'minheight my-3 py-3 mb-5 pb-5'}>

        <div className="container">
          <div class="row flex-grow">
            <div class={window.innerWidth > 999 ? "col-12 grid-margin stretch-card px-0 mx-0" : "col-12 grid-margin stretch-card px-3"}>
              <div class="card card-rounded">
                <div class="card-body responsiveToDo">
                  <div class="row">
                    <div class="col-lg-12">
                      <div
                        class="d-flex justify-content-between align-items-center">
                        <h2 class="card-title card-title-dash mb-4">Todo List</h2>
                      </div>
                      <div class="list-wrapper">
                        <ul class="todo-list todo-list-rounded">
                          {latestList.map((list) => {
                            return <ListItem key={list._id} id={list._id} title={list.title} date={list.date} done={list.isDone} />
                          })}
                        </ul>

                        <div className="link d-flex w-100 justify-content-start mt-4">
                          <Link className='btn btn-primary d-flex justify-content-start' to='/todo'>View Complete List</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Reminder hide={'hide'} />
        <div className="container link d-flex w-100 justify-content-start mb-5 pb-4">
          <Link className='btn btn-primary d-flex justify-content-start' to='/reminder'>View All Reminders</Link>
        </div>
        <div className="container">
          {/* <h1 className='haedingTop border-bottom display-4 fw-bold'>Notes</h1> */}
          <section class="">
            <div class="py-1">
              <div class="row mx-auto">
                <h1 className='h2 fw-semibold'>Notes</h1>
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