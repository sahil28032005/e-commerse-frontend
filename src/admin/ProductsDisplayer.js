import React, { useEffect, useState } from 'react';


import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const ProductsDisplayer = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [chunkedProducts, setChunkedProducts] = useState([]);
    const getProducts = async (req, res) => {
        try {
            const url = "http://localhost:3000/api/v1/products/get-all";
            const response = await axios.get(url);
            if (response.data.success) {
                setProducts(response.data.data);
                setChunkedProducts(chunkArray(response.data.data, 3));
            }
            else {
                console.log("not found data");
            }
        }
        catch (error) {
            console.log(error.message);
        }
    }

    const chunkArray = (arr, size) => {
        const chunkedArr = [];
        for (let i = 0; i < arr.length; i += size) {
            chunkedArr.push(arr.slice(i, i + size));
        }
        return chunkedArr;
    }

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <>
            {console.log("all", products)}
            {console.log("chunked", chunkedProducts)}
            <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', left: '20%', margin: 'auto', width: '80%' }}>
                    <div className='header'>
                        <h3 style={{ textAlign: 'center' }}>All Products</h3>
                    </div>
                    <div className='body'>
                        <div className="container">
                            {chunkedProducts.map((row) => {
                                return (
                                    <div className="row">
                                        {
                                            row.map((item) => {
                                                return (
                                                    <div className="card" style={{ width: '18rem', margin: '20px' }}>
                                                        <img src={`http://localhost:3000/api/v1/products/get-photo/${item._id}`} style={{ height: '150px' }} className="card-img-top" alt="..." />
                                                        <div className="card-body">
                                                            <h5 className="card-title">{item.name}</h5>
                                                            <p className="card-text">{item.description}</p>
                                                            <h5 className="card-title">{item.price} Rs</h5>
                                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                                <button style={{ flex: 'none', height: 'auto', lineHeight: 'normal' }} onClick={() => { navigate(`/update/${item._id}`) }} href="#" className="btn btn-primary mx-4">Update</button>
                                                                <button onClick={(e) => { axios.delete(`http://localhost:3000/api/v1/products/delete/${item._id}`) }} style={{ flex: 'none', height: 'auto', lineHeight: 'normal' }} href="#" className="btn btn-danger">Delete</button>
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
                </div>
            </div>

        </>
    )
}

export default ProductsDisplayer