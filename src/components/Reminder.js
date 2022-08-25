import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import reminderContext from '../context/notes/reminderContext';
import ReminderItem from './ReminderItem';
import './CSS/reminder.css'
import addNotification from 'react-push-notification';
import "./CSS/bootstrap.min.css"

const Reminder = (props) => {

    const sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const [reminder, setReminder] = useState({ time: null, title: '', description: '', id: null })
    const onChange = (event) => {
        setReminder({ ...reminder, [event.target.name]: event.target.value })
    }

    const [prevReminders, setPrevReminders] = useState([])
    const [upcommingReminders, setUpcommingReminders] = useState([])

    const [themeStorage, setThemestorage] = useState(0)
    const today = Date.now()
    const history = useHistory()
    const context = useContext(reminderContext);
    const { reminders, getAllReminders, addReminder, editReminder } = context;
    const [add, setAdd] = useState(false)
    let theme = 0;

    const colors = ['info', 'success', 'primary', 'secondary'];

    const chkPrev = async (reminder) => {
        let prevReminder = []

        for (let i = 0; i < reminders.length; i++) {
            const check = new Date(reminders[i].timeToRemind)
            if (check < today) {
                prevReminder.push(reminders[i]);
            }
            setPrevReminders(prevReminder)
            // console.log(prevReminder);
        }
    }

    const chkUpk = async (reminder) => {
        let upcommingReminder = []

        for (let i = 0; i < reminders.length; i++) {
            const check = new Date(reminders[i].timeToRemind)
            if (check > today) {
                upcommingReminder.push(reminders[i]);
            }
            setUpcommingReminders(upcommingReminder)
            // console.log(upcommingReminder);
        }
    }


    const themeSelector = Math.floor(Math.random() * (4))

    useEffect(() => {
        if (localStorage.getItem('token')) {
            getAllReminders()
            chkPrev()
            chkUpk()
            console.log("redimders fetched");
        }
        else {
            history.push('/signin');
        }
        // eslint-disable-next-line
    }, [reminders])


    const handleAdd = async () => {
        if (add === false) {
            setThemestorage(themeSelector)
            setAdd(true)
            document.getElementById('addBlur').style.display = 'flex';
            document.getElementById('addBlur').style.justifyContent = 'center';
            document.getElementById('getBlur').style.filter = 'blur(10px)';
            window.scrollTo(0,0);
            if (window.innerWidth > 1200) {
                // document.getElementById('addBlur').style.alignItems = 'center';
            }
        }
    }

    const handleBack = () => {
        setAdd(false)
        setReminder({ time: null, title: '', description: '', id: null })
        document.getElementById('addBlur').style.display = 'flex';
        document.getElementById('addBlur').style.justifyContent = 'center';
        document.getElementById('addBlur').style.alignItems = 'flex-start';
        document.getElementById('getBlur').style.filter = 'blur(0px)';
    }

    const handleAddReminder = async (event) => {
        event.preventDefault()
        // const timeCheck = isNaN(reminder.time)
        // const timeToSend = reminder.time.split('-')
        // if (timeToSend[4] > 60) {
        //     return document.getElementById('timeWarning').style.display = 'flex'
        // }
        // if (timeToSend[3] > 24) {
        //     return document.getElementById('timeWarning').style.display = 'flex'
        // }
        // if (timeToSend[1] > 12) {
        //     return document.getElementById('timeWarning').style.display = 'flex'
        // }
        // if (timeToSend[0] > 31) {
        //     return document.getElementById('timeWarning').style.display = 'flex'
        // }
        // const dateAndTime = new Date(timeToSend[2], (timeToSend[1] - 1), timeToSend[0], timeToSend[3], timeToSend[4], 0);


        if (reminder.id) {
            editReminder(reminder.id, reminder.title, reminder.description, reminder.time)
            handleBack()

        }
        else {
            addReminder(reminder.title, reminder.description, reminder.time);
            handleBack()
        }


        setReminder({ time: null, title: '', description: '', id: null })
        getAllReminders()

        const dateNI = new Date();
        let ISToffSet = 330; //IST is 5:30; i.e. 60*5+30 = 330 in minutes 
        let offset = ISToffSet * 60 * 1000;
        let ISTTime = new Date(dateNI.getTime() + offset);
        // console.log("IST" , ISTTime);

        const timeDiffrenceMs = (new Date(reminder.time) - Date.now())
        console.log("Diffrence : ", timeDiffrenceMs );
        // setTimeout(() => {
        // }, timeDiffrenceMs);

        sleep(timeDiffrenceMs).then(() => {

            addNotification({
                title: 'Reminder',
                message: `${reminder.title}\n${reminder.description} `,
                duration: 100000, //optional, default: 5000, 
                native: true // when using native, your OS will handle theming.  
            });
        })

        chkPrev()
        chkUpk()

    }


    return (
        <section className={props.hide ? 'mb-4' : ''} id='addBlur'>
            {add && <div id='addReminder' className="row g-0 row-cols-1 row-cols-md-2 row-cols-xl-3 d-flex align-items-md-center align-items-xl-center justify-content-center align-content-center ">
                <div className="col myBox">
                    <div className={`card textwhite bg-${colors[themeStorage]}-light text-${colors[themeStorage]}`}>
                        <div className="card-body p-4">
                            <div className="d-flex justify-content-center">
                                <div>
                                    {/* <h2 className="fw-bold text-white mb-3 text-center">What do we need you to remind :</h2> */}
                                    <div className="d-flex justify-content-center align-items-center p-3"><svg
                                        xmlns="http://www.w3.org/2000/svg" width="100" height="100"
                                        fill="currentColor" className="bi bi-bell-fill" viewBox="0 0 16 16">
                                        <path
                                            d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z" />
                                    </svg></div>

                                </div>
                            </div>
                            <div>
                                <form onSubmit={handleAddReminder}>
                                    <div className="mb-3"><input className="form-control" type="text" name="title"
                                        placeholder="Title" required={true} value={reminder.title} onChange={onChange} minLength={3} /></div>

                                    <div className="mb-3">
                                        <textarea className={`form-control text-${colors[themeStorage]}`} name="description" placeholder="Description" required={true} value={reminder.description} onChange={onChange} minLength={5} rows='5' id="floatingTextarea"></textarea>
                                    </div>

                                    <div className="mb-3">
                                        {window.innerWidth < 1000 ? <p className='text-start mb-0 pb-1'>Time :</p> : ''}
                                        <input className="form-control" type="datetime-local" name="time"
                                            placeholder="Time" required={true} value={reminder.time} onChange={onChange} minLength={1} />
                                        <p className='mx-2 mb-0' id='timeWarning'>Invalid Time</p>
                                    </div>

                                    <div className="mb-3"><button disabled={reminder.title.length < 3} className={`btn btn-${colors[themeStorage]} shadow d-block w-100`}
                                        type="submit">Add Reminder</button></div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>}
            <div className="container mt-0 pt-0" id='getBlur'>
                {/* <h1 className='haedingTop border-bottom display-4 fw-bold'>Reminders</h1> */}
                <div className="row mx-auto mt-0 pt-0 border-bottom">
                    <div className="col mt-0 pt-0 myCol">
                        <div data-reflow-type="shopping-cart mt-0 pt-0">
                            <div className="reflow-shopping-cart mt-0 pt-0">
                                <div className="ref-loading-overlay"></div>
                                <div className="ref-message" style={{ display: 'none' }}></div>
                                <div className="ref-cart mt-0 pt-0 d-block">
                                    <div className="ref-heading my-0 mb-3"><h1 className={window.innerWidth > 999 ? "mt-5 h2 fw-semibold" : 'mt-4 h2 fw-semibold'}>Upcoming Reminders</h1>
                                    </div>

                                    <div className="ref-th px-3">
                                        <div className="ref-product-col">For</div>
                                        <div className="ref-price-col">Date & Time</div>
                                        <div className="ref-quantity-col"></div>
                                        <div className="ref-total-col"></div>
                                    </div>
                                    <div className="ref-cart-table">
                                        {upcommingReminders.map((reminder) => {

                                            let send = theme
                                            theme = theme + 1;
                                            if (theme === 4) {
                                                theme = 0;
                                            }

                                            return <ReminderItem handleAdd={handleAdd} key={reminder._id} id={reminder._id} title={reminder.title} time={reminder.timeToRemind} body={reminder.description} updateReminder={handleAddReminder} stateConroller={setReminder} theme={send} />
                                        })}

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mx-3 mt-2">{reminders.length === 0 && "Add a reminder by clicking on add button"}</div>
                {/* <div className="mx-3 mt-2">{upcommingReminders.length === 0 && "Notnhing to remind"}</div> */}

                {!props.hide ? <div className="row mx-auto my-5 py-3">
                    <div className="col mt-0 pt-0 myCol">
                        <div data-reflow-type="shopping-cart mt-0 pt-0 border-bottom">
                            <div className="reflow-shopping-cart mt-0 pt-0">
                                <div className="ref-loading-overlay"></div>
                                <div className="ref-message" style={{ display: 'none' }}></div>
                                <div className="ref-cart mt-0 pt-0 d-block">
                                    <div className="ref-heading my-0 mb-3"><h1 className='h2 fw-semibold'>Past Reminders</h1>
                                    </div>

                                    <div className="ref-th px-3">
                                        <div className="ref-product-col">For</div>
                                        <div className="ref-price-col">Date & Time</div>
                                        <div className="ref-quantity-col"></div>
                                        <div className="ref-total-col"></div>
                                    </div>
                                    <div className="ref-cart-table">
                                        {prevReminders.map((reminder) => {

                                            let send = theme
                                            theme = theme + 1;
                                            if (theme === 4) {
                                                theme = 0;
                                            }

                                            return <ReminderItem handleAdd={handleAdd} key={reminder._id} id={reminder._id} title={reminder.title} time={reminder.timeToRemind} body={reminder.description} updateReminder={handleAddReminder} stateConroller={setReminder} theme={send} />
                                        })}
                                        {/* <ReminderItem title='jjj' time={30} body='kfcsdjfhefghueih' /> */}
                                        {/* <ReminderItem title='jjj' time={30} body='kfcsdjfhefghueih' />
                                        <ReminderItem title='jjj' time={30} body='kfcsdjfhefghueih' />
                                        <ReminderItem title='jjj' time={30} body='kfcsdjfhefghueih' />
                                        <ReminderItem title='jjj' time={30} body='kfcsdjfhefghueih' /> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mx-3">{prevReminders.length === 0 && "No Previous Reminders Found"}</div>
                </div> : ''}
            </div>
            {!props.hide ? <div className="fixed-bottom w-10 newnotebutton">
                <div className="floatingIconContainer">
                    {add === false ? <button className='newnotelink btn floatingBtn reminderBtnPlus' onClick={handleAdd}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="bi bi-plus-circle-fill" viewBox="0 0 16 16">
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
                        </svg>
                    </button> :
                        <button className='newnotelink btn floatingBtn reminderBtnPlus' onClick={handleBack}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16">
                                <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z" />
                            </svg>
                        </button>}

                </div>
            </div> : ''}
        </section>
    )
}

export default Reminder