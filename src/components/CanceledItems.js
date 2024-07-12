import React, { useState, useEffect } from 'react'
import DsahBoardNavigator from './DsahBoardNavigator';
import { useAuthProvider } from '../context/auth';
import axios from 'axios';
import Footer from './Footer';
const CanceledItems = () => {
    const [user, setUser] = useAuthProvider();
    const [useridentifier, setUserIdentifier] = useState('');
    const [canceled, setCanceled] = useState([]);
    const getCancelledItems = async () => {
        try {
            const url = `https://e-commerse-backend-yeft.onrender.com/api/v1/orders/returned-order/${useridentifier}`;
            const response = user?.user?.token && await axios.get(url);
            console.log("cancelled", response.data.data[0].cancelledProducts);
            setCanceled(response.data.data[0]?.cancelledProducts || []);
        }
        catch (exception) {
            console.log(exception.message);
        }
    }
    useEffect(() => {
        setUserIdentifier(user?.user?._id);
    }, [user?.user?.token]);


    useEffect(() => {
        getCancelledItems();//after user updation this function will be called again
    }, [useridentifier]);
    return (
        <>
            <div className="containerMorder">
                <div className="leftOd">
                    <DsahBoardNavigator />
                </div>

                <div className="order-details">
                    <h3>My Orders</h3>
                    {canceled.length > 0 ? (
                        canceled.map(order => (
                            <div key={order?._id} className="order-card">
                                <h4>Order #{order?._id}</h4>
                                <p>Date: {order?.createdAt}</p>
                                <table className="order-table">
                                    <thead>
                                        <tr>
                                            <th>Image</th>
                                            <th>Item</th>
                                            <th>Quantity</th>
                                            <th>Price</th>
                                           
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <img
                                                    style={{ width: '100px' }}
                                                    src={`https://e-commerse-backend-yeft.onrender.com/api/v1/products/get-particular-photo/0/${order?._id}`}
                                                    alt=""
                                                />
                                            </td>
                                            <td>{order?.name}</td>
                                            <td>{order?.quantity}</td>
                                            <td>{order?.price}</td>
                                          
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        ))
                    ) : (
                        <p>No cancelled items found.</p>
                    )}
                </div>
            </div>
            <div>
                <Footer />
            </div>
        </>
    )
}

export default CanceledItems