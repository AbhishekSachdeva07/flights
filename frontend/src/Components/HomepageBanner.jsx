import React from "react";

const HomepageBanner = ()=>{
    return(
        <>
            <div className="homepagebanner">
                <div className="left-homepagebanner">
                    <span><b id="main-heading">Carpooling at </b><br /><b id="main-heading">Airports made easier.</b></span>
                </div>
                <div className="right-homepagebanner">
                    <span style={{overflow:'hidden'}}><b id="main-heading">Login. Search. Connect.</b></span>
                </div>
            </div>
        </>
    )
}

export default HomepageBanner;