import React, { useRef, useState } from "react";
import { useAuth } from "../Contexts/AuthContext";
import { useHistory, Link } from "react-router-dom";
import { storage, database } from "../Firebase/firebase";
import "./style/Forms.css";

function SignupScreen() {
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const [userImage, setUserImage] = useState("");
    const { signup } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const handleUpload = (e) => {
        let file = e?.target?.files[0];
        if (file != null) setUserImage(file);
        // console.log(file)
    };

    async function submit(e) {
        e.preventDefault();

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords do not match");
        }

        try {
            setError("");
            setLoading(true);

            const userCredential = await signup(
                emailRef.current.value,
                passwordRef.current.value
            );

            const email = emailRef.current.value;
            const firstName = firstNameRef.current.value;
            const lastName = lastNameRef.current.value;
            const uid = userCredential.user.uid;

            const uploadTask = storage
                .ref(`/users/${uid}/ProfileImage`)
                .put(userImage);
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log(progress);
                },
                (error) => {
                    // Handle unsuccessful uploads
                    setError("Failed to upload File");
                },
                async () => {
                    await uploadTask.snapshot.ref
                        .getDownloadURL()
                        .then((imgDownloadURL) => {
                            database.users.doc(uid).set({
                                email: email,
                                userId: uid,
                                firstName: firstName,
                                lastName: lastName,
                                profileUrl: imgDownloadURL,
                            });
                        });
                    setLoading(false);
                    history.push("/");
                }
            );
        } catch {
            setError("Failed to create an account");
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
                        <form className="Form FromBig" onSubmit={submit}>
                            <h1 className="FormH1">Create a new account</h1>
                            <div className="InputName">
                                <div className="InputNameRow">
                                    <label className="FormLabel" htmlFor="for">
                                        First Name
                                    </label>
                                    <input
                                        className="FormInput mr20"
                                        type="text"
                                        ref={firstNameRef}
                                        required
                                    ></input>
                                </div>
                                <div className="InputNameRow">
                                    <label className="FormLabel" htmlFor="for">
                                        Last Name
                                    </label>
                                    <input
                                        className="FormInput"
                                        type="text"
                                        ref={lastNameRef}
                                    ></input>
                                </div>
                            </div>
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
                            <label className="FormLabel" htmlFor="for">
                                Confirm Password
                            </label>
                            <input
                                className="FormInput"
                                type="password"
                                ref={passwordConfirmRef}
                                required
                            ></input>
                            <label className="FormLabel" htmlFor="for">
                                Choose a profile photo
                            </label>
                            <input
                                type="file"
                                id="myfile"
                                className="FormInput"
                                onChange={(e) => handleUpload(e)}
                            ></input>
                            <button className="FormButton" type="submit" disabled={loading}>
                                Sign up
                            </button>
                            {error && <span className="Text Error">{error}</span>}
                            <Link className="Text" to="/login">
                                Have an account? Log in
                            </Link>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SignupScreen;
