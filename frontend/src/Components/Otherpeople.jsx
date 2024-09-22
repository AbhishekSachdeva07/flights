import React from "react";
import { useState,useEffect } from "react";
import axios from "axios";

const Otherpeople = ({data,userdata,setchatingdisplay,setanotheruserdata})=>{
    const [flightdata,setflightdata] = useState([]);
    const acceptedusers = async()=>{
        const getdata = await axios.post(`http://localhost:5000/getotherusers/${userdata.userData._id}`,data,{
            withCredentials:true
        })
        if(getdata.data.otherflightusers === true){
            setflightdata(getdata.data.otherflightusersdetails);
            console.log(getdata.data);
        }
        else{
            alert("Some error occured. Try again after some time");
            return;
        }
    }
    useEffect(()=>{
        acceptedusers();
    },[])

    const openchatbox = async(data)=>{
        setanotheruserdata(data);
        setchatingdisplay(true);
    }

    return(
        <>
            <div className="acceptedusers">
                <span style={{color:'gray'}}>Accepted Users Of Other Flights Landing within 30-40 minutes of your arrival (Click on DP's for personal chating)</span><br />
                <div className="usergrids">
                    {flightdata==[]&&
                        <div className="image-user" style={{display:'block'}}>
                            <span>Still no user's are accepted. Refresh the page to check for new Users.</span>
                        </div>
                    }
                    {flightdata!=[]&&flightdata.map((data,index)=>(
                        <div className="image-user" onClick={()=>openchatbox(data.userDetails)} key={index} >
                            <img src={data.userDetails.profilephoto} alt="" />
                            <span>{data.userDetails.username}</span>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Otherpeople;