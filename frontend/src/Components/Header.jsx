import React, { useEffect, useState } from "react";
import {Link, useLocation} from "react-router-dom"

const Header = ()=>{
    const [loginpage,setloginpage] = useState(false);
    const location = useLocation();
    useEffect(()=>{
        const changelocation = ()=>{
            setloginpage(true);     
        }
        if(['/login'].includes(location.pathname))
        {
            changelocation();
        }
        if(location.pathname.startsWith('/signup'))
        {
            changelocation();
        }
    },[location.pathname])
    return(
        <>
            <div className="header-box">
                <div className={loginpage?"left-navbar-hidden":"left-header-box"}>
                    <Link to="/">Ride X Match</Link>
                </div>
                <div className="right-header-box" style={{display:loginpage?'none':'flex'}}>
                    <Link to="/login" id="loginbutton">Login/Signup</Link>
                </div>
            </div>
        </>
    )
}
export default Header;