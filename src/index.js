import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { useAuthProvider, Provider } from './context/auth'
import { useSearchProvider, SearchProvider } from './context/searchContext';
import { CartContext } from './context/cartContext';
//google auth provide imports
import { GoogleOAuthProvider } from '@react-oauth/google';
const root = ReactDOM.createRoot(document.getElementById('root'));
const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID; 

root.render(
  // <React.StrictMode>
  <GoogleOAuthProvider clientId={googleClientId}><Provider>
    <SearchProvider>
      <CartContext>
        <App />
      </CartContext>
    </SearchProvider>
  </Provider> 
  </GoogleOAuthProvider>

  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
