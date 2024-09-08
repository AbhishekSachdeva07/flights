import React, { useEffect, useState } from "react";
import axios from "axios";

const Acceptedusers = ({data,userdata,setanotheruserdata,setchatingdisplay})=>{
    const [flightdata,setflightdata] = useState([]);
    const acceptedusers = async()=>{
        const getdata = await axios.post(`http://localhost:5000/getusers/${userdata.userData._id}`,data,{
            withCredentials:true
        })
        if(getdata.data.flightusersfetched === true){
            setflightdata(getdata.data.flightuserdetails);
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
                <span style={{color:'gray'}}>Accepted Users (Click on DP's for personal chating)</span><br />
                <div className="usergrids">
                    {flightdata==[]&&
                        <div className="image-user" style={{display:'block'}}>
                            <span>Still no user's are accepted. Refresh the page to check for new Users.</span>
                        </div>
                    }
                    {flightdata!=[]&&flightdata.map((data,index)=>(
                        <div className="image-user" onClick={()=>openchatbox(data)} key={index} >
                            <img src={data.profilephoto} alt="" />
                            <span>{data.username}</span>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Acceptedusers;