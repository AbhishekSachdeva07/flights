import React from "react";

const Groupchat = ({data,userdata,setgroupchatdisplay})=>{
    return (
        <>
            <div className="main-group-chat">
                <span style={{color:'gray'}}>Group Chat ({data.from.location} to {data.to.location}) #RIDE x MATCH</span>
                <div className="join-group-chat">
                    <button onClick={()=>setgroupchatdisplay(true)}>Open Group Chat</button>
                </div>
            </div>
        </>
    )
}

export default Groupchat;