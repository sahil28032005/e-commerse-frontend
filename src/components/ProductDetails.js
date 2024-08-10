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
    const [reviewDetails, setReviewDetails] = useState([]);
    const [catId, setCatId] = useState('');
    const [totalRatings, setTotalRatings] = useState(0);
    const [isZoomed, setIszoomed] = useState({ display: 'none' });
    const [position, setPosition] = useState({
        x: 0, y: 0
    });
    //state for zooming customer images
    const [selectedImageIndex, setSelectedImageIndex] = useState(null);
    //states for grid container whcih shows all customer images as group
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalImages, setModalImages] = useState([]);

    //function handles viewMore oberlay defined using css
    const handleViewMoreClick = () => {
        setModalImages(reviewDetails.textReiews.map(item => item.photoUrl));
        setIsModalOpen(true);
    };

    //for closing moal

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
    //functiom for fetch product review information from api
    const getReviewDetails = async (req, res) => {
        try {
            const url = `https://e-commerse-backend-yeft.onrender.com/api/v1/reviews/reviews-informations/${id}`;
            const response = await axios.get(url);
            if (reviewDetails) {
                console.log("success", reviewDetails);
                await setReviewDetails(response.data);
                // console.log("mmmm",response?.data?.individualRatings?.threeStar);
                const { oneStar = 0, twoStar = 0, threeStar = 0, fourStar = 0, fiveStar = 0 } = response?.data?.individualRatings;
                const total = oneStar + twoStar + threeStar + fourStar + fiveStar;
                setTotalRatings(total);

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
    //methid ti handke zoomed u=images selection
    const handleImageClick = (index) => {
        setSelectedImageIndex(index);
    }
    //for closing
    const handleImageClose = (index) => {
        setSelectedImageIndex(null);
        setIsModalOpen(false);
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
        getReviewDetails();
    }, [id]);
    return (
        <>
            {console.log("rsset", reviewDetails)}
            <div className={styles.upper} style={{ marginTop: '80px' }}>
                <div className='information'>
                    {/* first row */}
                    <h3>{singleProduct?.category?.name}</h3>
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
                            <div style={{ fontSize: '3rem' }}>{reviewDetails?.averageRating?.toFixed(1) || 0} <span style={{ fontSize: '50px' }}>&#9733;</span></div>
                            <span style={{ fontSize: '1.2rem' }}>12,345 Ratings and {reviewDetails?.totalReviews > 1 ? reviewDetails?.totalReviews : 0} reviews</span>
                        </div >
                        <div className={styles.listedRating}>
                            <li style={{ listStyle: 'none' }} className={styles.progressCont}>
                                <div style={{ margin: '10px' }}>5</div>
                                <div className="w3-light-grey" style={{ width: '70%', margin: '10px', borderRadius: '10px' }}>
                                    <div className="w3-container w3-green w3-center" style={{ width: `${reviewDetails?.individualRatings?.fiveStar / totalRatings * 100}%`, borderRadius: '10px' }}>{(reviewDetails?.individualRatings?.fiveStar / totalRatings * 100).toFixed(2)}%</div>
                                </div> {reviewDetails?.individualRatings?.fiveStar}
                            </li>
                            <li style={{ listStyle: 'none' }} className={styles.progressCont}>
                                <div style={{ margin: '10px' }}>4</div>
                                <div className="w3-light-grey" style={{ width: '70%', margin: '10px', borderRadius: '10px' }}>
                                    <div className="w3-container w3-red w3-center" style={{ width: `${reviewDetails?.individualRatings?.fourStar / totalRatings * 100}%`, borderRadius: '10px' }}>{(reviewDetails?.individualRatings?.fourStar / totalRatings * 100).toFixed(2)}%</div>
                                </div> {reviewDetails?.individualRatings?.fourStar}
                            </li>
                            <li style={{ listStyle: 'none' }} className={styles.progressCont}>
                                <div style={{ margin: '10px' }}>3</div>
                                <div className="w3-light-grey" style={{ width: '70%', margin: '10px', borderRadius: '10px' }}>
                                    <div className="w3-container w3-blue w3-center" style={{ width: `${reviewDetails?.individualRatings?.threeStar / totalRatings * 100}%`, borderRadius: '10px' }}>{(reviewDetails?.individualRatings?.threeStar / totalRatings * 100).toFixed(2)}%</div>
                                </div> {reviewDetails?.individualRatings?.threeStar}
                            </li>
                            <li style={{ listStyle: 'none' }} className={styles.progressCont}>
                                <div style={{ margin: '10px' }}>2</div>
                                <div className="w3-light-grey" style={{ width: '70%', margin: '10px', borderRadius: '10px' }}>
                                    <div className="w3-container w3-green w3-center" style={{ width: `${reviewDetails?.individualRatings?.twoStar / totalRatings * 100}%`, borderRadius: '10px' }}>{(reviewDetails?.individualRatings?.twoStar / totalRatings * 100).toFixed(2)}%</div>
                                </div> {reviewDetails?.individualRatings?.twoStar}
                            </li>
                            <li style={{ listStyle: 'none' }} className={styles.progressCont}>
                                <div style={{ margin: '10px' }}>1</div>
                                <div className="w3-light-grey" style={{ width: '70%', margin: '10px', borderRadius: '10px' }}>
                                    <div className="w3-container w3-green w3-center" style={{ width: `${reviewDetails?.individualRatings?.oneStar / totalRatings * 100}%`, borderRadius: '10px' }}>{(reviewDetails?.individualRatings?.oneStar / totalRatings * 100).toFixed(2)}%</div>
                                </div> {reviewDetails?.individualRatings?.oneStar}
                            </li>
                        </div>
                    </div>
                    <div className={styles.featureAnalytics}>
                        {singleProduct?.subCategory?.reviewsCategory.map((item, index) => {
                            return (
                                <div className={styles.commonAnalytics} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <div className={styles.progress1}>
                                        <div className={styles.uivalues}>{reviewDetails?.percentGrp?.[index]?.toFixed(2) ?? 0}%</div>
                                        <div className={styles.uilabels}>{item}</div>
                                    </div>
                                </div>
                            )
                        })}


                    </div>
                </div>

                <div className="secondRev">
                    <div style={{ position: 'relative', overflowX: 'auto' }} className={`${styles.customerImages} ${styles.userSidePhotos}`}>
                        {reviewDetails.textReiews?.slice(0, 7).map((item, index) => (
                            <div key={index} style={{ display: 'inline-block', position: 'relative' }}>
                                {item?.photoUrl && <img onClick={() => handleImageClick(index)} src={item.photoUrl} className={`${styles.commonAnalytics} ${selectedImageIndex === index ? styles.enlargedImage : ''}`} alt="" />}
                                {index === 6 && reviewDetails.textReiews.length > 7 && (
                                    <div  onClick={handleViewMoreClick} className={styles.overlayImgCust}>
                                        <span>View More</span>
                                        <span className={styles.remainingCount}>+{reviewDetails.textReiews.length - 7}</span>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* //view more modal which shows all customer images */}
                    {isModalOpen && (
                        <div className={styles.modal} onClick={handleImageClose}>
                            <div className={styles.gridContainer}>
                                {modalImages.map((image, index) => (
                                    <img key={index} src={image}  className={styles.gridImage} alt="" />
                                ))}
                            </div>
                        </div>
                    )}
                    {console.log("selected images", selectedImageIndex)}
                    {/* //zoomed container acting as modal */}
                    {selectedImageIndex !== null && (
                        <div className={styles.modal} onClick={handleImageClose}>
                            <img
                                src={reviewDetails.textReiews[selectedImageIndex].photoUrl}
                                className={styles.modalImage}
                                alt=""
                            />
                        </div>
                    )}


                    <div className={styles.actualReviewListing}>
                        <div style={{ position: 'relative', width: '100%', height: '100px' }}> {/* Adjust width and height as needed */}
                            <button
                                style={{
                                    backgroundColor: '#007bff',
                                    color: 'white',
                                    border: 'none',
                                    padding: '10px 20px',
                                    fontSize: '16px',
                                    cursor: 'pointer',
                                    borderRadius: '5px',
                                    position: 'absolute',
                                    right: '10px', // Adjust the right offset as needed
                                    bottom: '10px' // Adjust the bottom offset as needed
                                }}
                                onClick={() => { navigate(`/rate-product/${id}`) }}
                            >
                                Rate This Product
                            </button>
                        </div>

                        {reviewDetails.textReiews?.slice(0, 4).map((item, index) => (
                            <div style={{ width: '90%', margin: '20px auto', background: 'beige', borderRadius: '6rem' }} className={styles.reviewCard}>
                                <div className={styles.reviewHeader}>
                                    <img src={item?.photoUrl} alt="User Avatar" className={styles.userAvatar} />
                                    <div className={styles.userInfo}>
                                        <span className={styles.username}>{item?.user?.name}</span>
                                        <span className={styles.reviewDate}>July 29, 2024</span>
                                    </div>
                                    <div className={styles.rating}>
                                        <span className={styles.stars}>★</span>
                                        <span className={styles.ratingNumber}>{item.starRating}</span>
                                    </div>
                                </div>
                                <div className={styles.reviewBody}>
                                    <p>{item.reviewText}</p>
                                </div>
                                <div className={styles.reviewFooter}>
                                    <button className={styles.btn + ' ' + styles.helpful}>Helpful</button>
                                    <button className={styles.btn + ' ' + styles.reply}>Reply</button>
                                    <button className={styles.btn + ' ' + styles.report}>Report</button>
                                </div>
                            </div>


                        ))}
                    </div>
                    <div style={{ position: 'relative', width: '100%', height: '100px' }}> {/* Adjust width and height as needed */}
                        <button
                            style={{
                                backgroundColor: '#007bff',
                                color: 'white',
                                border: 'none',
                                padding: '10px 20px',
                                fontSize: '16px',
                                cursor: 'pointer',
                                borderRadius: '5px',
                                position: 'absolute',
                                right: '10px', // Adjust the right offset as needed
                                bottom: '10px' // Adjust the bottom offset as needed
                            }}
                            onClick={() => { navigate(`/get-alll-reviews/${id}`) }}
                        >
                            See All Reviews...
                        </button>
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