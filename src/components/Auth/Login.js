import React from 'react'
import { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import md5 from 'md5'
import "../CSS/bootstrap.min.css"


const Login = (props) => {

    const [credentials, setCredentials] = useState({ email: '', password: '' });
    let history = useHistory();

    const onChange = (event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault(); // this will prevent reload


        const response = await fetch('https://data-notify.azurewebsites.net/auth/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
            ,
            mode: 'cors',
            referrerPolicy: "origin-when-cross-origin",
        })
        const json = await response.json()
        // console.log(json);

        if (json.success === true) {
            //save the auth token and  redirect
            // console.log(object);
            // props.emailUpdater(credentials.email)
            props.showAlert('Logged in Successfully', 'success');
            localStorage.setItem('token', json.authToken);
            history.push('/dashboard');
        }
        else {
            props.showAlert('Invalid EmailId or Password', 'danger');

        }
    }


    const googleSubmit = async (e) => {

        const authCode = Math.floor(100000 + Math.random() * 90000000);
        const uri = md5(authCode);
        // console.log(uri);
        const preConnect = await fetch(`https://api-authify.azurewebsites.net/auth/googlecontext/:${uri}`, {
            method: 'PUT'
            ,
            mode: 'cors',
            referrerPolicy: "origin-when-cross-origin",
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
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
                    const response = await fetch(`https://api-authify.azurewebsites.net/auth/g/user/${uri}`, {
                        method: 'GET'
                        ,
                        mode: 'cors',
                        referrerPolicy: "origin-when-cross-origin",
                        headers: {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*'
                        },
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

    useEffect(() => {
        if (localStorage.getItem('token')) {
            history.push('/dashboard');
        }
        // eslint-disable-next-line
    }, [])


    return (
        <div className='container mycontainer my-5'>
            {/* <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input required minLength={8} type="email" name='email' value={credentials.email} onChange={onChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input required minLength={8} name='password' type="password" value={credentials.password} onChange={onChange} className="form-control" id="exampleInputPassword1" />
                </div>
                <button disabled={credentials.email.length < 8 || credentials.password.length < 8} type="submit" className="btn btn-primary" >Submit</button>
                <Link to='/resetpassword' className='mx-3 btn btn-primary'>Forgot Password?</Link>
                <Link to='/auth/v2/google' target='_blank' onClick={googleSubmit} className='btn btn-primary'>Google</Link>
                <Link to='/signup' className='mx-3 btn btn-primary'>Signup</Link>

            </form> */}


            <div className="card shadow-lg o-hidden border-0 myauth">
                <div className="card-body p-0">
                    <div className="row">
                        <div className="col-lg-5 d-none d-lg-flex">
                            <div className="flex-grow-1 bg-register-image imgcontainer"></div>
                        </div>
                        <div className="col-lg-7">
                            <div className="p-5">
                                <div className="text-center">
                                    <h4 className="text-dark mb-4">Welcome Back!</h4>
                                </div>


                                <form className="user" onSubmit={handleSubmit}>

                                    <div className="mb-3"><input className="form-control form-control-user" placeholder='Email Address' name='email' required minLength={8} value={credentials.email} onChange={onChange} type="email" id="exampleInputEmail" aria-describedby="emailHelp" /></div>


                                    <div className="mb-3"><input className="form-control form-control-user" placeholder='Password' name='password' required minLength={8} value={credentials.password} onChange={onChange} type="password" id="examplePasswordInput" /></div>

                                    <button disabled={credentials.email.length < 8 || credentials.password.length < 8} className="btn btn-primary d-block btn-user w-100" type="submit">Login</button>


                                    <hr /><Link to='/auth/v2/google' target='_blank' onClick={googleSubmit} className="btn btn-primary d-block btn-google btn-user w-100 mb-2 google" role="button" href='/'><i className="fab fa-google"></i>&nbsp; Login with Google</Link>
                                    <hr />
                                </form>
                                <div className="text-center"><Link className="small myLink" to="/resetpassword">Forgot Password?</Link></div>
                                <div className="text-center"><Link className="small myLink" to="/signup">New Here? Create an Account!</Link></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>





    )
}

export default Login
