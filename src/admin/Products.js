import { React, useState, useEffect } from 'react';
import axios from 'axios';
export const Products = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [quantity, setQuantity] = useState('');
    const [isShipped, setIsShipped] = useState(false);
    const [photo, setPhoto] = useState('');
    const [categories, setCategories] = useState([]);


    const fetchCategories = async (req, res) => {
        try {
            const response = await axios.get('http://localhost:3000/api/v1/category/get');
            if (response.data.success) {
                console.log("data arrived successfully");
                setCategories(response.data);

                console.log("categories:", categories);
            }
            else {
                console.log("something wring occurred");
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    useEffect(() => {
        fetchCategories();
    }, []);
    const handleAdd = async (event) => {
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

            const url = await (`http://localhost:3000/api/v1/products/create-product`);
            const response = await axios.post(url, formData, {
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

    return (
        <>
            <form onSubmit={handleAdd} style={{ margin: '20px auto', position: 'relative' }}>

                <div style={{ position: 'absolute', margin: '20px auto', top: '0', left: '300px', width: '60%', margin: '30px' }}>
                    <div className="mb-3">
                        <label for="exampleInputEmail1" className="form-label">Product Name</label>
                        <input value={name} onChange={(e) => { setName(e.target.value) }} type="textArea" className="form-control" id="exampleInputPassword1" />
                    </div>
                    <div className="mb-3">
                        <label for="exampleInputEmail1" className="form-label">Select category</label>
                        <select onChange={(e) => { setCategory(e.target.value) }}>
                            {categories.data && categories.data.length > 0 && categories.data.map((c) => (
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
                    <div className="mb-3 form-check">
                        <input checked={isShipped} onChange={(event) => { setIsShipped(!isShipped) }} type="checkbox" className="form-check-input" id="exampleCheck1" />
                        <label className="form-check-label" for="exampleCheck1">Avaliable For Shipping </label>
                    </div>
                    {console.log(isShipped)}
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
        </>
    )
}
