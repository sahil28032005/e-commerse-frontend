import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
const CartNumber = createContext("");
const CartContext = ({ children }) => {
    const [number, setNumber] = useState(0);
    return (
        <>
            <CartNumber.Provider value={[number, setNumber]}>
                {children}
            </CartNumber.Provider>
        </>

    )
}
const useCartProvider = () => useContext(CartNumber);
export { useCartProvider, CartContext }