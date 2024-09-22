import React, { useState,useEffect } from "react";
import Welcomenavbar from "../Components/Welcomenavbar";
import Flightticket from "../Components/Flightticket";
import { useLocation } from "react-router-dom";
import Acceptedusers from "../Components/AcceptedUsers";
import ChatingModel from "../Components/Chatingmodel";
import Groupchat from "../Components/Groupchat";
import Groupchatingmodel from "../Components/GroupChatingModel";
import Otherpeople from "../Components/Otherpeople";
import GeminiChatBot from "../Components/Geminichatbot";

const Flightpage = ()=>{
    const url = decodeURIComponent(window.location.href);
    const flightid = url.split('/')[7];
    const location = useLocation();
    const [sessiondata,getsessiondata] = useState(()=>{
        try{
            return JSON.parse(sessionStorage.getItem(flightid));
        }
        catch(error){
            return {};
        }
    })
    const [localstoragedata,setLocalstoragedata] = useState(()=>{
        try {
            return JSON.parse(localStorage.getItem("response-userdata")) || {};
        } catch (error) {
            console.error("Error parsing localStorage data:", error);
            return {};
        }
    })
    useEffect(() => {
        const fetchLocalStorageData = () => {
            try {
                const data = JSON.parse(localStorage.getItem("response-userdata"));
                const sessiondata = JSON.parse(sessionStorage.getItem(flightid));
                if (data) {
                    setLocalstoragedata(data);
                }
                if(sessiondata){
                    getsessiondata(sessiondata);
                }
            } catch (error) {
                console.error("Error fetching localStorage data:", error);
            }
        };
        fetchLocalStorageData();
    }, [location.pathname]);

    const [anotheruserdata,setanotheruserdata] = useState({});
    const [chatingdisplay,setchatingdisplay] = useState(false);
    const [groupchatdisplay,setgroupchatdisplay] = useState(false);
    const [bookticket,setbookticket] = useState(false);


    return(
        <>
            <Welcomenavbar/><br />
            <Flightticket data={sessiondata} userdata={localstoragedata} setbookticket={setbookticket}/>
            <Acceptedusers data={sessiondata} userdata={localstoragedata} setanotheruserdata={setanotheruserdata} setchatingdisplay={setchatingdisplay}/>
            <Otherpeople data={sessiondata} userdata={localstoragedata} setchatingdisplay={setchatingdisplay} setanotheruserdata={setanotheruserdata}/>
            <GeminiChatBot data={sessiondata} userdata={localstoragedata} bookticket={bookticket} setbookticket={setbookticket}/>
            <Groupchat data={sessiondata} userdata={localstoragedata} setgroupchatdisplay={setgroupchatdisplay}/>
            {chatingdisplay&&<ChatingModel data={sessiondata} userdata={localstoragedata} anotheruserdata={anotheruserdata} chatingdisplay={chatingdisplay} setchatingdisplay={setchatingdisplay}/>}
            {groupchatdisplay&& <Groupchatingmodel data={sessiondata} userdata={localstoragedata} groupchatdisplay={groupchatdisplay} setgroupchatdisplay={setgroupchatdisplay}/>}

        </>
    )
}

export default Flightpage;