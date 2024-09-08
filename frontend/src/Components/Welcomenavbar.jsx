import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios"

const Welcomenavbar = ()=>{
    const location = useLocation();
    const navigate = useNavigate();
    const [localstoragedata, setLocalstoragedata] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem("response-userdata")) || {};
        } catch (error) {
            console.error("Error parsing localStorage data:", error);
            return {};
        }
    });
    useEffect(()=>{
        const fetchitems = ()=>{
            try{
                const data = JSON.parse(localStorage.getItem("response-userdata"));
                if (data) {
                    setLocalstoragedata(data);
                }
            }
            catch(error){
                console.error("error");
            }
        }
        fetchitems();
    },[location.pathname]);

    const performlogout = async()=>{
        const logout = await axios.get('http://localhost:5000/logout',{
            withCredentials:true
        });
        if(logout.data.logout){
            localStorage.removeItem("response-userdata");
            navigate('/');
        }
        else{
            alert("Some error occured while logging off. Try again in some time.");
            return;
        }
    }

    return(
        <>
            <div className="header-box">
                <div className={"left-navbar"}>
                    <Link to="/" style={{
                        marginLeft:'60px'
                    }}>Ride X Match</Link>
                </div>
                <div className="right-navbar">
                    <span style={{color:'purple'}}>{localstoragedata?.userData?.username}</span>
                    <img src={localstoragedata?.userData?.profilephoto} alt="profile-photo" />
                    <Link style={{color:'gray',fontSize:'13px'}}>Edit Profile</Link>
                    <Link style={{color:'gray',fontSize:'13px'}} onClick={performlogout}>Logout</Link>
                </div>
            </div>
        </>
    )
}

export default Welcomenavbar;