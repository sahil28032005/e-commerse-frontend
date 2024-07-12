import React, { useState, useRef,useEffect } from 'react'
import './styles/sideNav.css';
import { Link } from "react-router-dom";
import { useAuthProvider } from '../context/auth';
const SideNav = () => {
    const [user, setUser] = useAuthProvider();
    const [toggle, setToggle] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const handleLogOut = () => {
        localStorage.removeItem("user");
        setUser({ user: null, token: null });
    }
    const closeNav = () => {
        setToggle(false);
    };
    useEffect(() => {
        setIsAdmin(user && user.user && user.user.role == 1);
        console.log("useEffect rendered inside navbar useEffect", isAdmin);
    }, [user]);
    return (
        <>
            <div id="mySidenav" style={{ width: toggle ? '200px' : '0px' }} class="sidenav">
                <Link to="javascript:void(0)" class="closebtn" onClick={() => { closeNav() }}>&times;</Link>
                <Link to="/">Home</Link>
                {user?.user == null && (<>
                    <Link to="/register">Register</Link>
                    <Link to="/login">Login</Link>
                </>)}
                {
                    user.user != null && (<>
                        <Link onClick={handleLogOut} to="/login" >Logout</Link>
                        <Link to={`/dashboard/${isAdmin ? "admin" : "user"}`}>Dashboard</Link>
                    </>)
                }
                <Link  >About us</Link>
                <Link>Contact Us</Link>

            </div>
            {console.log(toggle)}
            <span className='hamBg' style={{ fontSize: '20px', cursor: 'pointer', margin: '20px', display: 'none' }} onClick={() => setToggle(!toggle)}>&#9776;</span>
        </>

    )
}

export default SideNav