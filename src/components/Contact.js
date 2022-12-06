import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import "./CSS/bootstrap.min.css"
import "./CSS/bootstrap.min.css"



const Contact = () => {

    const [query, setQuery] = useState({ subject: '', message: '', contactNo: '' })

    const onChange = (event) => {
        setQuery({ ...query, [event.target.name]: event.target.value })
    }
    const history = useHistory()

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            history.push('/');
        }
        // eslint-disable-next-line
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()

        // if (verifyNo === true) {
        //     document.getElementById('hideMsg1').style.display = 'flex';
        //     document.getElementById('hideMsg').style.display = 'none';
        //     return
        // }
        if (query.contactNo.length !== 10 ) {
            document.getElementById('hideMsg1').style.display = 'flex';
            document.getElementById('hideMsg').style.display = 'none';
            return
        }

        // console.log(query);
        const response = await fetch('https://data-notify.azurewebsites.net/notes/mailer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ subject: query.subject, message: query.message, contactNo: Number(query.contactNo) })
        })
        const json = await response.json()
        // console.log(json);
        if (json.success === true) {
            setQuery({ subject: ' ', message: '', contactNo: '' })
            setQuery({ subject: ' ', message: '', contactNo: '' })
            document.getElementById('hideMsg').style.display = 'flex';
            document.getElementById('hideMsg1').style.display = 'none';
        }

    }

    return (
        <section className="clean-block clean-form mt-5 p-3">

            <div className="container d-flex jusfy-content-center flex-column">

                <div className="block-heading mb-3">
                    <h2 className="h2 mb-2 fw-semibold border-bottom">Contact Us</h2>
                    <p>Having Troublle ? Well stop overthinking and contact-us now !</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="mb-3"><label className="form-label" for="subject">Subject :</label><input id="subject" className="form-control" type="text" name="subject" value={query.subject} required minLength={3} onChange={onChange} /></div>

                    <div className="mb-3"><label className="form-label" for="contactNo">Phone No :</label><input id="subject" className="form-control" type="text" name="contactNo" value={query.contactNo} required minLength={10} onChange={onChange} /></div>

                    <div className="mb-3"><label className="form-label" for="message">Message :</label><textarea id="message" className="form-control" name="message" value={query.message} required rows={1} onChange={onChange}></textarea></div>

                    <h6 id='hideMsg' className='my-2 text-success'>We'll get back to you soon.</h6>
                    <h6 id='hideMsg1' className='my-2 text-danger'>Invalid Contact No !</h6>

                    <div className="mb-3 mt-4"><button className="btn btn-primary" type="submit" disabled={query.subject.length < 3 || query.contactNo.length < 10 || query.message.length < 10}>Send</button></div>
                </form>
            </div>

        </section>
    )
}

export default Contact