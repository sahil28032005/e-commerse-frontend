import React from 'react'
import { Link } from 'react-router-dom';

const DsahBoardNavigator = () => {
    return (
        <div className="pLeft" >
            <div style={{background:'rgb(232, 255, 245)'}} class="dashboard">
                <h3>Manage My Profile</h3>
                <div className="inner"></div>
                <ul className='options'>
                    <li><Link to="/payment-methods">Payment Options</Link></li>
                    <li><Link to="/my-orders">My Orders</Link></li>
                    <li><Link to="/cancelled-items">My Returns</Link></li>
                    
                </ul>
            </div>
        </div>
    )
}

export default DsahBoardNavigator