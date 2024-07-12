import React from 'react'
import { useAuthProvider } from '../context/auth';
import { Spinner } from '../components/Spinner';
import { AdminDashBoard } from '../admin/AdminDashBoard';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
export const AdminProtection = () => {
    const [spinner, showSpinner] = useState(true);
    const [user, setUser] = useAuthProvider();
    const [isValidated, validate] = useState(false);
    const navigate = useNavigate();
    // useEffect(() => {
    //     console.log("useffect rendered");
    //     if (localStorage.getItem('user')) {
    //         console.log('already loginned');
    //         const data = JSON.parse(localStorage.getItem('user'));
    //         setUser({ user: data.loginRecord });
    //     }
    //     else {
    //         // navigate("/login", { replace: true }); changes

    //     }
    //     return () => {

    //     };
    // }, []);
    useEffect(() => {
        const authorizeAdmin = async () => {
            try {
                //herer we come only if some user is presend inside login stage or here we check its authorization
                const url = 'https://e-commerse-backend-yeft.onrender.com/api/v1/auth/admin-authentication';
                const requestBody = {
                    userId: user.user.loginRecord._id
                };
                const response = await axios.post(url, requestBody, {
                    headers: { Authorization: user.token },
                });
                if (response.data.isAdmin) {
                    validate(true);
                    showSpinner(false);
                }

            }
            catch (error) {
                console.log("error occured");
            }

        };
        if (user.token) {
            authorizeAdmin();
        }
    }, [user.token]);
    return (
        <>
            {user.user ? <AdminDashBoard /> : (spinner && <Spinner />)}
            {(user.user == null) && setTimeout(() => {
                navigate("/login");
            }, 4000)}

        </>
    )
}
