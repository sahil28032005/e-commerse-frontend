import React, { useEffect, useState } from 'react'
import { useParams,useNavigate} from 'react-router-dom';

import styles from './styles/productDetails.module.css';
import axios from 'axios';
const AllReviewsListing = () => {
    const { id } = useParams();
    const [reviewData, setReviewsData] = useState({});
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
    useEffect(() => {
        fetchAllData();
    }, []);
    return (
        <>
            {console.log(id)}
            <div style={{ marginTop: '80px' }}>
                {reviewData?.data?.textReiews.map((item, index) => {
                    return (
                        <div className={styles.reviewCard}>
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
        </>
    )
}

export default AllReviewsListing