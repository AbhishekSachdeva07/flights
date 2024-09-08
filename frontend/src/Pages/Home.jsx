import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Correct import for Link
import Cookies from "js-cookie"
import axios from 'axios';
import HomepageBanner from '../Components/HomepageBanner';
import Airports from '../Components/Airports';
import Advantagebanner from '../Components/Advantagebanner';
import Banner from '../Components/Banner'
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import Locationcheck from '../Components/Locationcheck';
const Home = () => {
    const bannerData = "Save your money by carpooling at just few clicks.";
    return (
        <>
            {/* <Link to='/register'>Login/Signup</Link> */}
            <Header/>
            <HomepageBanner/>
            <Locationcheck/>
            <Advantagebanner/>
            <Banner text={bannerData}/>
            <Airports />
            <Footer />
        </>
    );
};

export default Home;
