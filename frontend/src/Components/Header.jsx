import React from "react";
import {Link} from "react-router-dom"

const Header = ()=>{
    return(
        <>
            <div className="header-box">
                <div className="left-header-box">
                <Link to="/">Bla Bla Bla</Link>
                </div>
                <div className="right-header-box">
                    <Link to="/register" id="loginbutton">Login/Signup</Link>
                </div>
            </div>
        </>
    )
}
export default Header;