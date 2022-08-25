import React, { useContext, useState } from 'react';
import noteContext from '../context/notes/noteContext';
import  './AddNote.css';
import "./CSS/bootstrap.min.css"

const AddNote = () => {
    const context = useContext(noteContext);
    const { addNote } = context;

    const[note,setNote] = useState({title:"",description :"" , tag:"general"})

    const handleAdd = (event) => {
        event.preventDefault()
        addNote(note.title,note.description,note.tag);
        setNote({title:"",description :"" , tag:""});
    }

    const onChange = (event)=>{
        setNote({...note,[event.target.name] : event.target.value})
    }

    return (
        <div className='container'>
            <h1>Add a Note </h1>
            <form action="" className='my-3'>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" value={note.title}  className="form-control" placeholder='Title' name='title' id="id" aria-describedby="emailHelp" onChange={onChange} minLength={3} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">description</label>
                    <input type="text" value={note.description} placeholder='description' name='description' className="form-control" id="description" onChange={onChange} minLength={5} required  />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" value={note.tag} placeholder='general' name='tag' className="form-control" id="tag" onChange={onChange} />
                </div>
                <button disabled={note.title.length <3 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleAdd}>Add Note</button>
            </form>
        </div>
    )
}

export default AddNote
