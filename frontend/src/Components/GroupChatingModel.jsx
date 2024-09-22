import React, { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";

const Groupchatingmodel = ({data,userdata,groupchatdisplay,setgroupchatdisplay})=>{
    const socket = useMemo(() => io("https://flights-lmrv.onrender.com"), []);

    const [msginput, setmsginput] = useState("");
    const [msg, setmsg] = useState([]);

    useEffect(()=>{
        socket.emit("join-group-chat",userdata.userData.username,data.flight_details.tripid);
        socket.emit("start-group-chat",userdata.userData.username,data.flight_details.tripid);
        socket.on("chat-history",(oldchats)=>{
            setmsg(oldchats);
        })
        socket.on("connection",()=>{

        })
        socket.on("group-message",(newmsg)=>{
            setmsg((oldmsg)=>[...oldmsg,newmsg])
        })
    },[])

    const sendchat = async()=>{
        if (msginput.trim()) {
            socket.emit("send-group-chat", userdata.userData.username, msginput, data.flight_details.tripid);
            const msgformat = {
                username: userdata.userData.username,
                message: msginput
            }
            setmsg((oldmsg)=>[...oldmsg,msgformat]);
            setmsginput("");
        }
        else{
            alert("enter some msg first");
            return;
        }
    }

    return(
        <>
            {groupchatdisplay&&<div className="chat-box">
                <div className="chat-box-heading">
                    {/* <span>ChatBot @rideXmatch</span>&emsp; */}
                    <div className="left-chatheading">
                        <img src="https://res.cloudinary.com/dxbfhdvv7/image/upload/v1725605826/commercial-jet-plane-airliner-flying-png_csjrae.png" alt="" />&nbsp;
                        <span>{data.flight_details.flight_no}</span>
                    </div>
                    <div className="right-chatheading">
                        <img src="https://res.cloudinary.com/dxbfhdvv7/image/upload/v1722079041/box-arrow-in-right_c42mgo.svg" alt="CLOSE" onClick={()=>setgroupchatdisplay(false)}/>
                    </div>
                </div>
                <div className="chat-box-chats">
                <div className="chats-chat-box">
                    {msg.map((msg, index) => (
                    <div key={index} className={msg.username === userdata.userData.username ? 'user-chats' : msg.username == userdata.username ? 'otheruser-chats' :'defaultuser'}>
                        <span>{msg.message}</span>
                    </div>
                    ))}
                </div>
                <div className="input-chat-box">
                    <input type="text" placeholder='Enter your message here...' onChange={(e) => setmsginput(e.target.value)} value={msginput} />
                    <button onClick={sendchat}>Send</button>
                </div>
                </div>
            </div>}
        </>
    )
}

export default Groupchatingmodel;
