import React, { useContext, useState,useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import ReactMde from "react-mde";
import ReactMarkdown from "react-markdown";
import noteContext from '../../context/notes/noteContext';
import "react-mde/lib/styles/css/react-mde-all.css";
import BackButton from '../Helpers/BackButton';
import '../CSS/AddNote.css';
import "../CSS/bootstrap.min.css"



const NewNote = () => {
    const history = useHistory()
    const context = useContext(noteContext);
    const { addNote } = context;
    const [value, setValue] = React.useState("### **Hello world**");
    const [selectedTab, setSelectedTab] = React.useState("write");

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            history.push('/signin');
        }
        // eslint-disable-next-line
    }, [])



    const [note, setNote] = useState({ title: "", description: "", tag: "" })

    const handleAdd = async (event) => {
        event.preventDefault()

        if (note.tag.length < 1) {
            addNote(note.title, value, 'General');
        }
        else {
            addNote(note.title, value, note.tag);
        }
        setNote({ title: "", description: "", tag: "" });
        history.push('/notes')
    }

    const onChange = (event) => {
        setNote({ ...note, [event.target.name]: event.target.value })
    }


    const save = async function* (data) {
        // Promise that waits for "time" milliseconds
        const wait = function (time) {
            return new Promise((a, r) => {
                setTimeout(() => a(), time);
            });
        };
        await wait(2000);
        // yields the URL that should be inserted in the markdown
        yield "https://picsum.photos/300";
        await wait(2000);

        // returns true meaning that the save was successful
        return true;
    };


    return (
        <>
            <section className={window.innerWidth > 999 ? "py-1 pb-3" : "py-1 pb-5 mb-5"}>
                <BackButton />
                <div className="container notecontainer">
                    <div className="row mx-auto">
                        <div className="col">
                            {/* <h1 className="display-5 fw-bold mainheading mx-1">New Note</h1> */}
                            <div data-reflow-type="shopping-cart" className='addNote bg-primary-gradient'>
                                <form onSubmit={handleAdd}>
                                    <div className="reflow-shopping-cart">
                                        <div className="ref-loading-overlay" />
                                        <div className="" style={{ display: "block" }}>
                                            <div className="border-bottom py-0">
                                                <div className="col">
                                                    <div className="d-flex flex-row">
                                                        <input type="text" value={note.title} className="form-control my-input h1 mb-1 mt-0 notetitle bg-primary-gradient" placeholder='Title' name='title' id="id" aria-describedby="emailHelp" onChange={onChange} minLength={3} required />
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
                                            </div>
                                            <div className="d-flex flex-row border-bottom mt-4">
                                                <h4 className='mx-3 fw-bold my-1 mt-2'>Tag : </h4>
                                                <input type="text" value={note.tag} placeholder='General' name='tag' className="form-control input-2 bg-primary-gradient" id="tag" onChange={onChange} />
                                            </div>
                                        </div>
                                    </div>
                                    <button disabled={note.title.length < 3 || value.length < 5} type="submit" className="btn btn-primary my-3">Add Note</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default NewNote
