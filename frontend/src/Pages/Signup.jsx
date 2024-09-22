import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import Header from "../Components/Header";

const Signup = () => {
    const [file, setFile] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const [localstoragedata, setLocalstoragedata] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem("response-userdata")) || {};
        } catch (error) {
            console.error("Error parsing localStorage data:", error);
            return {};
        }
    });
    const [userData, setUserData] = useState(localstoragedata.userData || {});

    useEffect(() => {
        const fetchLocalStorageData = () => {
            try {
                const data = JSON.parse(localStorage.getItem("response-userdata"));
                if (data) {
                    setLocalstoragedata(data);
                    setUserData(data.userData);
                }
            } catch (error) {
                console.error("Error fetching localStorage data:", error);
            }
        };
        fetchLocalStorageData();
    }, [location.pathname]);

    useEffect(() => {
        if (!userData || !userData.email) {
            navigate('/login');
        }
    }, [userData, navigate]);

    const handleChange = (e) => {
        setUserData((oldData) => ({
            ...oldData,
            [e.target.name]: e.target.value
        }));
    };

    const addUserToDatabase = async (e) => {
        e.preventDefault();
        setErrorMessage(''); // Clear any previous error messages

        if (!file) {
            alert("Please upload your profile image.");
            return;
        }

        try {
            // Check for username availability
            const checkUsername = await axios.get(`https://flights-lmrv.onrender.com/check-username/${userData.username}`, {
                withCredentials: true
            });
            console.log(checkUsername)

            if (checkUsername.data.usernameavailable) {
                // Upload the profile image
                const formData = new FormData();
                formData.append("image", file);

                const uploadResponse = await axios.post('https://flights-lmrv.onrender.com/upload-image', formData, {
                    withCredentials: true
                });

                if (uploadResponse.data.imageuploaded) {
                    userData.profilephoto = uploadResponse.data.imageurl;

                    // Now upload user data to database
                    const newUserResponse = await axios.post('https://flights-lmrv.onrender.com/signup', userData, {
                        withCredentials: true
                    });

                    if (newUserResponse.data.userAdded) {
                        localStorage.setItem("response-userdata",JSON.stringify(newUserResponse.data));
                        navigate(`/welcome/${encodeURIComponent(userData.username)}`);
                    } else {
                        setErrorMessage("An error occurred while adding the user. Please try again.");
                    }
                } else {
                    setErrorMessage("Image upload failed. Please try again.");
                }
            } else {
                setErrorMessage("Username already exists. Please choose a different one.");
            }
        } catch (error) {
            setErrorMessage("An error occurred: ");
        }
    };

    return (
        <>
            <div className="mainbox-login">
                <Header />
                <div className="loginform">
                    <br />
                    <b>Signup</b>
                    <form onSubmit={addUserToDatabase}>
                        <input type="email" value={userData.email || ''} readOnly required /><br />
                        <input type="text" placeholder="username*" name="username" value={userData.username || ''} onChange={handleChange} required />
                        <select name="gender" value={userData.gender || ''} onChange={handleChange} required>
                            <option value="">Gender*</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="others">Others</option>
                        </select><br /><br />
                        <label htmlFor="" style={{ fontSize: '10px' }}>
                            Upload your profile photo *
                        </label>
                        <input type="file" onChange={(e) => setFile(e.target.files[0])} required />
                        {errorMessage && <p style={{ color: 'red',fontSize:'10px' }}>{errorMessage}</p>}
                        <button type="submit" id="btn">Continue</button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Signup;
