import React from "react";


const Airports = ()=>{

    const airportdata = [
        {
            airporturl: 'https://res.cloudinary.com/dxbfhdvv7/image/upload/v1722074254/zybtvsqmh9umuwfoeye4.jpg',
            airportname: 'Shaheed Bhagat Singh International Airport',
            airportlocation: 'Jhiurheri, Punjab (Chandigarh)'
        },
        {
            airporturl: 'https://res.cloudinary.com/dxbfhdvv7/image/upload/v1722074219/1200px-Sculpture_of_hasta_mudras_at_Indira_Gandhi_International_Airport_dq8rjq.jpg',
            airportname: 'Indira Gandhi International Airport',
            airportlocation: 'New Delhi, Delhi 110037'
        },
        {
            airporturl: 'https://res.cloudinary.com/dxbfhdvv7/image/upload/v1722074424/Sri_Guru_Ram_Dass_Jee_International_Airport_2C_Amritsar_bydmv0.jpg',
            airportname: 'Sri Guru Ram Das Ji International Airport',
            airportlocation: 'Amritsar, Punjab'
        }
    ]
    
    return(
        <>
            <div className="airport-working">
                <select name="" id="" style={{marginLeft:'20px',marginTop:'10px'}}>
                    <option value="">Current Operational Airports</option>
                </select>
                <div className="showing-airports">
                    {airportdata.map((value,index)=>(
                        <div className="airport-data">
                            <img src={value.airporturl} alt="img" /><br />
                            <span>{value.airportname}</span><br />
                            <span>{value.airportlocation}</span>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Airports;