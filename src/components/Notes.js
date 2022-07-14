import React, { useContext} from 'react';
import noteContext from '../context/notes/noteContext';
import Noteitem from './Noteitem';
// import AddNote from './AddNote';
import { useEffect } from 'react';
// import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';





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

    // const updateNote = (currentNote) => {
    //     ref.current.click();
    //     setNote({ id: currentNote._id, editedtitle: currentNote.title, editeddescription: currentNote.description, editedtag: currentNote.tag });
    // }

    // const ref = useRef(null);
    // const refClose = useRef(null);

    // const handleUpdate = async (event) => {
    //     event.preventDefault();
    //     await editNote(note.id, note.editedtitle, note.editeddescription, note.editedtag)
    //     refClose.current.click();
    // }

    // const onChange = (event) => {
    //     setNote({ ...note, [event.target.name]: event.target.value })
    // }

    return (
        <>
            <div className='minheight my-3 py-3'>

                {/* <AddNote /> */}
                {/* <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">

                </button>

                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Edit 📝</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form action="" className='my-3'>
                                    <div className="mb-3">
                                        <label htmlFor="title" className="form-label">Title</label>
                                        <input type="text" className="form-control" placeholder='Title' name='editedtitle' id="editedTitle" value={note.editedtitle} aria-describedby="emailHelp" onChange={onChange} minLength={3} required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="description" className="form-label">description</label>
                                        <input type="text" placeholder='description' name='editeddescription' className="form-control" value={note.editeddescription} id="editeddescription" onChange={onChange} minLength={5} required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="tag" className="form-label">Tag</label>
                                        <input type="text" placeholder='tag' name='editedtag' className="form-control" id="editedtag" value={note.editedtag} onChange={onChange} />
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button disabled={note.editedtitle < 3 || note.editeddescription < 5} type="button" className="btn btn-primary" onClick={handleUpdate}>Update note</button>
                            </div>
                        </div>
                    </div>
                </div> */}

                <div className="container">
                    <h1 className='haedingTop border-bottom display-4 fw-bold'>Notes</h1>
                    <section class="">
                        <div class="py-5">
                            <div class="row mx-auto">
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