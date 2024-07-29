import React, { useState } from 'react'
import './styles/rateProduct.css';
import Footer from './Footer';
const RateProduct = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [rating, setRating] = useState(0);

    //form submission
    const handleSubmit = (event) => {
        try {
            event.preventDefault();
            alert("data arriven for submmission!");
        }
        catch (err) {
            console.log(err.message);
        }
    }
    return (
        <>
            {console.log(rating)}
            <div style={{ marginTop: '80px', padding: '30px' }}>
                <h1>Product Feedback</h1>
                <form onSubmit={handleSubmit} className="feedback-form">
                    <label htmlFor="title">Title:</label>
                    <input type="text" value={title} id="title" name="title" onChange={(e) => { setTitle(e.target.value) }} required />

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
                    <input type="file" id="photo" name="photo" accept="image/*" />

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