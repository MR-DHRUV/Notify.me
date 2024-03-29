import React from 'react'
import { Link } from 'react-router-dom'
import "../CSS/bootstrap.min.css"




const BackButton = () => {


    return (
        <div className="mx-3 my-0 py-0 px-0 mt-0 pt-0 backButtoncontainer">
            <div >
                <Link className="backButton" to='/dashboard'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="33" height="33" fill="currentColor" class="bi bi-arrow-left-short" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z" />
                    </svg>
 
                </Link>

            </div>
        </div>
    )
}

export default BackButton