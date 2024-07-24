import React from 'react'
import { useLocation, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthProvider';

const PrivateRouter = ({children}) => {
    const {user, loading} =  useContext(AuthContext);
    const location = useLocation();
    if(loading) {
        return (
            <p>Loading</p>
        )
    }
    if(user) {
        return children;
    }
  return <Navigate to="/login" state={{from: location}} replace></Navigate>
  
}

export default PrivateRouter
