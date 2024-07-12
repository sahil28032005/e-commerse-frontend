import imageRef from './icons/register.jpg';
import './components.css'
import React, { useState } from 'react';
import "./styles/register.css";
import axios from 'axios';
export const RegisterComponent = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [contact, setContact] = useState('');
    const [address, setAddress] = useState('');
    const [petName, setPetName] = useState('');
    const handleOnsybmit = async (e) => {
        e.preventDefault();
        console.log('form data arrived');
        console.log(name, email, password, contact, address, petName);
        try {
            const response = await axios.post('https://e-commerse-backend-yeft.onrender.com/api/v1/auth/register', {
                name,
                email,
                password,
                contact,
                address,
                petName
            });
            //this takes my url as parameter and second parameter as content to send in url in my case all that states
            if (response.data.success) {
                console.log("Registered successfully:", response.data);
            }

        }
        catch (error) {
            console.log(error.message); // Log the error message
        }
    }
    return (
        <>
            <div className="regCont">
                <div className="left2">
                    <img src={imageRef} alt="" />
                </div>
                <div className="right2">
                    <form onSubmit={handleOnsybmit} className='formCont'>
                        <div className="mb-3">
                            <label for="exampleInputEmail1" className="form-label">Enter Name</label>
                            <input type="text" value={name} onChange={(event) => { setName(event.target.value) }} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        </div>
                        <div className="mb-3">
                            <label for="exampleInputEmail1" className="form-label">Email address</label>
                            <input type="email" onChange={(e) => { setEmail(e.target.value) }} value={email} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <div className="mb-3">
                            <label for="exampleInputPassword1" className="form-label">Password</label>
                            <input onChange={(e) => { setPassword(e.target.value) }} value={password} type="password" className="form-control" id="exampleInputPassword1" />
                        </div>
                        <div className="mb-3">
                            <label for="exampleInputPassword1" className="form-label">contact</label>
                            <input onChange={(e) => {
                                setContact(e.target.value)
                            }} value={contact} type="text" className="form-control" id="exampleInputPassword1" />
                        </div>
                        <div className="mb-3">
                            <label for="exampleInputPassword1" className="form-label">address</label>
                            <input onChange={(e) => { setAddress(e.target.value) }} value={address} type="text" className="form-control" id="exampleInputPassword1" />
                        </div>
                        <div className="mb-3">
                            <label for="exampleInputPassword1" className="form-label">Enter your pet name (security question)</label>
                            <input onChange={(e) => { setPetName(e.target.value) }} value={petName} type="text" className="form-control" id="exampleInputPassword1" />
                        </div>

                        <button type="submit" className="btn btn-success">Submit</button>
                    </form>
                </div>
            </div>

        </>
    )
}
