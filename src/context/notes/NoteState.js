import React, { useState } from "react";
import noteContext from "./noteContext";


const NoteState = (props) => {
  const initialNotes = []
  const [notes, setNotes] = useState(initialNotes)




  //To get all notes
  const getAllNotes = async () => {
    const response = await fetch('https://data-notify.azurewebsites.net/notes/fetch_all_notes', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
    });
    const json = await response.json();
    const set = json.reverse()
    await setNotes(set);
    // console.log(notes);
  }

  const addNote = async (title, description, tag) => {

    //eslint-disable-next-line
    const response = await fetch('https://data-notify.azurewebsites.net/notes/add_note', {

      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')

      },
      body: JSON.stringify({ title, description, tag })
      ,
      mode: 'cors',
      referrerPolicy: "origin-when-cross-origin",

    });
    //user will be identified from token that is send in header

    const note = {
      "title": title,
      "description": description,
      "tag": tag,
    };
    await setNotes(notes.concat(note))
  }


  //delete
  const deleteNote = async (id) => {
    // console.log(localStorage.getItem('token'));

    //eslint-disable-next-line
    const response = await fetch(`https://data-notify.azurewebsites.net/notes/delete_note/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      mode: 'cors',
      referrerPolicy: "origin-when-cross-origin",
    });
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    })
    setNotes(newNotes)

  }


  //Update
  const editNote = async (id, title, description, tag) => {
    //API Call
    //eslint-disable-next-line
    const response = await fetch(`https://data-notify.azurewebsites.net/notes/update_existing_note/${id}`, {

      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')

      },
      body: JSON.stringify({ title, description, tag })
      ,
      mode: 'cors',
      referrerPolicy: "origin-when-cross-origin",

    });

    let newNote = await JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < newNote.length; index++) {
      const element = newNote[index];
      if (element._id === id) {
        newNote[index].title = title;
        newNote[index].desdesciption = description;
        newNote[index].tag = tag;
        break;
      }
    }
    await setNotes(newNote);
  }

  const noteReminder = async(id,time) => {

    // console.log('calling');

    const response = await fetch(`https://data-notify.azurewebsites.net/notes//remind/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body : JSON.stringify({time})
      ,
      mode: 'cors',
      referrerPolicy: "origin-when-cross-origin",
    });
    
    // eslint-disable-next-line
    const json = await response.json()
    // console.log(json);
  }



  return (
    <>
      <noteContext.Provider value={{ notes, setNotes, addNote, deleteNote, editNote, getAllNotes, noteReminder }}>
        {props.children}
      </noteContext.Provider>
    </>
  )

}
export default NoteState 
