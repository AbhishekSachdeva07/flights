import React, { useEffect, useState } from "react";
import Welcomenavbar from "../Components/Welcomenavbar";
import Locationcheck from "../Components/Locationcheck";
import Flightdata from "../Components/Flightdata";
import { useLocation } from "react-router-dom";

const Welcome = ()=>{
    const [flightdata,setflightdata] = useState(null);
    const location = useLocation();

    const [localstoragedata, setLocalstoragedata] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem("response-userdata")) || {};
        } catch (error) {
            console.error("Error parsing localStorage data:", error);
            return {};
        }
    });
    useEffect(() => {
        const fetchLocalStorageData = () => {
            try {
                const data = JSON.parse(localStorage.getItem("response-userdata"));
                if (data) {
                    setLocalstoragedata(data);
                }
            } catch (error) {
                console.error("Error fetching localStorage data:", error);
            }
        };
        fetchLocalStorageData();
    }, [location.pathname]);
    return(
        <>
            <Welcomenavbar/>
            <Locationcheck setflightdata = {setflightdata}/>
            <Flightdata flightdata={flightdata} localstoragedata={localstoragedata}/>
        </>
    )
}

export default Welcome;