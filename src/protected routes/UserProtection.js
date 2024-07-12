import { React, useState, useEffect } from 'react'
import { useAuthProvider } from '../context/auth';
import { Spinner } from '../components/Spinner';
import { useNavigate } from "react-router-dom";
import axios from 'axios';//to call ownmade apis
import { UserDashBoard } from '../components/userDashBoard';
export const UserProtection = () => {
    const [spinner, showSpinner] = useState(true);
    const [user] = useAuthProvider();
    const [validate] = useState(false);
    const navigate = useNavigate();
    // useEffect(() => {
    //     console.log("useffect rendered");
    //     if (localStorage.getItem('user')) {
    //         console.log('already loginned');
    //         const data = JSON.parse(localStorage.getItem('user'));
    //         setUser({ user: data.loginRecord });
    //     }
    //     else {
    //         // navigate("/login", { replace: true });

    //     }
    //     return () => {

    //     };
    // }, []);
    useEffect(() => {
        const authChk = async () => {
            //call api using async blocks
            try {
                const url = 'https://e-commerse-backend-yeft.onrender.com/api/v1/auth/user-authentication';
                const requestBody = {
                    userId: user.user.loginRecord._id,
                };
                const response = await axios.post(url, requestBody, {
                    headers: { Authorization: user.token },
                });
                if (response.data.isValidObjectId) {
                    showSpinner(false);
                    validate(true);
                }



            } catch (error) {
                console.error('Error during authentication:', error);
                // Handle error (e.g., show error message to the user)
            }

        };
        if (user.token) {
            authChk();
        }
    },
        [user,validate]
    );
    return (
        <>
            {user.user ? <UserDashBoard /> : (spinner && <Spinner />)}
            {(user.user == null && !(localStorage.getItem('user'))) && setTimeout(() => {
                navigate("/login");
            }, 4000)}
            {console.log(user)}
        </>
    )
}
