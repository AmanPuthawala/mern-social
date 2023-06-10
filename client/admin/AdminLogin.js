import React, { useState, useEffect } from 'react'

import { NavLink, useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const loginUser = async (e) => {
    e.preventDefault();
    if (email === " ") {
      alert("Enter Email");
    } else if (!email.includes("@")) {
      alert("Enter Valid Email");
    } else if (password == "") {
      alert("Enter your password");
    } else {

      let response = await fetch('/api/users/adminLogin/', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          email, password
        })
      })
      const getAddress = await response.json()



      if (getAddress.status === 200) {
        // alert("Login Successfully");
        localStorage.setItem("usersdatatoken", res.user);
        console.log("User Data Token: ", localStorage.getItem("userdatatoken"));
        alert("done")
        setEmail("")
        setPassword("")
        navigate('/User')
      }
    }
  }
  return (
    <>
      <section>
        <div>
          <div>
            <h1>Welcome Back , Log In</h1>
            <p>Hi, we are you glad you are back.Please login.</p>
          </div>
          <form>
            <div>
              <label htmlFor='email'>Email</label>
              <input type="email" name="email" placeholder='Enter Your Email Address' onChange={(e) => setEmail(e.target.value)} value={email} />
            </div>
            <div>
              <label htmlFor='p'>Password</label>
              <div>
                <input type={!showPass ? "password" : "text"} name="password" placeholder='Enter Your Password' onChange={(e) => setPassword(e.target.value)} value={password} />
              </div>
            </div>
            <button className='btn' onClick={(e)=>{loginUser(e)}}>Login</button>
          </form>
        </div>
      </section>
    </>
  )
}

export default AdminLogin