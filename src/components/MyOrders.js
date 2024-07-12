import React, { useState, useEffect } from 'react'
import DsahBoardNavigator from './DsahBoardNavigator';
import './styles/myOrder.css';
import axios from 'axios';
import { useAuthProvider } from '../context/auth';
import Footer from './Footer';
const MyOrders = () => {
    const [user, setUser] = useAuthProvider();
    const [useridentifier, setUserIdentifier] = useState('');
    const [myOrders, setOrders] = useState([]);
    //methid that handle return product controller
    const handleReturn = async (pid, quantitiyToReturn) => {
        try {
            const url = `https://e-commerse-backend-yeft.onrender.com/api/v1/orders/return-order/${useridentifier}/${pid}/${quantitiyToReturn}`;
            const response = user?.user?.token && await axios.delete(url);
            if (!response) {
                console.log("problem for returning order");
            }
            else {
                alert("returned successfully....");
                getOrders();
            }
        }
        catch (err) {
            console.log(err.message);
        }
    }
    //function to fetch oredders wirh respect to particular user
    const getOrders = async () => {
        try {
            const url = `https://e-commerse-backend-yeft.onrender.com/api/v1/orders/getAll-orders/${useridentifier}`;
            const response = await axios.get(url);
            if (response.data.success) {
                //data arrived do further
                setOrders(response.data.data[0].orders);
            }
            else {
                console.log("problem for arrive data");
            }
        }
        catch (exception) {
            console.log(exception.message);
        }
    }
    useEffect(() => {
        setUserIdentifier(user?.user?._id);
    }, [user?.user?.token]);

    useEffect(() => {
        getOrders();
    }, [useridentifier]);
    return (
        <>
            {console.log("orders", myOrders)}
            <div  className="containerMorder">
                <div className="leftOd">
                    <DsahBoardNavigator />
                </div>

                <div  className="order-details">
                    <h3>My Orders</h3>
                    {myOrders.map(order => (
                        <div key={order._id} className="order-card">
                            <h4>Order #{order._id}</h4>
                            <p>Date: {order?.product?.createdAt}</p>
                            <p>Status: {order.status}</p>
                            <table className="order-table">
                                <thead>
                                    <tr>
                                        <th>Image</th>
                                        <th>Item</th>
                                        <th>Quantity</th>
                                        <th>Price</th>
                                        <th>Order Summary</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    <tr >
                                        <td><img style={{ width: '100px' }} src={`https://e-commerse-backend-yeft.onrender.com/api/v1/products/get-particular-photo/0/${order.product._id}`} alt="" /></td>
                                        <td>{order.product.name}</td>
                                        <td>{order.quantity}</td>
                                        <td>{order.product.price}</td>
                                        <td>
                                            <button>Track Order</button>
                                            <button onClick={() => { handleReturn(order.product._id, order.quantity) }}>Cancel Order</button>
                                        </td>
                                    </tr>

                                </tbody>
                            </table>
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <Footer />
            </div>



        </>
    )
}

export default MyOrders