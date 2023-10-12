import React, { useState } from 'react';
import axios from 'axios';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [sent, setSent] = useState(false); // to inform the user that the email has been sent
    const [error, setError] = useState(null); // to display any error messages from the backend

    const handleSignup = async () => {
        try {
            await axios.post(`${process.env.REACT_APP_AUTH_URL}/signup`, { email });
            setSent(true);
        } catch (err) {
            console.error("Error during signup: ", err.response.data);
            setError(err.response.data.detail);
        }
    };

    return (
        <div>
            {!sent ? (
                <>
                    <input
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="Email"
                    />
                    <input
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="name"
                    />
                    <button onClick={handleSignup}>Sign Up</button>
                    {error && <p style={{color: 'red'}}>{error}</p>}
                </>
            ) : (
                <p>Signup successful! Please check your email to verify your account.</p>
            )}
        </div>
    );
};

export default Signup;
