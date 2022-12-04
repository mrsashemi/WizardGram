import { useState } from "react";
import { Link } from "react-router-dom";
import { FormHeader } from "./formheader";
import axios from "axios";
import Cookies from "universal-cookie";
const cookies = new Cookies();

export function LoginForm() {
    const [email, setEmail] = useState("")
    const [hashed_password, setPassword] = useState("");
    const [login, setLogin] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        const configuration = {
            method: "post",
            url: "http://localhost:5050/user/signin",
            data: {
                email,
                hashed_password,
            }
        };

        axios(configuration)
        .then((result) => {
            console.log(result)
            cookies.set("TOKEN", result.data.token, {
                path: "/",
            });
            window.location.href = "/";
            setLogin(true);
        })
        .catch((error) => {
            error = new Error();
            console.log(error)
        })

    }

    return (
        <div id="loginFormContainer">
            {!login ? (
                <form className="loginForm" onSubmit={(e) => handleSubmit(e)}>
                    <FormHeader />
                    <div className="formInput">
                        <label>Email </label>
                        <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email" required></input>
                    </div>
                    <div className="formInput">
                        <label>Password </label>
                        <input type="password" name="password" value={hashed_password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password" required></input>
                    </div>
                    <div className="buttonInput">
                        <Link to="/signup">
                            <button className="toSignUp">Sign Up</button>
                        </Link>
                        <button onClick={(e) => handleSubmit(e)}>Login</button>
                    </div>
                </form>
            ): (
                <div className="loggedIn">
                    <h1>Welcome back!</h1>
                    <Link to="/">
                        <button>Return Home</button>
                    </Link>
                </div>
            )}
        </div>
    )
}