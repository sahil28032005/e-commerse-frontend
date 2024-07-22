import React, { useEffect, useState, Component } from 'react'
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
            backgroundImage: `url(${singleProduct?.photos?.[selected]})`,
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
            <div className={styles.upper} style={{ marginTop: '80px' }}>
                <div className='information'>
                    {/* first row */}
                    <div className={styles.upperMainP}>
                        <div className={styles.buyNowCont} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <div style={{ background: '#e8fff5', height: '90vh', width: '50%', padding: '20px', display: 'flex' }} className={styles.col6}>
                                <div className={styles.left} style={{ height: '100%', width: '35%', display: 'flex', flexDirection: 'column' }}>
                                    <div className={styles.commonDiv} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#e2dfdf', flex: '1', margin: '5px', borderRadius: '10px' }}><img onMouseOver={() => {
                                        setSelected(0);
                                    }} style={{ width: '140px', height: '100px' }} src={singleProduct?.photos?.[0]}></img></div>
                                    <div className={styles.commonDiv} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#e2dfdf', flex: '1', margin: '5px', borderRadius: '10px' }}><img onMouseOver={() => {
                                        setSelected(1);
                                    }} style={{ width: '140px', height: '100px', margin: 'auto' }} src={singleProduct?.photos?.[1]}></img></div>
                                    <div className={styles.commonDiv} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#e2dfdf', flex: '1', margin: '5px', borderRadius: '10px' }}><img onMouseOver={() => {
                                        setSelected(2);
                                    }} style={{ width: '140px', height: '100px' }} src={singleProduct?.photos?.[2]}></img></div>
                                    <div className={styles.commonDiv} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#e2dfdf', flex: '1', margin: '5px', borderRadius: '10px' }}><img onMouseOver={() => {
                                        setSelected(3);
                                    }} style={{ width: '140px', height: '100px' }} src={singleProduct?.photos?.[3]}></img></div>
                                    <div className={styles.commonDiv} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#e2dfdf', flex: '1', margin: '5px', borderRadius: '10px' }}>
                                        <iframe
                                            width="200px"
                                            height="100%"
                                            src={singleProduct?.photos?.[4]}
                                            allowFullScreen
                                            title="Embedded Content"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"

                                        ></iframe>
                                    </div>
                                </div>
                                {/* <div style={{ position: 'absolute' }}>x: {position.x} y:{position.y}</div> */}

                                <div className={styles.right} style={{ height: '90%', background: '#e2dfdf', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '20px' }}><div style={{}} className='right'><img onMouseLeave={handleMouseLeave} onMouseMove={mouseMove} style={{ borderRadius: '10px', width: '400px', height: '100%', margin: '20px' }} src={singleProduct?.photos?.[selected]}></img></div></div>
                            </div>
                            <div style={{ backgroundColor: '#f7d7d7', width: '50%', padding: '20px', position: 'relative' }} className={styles.col5}>
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


            {/* //second row displays related items*/}
            <div style={{ width: '100%', background: '#c1c1de', marginTop: '20px' }} className="containerRelated">
                <div ><h3>Related Items</h3></div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
                    {similarProduct.map((item) => {
                        return (
                            <>
                                <div className="card" style={{ width: '18rem', margin: '20px' }}>
                                    <img style={{ height: '250px' }} src={item?.photos?.[0]} className="card-img-top" alt="..." />
                                    <div className="card-body">
                                        <h5 className="card-title">{item.name.substring(0, 25)}</h5>
                                        <p className="card-text">{item.description.substring(0, 40)}</p>
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
            {/* reviews section */}
            <div className={styles.reviewSection}>
                <h2>Ratings And Reviews</h2>
                <div className={styles.raingsCount}>
                    <div className={styles.ratingListCont}>
                        <div className={styles.totalAvg}>
                            <div style={{ fontSize: '3rem' }}>4.3 <span style={{ fontSize: '50px' }}>&#9733;</span></div>
                            <span style={{ fontSize: '1.2rem' }}>12,345 Ratings and 12,345 reviews</span>
                        </div >
                        <div className={styles.listedRating}>
                            <li style={{ listStyle: 'none' }} className={styles.progressCont}>
                                <div style={{ margin: '10px' }}>5</div>
                                <div className="w3-light-grey" style={{ width: '70%', margin: '10px', borderRadius: '10px' }}>
                                    <div className="w3-container w3-green w3-center" style={{ width: '25%', borderRadius: '10px' }}>25%</div>
                                </div> 12343
                            </li>
                            <li style={{ listStyle: 'none' }} className={styles.progressCont}>
                                <div style={{ margin: '10px' }}>4</div>
                                <div className="w3-light-grey" style={{ width: '70%', margin: '10px', borderRadius: '10px' }}>
                                    <div className="w3-container w3-red w3-center" style={{ width: '50%', borderRadius: '10px' }}>25%</div>
                                </div> 12343
                            </li>
                            <li style={{ listStyle: 'none' }} className={styles.progressCont}>
                                <div style={{ margin: '10px' }}>3</div>
                                <div className="w3-light-grey" style={{ width: '70%', margin: '10px', borderRadius: '10px' }}>
                                    <div className="w3-container w3-blue w3-center" style={{ width: '75%', borderRadius: '10px' }}>25%</div>
                                </div> 12343
                            </li>
                            <li style={{ listStyle: 'none' }} className={styles.progressCont}>
                                <div style={{ margin: '10px' }}>2</div>
                                <div className="w3-light-grey" style={{ width: '70%', margin: '10px', borderRadius: '10px' }}>
                                    <div className="w3-container w3-green w3-center" style={{ width: '15%', borderRadius: '10px' }}>25%</div>
                                </div> 12343
                            </li>
                            <li style={{ listStyle: 'none' }} className={styles.progressCont}>
                                <div style={{ margin: '10px' }}>1</div>
                                <div className="w3-light-grey" style={{ width: '70%', margin: '10px', borderRadius: '10px' }}>
                                    <div className="w3-container w3-green w3-center" style={{ width: '25%', borderRadius: '10px' }}>25%</div>
                                </div> 12343
                            </li>
                        </div>
                    </div>
                    <div className={styles.featureAnalytics}>
                        <div className={styles.commonAnalytics} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <div className={styles.progress1}>
                                <div class={styles.uivalues}>85%</div>
                                <div class={styles.uilabels}>Camera</div>
                            </div>
                        </div>
                        <div className={styles.commonAnalytics} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <div className={styles.progress1}>
                                <div class={styles.uivalues}>85%</div>
                                <div class={styles.uilabels}>Gaming</div>
                            </div>
                        </div>
                        <div className={styles.commonAnalytics} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <div className={styles.progress1}>
                                <div class={styles.uivalues}>85%</div>
                                <div class={styles.uilabels}>Processor</div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="secondRev">
                    <div className={`${styles.customerImages} ${styles.userSidePhotos}`}>

                        <div className={styles.commonAnalytics}></div>
                        <div className={styles.commonAnalytics}></div>
                        <div className={styles.commonAnalytics}> </div>
                        <div className={styles.commonAnalytics}></div>
                        <div className={styles.commonAnalytics}></div>
                        <div className={styles.commonAnalytics}></div>
                        <div className={styles.commonAnalytics}></div>
                    </div>
                    <div className={styles.actualReviewListing}>
                        <div className={styles.reviewListElement}>
                            <h3>Superb Camera!</h3>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam alias nisi quibusdam tenetur minus expedita esse. Totam aspernatur nulla vel.</p>
                            <h3>John Smith certified buyer 4 days ago</h3>
                        </div>
                        <div className={styles.reviewListElement}>
                            <h3>Superb Camera!</h3>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam alias nisi quibusdam tenetur minus expedita esse. Totam aspernatur nulla vel.</p>
                            <h3>John Smith certified buyer 4 days ago</h3>
                        </div>
                        <div className={styles.reviewListElement}>
                            <h3>Superb Camera!</h3>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam alias nisi quibusdam tenetur minus expedita esse. Totam aspernatur nulla vel.</p>
                            <h3>John Smith certified buyer 4 days ago</h3>
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

export default ProductDetails