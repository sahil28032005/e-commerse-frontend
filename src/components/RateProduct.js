import React, { useState, useEffect } from 'react'
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
    const [singleProduct, setSingleProduct] = useState({});
    const [selectedCategory, setSelectedCategory] = useState('');

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
            formData.append("subCategory", singleProduct?.subCategory?._id);
            formData.append("subTypeChild", selectedCategory);


            //send request for review adder api
            const uri = "https://e-commerse-backend-yeft.onrender.com/api/v1/reviews/create-review";
            const response = await axios.post(uri, formData);
        }
        catch (err) {
            console.log(err.message);
        }
    }
    //retrive product information for knowing subCateegory types for that product so they will appended to particular products individually
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

    //for file handeling

    function handleChange(event) {
        setFile(event.target.files[0])
    }
    const onCategoryChange = (value) => {
        setSelectedCategory(value);
        // Handle the category change logic here
    };

    //userEffects
    useEffect(() => {
        getProduct();
    }, []);
    return (
        <>
            {/* {console.log("singlepd:", singleProduct)}
            {console.log("selected:", selectedCategory)}
            {console.log("subcatid:", singleProduct?.subCategory?._id)} */}
            <div style={{ marginTop: '80px', padding: '30px', background: '#fffdf4' }}>
                <h1>Product Feedback</h1>
                <form onSubmit={handleSubmit} className="feedback-form">
                    {/* <label htmlFor="title">Title:</label> */}
                    {/* <input type="text" value={title} id="title" name="title" onChange={(e) => { setTitle(e.target.value) }} required /> */}
                    <label htmlFor="description">Review Category:</label>
                    <select
                        id="category-select"
                        value={selectedCategory}
                        onChange={e => onCategoryChange(e.target.value)}
                        className="category-select"
                    >
                        {singleProduct?.subCategory?.reviewsCategory?.map((category, index) => (
                            <option key={index} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
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