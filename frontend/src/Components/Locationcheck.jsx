import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const Locationcheck = ({setflightdata}) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [minDate, setMinDate] = useState("");
    const [maxDate, setMaxDate] = useState("");
    const [alert, setAlert] = useState(false);
    const [state, setstate] = useState([]);
    const [city, setCityList] = useState([]);
    const [userdata, setAirportdata] = useState({
        tostate: '',
        tocity: '',
        date: ''
    });

    useEffect(() => {
        const nowdate = new Date();
        const tendaydate = new Date();
        tendaydate.setDate(nowdate.getDate() + 10);

        const setdate = (date) => {
            return date.toISOString().split("T")[0];
        };

        setMinDate(setdate(nowdate));
        setMaxDate(setdate(tendaydate));
    }, []);

    useEffect(() => {
        const findState = async () => {
            var config = {
                method: 'get',
                url: 'https://api.countrystatecity.in/v1/countries/IN/states',
                headers: {
                    'X-CSCAPI-KEY': 'eG5sUFRySGcwNXpsRlExZVpLZ3EyVnk2MUduUVdaVWdIQWFQdzdBRQ=='
                }
            };

            await axios(config)
                .then(function (response) {
                    setstate(response.data);  // Remove JSON.stringify
                })
                .catch(function (error) {
                    console.log(error);
                });
        }

        findState();
    }, []);


    const handleChange = async (e) => {
        const { id, value, name } = e.target;

        // Update user data state
        setAirportdata((prevdata) => ({
            ...prevdata,
            [id]: value
        }));

        // Fetch cities if state is selected
        if (name === "statechange") {
            const iso2 = e.target.options[e.target.selectedIndex].getAttribute("data-iso2");

            const config = {
                method: 'get',
                url: `https://api.countrystatecity.in/v1/countries/IN/states/${iso2}/cities`,
                headers: {
                    'X-CSCAPI-KEY': 'eG5sUFRySGcwNXpsRlExZVpLZ3EyVnk2MUduUVdaVWdIQWFQdzdBRQ=='
                }
            };

            await axios(config)
                .then(function (response) {
                    setCityList(response.data);  // Update cities based on the selected state
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    };

    const findFlights = async () => {
        if (!userdata.tostate || !userdata.tocity || !userdata.date) {
            setAlert(true);
            return;
        }
        if(location.pathname=='/'){
            navigate('/login');
            return;
        }
        setAlert(false);
        const finddata = await axios.get(`https://flights-lmrv.onrender.com/flights/${userdata.tostate}/${userdata.tocity}/${userdata.date}`,{
            withCredentials:true
        });
        setflightdata(finddata.data);
    };

    return (
        <>
            <div className="locationcheck">
                <p style={{ marginTop: '10px' }}>Find your Flight landing at.</p>
                <div className="locations">
                    <select name="statechange" id="tostate" onChange={handleChange} value={userdata.tostate}>
                        <option value="#">State:</option>
                        {state.map((data, index) => (
                            <option key={index} value={data.name} data-iso2={data.iso2}>{data.name}</option>
                        ))}
                    </select>
                    <select name="citychange" id="tocity" onChange={handleChange} value={userdata.tocity}>
                        <option value="#">City:</option>
                        {city.map((data, index) => (
                            <option key={index} value={data.name}>{data.name}</option>
                        ))}
                    </select>
                    {/* <select name="" id="airport" onChange={handleChange} value={userdata.airport}>
                        <option value="#">Airport you are Landing at.</option>
                        {airportdata.map((data, index) => (
                            <option key={index} value={data.airportname}>{data.airportname}</option>
                        ))}
                    </select> */}

                    <input
                        type="date"
                        min={minDate}
                        max={maxDate}
                        id="date"
                        value={userdata.date}
                        onChange={handleChange}
                    />
                </div>
                <div className="button-location">
                    <button onClick={findFlights}>Find</button>
                </div>
                {alert && <span style={{ color: 'red', fontSize: '12px' }}>Fill the details properly...</span>}
            </div>
        </>
    );
};

export default Locationcheck;
