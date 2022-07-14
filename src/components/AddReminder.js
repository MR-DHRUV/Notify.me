import React from 'react'

const AddReminder = () => {
  return (

    <div className="container minheight">
      <form className="user my-5 mx-5">

        <div className="row mb-3">
          <div className="col-sm-6 mb-3 mb-sm-0"><input className="form-control form-control-user" type="text" id="exampleFirstName" placeholder="First Name" name="fname" required minLength={2} /></div>

          <div className="col-sm-6"><input className="form-control form-control-user" type="text" id="exampleFirstName" placeholder="Last Name" name="lname" required minLength={2} /></div>
        </div>

        <div className="mb-3"><input className="form-control form-control-user" placeholder='Verification Code' name='verificationCode' required minLength={6} type="text" id="exampleInputEmail" aria-describedby="emailHelp" /></div>

        <div className="row mb-3">
          <div className="col-sm-6 mb-3 mb-sm-0"><input className="form-control form-control-user" placeholder='Password' name='password' required minLength={8} type="password" id="examplePasswordInput" /></div>

          <div className="col-sm-6"><input className="form-control form-control-user" type="password" id="exampleRepeatPasswordInput" placeholder='Confirm Password' required minLength={8} name='cpassword' /></div>
        </div>

        <button className="btn btn-primary d-block btn-user w-100" type="submit">Register Account</button>

      </form>




    </div >
  )
}

export default AddReminder
