import React from 'react'
import HeroImg from './images/hero.svg'
import serviceImg1 from './images/Untitled (100 × 40 px) (3).svg'
// import serviceImg2 from './images/Untitled (100 × 40 px) (1).svg'
import serviceImg3 from './images/Untitled (100 × 40 px) (2).svg'
import reminderImg from './images/Mob.svg'
import './CSS/homePromotion.css'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useEffect } from 'react'
import addNotification from 'react-push-notification'


const HomePromotion = (props) => {

    const [email, setEmail] = useState('');
    const history = useHistory();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            history.push('/dashboard');
        }
        addNotification({
            title: 'Hello !',
            message: 'To get notification for your reminders please dont disble notifications for this website',
            duration: 80000, //optional, default: 5000, 
            native: true // when using native, your OS will handle theming.  
        });
        // eslint-disable-next-line
    }, [])

    const onChange = (event) => {
        setEmail(event.target.value)
    }

    const handleSubmit = (event) => {

        if (email) {
            event.preventDefault();
            // console.log(email)
            props.emailUpdater(email);
            history.push('/signup')
        }
    }
    





    return (
        <>
            <header className="bg-primary-gradient py-2">
                <div className="container ">
                    <div className="row pt-5">
                        <div className="col-md-6 text-center text-md-start d-flex d-sm-flex d-md-flex justify-content-center align-items-center justify-content-md-start align-items-md-center justify-content-xl-end mb-4">
                            <div style={{ maxWidth: 450 }}>
                                {/* <p class="fw-bold text-success mb-2">Special Offer</p> */}
                                <h2 className="fw-bold">
                                    One Place For All Your
                                    <br />
                                    Notes and Reminders
                                </h2>
                                <p className="my-3">
                                    To start using our services plese enter your email adderss to
                                    continue
                                </p>
                                <form
                                    className="d-flex justify-content-center flex-wrap justify-content-md-start flex-lg-nowrap"
                                    onSubmit={handleSubmit}
                                >
                                    <div className="my-2 me-2">
                                        <input
                                            className="border rounded-pill shadow-sm form-control"
                                            type="email"
                                            name="email"
                                            placeholder="Email Address"
                                            required
                                            minLength={8}
                                            value={email}
                                            onChange={onChange}
                                        />
                                    </div>
                                    <div className="my-2">
                                        <button className="btn btn-primary shadow" type="submit" disabled={email.length < 7}>
                                            Continue
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="col-md-6 mb-4">
                            <div
                                className="p-5 mx-lg-5"
                                style={{
                                    background:
                                        'url("assets/img/blob.svg") center / contain no-repeat'
                                }}
                            >
                                <img
                                    className="rounded img-fluid shadow w-100 fit-cover"
                                    style={{ minHeight: 300 }}
                                    src={HeroImg} alt=''
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <section className="py-5">
                <div className="container text-center">
                    <h4 className="fw-bold text-success mb-5 mt-0">Our Services</h4>
                    <a href="/">
                        {" "}
                        <img className="m-3" src={serviceImg1} alt='' />
                    </a>
                    {/* <a href="/">
                        {" "}
                        <img className="m-3" src={serviceImg2} alt='' />
                    </a> */}
                    <a href="/">
                        {" "}
                        <img className="m-3" src={serviceImg3} alt='' />
                    </a>
                </div>
            </section>
            <section>
                <div className="container bg-primary-gradient py-5">
                    <div className="row">
                        <div className="col-md-8 col-xl-6 text-center mx-auto">
                            <h1 className="fw-bold bold display-2 text-success mb-2">
                                Notes
                            </h1>
                        </div>
                    </div>
                    <div className="py-5 p-lg-5">
                        <div
                            className="row row-cols-1 row-cols-md-2 mx-auto"
                            style={{ maxWidth: 900 }}
                        >
                            <div className="col mb-5">
                                <div className="card shadow-sm">
                                    <div className="card-body px-4 py-5 px-md-5">
                                        <div
                                            className="bs-icon-lg d-flex justify-content-center align-items-center mb-3 bs-icon"
                                            style={{ top: "1rem", right: "1rem", position: "absolute" }}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="1em"
                                                height="1em"
                                                fill="currentColor"
                                                viewBox="0 0 16 16"
                                                className="bi bi-bell"
                                            >
                                                <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z"></path>
                                            </svg>
                                        </div>
                                        <h5 className="fw-bold card-title">Maths Homework&nbsp;</h5>
                                        <p className="text-muted card-text my-1 small">
                                            Due Thursday, 1 July
                                        </p>
                                        <p className="text-muted card-text my-1 mt-5">
                                            Algebra Ex5.3 Questions 1-12
                                        </p>
                                        <p className="text-muted card-text my-1">
                                            Algebra Ex5.4 Questions 4-6
                                        </p>
                                        <p className="text-muted card-text my-1 mb-3">
                                            Geometry Ex9.3 Questions 3-5
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col mb-5">
                                <div className="card shadow-sm">
                                    <div className="card-body px-4 py-5 px-md-5">
                                        <div
                                            className="bs-icon-lg d-flex justify-content-center align-items-center mb-3 bs-icon"
                                            style={{ top: "1rem", right: "1rem", position: "absolute" }}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="1em"
                                                height="1em"
                                                fill="currentColor"
                                                viewBox="0 0 16 16"
                                                className="bi bi-bezier"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M0 10.5A1.5 1.5 0 0 1 1.5 9h1A1.5 1.5 0 0 1 4 10.5v1A1.5 1.5 0 0 1 2.5 13h-1A1.5 1.5 0 0 1 0 11.5v-1zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1zm10.5.5A1.5 1.5 0 0 1 13.5 9h1a1.5 1.5 0 0 1 1.5 1.5v1a1.5 1.5 0 0 1-1.5 1.5h-1a1.5 1.5 0 0 1-1.5-1.5v-1zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1zM6 4.5A1.5 1.5 0 0 1 7.5 3h1A1.5 1.5 0 0 1 10 4.5v1A1.5 1.5 0 0 1 8.5 7h-1A1.5 1.5 0 0 1 6 5.5v-1zM7.5 4a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1z"
                                                ></path>
                                                <path d="M6 4.5H1.866a1 1 0 1 0 0 1h2.668A6.517 6.517 0 0 0 1.814 9H2.5c.123 0 .244.015.358.043a5.517 5.517 0 0 1 3.185-3.185A1.503 1.503 0 0 1 6 5.5v-1zm3.957 1.358A1.5 1.5 0 0 0 10 5.5v-1h4.134a1 1 0 1 1 0 1h-2.668a6.517 6.517 0 0 1 2.72 3.5H13.5c-.123 0-.243.015-.358.043a5.517 5.517 0 0 0-3.185-3.185z"></path>
                                            </svg>
                                        </div>
                                        <h5 className="fw-bold card-title">Camping&nbsp;</h5>
                                        <p className="text-muted card-text my-1 small">To Bring</p>
                                        <p className="text-muted card-text mb-4"></p>
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                defaultValue=""
                                                id="flexCheckDefault"
                                            />
                                            <label
                                                className="form-check-label"
                                                htmlFor="flexCheckDefault"
                                            >
                                                Tent
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                defaultValue=""
                                                id="flexCheckDefault"
                                                defaultChecked="ture"
                                            />
                                            <label
                                                className="form-check-label"
                                                htmlFor="flexCheckDefault"
                                            >
                                                Edible's
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                defaultValue=""
                                                id="flexCheckDefault"
                                                defaultChecked="ture"
                                            />
                                            <label
                                                className="form-check-label"
                                                htmlFor="flexCheckDefault"
                                            >
                                                Clothes
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                defaultValue=""
                                                id="flexCheckDefault"
                                                defaultChecked="ture"
                                            />
                                            <label
                                                className="form-check-label"
                                                htmlFor="flexCheckDefault"
                                            >
                                                Lantern
                                            </label>
                                        </div>
                                        <p />
                                    </div>
                                </div>
                            </div>
                            <div className="col mb-4">
                                <div className="card shadow-sm">
                                    <div className="card-body px-4 py-5 px-md-5">
                                        <div
                                            className="bs-icon-lg d-flex justify-content-center align-items-center mb-3 bs-icon"
                                            style={{ top: "1rem", right: "1rem", position: "absolute" }}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="1em"
                                                height="1em"
                                                fill="currentColor"
                                                viewBox="0 0 16 16"
                                                className="bi bi-pin-angle"
                                            >
                                                <path d="M9.828.722a.5.5 0 0 1 .354.146l4.95 4.95a.5.5 0 0 1 0 .707c-.48.48-1.072.588-1.503.588-.177 0-.335-.018-.46-.039l-3.134 3.134a5.927 5.927 0 0 1 .16 1.013c.046.702-.032 1.687-.72 2.375a.5.5 0 0 1-.707 0l-2.829-2.828-3.182 3.182c-.195.195-1.219.902-1.414.707-.195-.195.512-1.22.707-1.414l3.182-3.182-2.828-2.829a.5.5 0 0 1 0-.707c.688-.688 1.673-.767 2.375-.72a5.922 5.922 0 0 1 1.013.16l3.134-3.133a2.772 2.772 0 0 1-.04-.461c0-.43.108-1.022.589-1.503a.5.5 0 0 1 .353-.146zm.122 2.112v-.002.002zm0-.002v.002a.5.5 0 0 1-.122.51L6.293 6.878a.5.5 0 0 1-.511.12H5.78l-.014-.004a4.507 4.507 0 0 0-.288-.076 4.922 4.922 0 0 0-.765-.116c-.422-.028-.836.008-1.175.15l5.51 5.509c.141-.34.177-.753.149-1.175a4.924 4.924 0 0 0-.192-1.054l-.004-.013v-.001a.5.5 0 0 1 .12-.512l3.536-3.535a.5.5 0 0 1 .532-.115l.096.022c.087.017.208.034.344.034.114 0 .23-.011.343-.04L9.927 2.028c-.029.113-.04.23-.04.343a1.779 1.779 0 0 0 .062.46z"></path>
                                            </svg>
                                        </div>
                                        <h5 className="fw-bold card-title">
                                            Lorem ipsum dolor sit&nbsp;
                                        </h5>
                                        <p className="text-muted card-text mb-4">
                                            Erat netus est hendrerit, nullam et quis ad cras porttitor
                                            iaculis. Bibendum vulputate cras aenean.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col mb-4">
                                <div className="card shadow-sm">
                                    <div className="card-body px-4 py-5 px-md-5">
                                        <div
                                            className="bs-icon-lg d-flex justify-content-center align-items-center mb-3 bs-icon"
                                            style={{ top: "1rem", right: "1rem", position: "absolute" }}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="1em"
                                                height="1em"
                                                fill="currentColor"
                                                viewBox="0 0 16 16"
                                                className="bi bi-chat-quote"
                                            >
                                                <path d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z"></path>
                                                <path d="M7.066 6.76A1.665 1.665 0 0 0 4 7.668a1.667 1.667 0 0 0 2.561 1.406c-.131.389-.375.804-.777 1.22a.417.417 0 0 0 .6.58c1.486-1.54 1.293-3.214.682-4.112zm4 0A1.665 1.665 0 0 0 8 7.668a1.667 1.667 0 0 0 2.561 1.406c-.131.389-.375.804-.777 1.22a.417.417 0 0 0 .6.58c1.486-1.54 1.293-3.214.682-4.112z"></path>
                                            </svg>
                                        </div>
                                        <h5 className="fw-bold card-title">Message MD&nbsp;</h5>
                                        <p className="text-muted card-text mb-4">
                                            Erat netus est hendrerit, nullam et quis ad cras porttitor
                                            iaculis. Bibendum vulputate cras aenean.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <section>
                <div className="container py-5">
                    <div className="row mb-3">
                        <div className="col-md-8 col-xl-6 text-center mx-auto">
                            <h1 className="fw-bold bold display-2 text-success mb-2">
                                Planner<sup> <small>2</small></sup>
                            </h1>
                        </div>
                    </div>
                    <div className="mx-auto" style={{ maxWidth: 900 }}>
                        <div className="row row-cols-1 row-cols-md-2 d-flex justify-content-center">
                            <div className="col mb-4">
                                <div className="card bg-primary-light">
                                    <div className="card-body text-center px-4 py-5 px-md-5">
                                        <p className="fw-bold text-primary card-text mb-2">
                                            Fully Managed
                                        </p>
                                        <h5 className="fw-bold card-title mb-3">
                                            Lorem ipsum dolor sit&nbsp;nullam et quis ad cras porttitor
                                        </h5>
                                        <button className="btn btn-primary btn-sm" type="button">
                                            Learn more
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="col mb-4">
                                <div className="card bg-secondary-light">
                                    <div className="card-body text-center px-4 py-5 px-md-5">
                                        <p className="fw-bold text-secondary card-text mb-2">
                                            Fully Managed
                                        </p>
                                        <h5 className="fw-bold card-title mb-3">
                                            Lorem ipsum dolor sit&nbsp;nullam et quis ad cras porttitor
                                        </h5>
                                        <button className="btn btn-secondary btn-sm" type="button">
                                            Learn more
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="col mb-4">
                                <div className="card bg-info-light">
                                    <div className="card-body text-center px-4 py-5 px-md-5">
                                        <p className="fw-bold text-info card-text mb-2">
                                            Fully Managed
                                        </p>
                                        <h5 className="fw-bold card-title mb-3">
                                            Lorem ipsum dolor sit&nbsp;nullam et quis ad cras porttitor
                                        </h5>
                                        <button className="btn btn-info btn-sm" type="button">
                                            Learn more
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section> */}
            <section className="pt-5">
                <div className="container py-5">
                    <div className="row mb-5">
                        <div className="col-md-8 col-xl-6 text-center mx-auto">
                            <h1 className="fw-bold bold display-2 text-success mb-2">
                                Reminder
                            </h1>
                            <p className="text-muted w-lg-50">Stay Updated&nbsp;</p>
                        </div>
                    </div>
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 d-sm-flex justify-content-sm-center reminder">
                        <div className="flex-column">
                            <div className="col my-4 w-100">
                                <div className="d-flex flex-column align-items-center align-items-sm-start">
                                    <p className="bg-light border rounded border-light p-4">
                                        <strong>Email Notifications 🔔</strong>
                                        <br /> Get Notified on your Email for every activity &nbsp;
                                        &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                    </p>
                                </div>
                            </div>
                            <div className="col my-4">
                                <div className="d-flex flex-column align-items-center align-items-sm-start">
                                    <p className="bg-light border rounded border-light p-4">
                                        <strong>Desktop Notifications 🔔</strong>
                                        <br />
                                        Be updated right on your pc, notebook or phone&nbsp;
                                        &nbsp;&nbsp;
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col mb-4">
                            <div className="d-flex flex-column align-items-center align-items-sm-start">
                                <img className=' reminder-img' src={reminderImg} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="pb-5">
                <div className="container">
                    <div className="row mb-4">
                        <div className="col-md-8 col-xl-6 text-center mx-auto">
                            <p className="fw-bold text-success mb-1">Contacts</p>
                            <h2 className="fw-bold">How you can reach us</h2>
                        </div>
                    </div>
                    <div className="row d-flex justify-content-center">
                        <h5 className='w-100 text-center'>You can write to us at 👇</h5>
                        <div className="col-md-4 col-xl-4 d-flex justify-content-center justify-content-center">
                            <div className="d-flex flex-wrap flex-md-column justify-content-md-start align-items-md-start h-100">
                                <div className="d-flex align-items-center p-3">
                                    <div className="bs-icon-md bs-icon-circle bs-icon-primary shadow d-flex flex-shrink-0 justify-content-center align-items-center d-inline-block bs-icon bs-icon-md">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="1em"
                                            height="1em"
                                            fill="currentColor"
                                            viewBox="0 0 16 16"
                                            className="bi bi-envelope"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"
                                            ></path>
                                        </svg>
                                    </div>
                                    <div className="px-2">
                                        <h6 className="fw-bold mb-0"><a href='mailto:developer.authify@gmail.com'>Email</a></h6>
                                        <p className="text-muted mb-0">developer.authify@gmail.com</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>

    )
}

export default HomePromotion