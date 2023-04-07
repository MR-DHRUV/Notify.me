import React from 'react'
import { useContext, useEffect, useState } from 'react'
import todoContext from '../../context/notes/todoContext'
import ListItem from './ListItem'
import '../CSS/A.css'
import '../CSS/todo.css'

const ToDo = () => {

    const context = useContext(todoContext);
    const { lists, getAllList, addList } = context;

    const [newList, setnewList] = useState({ title: '', date: '' })


    useEffect(() => {

        if (lists.length === 0) {
            
            getAllList();
            console.log("gettinglist");
        }
        
    // eslint-disable-next-line
    }, [])

    const onChange = (event) => {
        setnewList({ ...newList, [event.target.name]: event.target.value })
    }

    const handleAdd = async (e) => {
        e.preventDefault();
        await addList(newList.title, newList.date);
        await getAllList();
        setnewList({ title: '', date: '' })
    }

    return (
        <div className="container my-5">
            <div class="row flex-grow">
                <div class="col-12 grid-margin stretch-card">
                    <div class="card card-rounded">
                        <div class="card-body responsiveToDo">
                            <div class="row">
                                <div class="col-lg-12">
                                    <div
                                        class="d-flex justify-content-between align-items-center">
                                        <h2 class="card-title card-title-dash mb-4">Todo List</h2>
                                    </div>
                                    <div class="list-wrapper">
                                        <div className="addList border-bottom mb-5 pb-2">
                                            <form className='d-flex flex-column flex-wrap justify-content-between' onSubmit={handleAdd}>
                                                <div className="mb-3"><input className="form-control" type="text" name="title"
                                                    placeholder="Title" required={true} value={newList.title} onChange={onChange} minLength={3} /></div>

                                                <div className="d-flex flex-row align-items-center">
                                                    <div className="mb-3 d-flex flex-row align-items-center">
                                                        {/* <p className='text-start mb-0 mx-3'>Date: </p> */}
                                                        <input className="form-control" type="date" name="date"
                                                            placeholder="Time" required={true} value={newList.date} onChange={onChange} minLength={1} />
                                                        <p className='mx-2 mb-0' id='timeWarning'>Invalid Time</p>
                                                    </div>

                                                    <div className="mx-3 mb-3">
                                                        <button disabled={newList.title.length < 3 && newList.date.length > 1} className={`btn btn-primary`}
                                                            type="submit">Add
                                                        </button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                        <ul class="todo-list todo-list-rounded overfloy-y-scroll">
                                            {lists.map((list) => {
                                                return <ListItem key={list._id} id={list._id} title={list.title} date={list.date} done={list.isDone} />
                                            })}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ToDo