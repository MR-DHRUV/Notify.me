import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
// import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './CSS/signup.css';
import "./CSS/bootstrap.min.css"



const User = (props) => {

    const history = useHistory();
    const [user, setUser] = useState({ email: '', name: '' })

    const [credentials, setCredentials] = useState({ password: '', verifyToken: null, cpassword: '' });

    const onChange = (event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value })
    }

    const handleCheckbox = (e) => {
        if (warning === true) {
            setWarning(false)
        }
        else {
            setWarning(true)
        }
    }

    const [success, setSuccess] = useState(false);
    const [warning, setWarning] = useState(false)



    useEffect(() => {
        if (localStorage.getItem('token')) {

            const fetchData = async () => {

                const response = await fetch('https://data-notify.azurewebsites.net/auth/verifyuser', {

                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'auth-token': localStorage.getItem('token'),
                        'Access-Control-Allow-Origin': '*'
                    }
                    ,
      mode: 'cors',
      referrerPolicy: "origin-when-cross-origin",
                });

                const data = await response.json();
                setUser({ email: data.email, name: data.name })

            }
            fetchData()
        }
        else {
            history.push('/signin');
        }
        // eslint-disable-next-line
    }, [])


    const handleSubmit = async (event) => {
        event.preventDefault(); // this will prevent reload

        const response = await fetch('https://data-notify.azurewebsites.net/fogotpassword', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({ email: user.email })
            ,
      mode: 'cors',
      referrerPolicy: "origin-when-cross-origin",
        })

        const data = await response.json();
        // console.log(data);

        if (data.success === true) {
            setSuccess(true);
            // console.log(success)
        }

    }


    const handleReset = async (e) => {
        e.preventDefault();

        const response = await fetch('https://data-notify.azurewebsites.net/fogotpassword/verify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({ email: user.email, authcode: Number(credentials.verifyToken), password: credentials.password })
            ,
      mode: 'cors',
      referrerPolicy: "origin-when-cross-origin",
        })

        const data = await response.json();
        if (data.success === true) {
            history.push('/dashboard')
            console.log(data);
        }
        else {
            props.showAlert('Unable to reset password', 'danger')
        }
    }


    const signOut = async () => {
        localStorage.removeItem('token')
        history.push('/signin')
        props.showAlert('Successfully Signed Out', 'success');
    }


    const reqDelete = async (e) => {
        e.preventDefault()
        const response = await fetch('https://data-notify.azurewebsites.net/auth/delete/email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({ email: user.email })
            ,
      mode: 'cors',
      referrerPolicy: "origin-when-cross-origin",
        })

        const data = await response.json();
        if (data.success === true) {
            setSuccess('delete')
        }
        else (
            setSuccess(false)
        )
    }

    const handleDelete = async (e) => {
        e.preventDefault()

        if (warning === true) {

            const response = await fetch('https://data-notify.azurewebsites.net/auth/delete/email/verify', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({ email: user.email, authcode: Number(credentials.verifyToken), password: credentials.password })
                ,
      mode: 'cors',
      referrerPolicy: "origin-when-cross-origin",
            })

            const data = await response.json();
            if (data.success === true) {
                props.showAlert('Account Deleted Sucessfully', 'success')
                localStorage.removeItem('token')
                history.push('/')
            }
            else { 
            props.showAlert(data.error, 'danger')
            history.push('/myaccount')

        }


    }
}




