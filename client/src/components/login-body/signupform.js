import { FormHeader } from "./formheader";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export function SignUpForm() {
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [hashed_password, setPassword] = useState("");
    const [confirm_password, setConfirmPassword] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [register, setRegister] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (hashed_password !== confirm_password) {
            alert("Passwords don't match!")
        } else {
            const configuration = {
                method: "post",
                url: "http://localhost:5050/user/register",
                data: {
                    first_name,
                    last_name,
                    hashed_password,
                    email,
                    username
                }
            }

            axios(configuration)
            .then((result) => {
                console.log(result)
                setRegister(true);
            })
            .catch((error) => {
                error = new Error();
                console.log(error)
            })
        }
    }

    return (
        <div id="loginFormContainer">
            {!register ? (
                <form className="signupForm" onSubmit={(e) => handleSubmit(e)}>
                    <FormHeader />
                    <div className="formInput">
                        <label>First Name </label>
                        <input type="text" name="fname" value={first_name} onChange={(e) => setFirstName(e.target.value)} placeholder="Enter First Name" required></input>
                    </div>
                    <div className="formInput">
                        <label>Last Name </label>
                        <input type="text" name="lname" value={last_name} onChange={(e) => setLastName(e.target.value)} placeholder="Enter Last Name" required></input>
                    </div>
                    <div className="formInput">
                        <label>Username </label>
                        <input type="text" name="uname" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter Username" required></input>
                    </div>
                    <div className="formInput">
                        <label>E-mail </label>
                        <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email" required></input>
                    </div>
                    <div className="formInput">
                        <label>Password </label>
                        <input type="password" name="password" value={hashed_password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password" required></input>
                    </div>
                    <div className="formInput">
                        <label>Confirm Password </label>
                        <input type="password" name="cpassword" value={confirm_password} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password" required></input>
                    </div>
                    <div className="buttonInput">
                        <button type="submit" onClick={(e) => handleSubmit(e)}>Sign Up</button>
                    </div>
                </form>
            ) : (
                <div className="loginSuccess">
                    <h1>Registration Successful!</h1>
                    <p>Check your email for a verification link</p>
                    <Link to='/wizardgram'>
                        <button>Return Home</button>
                    </Link>
                </div>
            )}
        </div>
    )
}