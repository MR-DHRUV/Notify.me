import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom';
import reminderContext from '../../context/notes/reminderContext';
import "../CSS/bootstrap.min.css"


const ReminderItem = (props) => {
    const history = useHistory()
    const context = useContext(reminderContext);
    const { deleteReminder } = context;
    const colors = ['info', 'success', 'primary', 'secondary'];


    const triggerDelete = async () => {
        await deleteReminder(props.id);
        await props.reminderUpdater();
        history.push('/reminder');
    }

    const updateHandler = async () => {
        props.stateConroller({ title: props.title, description: props.body, time: null, id: props.id })
        props.handleAdd()
    }

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const constructor = new Date(props.time)
    const dateToDisplay = constructor.getDate() + ' ' + monthNames[constructor.getMonth()] + ', ' + constructor.getFullYear() + ', ' + constructor.getHours() + ":" + constructor.getMinutes();
    // console.log(dateToDisplay);


    return (
        <div className="ref-product">
            <div className="ref-product-col">
                <div className="ref-product-wrapper">
                    <div className="ref-product-data">
                        <div className="ref-product-info">
                            <div className="ref-product-name">{props.title}</div>
                            <div className="ref-product-category">{props.body}</div>
                            <div className="ref-product-variants"></div>
                            <div className="ref-product-personalization-holder"></div>
                        </div>
                        <div className="ref-product-price">{dateToDisplay}</div>
                    </div>
                </div>
                <div className="ref-product-controls">
                    <div className="ref-product-quantity">
                        <div className="ref-quantity-container" data-reflow-product="1053938381"
                            data-reflow-max-qty="999" data-reflow-quantity="2">
                            <button className={`btn btn-outline-${colors[props.theme]} bg-opacity-50`} onClick={updateHandler}>Update</button>
                        </div>
                    </div>
                    <button className={`btn btn-outline-${colors[props.theme]}`} onClick={triggerDelete}>Remove</button>
                </div>
            </div>
            <div className="ref-price-col">
                <div className="ref-product-price">{dateToDisplay}</div>
            </div>
            <div className="ref-quantity-col">
                <div className="ref-product-quantity">
                    <div className="ref-quantity-container" data-reflow-product="1053938381"
                        data-reflow-max-qty="999" data-reflow-quantity="2">
                        <button className={`btn btn-outline-${colors[props.theme]} bg-opacity-50`} onClick={updateHandler}>Update</button>
                    </div>
                    <div className="ref-product-qty-message"></div>

                </div>
            </div>
            <div className="ref-total-col">
                <button className={`btn btn-outline-${colors[props.theme]} mx-2`} onClick={triggerDelete}>Remove</button>
            </div>
        </div>
    )
}

export default ReminderItem