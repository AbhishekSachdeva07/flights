import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Flightdata = ({ flightdata, localstoragedata }) => {
    const [alertbox, setalertbox] = useState(false);
    const [flightdetails, setflightdetails] = useState({});
    const [userData, setuserdata] = useState({
        cliendid: localstoragedata?.userData?._id || "",
        userdetails:{
            firstname: '',
            secondname: '',
            refnum: ''
        }
    });
    const navigate = useNavigate();
    const makechanges = (e) => {
        setuserdata((olddata) => ({
            ...olddata,
            userdetails:{
                ...olddata.userdetails,
                [e.target.name]: e.target.value
            }
        }));
    };

    const checkflightaddedtodb = async (data) => {
        try {
            const addingflightdata = await axios.post('http://localhost:5000/add-flight', data, {
                withCredentials: true
            });
            setflightdetails(data);
        } catch (error) {
            console.error("Error adding flight to database:", error);
        }
    };

    const openforflight = async (data) => {
        checkflightaddedtodb(data);
        //checking whether accepted or not
        try{
            const checkinguseraccepted = await axios.post(`http://localhost:5000/flight/useraccepted/${localstoragedata?.userData?._id}`,data,{
                withCredentials:true
            });
            console.log(data);
            if(checkinguseraccepted.data.useraccepted){
                sessionStorage.setItem(data.flight_details.tripid,JSON.stringify(data));
                navigate(`/flight/${data.from.location}/${data.to.location}/${localstoragedata?.userData?._id}/${encodeURIComponent(data.flight_details.tripid)}`);
                return;
            }
            else{
                alert("Apply for this flight first. If already applied wait for a while to get accepted.");
                return;
            }
        }
        catch(error){
            console.error("error occured",error);
        }
    };

    const applyforflight = async (data) => {
        checkflightaddedtodb(data);
        try {
            const checkinguseraccepted = await axios.post(`http://localhost:5000/flight/useraccepted/${localstoragedata?.userData?._id}`,data,{
                withCredentials:true
            });
            if(checkinguseraccepted.data.useraccepted){
                alert('User already Accepted');
                return;
            }

            //checking user first
            const checkperson = await axios.post(`http://localhost:5000/flight/checkuser/flightsapplied/${localstoragedata.userData._id}`,data, {
                withCredentials: true
            });
            console.log("checkperos",checkperson);
            if (checkperson.data.useralreadyapplied) {
                alert('You have already applied for this flight. Wait for a few minutes for verification.');
                return;
            }
            setalertbox(true);
        } catch (error) {
            console.error("Error checking flight application status:", error);
        }
    };

    const finalapply = async () => {
        try {
            const flightNoEncoded = encodeURIComponent(flightdetails?.flight_details?.tripid);
            const url = `http://localhost:5000/flight/adduser/flightapplied/${flightNoEncoded}`;
            const addusertoflight = await axios.post(url, userData, {
                withCredentials: true
            });
            if (addusertoflight.data.useraddedtoflight) {
                alert("You have successfully applied to this flight.");
                setalertbox(false);
            } else {
                alert("Some error occurred. Try again later.");
            }
        } catch (error) {
            console.error("Error finalizing flight application:", error);
        }
    };

    return (
        <>
            {alertbox && (
                <div className="alert-box">
                    <div className="crossbtn">
                        <img
                            src="https://res.cloudinary.com/dxbfhdvv7/image/upload/v1722079041/box-arrow-in-right_c42mgo.svg"
                            alt=""
                            onClick={() => setalertbox(false)}
                        />
                    </div>
                    <div className="alert-data">
                        <input
                            type="text"
                            name="firstname"
                            placeholder="First Name"
                            onChange={makechanges}
                            value={userData.firstname}
                        /><br />
                        <input
                            type="text"
                            name="secondname"
                            placeholder="Second Name"
                            onChange={makechanges}
                            value={userData.secondname}
                        /><br />
                        <input
                            type="text"
                            name="refnum"
                            placeholder="Booking Ref."
                            onChange={makechanges}
                            value={userData.refno}
                        />
                    </div>
                    <div className="alert-btn">
                        <button onClick={finalapply}>Apply</button>
                    </div>
                </div>
            )}
            <div className="showing-available-flights">
                {flightdata == null && (
                    <div className="nodatapresent">
                        <p>No flights available or try searching for other dates and times.....</p>
                    </div>
                )}
                {flightdata != null &&
                    flightdata.map((data, index) => (
                        <div className="showing-flights-data" key={index}>
                            <div className="flight-data">
                                <div className="flightdetails">
                                    <div className="left-flightdetails">
                                        <img
                                            src="https://res.cloudinary.com/dxbfhdvv7/image/upload/v1725605826/commercial-jet-plane-airliner-flying-png_csjrae.png"
                                            alt=""
                                        />&nbsp;
                                        <span style={{ fontSize: '13px' }}>Airplane Details</span>
                                    </div>
                                    <div className="centreflightdetails">
                                        <span style={{ fontSize: '18px', fontWeight: '700' }}>
                                            {data.flight_details.flight_company}
                                        </span>
                                    </div>
                                    <div className="right-flightdetails">
                                        <span>{data.flight_details.flight_no}</span>
                                    </div>
                                </div>
                                <div className="flightbody">
                                    <div className="location-flightbody">
                                        <span style={{ fontSize: '10px' }}>FROM:</span>&nbsp;
                                        <span style={{ fontSize: '35px', color: 'purple', fontWeight: '700' }}>
                                            {data.from.location}
                                        </span>
                                        &emsp;&emsp;
                                        <span style={{ fontSize: '10px' }}>To:</span>&nbsp;
                                        <span style={{ fontSize: '35px', color: 'purple', fontWeight: '700' }}>
                                            {data.to.location}
                                        </span>
                                    </div>
                                    <div className="details">
                                        <span style={{ fontSize: '13px' }}>Departure Time: <b style={{ color: 'purple', fontSize: '15px' }}>{data.from.departure_time}</b></span><br />
                                        <span style={{ fontSize: '13px' }}>Arrival Time: <b style={{ color: 'purple', fontSize: '15px' }}>{data.to.arrival_time}</b></span><br />
                                        <span style={{ fontSize: '13px' }}>Delay: <b style={{ color: 'purple', fontSize: '15px' }}>{data.to.delay}</b></span><br />
                                        <span style={{ fontSize: '13px' }}>Passenger Count: <b style={{ color: 'purple', fontSize: '15px' }}>{data.flight_details.passengers_count}</b></span><br />
                                    </div>
                                </div>
                                <div className="flightfooter">
                                    <div className="left-flight-footer">
                                        <span style={{ fontSize: '12px' }}>Passengers Applied: <b style={{ color: 'purple', fontSize: '15px' }}>50</b></span>&emsp;
                                        <span style={{ fontSize: '12px' }}>Passengers Accepted: <b style={{ color: 'purple', fontSize: '15px' }}>39</b></span>
                                    </div>
                                    <div className="right-flight-footer">
                                        <button onClick={() => openforflight(data)}>Open</button>
                                        <button onClick={() => applyforflight(data)}>Apply for this Flight</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                )}
            </div>
        </>
    );
};

export default Flightdata;
