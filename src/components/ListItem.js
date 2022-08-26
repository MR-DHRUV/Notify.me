import React, { useContext } from 'react'
import { useState } from 'react';
import todoContext from '../context/notes/todoContext';


const ListItem = (props) => {

    const context = useContext(todoContext);
    const { deleteList , editList } = context;

    const delList = async (e) => {
        console.log(props.id)
        await deleteList(props.id);
    }

    // const [complete, setcomplete] = useState(false);

    const updater = () => {
        editList(props.id);
    }


    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const constructor = new Date(props.date);
    const dateToDisplay = constructor.getDate() + ' ' + monthNames[constructor.getMonth()] + ', ' + constructor.getFullYear();

    const Diffrence = (constructor - Date.now()) / (1000 * 3600 * 24); 
    console.log("Diffreence : ", Diffrence);

    return (
        <li class={props.done === true ? "d-block completed" : "d-block"}>
            <div class="form-check w-100 mb-3">
                <label class="form-check-label">
                    <input class="checkbox form-check-input" type="checkbox" onClick={updater}/>
                    <i class="input-helper fa-check rounded"></i>
                    <h5 className="fw-bold">{props.title}</h5>
                </label>
                <div class="d-flex mt-3 pl-5 ms-1 justify-content-between listoptions">
                    <div
                        class="ps-4 text-small me-3 d-flex flex-row align-content-center responsivetodobottomcontainer">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" fill="currentColor" class="bi bi-calendar me-2" viewBox="0 0 16 16">
                            <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
                        </svg>
                        {dateToDisplay}
                        { Diffrence > 1 && Diffrence < 2 ? <div class="badge rounded mx-1 d-flex align-items-center badge-opacity-warning ms-3 rounded mx-1 d-flex align-items-center">Due tomorrow</div> : Diffrence > 0 && Diffrence < 1  ? <div class="badge rounded mx-1 d-flex align-items-center badge-opacity-danger bg-danger bg-opacity-25 ms-3 rounded mx-1 d-flex align-items-center">Due today</div> : ''}
                    </div>
                    <div className="d-flex flex war flex-row me-4 responsivetodobtn">
                        <button className='btn p-0 m-0 listbtnoption' onClick={delList}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                            </svg>
                        </button>
                    </div>
                </div>

            </div>
        </li>
    )
}

export default ListItem