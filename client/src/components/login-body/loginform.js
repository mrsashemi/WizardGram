import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FormHeader } from "./formheader";
import axios from "../../api/axios";
import useAuth from "../../hooks/useauth";
const LOGIN_URL = '/user/signin'
// remember to remove  universal cookies from dependecies

export function LoginForm() {
    const { setAuth } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const [email, setEmail] = useState("")
    const [hashed_password, setPassword] = useState("");
    const [errMsg, setErrMsg] = useState('');

    const userRef = useRef();
    const errRef = useRef();

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [email, hashed_password]);
    

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const result = await axios.post(LOGIN_URL, 
                JSON.stringify({email, hashed_password}),
                {
                    headers: {'Content-Type': 'application/json'},
                    withCredentials: true
                }
            );
            const accessToken = result.data.token;
            const admin = result.data.admin;
            const verified = result.data.verified;
            const username = result.data.username;
            const fname = result.data.fname;
            const lname = result.data.lname;
           
            setAuth({username, email, hashed_password, admin, verified, fname, lname, accessToken});
            setEmail('');
            setPassword('');
            navigate(from, {replace: true});
        } catch (error) {
            
            if (!error.response) {
                setErrMsg('No Server Response')
            } else if (error.response.status === 400) {
                setErrMsg("Missing Email or Password");
            } else if (error.response.status === 401) {
                setErrMsg("Unauthorized");
            } else {
                setErrMsg("Login Failed")
            }

            errRef.current.focus();
        }
    }

    return (
        <div id="loginFormContainer">
            <form className="loginForm" onSubmit={(e) => handleSubmit(e)}>
                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                <FormHeader />
                <div className="formInput">
                    <label htmlFor="email">Email </label>
                    <input type="email" name="email" ref={userRef} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email" required></input>
                </div>
                <div className="formInput">
                    <label htmlFor="password">Password </label>
                    <input type="password" name="password" value={hashed_password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password" required></input>
                </div>
                <div className="buttonInput">
                    <button onClick={(e) => handleSubmit(e)}>Login</button>
                    <Link to="/signup">
                        <button className="toSignUp">Sign Up</button>
                    </Link>
                </div>
            </form>
        </div>
    )
}