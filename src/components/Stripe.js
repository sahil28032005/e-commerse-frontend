import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
const Stripe = () => {
    const navigate = useNavigate();
    const makeTransaction = async () => {
        try {
            const url = "https://e-commerse-backend-yeft.onrender.com/stripe-pay";
            const response = await axios.post(url);
            if (response.data) {
                console.log(response.data);
                // navigate("/checkout");
            }
            else {
                console.log("problem for getting response from api");
            }
        }
        catch (exception) {
            console.log(exception.message);
        }

    }
    useEffect(() => {
        makeTransaction();
    }, []);
    return (
        <></>
    )
}

export default Stripe