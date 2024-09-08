import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";


const Login = () => {
    const [hiddenOtpBox, setHiddenOtpBox] = useState(false);
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        email: '',
        username: '',
        profilephoto: '',
        gender: '',
        state: ''
    });
    const [error,seterror] = useState(false);
    const [otperror,setotperror] = useState(false);
    const [otp, setOtp] = useState('');

    const handleOtpChange = (e) => {
        setOtp(e.target.value);
    };

    const manageChanges = (e) => {
        setUserData((oldData) => ({
            ...oldData,
            [e.target.name]: e.target.value
        }));
    };

    const checkData = async (e) => {
        e.preventDefault();
        seterror(false);
        try {
            const otpVerResponse = await axios.post('http://localhost:5000/login', {
                email: userData.email,
                otp: otp
            }, {
                withCredentials: true
            });
            console.log(otpVerResponse);
            if (otpVerResponse.data.otpverified) {
                if (otpVerResponse.data.existinguser) {
                    localStorage.setItem("response-userdata",JSON.stringify(otpVerResponse.data));
                    navigate(`/welcome/${encodeURIComponent(otpVerResponse.data.userData.username)}`);
                } else {
                    localStorage.setItem("response-userdata",JSON.stringify(otpVerResponse.data));
                    navigate(`/signup/${otpVerResponse.data.userData.email}`);
                }
            } else {
                setotperror(true);
            }
        } catch (error) {
            console.error('Error verifying OTP:', error);
        }
    };

    const sendOtp = async (e) => {
        e.preventDefault();
        if(userData.email.includes('@') && userData.email.includes('.'))
        {
            try {
                const response = await axios.post('http://localhost:5000/otp', { email: userData.email }, {
                    withCredentials: true
                });
                console.log('Send OTP Response:', response.data);
                if (response.data.otpsent) {
                    setHiddenOtpBox(true);
                } else {
                    alert('Failed to send OTP');
                }
            } catch (error) {
                console.error('Error sending OTP:', error);
            }
        }
        else{
            seterror(true);
        }
    };


    return (
        <>
            <div className="mainbox-login">
                <Header />
                <div className="loginform">
                    <br />
                    <b>Login/Signup</b>
                    <form onSubmit={checkData}>
                        <input type="email" placeholder="email*" value={userData.email} onChange={manageChanges} name="email" readOnly={hiddenOtpBox} />
                        <span style={{color:'red',fontSize:'12px',display: error?'block':'none'}}>Enter a valid email Address</span>
                        <button onClick={sendOtp} id="btn">Send OTP</button><br />
                        {hiddenOtpBox && (
                            <div className="otpcentre">
                                <br />
                                <b>Verify with OTP</b><br /><br />
                                <input type="number" placeholder="otp" name="otp" value={otp} onChange={handleOtpChange} />
                                <span style={{color:'red',fontSize:'12px',display: otperror?'block':'none'}}>Wrong OTP</span>
                                <button type="submit" id="btn">Continue</button>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </>
    );
};

export default Login;
