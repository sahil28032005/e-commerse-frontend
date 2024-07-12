import React, { useState } from 'react';
import { useAuthProvider } from '../context/auth';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/userDashboard.css';
import DsahBoardNavigator from './DsahBoardNavigator';
import axios from 'axios';
import Footer from './Footer';
export const UserDashBoard = () => {
    console.log("user dashboard rendered");
    const navigate = useNavigate();
    const [user, setUser] = useAuthProvider();
    //form states
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        contact: '',
        password: '',
        confirmPassword: '',
        UserId: ''
    });
    //state updater functiom
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    //for error based states not necessary for normal use just try out this
    const [errors, setErrors] = useState({
        name: '',
        email: '',
        contact: '',
        password: '',
        confirmPassword: '',
    });

    //values validator function 
    const validateForm = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = 'Please enter your name.';
        if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Please enter a valid email address.';
        if (!formData.contact) newErrors.contact = 'Please enter your contact number.';
        // if (!formData.password) newErrors.password = 'Please enter a password.';
        // if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match.';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    //submit handler for form 
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            alert('Form submitted successfully!');
            e.preventDefault();
            // Logic to submit form data goes here
            try {
                const url = `https://e-commerse-backend-yeft.onrender.com/api/v1/auth/update-user/${formData.UserId}`;
                const body = {
                    name: formData.name,
                    email: formData.email,
                    contact: formData.contact,
                }
                if (formData?.password?.length == formData?.confirmPassword?.length) {
                    if (formData.password == formData.confirmPassword) {
                        console.log("in state if password update");
                        body.password = formData.password;
                    }
                }
                else {
                    console.log("length not matched");
                }
                const response = axios.put(url, body);
                if (response.data.success) {
                    console.log("success for update values");
                }
                else {
                    console.log("problem for updating values");
                }
            }
            catch (exception) {
                console.log(exception.message);
            }
        }
    };
    useEffect(() => {
        console.log("useffect rendered");
        if (localStorage.getItem('user')) {
            console.log('already loginned');
            const data = JSON.parse(localStorage.getItem('user'));
            setUser({ user: data.loginRecord });
        }
        else {
            // navigate("/login", { replace: true });

        }
        return () => {

        };
    }, []);
    useEffect(() => {
        setFormData({
            name: user.user.name,
            email: user.user.email,
            contact: user.user.contact,
            UserId: user.user._id
        });
    }, [user.user.token]);
    return (
        <>
            <div className="dashCont">
                <DsahBoardNavigator  />
                <div style={{background:'rgb(247, 215, 215)'}} className="pRight">
                    <form onSubmit={handleSubmit} action="#" method="post">
                        <h2>User Profile</h2>
                        <div className="form-group">
                            <label for="name">Name</label>
                            <input value={formData.name}
                                onChange={handleChange} type="text" id="name" name="name" required />
                            {errors.name && <div className="error-message">{errors.name}</div>}
                        </div>
                        <div className="form-group">
                            <label for="email">Email Address</label>
                            <input value={formData.email}
                                onChange={handleChange} type="email" id="email" name="email" required />
                            {errors.email && <div className="error-message">{errors.email}</div>}
                        </div>
                        <div className="form-group">
                            <label for="contact">Contact No</label>
                            <input value={formData.contact}
                                onChange={handleChange} type="tel" id="contact" name="contact" required />
                            {errors.contact && <div className="error-message">{errors.contact}</div>}
                        </div>
                        <div className="form-group">
                            <label for="password">Password</label>
                            <input value={formData.password}
                                onChange={handleChange} type="password" id="password" name="password" />
                            {errors.password && <div className="error-message">{errors.password}</div>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}

                            />
                            {errors.confirmPassword && <div className="error-message">{errors.confirmPassword}</div>}
                        </div>
                        <div className="form-buttons">
                            <button type="button" className="cancel-btn">Cancel</button>
                            <button type="submit" className="save-btn">Save Changes</button>
                        </div>
                    </form>
                </div>
            </div>

            <div>
                <Footer />
            </div>

        </>
    );

};
