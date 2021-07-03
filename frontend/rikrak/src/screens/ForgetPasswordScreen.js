import React, { useRef, useState } from "react";
import "./style/Screen.css";
import { useAuth } from "../Contexts/AuthContext";
import { Link } from "react-router-dom";

function ForgetPasswordScreen() {
    const emailRef = useRef();
    const { resetPassword } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    async function submit(e) {
        e.preventDefault();

        try {
            setError("");
            setMessage("");
            setLoading(true);
            await resetPassword(emailRef.current.value);
            setMessage("check your email for further instructions");
        } catch {
            setError("Failed to reset password");
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
                            <h1 className="FormH1">Reset Password For your Account</h1>
                            <label className="FormLabel" htmlFor="for">
                                Email
                            </label>
                            <input
                                className="FormInput"
                                type="email"
                                ref={emailRef}
                                required
                            ></input>
                            <button className="FormButton" type="submit" disabled={loading}>
                                Reset Password
                            </button>
                            {error && <span className="Text Error">{error}</span>}
                            {message && <span className="Text Message">{message}</span>}
                            <Link to="/login" className="Text">
                                Log in
                            </Link>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ForgetPasswordScreen;
