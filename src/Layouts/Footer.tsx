import React from 'react'
import Logo from "../assets/ICons/Footer/Frame 67.png"
import Footers from "../assets/ICons/Footer/Rectangle 95.png"
import { FaInstagram, FaTiktok, FaTwitter } from "react-icons/fa";

const Footer: React.FC<{className?:string|undefined}> = ({className}) => {

    const Box = () => {
        return (
            <>
                <div className='w-10 h-10 bg-[#D9D9D9] '/>
            </>
        )
    }

    return (
        <div className={`w-full flex justify-between p-4 bg-teal-700/85 min-h-auto max-md:flex-col max-md:items-center max-md:text-center max-md:gap-2 ${className}`}>
            {/* LOGO */}
            <div className='w-auto h-auto p-2 flex justify-between items-center gap-1 '>
                <img src={Logo} alt="" className='object-cover w-15 bg-none drop-shadow-lg'/>
                <div className='flex items-start flex-col w-auto h-full p-2 gap-1 text-white '>
                    <p>Privacy Policy <br/> Terms and Conditions</p>
                    <p>&copy;2024 All Right Reserved</p>
                </div>
            </div>
            {/* SOCIAL MEDIA */}
            <div className="flex flex-col items-center justify-center  text-white gap-3 p-2">
                <h4 className="font-bold font-Poppins text-xl p-1">Social Media</h4>
                <div className="flex flex-row gap-4">
                    <FaInstagram size={24}/>
                    <FaTwitter size={24}/>
                    <FaTiktok size={24}/>
                </div>
            </div>
            <div className='flex items-start justify-center w-auto h-full flex-col p-2 gap-1 max-md:items-center'>
                <div className="flex flex-row gap-4">
                    <img src={Footers} alt="" className='relative top-2 w-25'/>
                </div>
            </div>
        </div>
    )
}

export default Footer
