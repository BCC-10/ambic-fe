import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import LoginPage from "./Pages/Auth/Login";
import RegisterPage from "./Pages/Auth/Register";
import VerifyPage from "./Pages/Auth/Verify";
import Google from "./Pages/Auth/Google";
import ProtectedRouters from "./Componets/Util/ProtectedRouters";
import { AuthProvider } from "./Componets/Util/AuthContext";
import Reset from "./Pages/ResetPass/Reset";
import NewPass from "./Pages/ResetPass/NewPass";
import Mitra from "./Pages/Mitra/Mitra"
import DaftarMitra from "./Pages/Mitra/Daftar/Daftar"
import Profile from "./Pages/Mitra/Profile/Profile"
import DashboardMitra from "./Pages/Mitra/Dashboard/Dashboard"
import Product from "./Pages/Mitra/Product/product";
import AddProduct from "./Pages/Mitra/Product/Add/index";


const app: React.FC = () => {

    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/login" element={<ProtectedRouters><LoginPage /></ProtectedRouters>}/>
                    <Route path="/register" element={<ProtectedRouters><RegisterPage /></ProtectedRouters>}/>
                    <Route path="/verify" element={<VerifyPage />} />
                    <Route path="/google/callback" element={<Google />} />
                    <Route path="/reset" element={<Reset/>}/>
                    <Route path="/newpass" element={<NewPass/>}/>
                    <Route path="/mitra" element={<Mitra/>}/>
                    <Route path="/mitra/register" element={<DaftarMitra/>}/>
                    <Route path="/mitra/profile" element={<Profile/>}/>
                    <Route path="/mitra/dashboard" element={<DashboardMitra/>}/>
                    <Route path="/mitra/product" element={<Product />}/>
                    <Route path="/mitra/product/add" element={<AddProduct/>}/>
                </Routes>
            </Router>
    </AuthProvider>
    );
};

export default app;
