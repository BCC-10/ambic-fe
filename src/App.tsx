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
import EmailCheck from './Pages/ResetPass/EmailCheck'
import UserProfile from "./Pages/User/Profile/Profile"
import MyOrder from "./Pages/User/MyOrder/MyOrder";
import Notification from "./Pages/User/Notifikasi/Notification";
import Coin from "./Pages/User/Koin/Koin"
import Order from "./Pages/Order/Order"
import OderDescription from "./Pages/Order/Description/OrderDescription"
import OrderDone from "./Pages/Order/Done/OrderDone"
import OrderActive from "./Pages/Order/Active/OrderActive"
import Cart from "./Pages/Cart/Cart"
import Payment from "./Pages/payment/Payment";
import FoodWeste from "./Pages/FoodWeste/FoodWeste";
import Relawan from "./Pages/Relawan/Relawan";
import About from "./Pages/About/About";
import Autocomplete from "./assets/test/AutoComplate";

const app: React.FC = () => {

    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route element={<ProtectedRouters redirectTo="/user/profile" />}>
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                    </Route>
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
                    <Route path="/emailcheck" element={<EmailCheck/>}/>
                    <Route path="/user/profile" element={<UserProfile/>}/>
                    <Route path="/user/order" element={<MyOrder/>}/>
                    <Route path="/user/notification" element={<Notification/>}/>
                    <Route path="/user/coin" element={<Coin/>}/>
                    <Route path="/order" element={<Order/>}/>
                    <Route path="/order/description" element={<OderDescription/>}/>
                    <Route path="/order/done" element={<OrderDone/>}/>
                    <Route path="/order/active" element={<OrderActive/>}/>
                    <Route path="/cart" element={<Cart/>}/>
                    <Route path="/payment" element={<Payment/>}/>
                    <Route path="/foodweste" element={<FoodWeste/>}/>
                    <Route path="/relawan" element={<Relawan/>}/>
                    <Route path="/about" element={<About/>}/>
                    <Route path="/autocomplete" element={<Autocomplete/>}/>
                </Routes>
            </Router>
    </AuthProvider>
    );
};
export default app;
