import React, { useEffect, useState,Component } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './styles/productDetails.module.css';
import Footer from './Footer';
// import productSchema from '../../../models/productSchema';
const ProductDetails = () => {
    const [selected, setSelected] = useState(0);
    const [count, setCount] = useState(1);//for counter used as quantity purchase
    const navigate = useNavigate();
    let { id } = useParams();
    const [singleProduct, setSingleProduct] = useState({});
    const [similarProduct, setSimilarProduct] = useState([]);
    const [catId, setCatId] = useState('');
    const [isZoomed, setIszoomed] = useState({ display: 'none' });
    const [position, setPosition] = useState({
        x: 0, y: 0
    });
    //gettig product details using single product api
    const getProduct = async () => {
        try {
            const url = `https://e-commerse-backend-yeft.onrender.com/api/v1/products/get/${id}`;
            const response = await axios.get(url);
            if (response.data.success) {
                console.log("data arrived on productdetails");
                setSingleProduct(response.data.data);
                setCatId(response.data.data.category?._id);
            }
            else {
                console.log("error for arriving data on productdetails");
            }
        }
        catch (error) {
            console.log(error.message);
        }
    }

    //function for gettiing similar products
    const getSimilarProducts = async () => {
        try {
            const url = `https://e-commerse-backend-yeft.onrender.com/api/v1/products/get-similar/${id}`;
            const response = await axios.get(url);
            if (response.data.success) {
                console.log(response.data.data);
                setSimilarProduct(response.data.data);
            }
            else {
                console.log("error for arriving data");
            }
        }
        catch (error) {
            console.log(error.message);
        }
    }

    //methid to chunk array in set of three modules
    // const chunkArr = (arr, chkSize) => {
    //     const chkArr = [];
    //     for (let i = 0; i < arr.length; i += chkSize) {
    //         chkArr.push(arr.slice(i, i + chkSize));
    //     }
    //     return chkArr;
    // }
    const mouseMove = (e) => {
        const rect = e.target.getBoundingClientRect();
        console.log("x:", rect.x);
        //we have elements x and y coordinates
        const elementX = rect.x;
        const elementY = rect.y;

        //positions within element
        const withinX = e.clientX - elementX;
        const withinY = e.clientY - elementY;
        console.log("withinX:", withinX);
        console.log("withinY:", withinY);
        const backGroundWidthAfterZoom = e.target.width * 3;
        setPosition({ x: withinX, y: withinY });
        setIszoomed({
            background: 'white',
            backgroundImage: `url(https://e-commerse-backend-yeft.onrender.com/api/v1/products/get-particular-photo/${selected}/${singleProduct._id})`,
            backgroundSize: `${backGroundWidthAfterZoom}px ${backGroundWidthAfterZoom}px`,
            position: 'absolute',
            zIndex: '2',
            backgroundPosition: `-${(withinX * 3) / 2}px  -${(withinY * 3) / 2}px`,
            width: '600px', height: '600px',
            // left: `${withinX + 20}px`,
            // top: `${withinY + 20}px`,
            backgroundRepeat: 'no-repeat',
        });


    }
    const handleMouseLeave = () => {
        setIszoomed({ display: 'none' });
    };

    //counter methods
    const increment = async (actualQuantitiy) => {
        if (count < actualQuantitiy) {
            setCount(count + 1);
        }
        else {
            alert("quantitiy must be valid as per avaliability....");
        }

    };

    const decrement = () => {
        count > 1 ? setCount(count - 1) : setCount(count);
    };
    useEffect(() => {
        getProduct();
        getSimilarProducts();
    }, [id]);
    return (
        <>
            <div className={styles.upper} style={{ marginTop: '80px'}}>
                <div className='information'>
                    {/* first row */}
                    <div className={styles.upperMainP}>
                        <div className={styles.buyNowCont} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <div style={{ background: '#e8fff5', height: '90vh', width: '50%', padding: '20px', display: 'flex' }} className={styles.col6}>
                                <div className={styles.left} style={{ height: '100%', width: '35%', display: 'flex', flexDirection: 'column' }}>
                                    <div className={styles.commonDiv} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#e2dfdf', flex: '1', margin: '5px', borderRadius: '10px' }}><img onClick={() => {
                                        setSelected(0);
                                    }} style={{ width: '140px', height: '100px' }} src={`https://e-commerse-backend-yeft.onrender.com/api/v1/products/get-particular-photo/0/${singleProduct._id}`}></img></div>
                                    <div className={styles.commonDiv} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#e2dfdf', flex: '1', margin: '5px', borderRadius: '10px' }}><img onClick={() => {
                                        setSelected(1);
                                    }} style={{ width: '140px', height: '100px', margin: 'auto' }} src={`https://e-commerse-backend-yeft.onrender.com/api/v1/products/get-particular-photo/1/${singleProduct._id}`}></img></div>
                                    <div className={styles.commonDiv} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#e2dfdf', flex: '1', margin: '5px', borderRadius: '10px' }}><img onClick={() => {
                                        setSelected(2);
                                    }} style={{ width: '140px', height: '100px' }} src={`https://e-commerse-backend-yeft.onrender.com/api/v1/products/get-particular-photo/2/${singleProduct._id}`}></img></div>
                                    <div className={styles.commonDiv} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#e2dfdf', flex: '1', margin: '5px', borderRadius: '10px' }}><img onClick={() => {
                                        setSelected(3);
                                    }} style={{ width: '140px', height: '100px' }} src={`https://e-commerse-backend-yeft.onrender.com/api/v1/products/get-particular-photo/3/${singleProduct._id}`}></img></div>
                                </div>
                                <div style={{ position: 'absolute' }}>x: {position.x} y:{position.y}</div>

                                <div className={styles.right} style={{ height: '90%', background: '#e2dfdf', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '20px' }}><div style={{}} className='right'><img onMouseLeave={handleMouseLeave} onMouseMove={mouseMove} style={{ borderRadius: '10px', width: '400px', height: '100%', margin: '20px' }} src={`https://e-commerse-backend-yeft.onrender.com/api/v1/products/get-particular-photo/${selected}/${singleProduct._id}`}></img></div></div>
                            </div>
                            <div style={{ backgroundColor: '#f7d7d7', width: '50%', padding: '20px', position: 'relative'}} className={styles.col5}>
                                <div style={isZoomed} className={styles.zoomed}>

                                </div>
                                <div className={styles.productInf} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                                    <div className={styles.headCont}>
                                        <h3>{singleProduct.name}</h3>
                                    </div>
                                    <div className={styles.reviews}>
                                        <span>
                                            ★★★★★ (15 reviews) | In Stock  {singleProduct?.category?.name}
                                        </span>
                                        <p className="card-text"><strong>Shipping: </strong>{singleProduct.shipping ? "avaliable" : "not avaliable"}</p>
                                    </div>

                                    <div className='price'>
                                        <h3>{singleProduct.price} Rs</h3>
                                    </div>
                                    <div>
                                        <p>{singleProduct.description}</p>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '90%' }}>
                                        <hr style={{ width: '100%', height: '3px', backgroundColor: '#000', border: 'none' }} />
                                    </div>

                                    <div className={styles.colorsPalete}>
                                        <span style={{ display: 'inline-block', border: '2px solid black', width: '20px', height: '20px', borderRadius: '50%', margin: '10px' }}></span>
                                        <span style={{ display: 'inline-block', border: '2px solid black', width: '20px', height: '20px', borderRadius: '50%', margin: '10px' }}></span>
                                        <span style={{ display: 'inline-block', border: '2px solid black', width: '20px', height: '20px', borderRadius: '50%', margin: '10px' }}></span>
                                        <span style={{ display: 'inline-block', border: '2px solid black', width: '20px', height: '20px', borderRadius: '50%', margin: '10px' }}></span>
                                    </div>
                                    <div className='size'>
                                        <span style={{ textAlign: 'center', display: 'inline-block', border: '2px solid black', width: '35px', height: '35px', borderRadius: '20%', margin: '10px' }}><strong>XS</strong></span>
                                        <span style={{ textAlign: 'center', display: 'inline-block', border: '2px solid black', width: '35px', height: '35px', borderRadius: '20%', margin: '10px' }}><strong>S</strong></span>
                                        <span style={{ textAlign: 'center', display: 'inline-block', border: '2px solid black', width: '35px', height: '35px', borderRadius: '20%', margin: '10px' }}><strong>M</strong></span>
                                        <span style={{ textAlign: 'center', display: 'inline-block', border: '2px solid black', width: '35px', height: '35px', borderRadius: '20%', margin: '10px' }}><strong>L</strong></span>
                                        <span style={{ textAlign: 'center', display: 'inline-block', border: '2px solid black', width: '35px', height: '35px', borderRadius: '20%', margin: '10px' }}><strong>XL</strong></span>
                                    </div>
                                    <div className={styles.quanity}>
                                        <div className={styles.countercontainer}>
                                            <h1 className={styles.countdisplay}>{count}</h1>
                                            <div>
                                                <button className={styles.button} onClick={() => { increment(singleProduct.quantity) }}>Increment</button>
                                                <button className={styles.button} onClick={decrement}>Decrement</button>
                                            </div>
                                        </div>
                                        <div className={styles.buttoncontainer}>
                                            <button onClick={(e) => {
                                                navigate(`/billing-details/${singleProduct._id}/${count}`);
                                            }} className={styles.btnbuynow}>Buy Now</button>

                                        </div>
                                    </div>
                                    <div className={styles.deliveryOpt}>
                                        <div>
                                            Free delivery
                                        </div>
                                        <div>
                                            <button type="button" className="btn btn-danger">
                                                Quantity <span className="badge text-bg-success">{singleProduct.quantity}</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>


                    </div>
                </div>
            </div>

            {/* //second row */}
            <div style={{ width: '100%', background: '#c1c1de', marginTop: '20px' }} className="containerRelated">
                {/* <div className="row">
                    <div ><h3>Related Items</h3></div>
                    <div className='products'>
                        <div className="">
                            {similarProduct.map((item) => {
                                return (
                                    <div className="row">
                                        {
                                            item.map((item) => {
                                                return (
                                                    <div class="col-sm" style={{margin:'0'}}>
                                                        <div className="card" style={{ width: '18rem', margin: 'mx-3' }}>
                                                            <img style={{ height: '250px' }} src={`https://e-commerse-backend-yeft.onrender.com/api/v1/products/get-photo/${item._id}`} className="card-img-top" alt="..." />
                                                            <div className="card-body">
                                                                <h5 className="card-title">{item.name}</h5>
                                                                <p className="card-text">{item.description}</p>
                                                                <a onClick={() => {
                                                                    navigate(`/product-Details/${item._id}`)
                                                                }} className="btn btn-primary mx-3">Buy Now</a>
                                                                <a href="#" className="btn btn-primary">Add to cart</a>
                                                            </div>
                                                        </div>
                                                    </div>

                                                )
                                            })
                                        }
                                    </div>
                                )

                            })}

                        </div>
                    </div>
                </div> */}
                <div ><h3>Related Items</h3></div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
                    {similarProduct.map((item) => {
                        return (
                            <>
                                <div className="card" style={{ width: '18rem', margin: '20px' }}>
                                    <img style={{ height: '250px' }} src={`https://e-commerse-backend-yeft.onrender.com/api/v1/products/get-particular-photo/0/${item._id}`} className="card-img-top" alt="..." />
                                    <div className="card-body">
                                        <h5 className="card-title">{item.name.substring(0,25)}</h5>
                                        <p className="card-text">{item.description.substring(0,40)}</p>
                                        <a onClick={() => {
                                            navigate(`/product-Details/${item._id}`)
                                        }} className="btn btn-danger mx-3">Buy Now</a>
                                        <a href="#" className="btn btn-success">Add to cart</a>
                                    </div>
                                </div>
                            </>
                        )
                    })}
                </div>

            </div>
            <div>
                <Footer />
            </div>

        </>

    )
}

export default ProductDetails