import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { Navigation } from './Navigation'
export const AdminDashBoard = () => {
  const navigate = useNavigate();
  useEffect(()=>{
    navigate("/categories")
  },[]);
  
  return (
    <>
      <div>AdminDashBoard</div>
      
      <Navigation />
    </>

  )
}
