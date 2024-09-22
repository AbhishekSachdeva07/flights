import React, { useMemo ,useState,useEffect} from "react";
import  {io} from "socket.io-client"

const GeminiChatBot = ({data,userdata,bookticket,setbookticket})=>{

    const socket = useMemo(()=> io("http://localhost:5000"),[]);

    const [msginput, setmsginput] = useState("");
    const [msg, setmsg] = useState([]);

    //checking for welcome msg
    const [sessionwelcome,setsessionwelcome] = useState(()=>{
        return sessionStorage.getItem(`${data.flight_details.tripid}-${userdata.userData.username}`)
    })

    useEffect(()=>{
        if(!sessionwelcome){
            socket.emit("join-gemini",userdata.userData.username,data.flight_details.tripid);
            sessionStorage.setItem(`${data.flight_details.tripid}-${userdata.userData.username}`,true,{expires:'1d'})
        }
        socket.emit("join-socket",(userdata.userData.username));
        socket.emit("gemini-chat-start",userdata.userData.username,"gemini",data.flight_details.tripid);
        socket.on("gemini-chat-hist",(oldchats)=>{
            setmsg(oldchats);
        })
        socket.on("connection",()=>{

        });
        socket.on("gemini-message",(newmsg)=>{
            setmsg((oldmsg)=>[...oldmsg,newmsg]);
        })
        socket.on("welcome-msg",(newmsg)=>{
            setmsg((oldmsg)=>[...oldmsg,newmsg]);
        })
    },[])

    const sendchat = async()=>{
        if (msginput.trim()) {
            socket.emit("send-gemini-msg", userdata.userData.username, msginput, data.flight_details.tripid,userdata.userData.email);
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
            {bookticket&&<div className="chat-box">
                <div className="chat-box-heading">
                    {/* <span>ChatBot @rideXmatch</span>&emsp; */}
                    <div className="left-chatheading">
                        <img src='https://tse3.mm.bing.net/th?id=OIP.DS3QKzpnyM_Tw-iETPbOdwHaGc&pid=Api&P=0&h=180' alt="Customer Care" />&nbsp;
                        <span>GEMINI X CAB BOOK</span>
                    </div>
                    <div className="right-chatheading">
                        <img src="https://res.cloudinary.com/dxbfhdvv7/image/upload/v1722079041/box-arrow-in-right_c42mgo.svg" alt="CLOSE" onClick={()=>setbookticket(false)}/>
                    </div>
                </div>
                <div className="chat-box-chats">
                <div className="chats-chat-box">
                    {msg.map((msg, index) => (
                    <div key={index} className={msg.username === userdata.userData.username ? 'user-chats' :'otheruser-chats'}>
                        <span dangerouslySetInnerHTML={{ __html: msg.message.replace(/\n/g, '<br>') }} />
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

export default GeminiChatBot;