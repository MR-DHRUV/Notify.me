import React from 'react'
import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './ForgotPass.css'





const ForgetPassword = () => {

    const [credentials, setCredentials] = useState({ email: '', password: '', verifyToken: null, cpassword: '' });
    const [success, setSuccess] = useState(false);

    let history = useHistory();

    const onChange = (event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault(); // this will prevent reload
        // console.log(JSON.stringify({ email: credentials.email }));

        const response = await fetch('https://api-authify.azurewebsites.net//fogotpassword', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email })
        })

        const data = await response.json();
        // console.log(data);

        if (data.success === true) {
            setSuccess(true);
            // document.getElementById('mailsent').style.display = 'flex';
            // document.getElementById('otpform').style.display = 'flex';
        }


    }
    const handleReset = async (e) => {
        e.preventDefault();

        const response = await fetch('https://api-authify.azurewebsites.net//fogotpassword/verify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, authcode: Number(credentials.verifyToken), password: credentials.password })
        })

        // eslint-disable-next-line
        const data = await response.json();
        history.push('/signin')
        // console.log(data);

    }





    return (
        <div className='container mycontainer my-3'>
            {/* <h1 className="h1">Reset Password</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input required minLength={8} type="email" name='email' placeholder='Enter Email address' value={credentials.email} onChange={onChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                </div>
                <label htmlFor="exampleInputEmail1" className="form-label" id='mailsent'>Email Sent Successfully</label>

                <button type="submit" className="btn btn-primary" >Submit</button>
            </form> */}





            <div className="card shadow-lg o-hidden border-0 my-5 myauth">
                <div className="card-body p-0">
                    <div className="row">
                        <div className="col-lg-5 d-none d-lg-flex">
                            <div className="flex-grow-1 bg-register-image imgcontainer"></div>
                        </div>
                        <div className="col-lg-7">
                            <div className="p-5">
                                <div className="text-center">
                                    <h4 className="text-dark mb-4">Forgot Your Password?</h4>
                                    <p class="mb-4">We get it, stuff happens. Just enter your email address below and we'll send you a verification code to reset your password!</p>
                                </div>


                                <form className="user mb-4" onSubmit={handleSubmit}>
                                    <div className="mb-3"><input className="form-control form-control-user" required minLength={8} type="email" name='email' placeholder='Email Address' value={credentials.email} onChange={onChange} id="exampleInputEmail" aria-describedby="emailHelp" /></div>
                                    <button disabled={credentials.email.length < 8} className="btn btn-primary d-block btn-user w-100" type="submit">Send Verification Code</button>
                                </form>

                                {
                                    success === true ?
                                        <div className='my-5 border-top'>
                                            <div className="text-center my-3">
                                                <h5 className="text-dark mb-4">Email Sent</h5>
                                            </div>
                                            <form className="user my-3 mb-4" onSubmit={handleReset}>
                                                <div className="mb-3"><input className="form-control form-control-user" required minLength={6} name='verifyToken' placeholder='Verification Code' type="text" value={credentials.verifyToken} onChange={onChange} id="exampleInputEmail" aria-describedby="emailHelp" /></div>

                                                <div className="row mb-3">
                                                    <div className="col-sm-6 mb-3 mb-sm-0"><input className="form-control form-control-user" required minLength={8} name='password' placeholder='New password' type="password" value={credentials.password} onChange={onChange} id="examplePasswordInput" /></div>

                                                    <div className="col-sm-6"><input className="form-control form-control-user" type="password" id="exampleRepeatPasswordInput" placeholder='Confirm Password' required minLength={8} value={credentials.cpassword} name='cpassword' onChange={onChange} /></div>

                                                </div>

                                                <button disabled={credentials.email.length < 8 || credentials.cpassword !== credentials.password} className="btn btn-primary d-block btn-user w-100" type="submit">Reset Password</button>
                                            </form>
                                        </div>


                                        : ''
                                }



                                <div className="text-center"><Link className="small myLink" to="/resetpassword">Forgot Password?</Link></div>
                                <div className="text-center"><Link className="small myLink" to="/signin">Already have an account? Login!</Link></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
















            {/* <form id='otpform' onSubmit={handleReset}>

                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Verification Code</label>
                    <input required minLength={6} name='verifyToken' placeholder='Verification Code' type="number" value={credentials.verifyToken} onChange={onChange} className="form-control" id="exampleInputPassword1" />
                </div>

                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">New Password</label>
                    <input required minLength={8} name='password' placeholder='New password' type="password" value={credentials.password} onChange={onChange} className="form-control" id="exampleInputPassword1" />
                </div>

                <button type="submit" className="btn btn-primary" >Submit</button>
            </form> */}
        </div>
    )
}

export default ForgetPassword