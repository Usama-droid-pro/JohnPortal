import {useEffect} from 'react'
import React from 'react'
import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";
import UserPanel from "layouts/UserPanel";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import {useAuth} from './AuthenticationProvider'



function App() {
    const {revalidateAuth ,setRevalidateAuth} = useAuth();

    useEffect(() => {
        const interval = setInterval(() => {
          setRevalidateAuth(prev => !prev);
        }, 900000);
    
        return () => clearInterval(interval); // Cleanup the interval on unmount
      }, []);
    
  return (
    <Routes>
      <Route path="/admin/*" element={<AdminLayout />} />
      <Route path="/auth/*" element={<AuthLayout />} />
      <Route path="/userPanel/:id" element={<UserPanel />} /> 
      <Route path="*" element={<Navigate to="/admin/index" replace />} />
    </Routes>
  )
}

export default App