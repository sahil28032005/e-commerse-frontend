import React from 'react'
import * as ReactDOM from "react-dom";
import { Link, useLocation } from 'react-router-dom';
export const Navigation = () => {
    const location = useLocation();
    return (
        <>
            <div className="row w-50">
                <div className="col-4">
                    <div className="list-group" id="list-tab" role="tablist">
                        <Link
                            to="/categories"
                            className={`list-group-item list-group-item-action ${location.pathname === '/categories' ? 'active' : ''}`}
                            role="tab"
                            aria-controls="list-home"
                        >
                            Categories
                        </Link>
                        <Link
                            to="/profile"
                            className={`list-group-item list-group-item-action ${location.pathname === '/profile' ? 'active' : ''}`}
                            role="tab"
                            aria-controls="list-profile"
                        >
                            Profile
                        </Link>
                        <Link
                            to="/create-product"
                            className={`list-group-item list-group-item-action ${location.pathname === '/create-product' ? 'active' : ''}`}
                            role="tab"
                            aria-controls="list-messages"
                        >
                           Create Products
                        </Link>
                        <Link
                            to="/products"
                            className={`list-group-item list-group-item-action ${location.pathname === '/products' ? 'active' : ''}`}
                            role="tab"
                            aria-controls="list-settings"
                        >
                            Products
                        </Link>
                    </div>
                </div>
                <div className="col-8">
                    <div className="tab-content" id="nav-tabContent">
                        <div className="tab-pane fade show active" id="list-home" role="tabpanel" aria-labelledby="list-home-list">...</div>
                        <div className="tab-pane fade" id="list-profile" role="tabpanel" aria-labelledby="list-profile-list">...</div>
                        <div className="tab-pane fade" id="list-messages" role="tabpanel" aria-labelledby="list-messages-list">...</div>
                        <div className="tab-pane fade" id="list-settings" role="tabpanel" aria-labelledby="list-settings-list">...</div>
                    </div>
                </div>
            </div>
        </>
    )
}
