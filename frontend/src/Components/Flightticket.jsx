import React, { useState } from "react";

const Flightticket = ({data,userdata})=>{
    
    return(
        <>
            <div className="showing-flights-data">
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
                                    <div className="right-flight-footer" style={{justifyContent:'center',color:'gray'}}>
                                        <p style={{fontSize:'12px'}}>#RIDE x MATCH</p>&emsp;
                                        <p style={{fontSize:'12px'}}>@{userdata.userData.username}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
        </>
    )
}

export default Flightticket;