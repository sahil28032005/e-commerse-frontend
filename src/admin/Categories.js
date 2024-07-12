import { React, useRef } from 'react'
import { useState, useEffect } from "react";
import axios from 'axios';
import { Form } from '../components/Form';
import { useAuthProvider } from '../context/auth';
export const Categories = () => {
    const modalRef = useRef(null);
    const inputRef = useRef(null);
    const [data, setData] = useState(null);
    const [category, setCategory] = useState('');
    const [updatedCategory, setUpdatedCategory] = useState('');
    const [selection, setSelections] = useState('');
    const [user] = useAuthProvider();
    useEffect(() => {
        const modalElement = modalRef.current;

        modalElement.addEventListener('shown.bs.modal', () => {
            inputRef.current.focus();
        });

        return () => {
            modalElement.removeEventListener('shown.bs.modal', () => {
                inputRef.current.focus();
            });
        };
    }, []);
    const handleDelete = async (id) => {
        try {
            const url = `http://localhost:3000/api/v1/category/delete/${id}`;
            const requestBody = {
                userId: user.user._id
            };
            const response = await axios.delete(url, requestBody, {
                headers: {
                    authorization: user.user.token
                },
            });
            if (response) {
                console.log("category deleted successfully");
                fetchData();
            }
            else {
                console.log("problem while deleting category");
            }
        }
        catch (err) {
            console.log(err);
        }
    }
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const url = `http://localhost:3000/api/v1/category/update/${selection}`;
            const requestBody = {
                updateVal: updatedCategory,
                userId: user.user._id
            };
            const response = await axios.post(url,
                requestBody
            , {
                headers: {
                    authorization: user.user.token
                },
            });
            if (response) {
                console.log("category updated successfully");
                const modalCloseButton = document.querySelector('[data-bs-dismiss="modal"]');
                if (modalCloseButton) {
                    modalCloseButton.click();
                }
                fetchData();
            }
            else {
                console.log("problem while updating category");
            }
        }

        catch (e) {
            console.log(e);
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = 'http://localhost:3000/api/v1/category/create';
            const requestBody = {
                categoryName: category,
                userId: user.user._id
            };
            const response = await axios.post(url, requestBody, {
                headers: {
                    authorization: user.user.token
                },
            });
            if (response) {
                console.log("category added successfully");

                fetchData();
            }
            else {
                console.log("problem while addding category");
            }
        }
        catch (err) {
            console.log(err);
        }
    };
    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/v1/category/get');
            if (response.data.success) {
                console.log("data arrived successfully");
                setData(response.data);
                console.log("data:", data);
            }
            else {
                console.log("something wring occurred");
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);
    return (
        <>
            <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', top: '0', left: '300px', width: '400px', margin: '30px' }}>
                    <Form handleSubmit={handleSubmit} category={category} setCategory={setCategory} />
                    <div>All Categories</div>
                    {
                        data != null && data.data.map(({ _id, name, slug }) => {
                            return (
                                <div key={_id} className="card my-4">
                                    <h5 className="card-header">Featured</h5>
                                    <div className="card-body">
                                        <h5 className="card-title">{name}</h5>
                                        <a href="#" onClick={() => { setSelections(_id); setUpdatedCategory(name) }} className="btn btn-primary mx-3" data-bs-toggle="modal" data-bs-target="#exampleModal">Update Category</a>
                                        <a href="#" onClick={() => { handleDelete(_id) }} className="btn btn-danger">Delete Category</a>

                                    </div>
                                </div>
                            );
                        })
                    }

                </div>
            </div >
            {console.log(updatedCategory)}
            {console.log("user", user)}
            <form onSubmit={handleUpdate}>
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" ref={modalRef}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Enter Category Name For Update</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <input ref={inputRef} type="text" value={updatedCategory} onChange={(e) => { setUpdatedCategory(e.target.value) }} className="form-control" placeholder="Enter Category Name" />
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="submit" className="btn btn-primary">Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>

        </>

    )
}
