import React, { useEffect, useState } from 'react';
import './styles/billingDetails.css';
import Footer from './Footer';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuthProvider } from '../context/auth';
const BillingDetails = () => {
    const [product, setProduct] = useState([]);
    const [params, seTparams] = useState({});
    const [queryString, setQueryString] = useState("");
    const [isReadyForTransaction, setIsReadyForTransaction] = useState(false);
    // const[quanity,setQuantity] = useState(1); 
    const [user, setUser] = useAuthProvider();
    let { id } = useParams();
    let { quantity } = useParams();
    console.log("quantity", quantity);
    //stripe method for creating transaction gateway
    // const makeTransaction = async () => {
    //     try {
    //         const url = "https://e-commerse-backend-yeft.onrender.com/api/v1/products/stripe-pay";
    //         const response = await axios.post(url);
    //         if (response.data) {
    //             console.log(response.data);
    //             setIsReadyForTransaction(true);
    //         }
    //         else {
    //             console.log("problem for getting response from api");
    //         }
    //     }
    //     catch (exception) {
    //         console.log(exception.message);
    //     }

    // }
    const fetchProduct = async () => {

        try {
            const url = `https://e-commerse-backend-yeft.onrender.com/api/v1/products/get/${id}`;
            const response = await axios.get(url);
            if (response.data.success) {
                setProduct(response.data.data);
                seTparams({
                    pName: response.data.data.name,
                    price: response.data.data.price,
                    pId: response.data.data._id,
                    Uid: user.user._id,
                    quantity:quantity
                });
            }
            else {
                console.log("problem for receiving data");
            }
        }
        catch (exception) {
            console.log(exception.message);
        }
    }
    useEffect(() => {
        // makeTransaction();
        fetchProduct();
    }, []);

    useEffect(() => {
        setQueryString(Object.keys(params).map((key) =>
            `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
        ).join("&"));
    }, [params]);
    return (
        <>
            {console.log("queryString", queryString)}
            <div className='mainCont'>
                <div className='commonBill left'>
                    <h3>Billing Details</h3>


                    <form>
                        <div className="form-group">
                            <label htmlFor="first-name">First Name</label>
                            <input type="text" id="first-name" name="first-name" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="company-name">Company Name</label>
                            <input type="text" id="company-name" name="company-name" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="street-address">Street Address</label>
                            <input type="text" id="street-address" name="street-address" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="apartment-floor">Apartment/Floor</label>
                            <input type="text" id="apartment-floor" name="apartment-floor" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="town-city">Town/City</label>
                            <input type="text" id="town-city" name="town-city" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone-number">Phone Number</label>
                            <input type="tel" id="phone-number" name="phone-number" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email-address">Email Address</label>
                            <input type="email" id="email-address" name="email-address" required />
                        </div>
                        <div className="form-group form-group-checkbox">
                            <input type="checkbox" id="save-info" name="save-info" />
                            <label htmlFor="save-info">Save this information for faster checkout next time</label>
                        </div>
                        <button type="submit" className="submit-btn">Submit</button>
                    </form>

                </div>
                <div className='commonBill right'>
                    <div className="cont">
                        <div className="productBuy">
                            <div>
                                <img style={{ width: '70px', height: '70px' }} src={product?.photos?.[0]} alt="" />
                            </div>
                            <div>
                                <strong>{product.name}</strong>
                            </div>
                            <div>
                                <strong>{product.price} Rs</strong>
                            </div>

                        </div>
                        <div className="subtotal">
                            <h5>Subtotal:{product.price}</h5>
                        </div>
                        <div class="flex-container">

                        </div>
                        <div className="subtotal">
                            <h5>Shipping:</h5>
                        </div>
                        <div class="flex-container">

                        </div>
                        <div className="subtotal">
                            <h5>Total:{product.price}</h5>
                        </div>
                        <div className="subtotal">
                            <h5>Bank:</h5>
                        </div>
                        <div className="subtotal">
                            <h5>Cash On Delivery:</h5>
                        </div>
                        <div className="subtotal">
                            <h5>Coupon code:</h5>
                        </div>
                        <div className="subtotal">
                            <form action={`https://e-commerse-backend-yeft.onrender.com/api/v1/products/stripe-pay/${"?" + queryString}`} method="POST">
                                <button>Place Order</button>
                            </form>


                        </div>
                    </div>
                </div>
            </div>
            <div>
                <Footer />
            </div>
        </>
    )
}

export default BillingDetails