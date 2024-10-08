import React, { useState } from "react";
import reminderContext from "./reminderContext";


const ReminderState = (props) => {
  const initialReminders = []
  const [reminders, setReminders] = useState(initialReminders)




  //To get all notes
  const getAllReminders = async () => {
    const response = await fetch('https://data-notify.azurewebsites.net/reminder/fetch_all_reminders', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token'),
        'Access-Control-Allow-Origin': '*'
      }
      ,
      mode: 'cors',
      referrerPolicy: "origin-when-cross-origin",
    });
    const json = await response.json();
    const rev = await json.reverse();
    await setReminders(rev);
    // console.log(reminders);
  }

  const addReminder = async (title, description, time) => {

    //eslint-disable-next-line
    const response = await fetch('https://data-notify.azurewebsites.net/reminder/add_reminder', {

      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token'),
        'Access-Control-Allow-Origin': '*'

      },
      body: JSON.stringify({ title, description, time })
      ,
      mode: 'cors',
      referrerPolicy: "origin-when-cross-origin",

    });
    //user will be identified from token that is send in header

    const reminder = {
      "title": title,
      "description": description,
      "time": time,
    };
    setReminders(reminders.concat(reminder))
  }


  //delete
  const deleteReminder = async (id) => {
    // console.log(localStorage.getItem('token'));

    //eslint-disable-next-line
    const response = await fetch(`https://data-notify.azurewebsites.net/reminder/delete_reminder/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token'),
        'Access-Control-Allow-Origin': '*'
      }
      ,
      mode: 'cors',
      referrerPolicy: "origin-when-cross-origin",
    });
    const newReminders = reminders.filter((reminder) => {
      return reminder._id !== id;
    })
    setReminders(newReminders)

  }


  //Update
  const editReminder = async (id, title, description, time) => {
    //API Call
    //eslint-disable-next-line
    const response = await fetch(`https://data-notify.azurewebsites.net/reminder/update_existing_reminder/${id}`, {

      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token'),
        'Access-Control-Allow-Origin': '*'

      },
      body: JSON.stringify({ title, description, time })
      ,
      mode: 'cors',
      referrerPolicy: "origin-when-cross-origin",

    });

    // let newReminder = await JSON.parse(JSON.stringify(reminders));
    // for (let index = 0; index < newReminder.length; index++) {
    //   const element = newReminder[index];
    //   if (element._id === id) {
    //     newReminder[index].title = title;
    //     newReminder[index].desdesciption = description;
    //     newReminder[index].time = time;
    //     break;
    //   }
    // }
    // await setReminders(newReminder);
    getAllReminders()
  }


  return (
    <>
      <reminderContext.Provider value={{ reminders, setReminders, addReminder, deleteReminder, editReminder, getAllReminders }}>
        {props.children}
      </reminderContext.Provider>
    </>
  )

}
export default ReminderState 
