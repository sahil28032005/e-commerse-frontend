import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './components.css'
import axios from 'axios';
import { useAuthProvider } from "../context/auth";
import './styles/login.css';
import shopping from './icons/shopping.jpg';
//google one tap sign in imports
import { useGoogleOneTapLogin } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import { hasGrantedAllScopesGoogle } from '@react-oauth/google';

// hooks that directly gives profile
import { googleLogout, useGoogleLogin } from '@react-oauth/google';

export const LoginModule = () => {
    const [user, setUser] = useAuthProvider();
    const [gUser, setgUser] = useState([]);
    const [profile, setProfile] = useState([]);
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
    const GOOGLE_CLIENT_ID = '639991296859-0sv0aam8ts0m9te7ob631t5lcj0id3rh.apps.googleusercontent.com';
    const GOOGLE_CLIENT_SECRET = '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';

    // const handleGoogleAuth = async () => {
    //     try {
    //         window.location.href = "https://e-commerse-backend-yeft.onrender.com/api/v1/auth/auth/google";
    //     }
    //     catch (exception) {
    //         console.log(exception.message);
    //     }
    // }
    const afterSubmit = async (e) => {
        e.preventDefault();
        console.log(email, password);
        //making axios call request
        try {
            const response = await axios.post('https://e-commerse-backend-yeft.onrender.com/api/v1/auth/login', {
                email,
                password
            });
            if (response) {


                console.log("Logined successfully:", response.data);
                setUser({ user: response.data.loginRecord });
                localStorage.setItem('user', JSON.stringify(response.data));
                // localStorage.setItem('token', response.data.token);
                // console.log(user);
                navigate("/");
            }
        }
        catch (e) {
            console.log(e.message);
        }
    }
    useGoogleOneTapLogin({
        onSuccess: credentialResponse => {
            console.log(credentialResponse);
        },
        onError: () => {
            console.log('Login Failed');
        },
    });

    //hook based
    const login = useGoogleLogin({
        onSuccess: (codeResponse) => setgUser(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    });

    //useeffect for fetch profile details after user logged in and set it as its profile detai;s
    useEffect(() => {
        const fetchUserProfile = async () => {
            if (gUser) {
                try {
                    const res = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${gUser.access_token}`, {
                        headers: {
                            Authorization: `Bearer ${gUser.access_token}`,
                            Accept: 'application/json'
                        }
                    });
                    setProfile(res.data);

                    // Firstly, register user if not already registered
                    const checkResponse = await axios.post('https://e-commerse-backend-yeft.onrender.com/api/v1/auth/check-entry', { email: res.data.email });

                    if (!checkResponse.data.exists) {
                        await axios.post('https://e-commerse-backend-yeft.onrender.com/api/v1/auth/create-entry', { name: res.data.given_name,email: res.data.email,photo:res.data.picture });
                        // alert("loginned as new user and your data is being stored in the database");
                        const response=await axios.post("https://e-commerse-backend-yeft.onrender.com/api/v1/auth/get-session",{email: res.data.email});
                        if (response) {


                            console.log("Logined successfully:", response.data);
                            setUser({ user: response.data.loginRecord });
                            localStorage.setItem('user', JSON.stringify(response.data));
                            // localStorage.setItem('token', response.data.token);
                            // console.log(user);
                            navigate("/home");
                        }
                    }
                    else{
                        // alert("successfully logined through google sign in");
                        const response=await axios.post("https://e-commerse-backend-yeft.onrender.com/api/v1/auth/get-session",{email: res.data.email});
                        if (response) {


                            console.log("Logined successfully:", response.data);
                            setUser({ user: response.data.loginRecord });
                            localStorage.setItem('user', JSON.stringify(response.data));
                            // localStorage.setItem('token', response.data.token);
                            // console.log(user);
                            navigate("/home");
                        }
                    }

                    // Navigate to home if needed
                    // navigate("/home");
                } catch (err) {
                    console.log(err);
                }
            }
        };

        fetchUserProfile();
    }, [gUser]);

    return (
        <>
            {console.log("userProfile", profile)}
            <div className="loginCont">
                <div className='left1'>
                    <img src={shopping} alt="Shopping" />
                </div>
                <div className='right1'>

                    <form onSubmit={afterSubmit} className='formCont'>
                        <h4>Log in to Exclusive</h4>
                        <h6>Enter Your Details Below</h6>
                        <div className="mb-3">
                            <div>
                                <input placeholder='Email Address' style={{ width: '100%' }} onChange={(e) => { setEmail(e.target.value) }} value={email} type="email" id="exampleInputEmail1" aria-describedby="emailHelp" />
                            </div>

                            <hr />
                            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <div className="mb-3">
                            <div>
                                <input placeholder='Enter Password' style={{ width: '100%' }} onChange={(e) => { setPassword(e.target.value) }} value={password} type="password" id="exampleInputPassword1" />
                            </div>
                            <hr />
                        </div>
                        <div className='btnCont'>
                            <button type="submit" className="btn btn-danger">Submit</button>
                            <button type="button" onClick={() => navigate("/forgot")} className="btn btn-danger mx-3">Reset Password</button>
                            {/* <a href="https://e-commerse-backend-yeft.onrender.com/api/v1/auth/auth/google" class="btn btn-danger"><span class="fa fa-google"></span> SignIn with Google</a> */}
                            <button onClick={() => login()} className="login-with-google-btn"><span class="fa fa-google"></span> SignIn with Google</button>
                            {/* <GoogleLogin
                                onSuccess={credentialResponse => {
                                    console.log('Login Success', credentialResponse);
                                    // Fetch user details from the credentialResponse
                                }}
                                onError={() => {
                                    console.log('Login Failed');
                                }}
                            /> */}
                        </div>


                    </form>
                </div>
            </div>


        </>
    )
}
