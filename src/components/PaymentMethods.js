import React, { useState, useEffect } from 'react'
import './styles/paymentMethod.css'
import DsahBoardNavigator from './DsahBoardNavigator'
import { useAuthProvider } from '../context/auth';
import Footer from './Footer';
import axios from 'axios';
const PaymentMethods = () => {
    const [paymentHistory, setPaymentHistory] = useState([]);
    const [useridentifier, setUserIdentifier] = useState('');
    const [user, setUser] = useAuthProvider();
    const getPaymentHistory = async () => {
        try {
            const url = `https://e-commerse-backend-yeft.onrender.com/api/v1/transactions/get-transaction-details/${useridentifier}`;
            const response = await axios.get(url);
            setPaymentHistory(response.data.data);
        }
        catch {

        }
    }

    //to fetch user data
    useEffect(() => {
        setUserIdentifier(user?.user?._id);
    }, [user?.user?.token]);

    //normal runner
    useEffect(() => {
        getPaymentHistory();
    }, [useridentifier]);
    return (
        <>

            <div className="paymentMethidCont">
                <div className="leftOd">
                    <DsahBoardNavigator />
                </div>

                <div className="payment-history">
                    <h2>Payment History</h2>
                    <table className="payment-table">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Amount</th>
                                <th>Payment Method</th>
                                <th>Status</th>
                                <th>Transaction Id</th>
                                <th>Details</th>
                            </tr>
                        </thead>
                        <tbody id="payment-history-body">
                            {paymentHistory.map((item) => {
                                return (
                                    <tr>
                                        <td>{item.createdAt}</td>
                                        <td>{item.amount}</td>
                                        <td>{item.payment_method}</td>
                                        <td>{item.status}</td>
                                        <td>{item.transaction_id}</td>
                                        <td>
                                            <button>View</button>
                                        </td>
                                    </tr>
                                )
                            })}


                        </tbody>

                    </table>
                </div>

            </div>
            <div>
                {/* <Footer /> */}
            </div>

        </>
    )
}

export default PaymentMethods