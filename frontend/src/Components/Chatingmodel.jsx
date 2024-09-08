import React, { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";

const ChatingModel = ({data,userdata,anotheruserdata,chatingdisplay,setchatingdisplay})=>{
    const socket = useMemo(() => io("http://localhost:5000"), []);

    const [msginput, setmsginput] = useState("");
    const [msg, setmsg] = useState([]);

    useEffect(()=>{
        socket.emit("join",userdata.userData.username);
        socket.emit("start-indiv-chat",userdata.userData.username,anotheruserdata?.username,data.flight_details.tripid);
        console.log(anotheruserdata.username);
        socket.on("chat-history",(oldchats)=>{
            setmsg(oldchats);
            console.log(msg);
        })
        socket.on("connection",()=>{

        })
        socket.on("private-message",(newmsg)=>{
            setmsg((oldmsg)=>[...oldmsg,newmsg])
        })
    },[])

    const sendchat = async()=>{
        if (msginput.trim()) {
            socket.emit("send-indiv-chat", userdata.userData.username, anotheruserdata.username, msginput, data.flight_details.tripid);
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
            {chatingdisplay&&<div className="chat-box">
                <div className="chat-box-heading">
                    {/* <span>ChatBot @rideXmatch</span>&emsp; */}
                    <div className="left-chatheading">
                        <img src={anotheruserdata.profilephoto} alt="" />&nbsp;
                        <span>{anotheruserdata.username}</span>
                    </div>
                    <div className="right-chatheading">
                        <img src="https://res.cloudinary.com/dxbfhdvv7/image/upload/v1722079041/box-arrow-in-right_c42mgo.svg" alt="CLOSE" onClick={()=>setchatingdisplay(false)}/>
                    </div>
                </div>
                <div className="chat-box-chats">
                <div className="chats-chat-box">
                    {msg.map((msg, index) => (
                    <div key={index} className={msg.username === userdata.userData.username ? 'user-chats' : msg.username === anotheruserdata.username ? 'otheruser-chats' :'defaultuser'}>
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

export default ChatingModel;