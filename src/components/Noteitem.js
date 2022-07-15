import React from 'react'
import { useContext } from 'react';
import noteContext from '../context/notes/noteContext';
import "./Noteitem.css";
import ReactMarkdown from 'react-markdown';
import { useHistory } from 'react-router-dom';


const Noteitem = (props) => {
    const context = useContext(noteContext);
    const { deleteNote } = context;
    const history = useHistory();

    const viewNote = async () => {
        console.log(props.note._id);
        props.setViewNoteTheme(props.theme)
        props.setnoteData(props.note)
        history.push('/note')
    }

    const colors = ['info', 'success', 'primary', 'secondary'];
    // const randColorPicker = Math.floor(Math.random() * (4));

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const date = new Date(props.note.date)

    const dateConstructor = date.getDate() + ' ' + monthNames[date.getMonth()] + ', ' + date.getFullYear()

    return (
        <>
            {/* <div className='col-md-3 my-2'>
                <div className="card">
                    <div className="card-body">
                        <div className="d-flex justify-content-between">
                            <h5 className="card-title" id='heading'>{props.note.title}</h5>
                            <div id="imageDiv">
                                <i className="fa-solid fa-trash-can mx-2 " onClick={() => { deleteNote(props.note._id) }}></i>
                                <i className="fa-solid fa-pen-to-square mx-2" onClick={() => {
                                    props.updateNote(props.note)
                                }}></i>
                            </div>
                        </div>
                        <p className="card-text"> <ReactMarkdown>{props.note.description}</ReactMarkdown></p>
                        <p className='tag'>{props.note.tag}</p>
                    </div>
                </div>
            </div> */}

            <div class={`ref-product minNoteItemHeight bg-${colors[props.theme]}-light p-4 cursor-pointer`} onClick={viewNote} >
                <div class="d-flex flex-column border-bottom mb-3">
                    <h5 class={`ref-name h3 text-capitalize`}>{props.note.title.length <= 20 ? props.note.title.slice(0, 20) : props.note.title.slice(0, 20) + ' ...'}</h5>
                    <div class="d-flex flex-row w-100 justify-content-between">
                        {/* <p class="ref-excerpt mb-0 pb-1 tag">{props.note.tag}</p> */}
                        <p class={`ref-excerpt mb-0 pb-1 text-${colors[props.theme]}`}>{props.note.tag}</p>
                        <p class="ref-excerpt mb-0 pb-1">{dateConstructor}</p>
                    </div>
                </div>
                <div class="card-body Mycard-body card-text textSmall">
                    <ReactMarkdown>{props.note.description.length <= 250 ? props.note.description.slice(0, 250) : props.note.description.slice(0, 250) + ' ...'}</ReactMarkdown>
                </div>
            </div>


        </>
    )
}

export default Noteitem

