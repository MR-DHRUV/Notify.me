import React, { useState } from "react";
import todoContext from "./todoContext";


const ToDoSate = (props) => {
    const initialList = []
    const [lists, setList] = useState(initialList)




    //To get all notes
    const getAllList = async () => {
        const response = await fetch('http://localhost:5000/todo/fetch_all_list', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
        });
        const json = await response.json();
        await setList(json);
    }


    const addList = async (title, date) => {

        //eslint-disable-next-line
        const response = await fetch('http://localhost:5000/todo/add_list', {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')

            },
            body: JSON.stringify({title, date})

        });
        //user will be identified from token that is send in header

        const newList = {
            "title": title,
            "date": date,
        };
        setList(lists.concat(newList))
    }


    //delete
    const deleteList = async (id) => {

        //eslint-disable-next-line
        const response = await fetch(`http://localhost:5000/todo/delete_list/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
        });
        const newlists = lists.filter((reminder) => {
            return reminder._id !== id;
        })
        setList(newlists);
    }


    //Update
    const editList = async (id) => {
        //API Call
        //eslint-disable-next-line
        const response = await fetch(`http://localhost:5000/todo/update_existing_list/${id}`, {

            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')

            },
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
        getAllList();
    }


    return (
        <>
            <todoContext.Provider value={{ lists, setList, addList, deleteList, editList, getAllList }}>
                {props.children}
            </todoContext.Provider>
        </>
    )

}
export default ToDoSate 
