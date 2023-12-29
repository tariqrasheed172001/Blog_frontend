import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom';
import Auth from '../components/Auth';

function UserInfoProtection() {
  const [auth,setAuth] = useState(false);
  useEffect(() =>{  
    const userId = localStorage.getItem('userId');
    if(userId)
        setAuth(true);
    else 
        setAuth(false);
  },[])
  return (
    <div>{auth ? <Outlet /> : <Auth/>}</div>
  )
}

export default UserInfoProtection