import React, { useState } from 'react'
import './styles/rateProduct.css';
import { useParams } from 'react-router-dom';
import Footer from './Footer';
import { useAuthProvider } from '../context/auth';
import axios from 'axios';
const RateProduct = () => {
    const [user, setUser] = useAuthProvider();
    // const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [rating, setRating] = useState(0);
    const [file, setFile] = useState();
    const { id } = useParams();
    //form submission
    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            alert("data arriven for submmission!");
            const formData = new FormData();
            formData.append("userId", user?.user?._id);
            formData.append("pId", id);
            formData.append("review", description);
            formData.append("rating", rating);
            formData.append("imageFromCust", file);

            //send request for review adder api
            const uri = "https://e-commerse-backend-yeft.onrender.com/api/v1/reviews/create-review";
            const response = await axios.post(uri, formData);
        }
        catch (err) {
            console.log(err.message);
        }
    }

    //for file handeling

    function handleChange(event) {
        setFile(event.target.files[0])
    }
    return (
        <>
            {console.log("filedata:", file)}
            <div style={{ marginTop: '80px', padding: '30px',background:'#fffdf4' }}>
                <h1>Product Feedback</h1>
                <form onSubmit={handleSubmit} className="feedback-form">
                    {/* <label htmlFor="title">Title:</label> */}
                    {/* <input type="text" value={title} id="title" name="title" onChange={(e) => { setTitle(e.target.value) }} required /> */}

                    <label htmlFor="description">Description:</label>
                    <textarea value={description} onChange={(e) => { setDescription(e.target.value) }} id="description" name="description" rows="4" required></textarea>

                    <label htmlFor="rating">Rating:</label>
                    <div className="rating">
                        <input type="radio" id="star5" name="rating" value="5" onChange={(e) => { setRating(e.target.value) }} />
                        <label htmlFor="star5">☆</label>
                        <input type="radio" id="star4" name="rating" value="4" onChange={(e) => { setRating(e.target.value) }} />
                        <label htmlFor="star4">☆</label>
                        <input type="radio" id="star3" name="rating" value="3" onChange={(e) => { setRating(e.target.value) }} />
                        <label htmlFor="star3">☆</label>
                        <input type="radio" id="star2" name="rating" value="2" onChange={(e) => { setRating(e.target.value) }} />
                        <label htmlFor="star2">☆</label>
                        <input type="radio" id="star1" name="rating" value="1" onChange={(e) => { setRating(e.target.value) }} />
                        <label htmlFor="star1">☆</label>
                    </div>

                    <label htmlFor="photo">Upload a Photo:</label>
                    <input type="file" onChange={handleChange} id="photo" name="imageFromCust" accept="image/*" />

                    <button type="submit">Submit Feedback</button>
                </form>
            </div>
            <div>
                <Footer />
            </div>
        </>

    )
}

export default RateProduct