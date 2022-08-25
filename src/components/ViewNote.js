import React from 'react'
import { useEffect } from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown'
import { useHistory } from 'react-router-dom'
import noteContext from '../context/notes/noteContext';
import BackButton from './BackButton';
import ReactMde from 'react-mde';
import './CSS/ViewNote.css'
import addNotification from 'react-push-notification';
import "./CSS/bootstrap.min.css"


const ViewNote = (props) => {

    const [note, setNote] = useState({ title: props.data.title, description: props.data.description, tag: props.data.tag })
    const [time, setTime] = useState('')
    const history = useHistory()
    const context = useContext(noteContext);
    const { editNote, deleteNote, noteReminder } = context;
    const [value, setValue] = React.useState(props.data.description);
    const [selectedTab, setSelectedTab] = React.useState("write");
    const [editorMode, setEditorMode] = useState(false)

    const colors = ['info', 'success', 'primary', 'secondary'];

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const date = new Date(props.data.date)
    const dateConstructor = date.getDate() + ' ' + monthNames[date.getMonth()] + ', ' + date.getFullYear()



    useEffect(() => {
        if (!localStorage.getItem('token')) {
            history.push('/signin');
        }
        if (props.data.title === undefined || props.data.title === '' || props.data.tag === null) {
            history.push('/signin');
        }
        // console.log(props.data.title);
        // eslint-disable-next-line
    }, [])

    const triggerDelete = async () => {
        await deleteNote(props.data._id)
        history.push('/dashboard')
    }



    // const handleAdd = async (event) => {
    //     event.preventDefault()

    //     if (note.tag.length < 1) {
    //         addNote(note.title, value, 'General');
    //     }
    //     else {
    //         addNote(note.title, value, note.tag);
    //     }
    //     setNote({ title: "", description: "", tag: "" });
    //     history.push('/dashboard')
    // }

    const handleUpdate = async (event) => {
        event.preventDefault();
        // console.log(props.data._id);
        await editNote(props.data._id, note.title, value, note.tag)
        setEditorMode(false)
    }

    const onChange = (event) => {
        setNote({ ...note, [event.target.name]: event.target.value })
    }
    const onChangeTime = (event) => {
        setTime(event.target.value)
    }


    const save = async function* (data) {
        // Promise that waits for "time" milliseconds
        const wait = function (time) {
            return new Promise((a, r) => {
                setTimeout(() => a(), time);
            });
        };

        // Upload "data" to your server
        // Use XMLHttpRequest.send to send a FormData object containing
        // "data"
        // Check this question: https://stackoverflow.com/questions/18055422/how-to-receive-php-image-data-over-copy-n-paste-javascript-with-xmlhttprequest

        await wait(2000);
        // yields the URL that should be inserted in the markdown
        yield "https://picsum.photos/300";
        await wait(2000);

        // returns true meaning that the save was successful
        return true;
    };

    const triggerEdit = () => {
        if (editorMode === false) {
            setEditorMode(true)
        }
        else {
            setEditorMode(false)
        }
    }

    const triggerRemind = () => {
        // setEditorMode('remind')
        if (document.getElementById('timeInput').style.display === ('flex')) {
            document.getElementById('timeInput').style.display = ('none');
        }
        else {
            document.getElementById('timeInput').style.display = ('flex')
        }
    }

    const handleRemind = (e) => {
        e.preventDefault()
        if (time) {
            noteReminder(props.data._id, time);
            document.getElementById('timeInput').style.display = ('none');
            setTime('');


            const dateNI = new Date();
            let ISToffSet = 330; //IST is 5:30; i.e. 60*5+30 = 330 in minutes 
            let offset = ISToffSet * 60 * 1000;
            let ISTTime = new Date(dateNI.getTime() + offset);
            // console.log("IST" , ISTTime);
    
            const timeDiffrenceMs = (new Date(time) - Date.now())

            setTimeout(() => {      
                addNotification({
                    title: 'Reminder',
                    message: `${note.title}\n${value.length <= 150 ? value.slice(0, 150) : value.slice(0, 150) + ' ...'} `,
                    duration: 100000, //optional, default: 5000, 
                    native: true // when using native, your OS will handle theming.  
                });
            }, timeDiffrenceMs);

        }

    }



    // console.log(props);
    return (
        <>
            {editorMode === false ? <section className="py-4">
                <BackButton />
                <div className="container notecontainer">
                    <div className="row mx-auto">
                        <div className="col">
                            {/* <h1 className="display-5 fw-bold mainheading mx-1">New Note</h1> */}
                            <div data-reflow-type="shopping-cart" className={`viewnote mt-3 bg-${colors[props.theme]}-light`}>
                                <div className="reflow-shopping-cart">
                                    <div className="ref-loading-overlay" />
                                    <div className="" style={{ display: "block" }}>
                                        <div className="py-0">
                                            <div className="col border-bottom">
                                                <div className="d-flex flex-row mb-0 pb-0">
                                                    <h1 className={`fw-bold mb-0 mt-3 pb-0 mx-2 display-5 text-capitalize`}>{note.title}</h1>
                                                </div>
                                                <div className="d-flex flex-row justify-content-between py-0 mx-2 mt-3 mb-0 pb-0">
                                                    <p className={`noteInfo mb-0 pb-0 text-${colors[props.theme]}`}>{note.tag}</p>
                                                    <p className="noteInfo mb-0 pb-0">{dateConstructor}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="ref-cart-table">
                                            <div className="mx-2">
                                                {/* <h4 className='my-3 fw-bold'>Preview : </h4> */}
                                                <div className="notedesc"> <ReactMarkdown>{value}</ReactMarkdown></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="fixed-bottom w-100 newnotebutton d-flex flex-row">
                    <form className='flex-row mb-5' id='timeInput' onSubmit={handleRemind}>
                        <input className="form-control form-control-user" placeholder='Time' name='time' required value={time} onChange={onChangeTime} type="datetime-local" id="exampleInputEmail" aria-describedby="emailHelp" />
                        <button className="btn btn-outline-primary d-block btn-user px-3 mx-2 remindNotebtn" type="submit"> -&gt; </button>
                    </form>

                    <div className="floatingIconContainer">
                        <button className='newnotelink editbutton mb-4' onClick={triggerEdit}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                                <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                            </svg>
                        </button>
                        <div className="d-flex flex-row">
                            <button className='newnotelink editbutton mb-4' onClick={triggerRemind}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-bell-fill" viewBox="0 0 16 16">
                                    <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z" />
                                </svg>
                            </button>
                        </div>

                        <button className='newnotelink editbutton' onClick={triggerDelete}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </section> : <>

                <section className="py-5 mb-4">
                    <BackButton />
                    <div className="container notecontainer">
                        <div className="row mx-auto">
                            <div className="col">
                                {/* <h1 className="display-5 fw-bold mainheading mx-1">Edit Note</h1> */}
                                <div data-reflow-type="shopping-cart" className='addNote bg-primary-gradient'>
                                    <form onSubmit={handleUpdate}>
                                        <div className="reflow-shopping-cart">
                                            <div className="ref-loading-overlay" />
                                            <div className="" style={{ display: "block" }}>
                                                <div className="border-bottom py-0">
                                                    <div className="col">
                                                        <div className="d-flex flex-row">
                                                            <input type="text" value={note.title} className="form-control my-input h1 mb-1 mt-0 notetitle bg-primary-gradient opacity-50" placeholder='Title' name='title' id="id" aria-describedby="emailHelp" onChange={onChange} minLength={3} required />
                                                        </div>
                                                    </div>

                                                </div>
                                                <div className="ref-cart-table">

                                                    <h4 className='mt-4 mb-2 mx-3 fw-bold'>Description : </h4>

                                                    <div className="editorcontainer">
                                                        <ReactMde
                                                            value={value}
                                                            onChange={setValue}
                                                            selectedTab={selectedTab}
                                                            onTabChange={setSelectedTab}
                                                            generateMarkdownPreview={(markdown) =>
                                                                Promise.resolve(
                                                                    <ReactMarkdown>{markdown}</ReactMarkdown>
                                                                )
                                                            }
                                                            childProps={{
                                                                writeButton: {
                                                                    tabIndex: -1
                                                                }
                                                            }}
                                                            paste={{
                                                                saveImage: save
                                                            }}
                                                        />
                                                    </div>
{/* 
                                                    <div className="my-3 mx-2">
                                                        <div className="preview"> <ReactMarkdown>{value}</ReactMarkdown></div>
                                                    </div> */}


                                                </div>
                                                <div className="d-flex flex-row border-bottom mt-4">
                                                    <h4 className='mx-3 fw-bold my-1 mt-2'>Tag : </h4>
                                                    <input type="text opacity-50" value={note.tag} placeholder='General' name='tag' className="form-control input-2 bg-primary-gradient" id="tag" onChange={onChange} />
                                                </div>
                                            </div>
                                        </div>
                                        <button disabled={note.title.length < 3 || value.length < 5} type="submit" className="btn btn-primary my-3">Update Note</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </>}
        </>
    )
}

export default ViewNote