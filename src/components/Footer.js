import React from 'react'
import './styles/footer.css';
import insta from './icons/insta.svg';
import reddit from './icons/reddit.svg';
import octocat from './icons/octocat.svg';
import linkedin from './icons/linkedin.svg';
const Footer = () => {
    return (
        <>
            <div class="myfooter-footer">
                <div class="myfooter-commondiv">
                    <div class="myfooter-innerCont">
                        <div class="myfooter-points">
                            <h5>Exclusive</h5>
                        </div>
                        <div class="myfooter-points">
                            <h5>Suscribe</h5>
                        </div>
                        <div class="myfooter-points">
                            <h5>Get 10% off on your first order</h5>
                        </div>
                        <div class="myfooter-points">
                            <input type="text" placeholder="Enter your email.." name="" id="" />
                        </div>
                    </div>
                </div>
                <div class="myfooter-commondiv">
                    <div class="myfooter-innerCont">
                        <div class="myfooter-points">
                            <h5>Support</h5>
                        </div>
                        <div class="myfooter-points">
                            <h5>At xyz 111985,FH8892,Vice City</h5>
                        </div>
                        <div class="myfooter-points">
                            <h5>sahilSadekar249775@gmail.com</h5>
                        </div>
                        <div class="myfooter-points">
                            <h5>+91 98501990625</h5>
                        </div>
                    </div>
                </div>
                <div class="myfooter-commondiv">
                    <div class="myfooter-innerCont">
                        <div class="myfooter-points">
                            <h5>Account</h5>
                        </div>
                        <div class="myfooter-points">
                            <h5>My Account</h5>
                        </div>
                        <div class="myfooter-points">
                            <h5>Login/Register</h5>
                        </div>
                        <div class="myfooter-points">
                            <h5>Cart</h5>
                        </div>
                        <div class="myfooter-points">
                            <h5>Wishlist</h5>
                        </div>
                        <div class="myfooter-points">
                            <h5>Shop</h5>
                        </div>
                    </div>
                </div>
                <div class="myfooter-commondiv">
                    <div class="myfooter-innerCont">
                        <div class="myfooter-points">
                            <h5>Quick Links</h5>
                        </div>
                        <div class="myfooter-points">
                            <h5>Privacy Policy</h5>
                        </div>
                        <div class="myfooter-points">
                            <h5>Terms Of Use</h5>
                        </div>
                        <div class="myfooter-points">
                            <h5>FAQ</h5>
                        </div>
                        <div class="myfooter-points">
                            <h5>Contact</h5>
                        </div>
                    </div>
                </div>
                <div class="myfooter-commondiv">
                    <div class="myfooter-innerCont">
                        <div class="myfooter-points">
                            <h5>Download App</h5>
                        </div>
                        <div class="myfooter-points">
                            <h5>Save upto 23% with new user</h5>
                        </div>
                        <div class="myfooter-points myfooter-media">
                            <div><img src={insta} alt="" /></div>
                            <div><img src={linkedin} alt="" /></div>
                            <div><img src={reddit} alt="" /></div>
                            <div><img src={octocat} alt="" /></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="myfooter-copy">
                @ Copyright All Rights Reserved
            </div>

        </>
    )
}

export default Footer