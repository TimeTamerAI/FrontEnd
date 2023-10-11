import React, { useState, useEffect } from 'react';
import {isSignInWithEmailLink, signInWithEmailLink, sendSignInLinkToEmail } from 'firebase/auth';
import { auth } from './firebase';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [sent, setSent] = useState(false); // to inform the user that the email has been sent

    const handleLogin = async () => {
        const actionCodeSettings = {
            url: window.location.href, // where you want the user to be redirected after email verification
            handleCodeInApp: true, // Must be true.
        };

        try {
            await sendSignInLinkToEmail(auth, email, actionCodeSettings);
            window.localStorage.setItem('emailForSignIn', email); // remember the user's email to finalize the sign in after email verification
            setSent(true);
        } catch (error) {
            console.error("Error sending email: ", error);
        }
    };


    const handleEmailLinkLogin = async () => {
        let storedEmail = window.localStorage.getItem('emailForSignIn');
        if (!storedEmail) {
            storedEmail = window.prompt('Please provide your email for confirmation');
        }
        try {
            const userCredential = await signInWithEmailLink(auth, storedEmail, window.location.href);
            const firebaseToken = await userCredential.user.getIdToken();
            const response = await axios.post(`${process.env.REACT_APP_AUTH_URL}/start_session`, { firebase_token: firebaseToken });
            localStorage.setItem('sessionToken', response.data.session_token);
            window.localStorage.removeItem('emailForSignIn');
        } catch (error) {
            console.error("Error logging in: ", error);
        }
    };

    useEffect(() => {
        if (isSignInWithEmailLink(auth, window.location.href)) {
            handleEmailLinkLogin();
        }
    }, []);

    return (
        <div>
            {!sent ? (
                <>
                    <input
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="Email"
                    />
                    <button onClick={handleLogin}>Send verification email</button>
                </>
            ) : (
                <p>Verification email sent! Please check your email to continue.</p>
            )}
        </div>
    );
};

export default Login;
