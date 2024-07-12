import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useAuthProvider } from '../context/auth';
import { useSearchProvider } from '../context/searchContext';
import { useEffect } from 'react';
import userIcon from './icons/user.png';
import searchIcon from './icons/search.png';
import shoppingBagIcon from './icons/shopping-bag.png';
import './styles/navBar.css';
import { useCartProvider } from '../context/cartContext';
import SideNav from './SideNav';
import axios from 'axios'
export const NavBar = () => {
    const navigate = useNavigate();
    const [isAdmin, setIsAdmin] = useState(false);
    const [user, setUser] = useAuthProvider();
    const [values, setValues] = useSearchProvider();
    const [number, setNumber] = useCartProvider();
    

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
        setIsAdmin(user && user.user && user.user.role == 1);
        console.log("useEffect rendered inside navbar useEffect", isAdmin);
    }, [user]);
    // console.log(user);
    const handleLogOut = () => {
        localStorage.removeItem("user");
        setUser({ user: null, token: null });
    }

    const handleSubmit = async (e) => {
        try {
            // e.preventDefault();

            const url = `https://e-commerse-backend-yeft.onrender.com/api/v1/products/search/${values.keyword}`;
            const response = await axios.get(url);
            if (response.data.success) {
                console.log("success");
                setValues({ ...values, results: response.data.data });
                navigate("/search");
            }
            else {
                console.log("problem for searching");
            }
        }
        catch (exception) {
            console.log(exception.message);
        }
    }
    return (
        <>
            {/* <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" /> */}
            {/* <nav className="navbar navbar-expand-lg bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand text-white" href="#">Navbar</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active text-white" aria-current="page" to="/">Home</Link>
                            </li>
                            {
                                user.user == null && (
                                    <>
                                        <li className="nav-item">
                                            <Link to="/register" className="nav-link text-white">Register</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link text-white" to="/login">Login</Link>
                                        </li>
                                    </>
                                )
                            }


                            {
                                user.user != null && (<li className="nav-item">
                                    <Link onClick={handleLogOut} to="/login" className="nav-link text-white">Logout</Link>
                                </li>)
                            }


                            <li className="nav-item">
                                <Link className="nav-link text-white" to={`/dashboard/${isAdmin ? "admin" : "user"}`}>User DashBoard</Link>
                            </li>
                            <li className="nav-link text-white nav-item">
                                <select id="products" name="products">
                                    <option value="book" disabled selected>{user?.user?.name}</option>
                                    <option value="laptop">My profile</option>
                                    <option value="phone">My Ordeers</option>
                                    <option value="tablet">Coupons</option>
                                </select>
                            </li>
                        </ul>

                    </div>
                </div>
            </nav> */}
            {/* testing mode */}
            <nav className="navCont">
                <div className="logo common">
                    <SideNav />
                    <h1 style={{ margin: '40px' }}>Exclusive</h1>
                </div>
                <div className="pages common">
                    <ul className="list-items">
                        <li className='hoverEffect'><Link to="/">Home</Link></li>
                        {
                            user.user == null && (
                                <>
                                    <li className='hoverEffect'><Link to="/register" >Register</Link></li>
                                    <li className='hoverEffect'><Link to="/login">Login</Link></li>
                                </>
                            )
                        }
                        {
                            user.user != null && (<><li className='hoverEffect'>
                                <Link onClick={handleLogOut} to="/login" >Logout</Link>
                            </li>
                                <li className="nav-item hoverEffect">
                                    <Link to={`/dashboard/${isAdmin ? "admin" : "user"}`}>Dashboard</Link>
                                </li></>)
                        }

                        <li className='hoverEffect'>About</li>
                        <li className='hoverEffect'>Contact Us</li>
                    </ul>
                </div>
                <div className="cart common">
                    <div style={{ margin: '10px' }} className="search">
                        <input onChange={(e) => {
                            setValues({ ...values, keyword: e.target.value });
                        }} placeholder="what are you looking for?" type="text" value={values.keyword} />
                        {/* <button type='submit'> */}
                        <img onClick={() => { handleSubmit() }} src={searchIcon} alt="Search Icon" className="search-icon" />
                        {/* </button> */}

                    </div>
                    <div onClick={(e) => { navigate(`/payment-test/${user?.user?._id}`) }} className="cartin">
                        <img src={shoppingBagIcon} alt="Shopping Bag Icon" className="search-icon" />
                        <span className="cart-badge">{number}</span>
                    </div>
                    <div className="profile">
                        <img style={{ margin: '10px' }} src={userIcon} alt="User Icon" className="search-icon" />
                        {user?.user?.name.substring(0, 4)}
                    </div>
                </div>
            </nav>
        </>
    );
};
