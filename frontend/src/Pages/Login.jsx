import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation,useNavigate } from "react-router-dom";

const Login = ()=>{
    const [data,setData] = useState({
        email: '',
        username: ''
    })
    const [exisitinguser,setexisitinguser] =useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const {email} = location.state || {};
    data.email = email;
    const addNewuser = async(e)=>{
        e.preventDefault();
        //make condition for checking username

        const addingUser = await axios.post("https://finalproject-1-xqyv.onrender.com/add-data",data,{
            withCredentials:true
        });
        if(addingUser.data.duplicateEntry)
        {
            setexisitinguser(true);
        }
        else{
            navigate('/welcome');
        }
    }
    const handleChange = (e)=>{
        setData((olddata)=>({
            ...olddata,
            [e.target.name]:e.target.value
        }))
    }
    useEffect(()=>{
        if(location.pathname=='/register/user' && email==undefined)
        {
            navigate('/register');
        }
    },[location.pathname,navigate])
    return(
        <>
            <div className="register-page">
                <div className="register-form">
                    <span><b>Register</b></span><br /><br />
                    <div className="form-register">
                        <form onSubmit={addNewuser}>
                            <input type="text" value={data.email} readOnly /><br />
                            <input type="text" name="username" required placeholder="username" value={data.username} onChange={handleChange} style={{marginBottom:'5px'}}/>
                            <span style={{color:'red',fontSize:'10px',display:exisitinguser?'block':'none'}}>Existing user with this username</span><br /><br />
                            <button type="submit" id="register-btn">CONTINUE</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;