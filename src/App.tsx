import React, {useState} from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from './Pages/LandingPage';
import LoginPage from './Pages/Login';
import RegisterPage from './Pages/Register';
import VerifyPage from './Pages/Verify';
import Google from './Pages/Google';
import ProtectedRouters from "./Componets/Util/ProtectedRouters";
import {AuthProvider} from "./Componets/Util/AuthContext"
import Navbar from "./Layouts/Navbar"

const app: React.FC = () => {
    

    return (
    <AuthProvider>
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage/>}/>
                <Route path="/login" element={<ProtectedRouters><LoginPage/></ProtectedRouters>}/>
                <Route path="/register" element={<ProtectedRouters><RegisterPage/></ProtectedRouters>}/>
                <Route path="/verify" element={<VerifyPage/>}/>
                <Route path="/google/callback" element={<Google/>}/>
            </Routes>
        </Router>
    </AuthProvider>
    )
}

export default app
