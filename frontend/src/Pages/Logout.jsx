import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const navigate = useNavigate(); // Correctly obtain the navigate function

    useEffect(() => {
        const performLogout = async () => {
            try {
                await axios.get("https://finalproject-1-xqyv.onrender.com/logout", { withCredentials: true });
                navigate('/'); // Redirect to homepage after logout
            } catch (error) {
                console.log(error);
            }
        };
        performLogout();
    }, [navigate]); // Add navigate to the dependency array

    return (
        <div>Logging out...</div> // Optional: Show a loading message
    );
};

export default Logout;
