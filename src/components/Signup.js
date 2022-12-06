import React from 'react'
import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
// import styles from './assets-login/bootstrap/css/bootstrap.module.min.css';
import './CSS/signup.css';
import md5 from 'md5'
import { useEffect } from 'react';
import "./CSS/bootstrap.min.css"


const Signup = (props) => {

    const [credentials, setCredentials] = useState({ fname: '', email: props.email, password: '', cpassword: '', lname: "", verificationCode: null });
    let history = useHistory();
    const [sendOtp, setSendOtp] = useState(false)

    const onChange = (event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value })
    }

    useEffect(() => {
        if (localStorage.getItem('token')) {
            history.push('/dashboard');
        }
        // eslint-disable-next-line
    }, [])




    const handleSubmit = async (event) => {
        event.preventDefault();

        if (credentials.password === credentials.cpassword) {

            const name = credentials.fname + ' ' + credentials.lname;

            const response = await fetch('https://data-notify.azurewebsites.net/auth/signup/email/verify', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: name, email: credentials.email, password: credentials.password, authcode: Number(credentials.verificationCode) })
                ,
                mode: 'cors',
                referrerPolicy: "origin-when-cross-origin",
            });
            const json = await response.json();
            // console.log(json);
            if (json.success === true) {
                props.showAlert('Account Created Successfully', 'success');
                await localStorage.setItem('token', json.authToken)
                history.push('/dashboard')
            }
            else {
                props.showAlert('Invalid Email Id', 'danger');
            }
        }

    }

    const googleSubmit = async (e) => {

        const authCode = Math.floor(100000 + Math.random() * 90000000);
        const uri = md5(authCode);
        // console.log(uri);
        const preConnect = await fetch(`https://data-notify.azurewebsites.net/auth/googlecontext/:${uri}`, {
            method: 'PUT',
            mode: 'cors',
            referrerPolicy: "origin-when-cross-origin",
        })

        const preConnectResponse = await preConnect.json();
        // console.log(preConnectResponse.success);

        if (preConnectResponse.success === true) {

            // history.push('/auth/v2/google');

            if (localStorage.getItem('token') !== undefined || localStorage.getItem('token') !== null) {
                // e.preventDefault()
                history.push('/dashboard')
            }


            try {

                let data = undefined;
                // e.preventDefault();
                // console.log('try block');

                while (data === undefined || data === null) {
                    const response = await fetch(`https://data-notify.azurewebsites.net/auth/g/user/${uri}`, {
                        method: 'GET',
                        mode: 'cors',
                        referrerPolicy: "origin-when-cross-origin",
                    })
                    const md = await response.json()

                    // console.log('fetched')
                    // console.log(md);
                    data = md;
                    localStorage.setItem('token', md.authToken);
                    history.push('/dashboard');

                }
            } catch (error) {
                console.log(error);
            }
        }

    }

    const sendMail = async (event) => {
        event.preventDefault();

        const response = await fetch('https://data-notify.azurewebsites.net/auth/signup/email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email })
            ,
            mode: 'cors',
            referrerPolicy: "origin-when-cross-origin",
        });
        const json = await response.json();
        // console.log(json);
        if (json.success === true) {
            setSendOtp(true)
            props.showAlert(json.message, 'success');
        }
        else {
            setSendOtp(false)
            props.showAlert(json.message, 'danger');

        }
        setSendOtp(true)


    }


    return (
        <div className='container my-3 mycontainer'>
            {/* <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <input type="text" placeholder='name' name='name' required minLength={2} value={credentials.name} onChange={onChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                </div> 
                <div className="mb-3">
                    <input type="email" placeholder='email' name='email' required minLength={8} value={credentials.email} onChange={onChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <input type="password" placeholder='password' name='password' required minLength={8} value={credentials.password} onChange={onChange} className="form-control" id="exampleInputPassword1" />
                </div>
                <div className="mb-3">
                    <input type="password" placeholder='confirm password' required minLength={8} value={credentials.cpassword} name='cpassword' onChange={onChange} className="form-control" id="exampleInputPassword1" />
                </div>

                <button type="submit" disabled={credentials.name.length < 2 || credentials.email.length < 8 || credentials.password.length < 8 || credentials.cpassword.length < 8 || credentials.password !== credentials.cpassword} className="btn btn-primary">Submit</button>
                <Link to='/signin' className='mx-3 btn btn-primary'>Signin</Link>

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
                                    <h4 className="text-dark mb-4 text-capitalize">{sendOtp === false ? 'Create an Account!' : 'Mail with verification code send to your email-ID'}</h4>
                                </div>

                                {sendOtp === false ?
                                    <form className="user" onSubmit={sendMail} >

                                        <div className="mb-3"><input className="form-control form-control-user" placeholder='Email Address' name='email' required minLength={8} value={credentials.email} onChange={onChange} type="email" id="exampleInputEmail" aria-describedby="emailHelp" /></div>

                                        <button className="btn btn-primary d-block btn-user w-100" type="submit">Continue With Email</button>

                                        <hr /><Link to='/auth/v2/google' target='_blank' onClick={googleSubmit} className="btn btn-primary d-block btn-google btn-user w-100 mb-2 google" role="button" href='/'><i className="fab fa-google"></i>&nbsp; Continue with Google</Link>
                                        <hr />
                                    </form>
                                    :
                                    <form className="user" onSubmit={handleSubmit}>

                                        <div className="row mb-3">
                                            <div className="col-sm-6 mb-3 mb-sm-0"><input className="form-control form-control-user" type="text" id="exampleFirstName" placeholder="First Name" name="fname" required minLength={2} value={credentials.fname} onChange={onChange} /></div>

                                            <div className="col-sm-6"><input className="form-control form-control-user" type="text" id="exampleFirstName" placeholder="Last Name" name="lname" required minLength={2} value={credentials.lname} onChange={onChange} /></div>
                                        </div>

                                        <div className="mb-3"><input className="form-control form-control-user" placeholder='Verification Code' name='verificationCode' required minLength={6} value={credentials.verificationCode} onChange={onChange} type="text" id="exampleInputEmail" aria-describedby="emailHelp" /></div>

                                        <div className="row mb-3">
                                            <div className="col-sm-6 mb-3 mb-sm-0"><input className="form-control form-control-user" placeholder='Password' name='password' required minLength={8} value={credentials.password} onChange={onChange} type="password" id="examplePasswordInput" /></div>

                                            <div className="col-sm-6"><input className="form-control form-control-user" type="password" id="exampleRepeatPasswordInput" placeholder='Confirm Password' required minLength={8} value={credentials.cpassword} name='cpassword' onChange={onChange} /></div>
                                        </div>

                                        <button disabled={credentials.fname.length < 2 || credentials.email.length < 8 || credentials.password.length < 8 || credentials.cpassword.length < 8 || credentials.password !== credentials.cpassword} className="btn btn-primary d-block btn-user w-100" type="submit">Register Account</button>

                                        <hr /><Link to='/auth/v2/google' target='_blank' onClick={googleSubmit} className="btn btn-primary d-block btn-google btn-user w-100 mb-2 google" role="button" href='/'><i className="fab fa-google"></i>&nbsp; Continue with Google</Link>
                                        <hr />

                                    </form>}





                                <div className="text-center"><Link className="small myLink" to="/resetpassword">Forgot Password?</Link></div>
                                <div className="text-center"><Link className="small myLink" to="/signin">Already have an account? Login!</Link></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup
