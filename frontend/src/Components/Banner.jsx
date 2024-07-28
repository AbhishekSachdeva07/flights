import React from "react";

const Banner = (props)=>{
    return(
        <>
            <div className="banner-box">
                <span style={{overflow:"hidden"}}><b>{props.text}</b></span>
            </div>
        </>
    )
}

export default Banner;