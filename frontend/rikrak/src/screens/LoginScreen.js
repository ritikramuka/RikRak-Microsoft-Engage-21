import React, { useRef, useState } from "react";
import "./style/Screen.css";
import { useAuth } from "../Contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import "./style/Forms.css";

function LoginScreen() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { login } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    async function submit(e) {
        e.preventDefault();

        try {
            setError("");
            setLoading(true);
            await login(emailRef.current.value, passwordRef.current.value);
            history.push("/");
        } catch {
            setError("Failed to log in");
        }
        setLoading(false);
    }

    return (
        <>
            <div className="Conatiner">
                <div className="FormWrap">
                    <Link className="Icons" to="/main">
                        RikRak
                    </Link>
                    <div className="FormContent">
                        <form className="Form" onSubmit={submit}>
                            <h1 className="FormH1 heading">Welcome!</h1>
                            <h1 className="FormH1">Login to your Account</h1>
                            <label className="FormLabel" htmlFor="for">
                                Email
                            </label>
                            <input
                                className="FormInput"
                                type="email"
                                ref={emailRef}
                                required
                            ></input>
                            <label className="FormLabel" htmlFor="for">
                                Password
                            </label>
                            <input
                                className="FormInput"
                                type="password"
                                ref={passwordRef}
                                required
                            ></input>
                            <button className="FormButton" type="submit" disabled={loading}>
                                Log in
                            </button>
                            {error && <span className="Text Error">{error}</span>}
                            <Link to="/forgot-password" className="Text">
                                Forget password?
                            </Link>
                            <Link to="/signup" className="Text">
                                Don't have an account? Sign up
                            </Link>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default LoginScreen;
