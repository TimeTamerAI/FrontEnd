import React, { useState, useEffect } from 'react';
import Signup from './signup';
import Login from "./login";
import MePage from "./mepage";

const App = () => {
    const [retryCount, setRetryCount] = useState(0);
    const [dataLoaded, setDataLoaded] = useState(false);

    useEffect(() => {
        if (!dataLoaded) {
            const interval = setInterval(() => {
                setRetryCount(prevCount => prevCount + 1);
            }, 5000);  // Retry every 5 seconds if data hasn't been loaded

            // Cleanup: Clear the interval when the component is unmounted or data is loaded
            return () => clearInterval(interval);
        }
    }, [dataLoaded]);  // Effect depends on dataLoaded

    return (
        <div>
            <Login />
            <MePage key={retryCount} onDataLoad={() => setDataLoaded(true)} />
        </div>
    );
};

export default App;
