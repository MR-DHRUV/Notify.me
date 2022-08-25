import React, { useContext} from 'react';
import noteContext from '../context/notes/noteContext';
import Noteitem from './Noteitem';
// import AddNote from './AddNote';
import { useEffect } from 'react';
// import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import "./CSS/bootstrap.min.css"
import './Noteitem.css'




const Notes = (props) => {
    const history = useHistory();
    const context = useContext(noteContext);
    const { notes, getAllNotes} = context;
    let theme = 0;

    // const [note, setNote] = useState({ id: '', editedtitle: "", editeddescription: "", editedtag: "general" })

    useEffect(() => {
        if (localStorage.getItem('token')) {
            getAllNotes()
        }
        else {
            history.push('/signin');
        }
        // eslint-disable-next-line
    }, [notes])



    return (
        <>
            <div className={ window.innerWidth > 999 ?'minheight' : 'minheight mb-5 pb-5'}>
                <div className="container mt-5">
                    <section class="">
                        <div class={window.innerWidth > 999 ? "py-4" : ''}>
                            <div class="row mx-auto">
                                <h2 className='fw-semibold mb-3'>Notes</h2>
                                <div class="reflow-product-list ref-cards">
                                    <div class="ref-products">
                                        
                                        {notes.map((note) => {
                                            let send = theme
                                            theme =theme+1;
                                            if(theme === 4){
                                                theme = 0;
                                            }
                                            return <Noteitem note={note} key={note._id} setnoteData={props.setnoteData} theme={send} setViewNoteTheme={props.setViewNoteTheme}/>
                                        })}

                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    {notes.length === 0 && "All Empty Here"}
                    <div className='row'>
                    </div>
                </div>

                <div className="fixed-bottom w-100 newnotebutton">
                    <div className="floatingIconContainer">
                        <Link className='newnotelink' to='/newnote'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-plus-circle-fill" viewBox="0 0 16 16">
                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
                            </svg>
                        </Link>

                    </div>
                </div>
            </div>


        </>
    )
}

export default Notes