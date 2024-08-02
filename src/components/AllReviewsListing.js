import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import './styles/allreviews.css';
import styles from './styles/productDetails.module.css';
import axios from 'axios';
import Footer from './Footer';
const AllReviewsListing = () => {
    const { id } = useParams();
    const [reviewData, setReviewsData] = useState({});
    const [singleProduct, setSingleProduct] = useState({});
    const fetchAllData = async () => {
        try {
            const url = `https://e-commerse-backend-yeft.onrender.com/api/v1/reviews/reviews-informations/${id}`;
            const data = await axios.get(url);
            if (data) {
                console.log(data.data.textReiews);
                setReviewsData(data);
            }
        }
        catch (err) {
            console.log(err.message);
        }
    }
    //getting single product details
    const getProduct = async () => {
        try {
            const url = `https://e-commerse-backend-yeft.onrender.com/api/v1/products/get/${id}`;
            const response = await axios.get(url);
            if (response.data.success) {
                console.log("data arrived on productdetails");
                setSingleProduct(response.data.data);
                // setCatId(response.data.data.category?._id);
            }
            else {
                console.log("error for arriving data on productdetails");
            }
        }
        catch (error) {
            console.log(error.message);
        }
    }
    useEffect(() => {
        fetchAllData();
        getProduct();
    }, []);
    return (
        <>
            {console.log(id)}
            <div style={{ marginTop: '80px' }}>
                <div style={{ background: '#dbdbff' }} className="headerInf">
                    <div className="unique-container">
                        <section className="unique-product-info">
                            <h1>{singleProduct?.name}</h1>
                            <img src={singleProduct?.photos?.[0]} alt="Sample Product" className="unique-product-image" />
                        </section>

                        <section className="unique-filters">
                            <h2>Filter Reviews by categories</h2>
                            <select>
                                <option value="">All Batteries</option>
                                <option value="2000mAh">2000mAh</option>
                                <option value="3000mAh">3000mAh</option>
                                <option value="4000mAh">4000mAh</option>
                            </select>

                            <h2>Sort Reviews By</h2>
                            <select>
                                <option value="rating">Rating</option>
                                <option value="date">Date</option>
                            </select>
                        </section>
                    </div>
                </div>
                <div style={{background:'#bee9be'}} className="listingCont">
                    {reviewData?.data?.textReiews.map((item, index) => {
                        return (
                            <div style={{ width: '75%', margin: '20px auto', background: 'beige',borderRadius:'6rem' }} className={styles.reviewCard}>
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

export default AllReviewsListing