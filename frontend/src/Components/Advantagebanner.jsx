import React from "react";

const Advantagebanner = ()=>{
    const advantageData = [
        {
            imgurl: 'https://res.cloudinary.com/dxbfhdvv7/image/upload/v1722079041/box-arrow-in-right_c42mgo.svg',
            headline: 'Login with just OTP',
            description: 'Simple steps to login or create new account. Verify through OTP and continue further.'
        },
        {
            imgurl: 'https://res.cloudinary.com/dxbfhdvv7/image/upload/v1722079271/search_zvqhfk.svg',
            headline: 'Enter details of your flight',
            description: 'Enter the details like the location of airport, flight landing time to connect with the same crowd and save your precious money.'
        },
        {
            imgurl: 'https://res.cloudinary.com/dxbfhdvv7/image/upload/v1722079244/person-vcard_k3x5eo.svg',
            headline: 'Find people',
            description: 'Just look for the people matching your time and as per you comfort to make your journey easy and comfortable.'
        },
        {
            imgurl: 'https://res.cloudinary.com/dxbfhdvv7/image/upload/v1722079308/chat-dots_g9jxhn.svg',
            headline: 'Chat and carpool',
            description: 'Once you find out the person just have a chat and connect together to carpool to your desired locations.'
        },
    ]
    return(
        <>
            <div className="advantage-banner">
                <div className="advantages-box">
                    {advantageData.map((data,index)=>(
                        <div className="first-advantage-box">
                            <div className="first-advantage-img">
                                <img src={data.imgurl} alt="" />
                            </div>
                            <div className="first-advantage-heading">
                                <span><b>{data.headline}</b></span>
                            </div>
                            <div className="first-advantage-desc">
                                <span>{data.description}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Advantagebanner;