import userDataResponse from "../Response.js";

const findflights = async(req,res)=>{
    const locationdetails = req.params;
    const userResponse = {...userDataResponse};

    //fetching data from api
    try{
        const response = await fetch('https://flight-codexabhishek.netlify.app/flight-api.json');
        if(!response.ok){
            userResponse.flightdetailsfetched = false;
            return res.status(404).json(userResponse);
        }
        const flightdata = await response.json();
        const filterdata = flightdata.data.flights.filter(flight=>flight.to.state === locationdetails.state && flight.to.location === locationdetails.city && flight.to.arrival_date === locationdetails.date);
        return res.status(200).json(filterdata);
    }
    catch(error)
    {
        userResponse.flightdetailsfetched = false;
        userResponse.error = error.message;
        return res.status(500).json(userResponse);
    }
}

export default findflights;