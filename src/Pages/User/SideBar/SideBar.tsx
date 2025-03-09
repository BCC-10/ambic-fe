import React from 'react'
import { useLocation, Link } from 'react-router-dom'

const Button: React.FC<{content:string, path:string}> = ({content, path}) => {
    const location = useLocation();
    const isActive = location.pathname === path

    return (
        <Link to={path} className={`w-[80%] h-[15%] ${isActive ? "bg-white border-2 border-teal-700/85  text-teal-700/85" : "bg-teal-700/85 text-white border-none "} flex items-center justify-center p-3 rounded-full font-Poppins font-semibold drop-shadow-xl transition-transform duration-300 hover:scale-95 max-md:text-center`}>{content}</Link>
    )
}
const SideBar = () => {
    return (
        <div className='w-[30%] min-h-screen flex items-center justify-center flex-col gap-8 '>
            <Button path="/user/profile" content="Akun Saya"/>
            <Button path="/user/order" content="Pesanan Saya"/>
            <Button path="/user/notification" content="Notifikasi"/>
            <Button path="/user/coin" content="Koin Ambic"/>
        </div>
    )
}

export default SideBar