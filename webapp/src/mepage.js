import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MePage = ({ onDataLoad }) => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        // Fetch user data from the /me endpoint
        const fetchUserData = async () => {
            try {
                const sessionToken = localStorage.getItem('sessionToken');
                const response = await axios.get(`${process.env.REACT_APP_AUTH_URL}/me`, {
                    headers: {
                        Authorization: `Bearer ${sessionToken}`,
                    },
                });
                setUserData(response.data);
                onDataLoad();  // Notify parent that the data has been loaded
            } catch (error) {
                console.error("Error fetching user data: ", error);
            }
        };

        fetchUserData();
    }, [onDataLoad]); // added onDataLoad as a dependency, so it won't change very often

    return (
        <div>
            <h1>My Profile</h1>
            {userData ? (
                <div>
                    <p>Name: {userData.name}</p>
                    <p>Email: {userData.email}</p>
                    <p>Firebase UID: {userData.firebase_uid}</p>
                </div>
            ) : (
                <p>Loading user data...</p>
            )}
        </div>
    );
};

export default MePage;
