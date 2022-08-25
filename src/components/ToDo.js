import React from 'react'
import './CSS/A.css'
// import './CSS/todo.css'

const ToDo = () => {
    return (
        <div class="row flex-grow">
            <div class="col-12 grid-margin stretch-card">
                <div class="card card-rounded">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-lg-12">
                                <div
                                    class="d-flex justify-content-between align-items-center">
                                    <h4 class="card-title card-title-dash">Todo
                                        list</h4>
                                </div>
                                <div class="list-wrapper">
                                    <ul class="todo-list todo-list-rounded">
                                        <li class="d-block">
                                            <div class="form-check w-100">
                                                <label class="form-check-label">
                                                    <input class="checkbox"
                                                        type="checkbox" /> Lorem
                                                        Ipsum is simply dummy text
                                                        of the printing <i
                                                            class="input-helper rounded"></i>
                                                </label>
                                                <div class="d-flex mt-2">
                                                    <div
                                                        class="ps-4 text-small me-3">
                                                        24 June 2020</div>
                                                    <div
                                                        class="badge rounded mx-1 d-flex align-items-center badge-opacity-warning me-3 rounded mx-1 d-flex align-items-center">
                                                        Due tomorrow</div>
                                                </div>
                                            </div>
                                        </li>
                                        <li class="d-block">
                                            <div class="form-check w-100">
                                                <label class="form-check-label">
                                                    <input class="checkbox"
                                                        type="checkbox" /> Lorem
                                                        Ipsum is simply dummy text
                                                        of the printing <i
                                                            class="input-helper rounded"></i>
                                                </label>
                                                <div class="d-flex mt-2">
                                                    <div
                                                        class="ps-4 text-small me-3">
                                                        23 June 2020</div>
                                                    <div
                                                        class="badge rounded mx-1 d-flex align-items-center badge-opacity-success me-3">
                                                        Done</div>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="form-check w-100">
                                                <label class="form-check-label">
                                                    <input class="checkbox"
                                                        type="checkbox" /> Lorem
                                                        Ipsum is simply dummy text
                                                        of the printing <i
                                                            class="input-helper rounded"></i>
                                                </label>
                                                <div class="d-flex mt-2">
                                                    <div
                                                        class="ps-4 text-small me-3">
                                                        24 June 2020</div>
                                                    <div
                                                        class="badge rounded mx-1 d-flex align-items-center badge-opacity-success me-3">
                                                        Done</div>
                                                </div>
                                            </div>
                                        </li>
                                        <li class="border-bottom-0">
                                            <div class="form-check w-100">
                                                <label class="form-check-label">
                                                    <input class="checkbox"
                                                        type="checkbox" /> Lorem
                                                        Ipsum is simply dummy text
                                                        of the printing <i
                                                            class="input-helper rounded"></i>
                                                </label>
                                                <div class="d-flex mt-2">
                                                    <div
                                                        class="ps-4 text-small me-3">
                                                        24 June 2020</div>
                                                    <div
                                                        class="badge rounded mx-1 d-flex align-items-center badge-opacity-danger me-3">
                                                        Expired</div>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div></div>
    )
}

export default ToDo