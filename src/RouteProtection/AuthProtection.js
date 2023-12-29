import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom';
import Blogs from '../components/Blogs';

function AuthProtection() {
  const [auth,setAuth] = useState(false);
  useEffect(() =>{  
    const userId = localStorage.getItem('userId');
    if(userId)
        setAuth(true);
    else 
        setAuth(false);
  },[])
  return (
    <div>{!auth ? <Outlet /> : <Blogs/>}</div>
  )
}

export default AuthProtection