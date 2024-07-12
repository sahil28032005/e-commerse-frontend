import React, { useState, useEffect } from 'react'
import DropIn from "braintree-web-drop-in-react";
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuthProvider } from '../context/auth';
import Footer from './Footer';
import { useCartProvider } from '../context/cartContext';
import './styles/paymentMethods.css';
const PaymentTest = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [prices, setPrice] = useState([]);
    const params = useParams();
    const [clientToken, setClientToken] = useState('');
    const [instance, setInstance] = useState(null);
    const [cartSpecific, setCartSpecific] = useState([]);
    const [user, setUser] = useAuthProvider();
    const [categories, setCategories] = useState([]);
    const [similarProducts, setSimilarProducts] = useState([]);
    const [number,setNumber] = useCartProvider();
    const id = params.id;
    const fetchSpecific = async (extracted) => {
        try {
            console.log("extracted", extracted);
            const url = "https://e-commerse-backend-yeft.onrender.com/api/v1/cart/get-per-id";
            const body = {
                productIds: extracted
            }
            const response = await axios.post(url, body);
            if (response.data.success) {
                console.log("succes for fetch specific cart items that are user specific");
                setCartSpecific(response.data.data);
                setNumber(response.data.data.length);
                const prices = response.data.data.map((product) => product.price).reduce((acc, curr) => acc + curr, 0,);
                setPrice(prices);
                const categories = response.data.data.map((product) => product.category);
                setCategories(categories);
            }
            else {
                console.log("failed to fetch user specific cart items");
            }
        }
        catch (err) {
            console.log(err.message);
        }
    }
    const fetchCartItems = async () => {
        try {
            const url = `https://e-commerse-backend-yeft.onrender.com/api/v1/cart/get-all/${id}`;
            const response = await axios.get(url);
            if (response.data.success) {
                console.log("succes for fetch cart");
                const productsDetails = response?.data?.data[0].products;
                setProducts(productsDetails);
                const extractedIds = productsDetails.map((product) => product.productId);
                fetchSpecific(extractedIds);
                // setNumber(5);dont set here as it craeting level problems remember for worker threads pool synchronization
                // console.log("extracted" + extractedIds);
            }
            else {
                console.log("cannot fetch cart");
            }
        }
        catch (error) {
            console.log(error.message);
        }
    }
    const getClientToken = async () => {

        try {
            const response = await axios.get("https://e-commerse-backend-yeft.onrender.com/api/v1/products/client-token");
            if (response) {
                setClientToken(response.data);
                console.log("client token received successfully");
            }
            else {
                console.log("problem for receiving client token");
            }
        }
        catch (error) {
            console.log(error.message);
        }
    }

    const sendPaymentRequest = async () => {
        try {
            const url = "https://e-commerse-backend-yeft.onrender.com/api/v1/products/make-payment";
            const { nonce } = await instance.requestPaymentMethod();
            const body = {
                payment_method_nonce: nonce
            }
            const response = await axios.post(url, body);
            console.log("data payment", response.data);
        }
        catch (error) {
            console.log(error.message);
        }
    }
    //deletion from cart
    const handleDelete = async (pid) => {
        try {
            const url = "https://e-commerse-backend-yeft.onrender.com/api/v1/cart/delete";
            const body = {
                identifier: user?.user?._id,
                productId: pid
            }
            const response = await axios.post(url, body);
            if (response.data.success) {
                console.log("success for deletion");
                fetchCartItems();
            }
            else {
                console.log("problem for deletion");
            }
        }
        catch (exception) {
            console.log(exception.message);
        }
    }
    //getting similar based on catrgory array and populating them
    const getSimilarAsPerCatIds = async () => {
        try {
            const url = "https://e-commerse-backend-yeft.onrender.com/api/v1/products/get-similar-id";
            const body = {
                catIds: categories
            }
            const response = await axios.post(url, body);
            if (response.data.success) {
                setSimilarProducts(response.data.data);
            }
            else {
                console.log("probllem for fetch similar data");
            }
        }
        catch (error) {
            console.log(error.message);
        }
    }
    //items styling
    const parentStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    };

   
    //useffect for similar products
    useEffect(() => {
        getSimilarAsPerCatIds();
    }, [categories]);

    useEffect(() => {
        console.log("inside payment test useffect");
        console.log("token at case", user?.user?.token);
        if (user?.user?.token) {

            getClientToken();
            fetchCartItems();

        }
    }, [user]);
    if (!clientToken) {
        return (
            <div>
                {console.log(user?.user?._id)}
                <h1>Loading...</h1>
            </div>
        );
    } else {
        return (
            <>
                <div className="containerPayment" style={{ marginTop: '90px', background: '#e8fff5', width: '100%', padding: '50px' }}>
                    <div className="row" style={{ margin:'auto' }}>
                        <div className="citems col-sm">
                            {/* cart Items */}
                            {
                                cartSpecific.length > 0 && cartSpecific.map(product => {
                                    return (
                                        <div className="card my-3" style={{ backgroundColor: '#f7d7d7' }}>
                                            <div className="card-header">
                                                Featured
                                            </div>
                                            <div className='cartPaymentchild' style={parentStyle}>
                                                <img className='childStyle'  src={`https://e-commerse-backend-yeft.onrender.com/api/v1/products/get-particular-photo/0/${product._id}`}></img>
                                                <div className="card-body">
                                                    <h5 className="card-title">{product.name}</h5>
                                                    <p className="card-text"><strong>Avaliable quantity</strong> {product.quantity}</p>
                                                    <p className="card-text"><strong>Price:</strong> {product.price} ₹</p>
                                                    <a href="#" onClick={() => { handleDelete(product._id) }} className="btn btn-danger">Delete</a>
                                                </div>
                                            </div>

                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className="col-sm">
                            <div>
                                <DropIn
                                    options={{ authorization: clientToken }}
                                    onInstance={(instance) => setInstance(instance)}
                                />
                                <button className="btn btn-success" onClick={sendPaymentRequest}>Buy</button><span> {prices.toLocaleString()} ₹ Total	</span>
                            </div>
                            <div>
                                <h3>{similarProducts.length} Similar Products Found....</h3>
                                <div id="div1" style={{ height: '600px', position: 'relative' }}>
                                    <div
                                        id="div2"
                                        style={{
                                            maxHeight: '100%',
                                            overflow: 'auto'
                                        }}
                                    >
                                        <div
                                            id="div3"
                                        >
                                            {similarProducts.map((product) => {
                                                return (
                                                    <div className="card my-4" style={{ width: '28rem', margin: 'auto', background: '#b6b6b6' }}>
                                                        <img style={{ height: '300px' }} className="card-img-top" src={`https://e-commerse-backend-yeft.onrender.com/api/v1/products/get-particular-photo/0/${product._id}`} alt="Card image cap" />
                                                        <div className="card-body">
                                                            <h5 className="card-title">{product.name}</h5>
                                                            <p className="card-text">{product.description}</p>
                                                            <a href="#" className="btn btn-primary">Buy Now</a>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
            </>
        );
    }
};


export default PaymentTest