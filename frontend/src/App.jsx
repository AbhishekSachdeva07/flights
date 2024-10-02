import React, { useEffect, useState } from 'react';
import './App.css';
import { Navigate, Route, Routes, useNavigate,useLocation } from 'react-router-dom';
import Home from './Pages/Home';
import Error from './Pages/Error';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Welcome from './Pages/Welcome'
import axios from 'axios';
import Flightpage from './Pages/Flightpage';


function App() {
    const navigate = useNavigate();
    const location = useLocation();

    const [localstoragedata, setLocalstoragedata] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem("response-userdata")) || {};
        } catch (error) {
            console.error("Error parsing localStorage data:", error);
            return {};
        }
    });

    useEffect(()=>{
        const fetchitems = ()=>{
            try{
                const data = JSON.parse(localStorage.getItem("response-userdata"));
                if (data) {
                    setLocalstoragedata(data);
                }
            }
            catch(error){
                console.error("error");
            }
        }
        fetchitems();
    },[location.pathname]);

    useEffect(()=>{
        const checkingtoken = async()=>{
            try{
                const checktoken = await axios.get('https://flights-lmrv.onrender.com/check-for-token',{
                    withCredentials:true
                })
                
                
                if(checktoken.data.isverifiedtoken){
                    if(location.pathname=='/login'){
                        navigate(`/welcome/${checktoken.data.userData.username}`);
                    }
                }
                else{
                    navigate('/login');
                }
            }
            catch(error){
                console.error();
            }
        }
        if (location.pathname!='/') {
            checkingtoken();
        }

    },[location.pathname])
    

    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} /> 
                <Route path='/login' element={<Login/>}/>
                <Route path='/signup/:email' element={<Signup/>}/>
                <Route path='/welcome/:username' element={<Welcome/>}/>
                <Route path='/flight/:from/:to/:userid/:flightid' element={<Flightpage/>}/>
                <Route path='/contactus' element={<Login/>}/>
                <Route path='/refundpolicy' element={<Login/>}/>
                <Route path='/termsconditions element={<Login/>}/>
                <Route path='*' element={<Error/>}/>
            </Routes>
        </>
    );
}

export default App;
