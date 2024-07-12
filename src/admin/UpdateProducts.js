import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Products } from './Products';

const UpdateProduct = () => {
    const params = useParams();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [quantity, setQuantity] = useState('');
    const [isShipped, setIsShipped] = useState(false);
    const [photo, setPhoto] = useState('');
    const [categories, setCategories] = useState([]);
    const [singleProduct, setSingleProduct] = useState({});
    const[ctName,setCtname] = useState('');
    const id = params.id;
    const getCategories = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/v1/category/get');
            if (response.data.success) {
                setCategories(response.data.data);
            }
            else {
                console.log("something went wrong for gettig data");
            }
        }
        catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        if (singleProduct) {
            setName(singleProduct.name || '');
            setDescription(singleProduct.description || '');
            setPrice(singleProduct.price || '');
            setQuantity(singleProduct.quantity || '');
            setIsShipped(singleProduct.shipping || false);
            setPhoto(singleProduct.photo || '');
            setCategory(singleProduct.category?._id || ''); 
            setCtname(singleProduct.category?.name || '');
        }
    }, [singleProduct]);
    const getSingleProduct = async (req, res) => {
        try {
            
            const url = `http://localhost:3000/api/v1/products/get/${id}`;
            const response = await axios.get(url);
            if (response.data.success) {
                setSingleProduct(response.data.data);
                setName(singleProduct.name);
                // setCategory(singleProduct.category.name);
                console.log("successfully get single product");
            }
            else {
                console.log("problem for getch single product");
            }

        }
        catch (error) {
            console.log(error);
        }
    }
    const handleUpdate = async (event) => {
        event.preventDefault();
        console.log("data arrived");
        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("category", category);
        formData.append("price", price);
        formData.append("quantity", quantity);
        formData.append("shipping", isShipped);
        if (photo) {
            formData.append('filedata', photo);
        }
        try {

            const url = await (`http://localhost:3000/api/v1/products/update-product/${params.id}`);
            const response = await axios.put(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.data.success) {
                console.log('Product added successfully');
            } else {
                console.log('Failed to add product');
            }
        }
        catch (error) {
            console.log(error.message);
        }
    }
    useEffect(() => {
        getCategories();
        getSingleProduct();
    }, []);
    return (
        <>
            {console.log("single product", singleProduct)}
            {console.log("id param", params.id)}
            <form onSubmit={handleUpdate} style={{ margin: '20px auto', position: 'relative' }}>

                <div style={{ position: 'absolute', margin: '20px auto', top: '0', left: '300px', width: '60%', margin: '30px' }}>
                    <div className="mb-3">
                        <label for="exampleInputEmail1" className="form-label">Product Name</label>
                        <input value={name} onChange={(e) => { setName(e.target.value) }} type="textArea" className="form-control" id="exampleInputPassword1" />
                    </div>
                    <div className="mb-3">
                        <label for="exampleInputEmail1" className="form-label">Select category</label>
                        <select onChange={(e) => { setCategory(e.target.value) }}>
                            {categories && categories.length > 0 && categories.map((c) => (
                                <option key={c._id} value={c._id}>
                                    {c.name}
                                </option>
                            ))}
                        </select>



                    </div>
                    {console.log("cid", category)}
                    <div className="mb-3">
                        <label for="exampleInputPassword1" className="form-label">Description Of Product</label>
                        <textarea value={description} onChange={(e) => { setDescription(e.target.value) }} type="textArea" className="form-control" id="exampleInputPassword1" />
                    </div>
                    <div className="mb-3">
                        <label for="exampleInputPassword1" className="form-label">Price Of Product</label>
                        <input value={price} onChange={(e) => { setPrice(e.target.value) }} type="text" className="form-control" id="exampleInputPassword1" />
                    </div>
                    
                    <div className="mb-3">
                        <label for="exampleInputPassword1" className="form-label">Quantity Of Product</label>
                        <input value={quantity} onChange={(e) => { setQuantity(e.target.value) }} type="text" className="form-control" id="exampleInputPassword1" />
                    </div>
                    <div className="mb-3">
                        <label for="exampleInputPassword1" className="form-label">Upload Image Of Product</label>
                        <input type="file" onChange={(e) => { setPhoto(e.target.files[0]) }} className="form-control" id="exampleInputPassword1" />
                    </div>
                    <div className="mb-3">
                        <img style={{height:'200px'}}  src={`http://localhost:3000/api/v1/products/get-photo/${id}`}></img>
                    </div>
                    <div className="mb-3 form-check">
                        <input checked={isShipped} onChange={(event) => { setIsShipped(!isShipped) }} type="checkbox" className="form-check-input" id="exampleCheck1" />
                        <label className="form-check-label" for="exampleCheck1">Avaliable For Shipping </label>
                    </div>
                    {console.log("isshipped",singleProduct.shipping)}
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
        </>
    )
}

export default UpdateProduct