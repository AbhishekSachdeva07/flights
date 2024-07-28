import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import './App.css';
import { Navigate, Route, Routes, useNavigate,useLocation } from 'react-router-dom';
import Home from './Pages/Home';
import Register from './Pages/Register';
import Welcome from './Pages/Welcome';
import Login from './Pages/Login';
import axios from 'axios';
import Logout from './Pages/Logout';
import Header from './Components/Header';
import HeaderUser from './Components/Header.user';
import Footer from './Components/Footer';

function App() {
    const navigate = useNavigate();
    const location = useLocation();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username,setusername] = useState("");

    useEffect(() => {
        const checkToken = async () => {
            await axios.get('https://finalproject-1-xqyv.onrender.com/check-for-token', {
                withCredentials: true
            })
            .then((response) => {
                // console.log(response);
                if (response.data.isverifiedtoken) {
                    setIsLoggedIn(true);
                    setusername(response.data.username);
                    navigate('/welcome',{state:{email:response.data.email,username:response.data.username}});
                }
            })
            .catch((error) => {
                console.log(error);
            });
        };

        // Check token only on specific routes
        if (location.pathname === '/register' || location.pathname === '/register/user') {
            checkToken();
        }
        //error here need to check for token
        if(location.pathname === '/')
        {
            setIsLoggedIn(false);
        }
    }, [location.pathname]);



    return (
        <>
            {!isLoggedIn && <Header />}
            {isLoggedIn && <HeaderUser data={username}/>}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={!isLoggedIn ? <Register /> : <Navigate to='/welcome' />} />
                <Route path="/register/user" element={<Login />} />
                <Route path="/welcome" element={isLoggedIn ? <Welcome /> : <Navigate to='/register' />} />
                <Route path="/logout" element={<Logout />}/>
                
            </Routes>
            <Footer />
        </>
    );
}

export default App;