return (

    <>
        <div className='container my-5'>
            <div className="card shadow-lg o-hidden border-0 myauth">
                <div className="card-body p-0">
                    <div className="row">
                        <div className="col-lg-5 d-none d-lg-flex">
                            <div className="flex-grow-1 bg-register-image imgcontainer"></div>
                        </div>

                        {success === false ?
                            <div className="col-lg-7">
                                <div className="p-5">
                                    <div className="text-center">
                                        <h4 className="text-dark mb-2 fw-bold">Hello, {user.name}</h4>
                                    </div>

                                    <div className="w-100 d-flex justify-content-center">
                                        <div class="bs-icon-xl bs-icon-circle bs-icon-primary shadow bs-icon my-4">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" class="bi bi-person">
                                                <path
                                                    d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z">
                                                </path>
                                            </svg>
                                        </div>
                                    </div>

                                    <div className="user d-flex flex-column justify-content-center">
                                        <div ><h4 className='h4 text-center'>{user.email}</h4></div>

                                        <div className="w-100 d-flex justify-content-center mt-4"> <button className="btn btn-primary d-block btn-user w-100 my-2 mw-500" type="submit" onClick={signOut}>Sign Out</button></div>
                                        {/* <div className="w-100 d-flex justify-content-center"> <button className="btn btn-primary d-block btn-user w-100 my-2" type="submit">Update Email</button></div> */}

                                        <form onSubmit={handleSubmit}>
                                            <div className="w-100 d-flex justify-content-center mb-5">
                                                <button className="btn btn-primary d-block btn-user w-100 my-2 mw-500" type="submit">Update Password</button>
                                            </div>
                                        </form>

                                        <hr />
                                        <form onSubmit={reqDelete}>
                                            <div className="w-100 d-flex justify-content-center"> <button className="btn btn-danger d-block btn-user w-100 google mw-500" type="submit">Delete Account</button></div></form>
                                        <hr />
                                    </div>
                                </div>
                            </div> : success === true ?
                                <div className="col-lg-7">
                                    <div className="p-5">
                                        <div className="user d-flex flex-column justify-content-center">
                                            <div className="text-center mt-3">
                                                <h5 className="text-dark">Email Sent</h5>
                                            </div>
                                            <hr />
                                            <form className="my-3 mt-5" onSubmit={handleReset}>
                                                <div className="mb-3"><input className="form-control form-control-user" required minLength={6} name='verifyToken' placeholder='Verification Code' type="text" value={credentials.verifyToken} onChange={onChange} id="exampleInputEmail" aria-describedby="emailHelp" /></div>
                                                <div className="row mb-3">
                                                    <div className="col-sm-6 mb-3 mb-sm-0"><input className="form-control form-control-user" required minLength={8} name='password' placeholder='New Password' type="password" value={credentials.password} onChange={onChange} id="examplePasswordInput" /></div>

                                                    <div className="col-sm-6"><input className="form-control form-control-user" type="password" id="exampleRepeatPasswordInput" placeholder='Confirm Password' required minLength={8} value={credentials.cpassword} name='cpassword' onChange={onChange} /></div>
                                                </div>
                                                <button disabled={credentials.cpassword !== credentials.password} className="btn btn-primary d-block btn-user w-100" type="submit">Reset Password</button>
                                            </form>
                                        </div>
                                    </div>
                                </div> :
                                <div className="col-lg-7">
                                    <div className="p-5">
                                        <div className="user d-flex flex-column justify-content-center">
                                            <div className="text-center mt-3">
                                                <h5 className="text-dark">Email Sent</h5>
                                            </div>
                                            <hr />
                                            <form className="my-3 mt-5" onSubmit={handleDelete}>
                                                <div className="mb-3"><input className="form-control form-control-user" required minLength={6} name='verifyToken' placeholder='Verification Code' type="text" value={credentials.verifyToken} onChange={onChange} id="exampleInputEmail" aria-describedby="emailHelp" /></div>

                                                <div className="mb-3"><input className="form-control form-control-user" required minLength={8} name='password' placeholder='Password' type="password" value={credentials.password} onChange={onChange} id="examplePasswordInput" /></div>

                                                <div class="form-check mb-3">
                                                    <input class="form-check-input" type="checkbox" checked={warning} required onClick={handleCheckbox} id="flexCheckDefault" />
                                                    <label class="form-check-label fw-bold text-danger" for="flexCheckDefault">
                                                        One's you delete your account, There's NO way to recover your account and all your data will be deleted permanently.<br />I Know, and understand the consequences of deleting an account.
                                                    </label>
                                                </div>

                                                <button disabled={credentials.password.length < 8 || credentials.verifyToken === null || warning === false} className="btn btn-primary d-block btn-user w-100" type="submit">Delete Account</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>}
                    </div>
                </div>
            </div>
        </div>

    </>
)
}

export default User
