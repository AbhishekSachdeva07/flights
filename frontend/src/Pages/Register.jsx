import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [data, setData] = useState({
        email: '',
        username: '',
        otp: '',
        name: ''
    });
    const [fillemail,setfillemail] = useState(false);
    const [checkotp,setcheckotp] = useState(false);
    const [freeze, setFreeze] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setData((oldData) => ({
            ...oldData,
            [e.target.name]: e.target.value
        }));
    };

    const validateForm = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/check-otp", data, {
                withCredentials: true 
            });
            if (response.data.otpverified) {
                if (response.data.existinguser) {
                    navigate('/welcome');
                } else {
                    navigate('/register/user',{state:{email:data.email}});
                }
            } else {
                setcheckotp(true);
            }
        } catch (error) {
            alert('Some error occured. Try after some time.');
            navigate('/home');
        }
    };

    const sendOtp = async (e) => {
        e.preventDefault();
        if (data.email === "" || !data.email.includes('@') || !data.email.includes('.')) {
            setfillemail(true);
            return;
        }
        setFreeze(true);
        setfillemail(false);
        try {
            await axios.post("http://localhost:5000/otp", data, {
                withCredentials: true // Ensure cookies are included in the request
            });
        } catch (error) {
            console.error("Error sending OTP:", error);
        }
    };

    return (
        <>
            <div className="register-page">
                <div className="register-form">
                    <span><b>Login</b> or <b>Signup</b></span><br /><br />
                    <div className="form-register">
                        <form onSubmit={validateForm}>
                            <input 
                                type="email" 
                                placeholder="Email" 
                                name="email" 
                                value={data.email} 
                                onChange={handleChange} 
                                readOnly={freeze}
                                style={{marginBottom:'5px'}}
                            />
                            <span style={{color:'red',fontSize:'10px',display:fillemail?'block':'none'}}>Enter a valid email account</span>
                            <span style={{color:'gray',fontSize:'10px'}}>By continuing, I agree to the Terms of Use & Privacy Policy</span><br /><br />
                            <button onClick={sendOtp} id="register-btn">Continue</button><br /><br />
                            <div className={freeze ? 'otpBoxactive' : 'otpBox'}>
                                <span>Verify with OTP</span><br /><br />
                                <input 
                                    type="number" 
                                    value={data.otp} 
                                    onChange={handleChange} 
                                    name="otp" 
                                    placeholder="OTP"
                                />
                                <span style={{color:'red',fontSize:'10px',display:checkotp?'block':'none'}}>Wrong OTP</span>
                                <br />
                                <button type="submit" id="register-btn">Verify OTP</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;
