import React, { useEffect, useState } from "react";
import { Link, useNavigate ,useLocation} from 'react-router-dom';
import Banner from "../Components/Banner";

const Welcome = ()=>{
    const location = useLocation();
    const navigate = useNavigate();
    const {email,username} = location.state || {};
    useEffect(()=>{
        if(email=={})
        {
            navigate('/register');
        }
    },[navigate])
    return(
        <>
            <Banner />
        </>
    )
}

export default Welcome;