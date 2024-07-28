import React from "react";
import {Link} from "react-router-dom"

const HeaderUser = (props)=>{
    return(
        <>
            <div className="header-box">
                <div className="left-header-box">
                <Link to="/">Trial Website</Link>
                </div>
                <div className="right-header-box-user">
                    <span><b style={{
                        color:'red',
                        textDecoration:'underline'
                    }}>@{props.data}</b></span>
                    <Link to="/logout">Logout</Link>
                </div>
            </div>
        </>
    )
}
export default HeaderUser;