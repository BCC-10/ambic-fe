import React, {useState, useEffect} from 'react'
import Sidebar from "../SideBar/SideBar"
import Navbar from '../../../Layouts/Navbar'
import Modal from '../../../Componets/Elements/Navbar/ModalLocate'
import Footer from "../../../Layouts/Footer"
import ChangePicture from "../../Mitra/Profile/ChangePicture"
import Input from "../../../Componets/Elements/Input/input"
import { Button } from "primereact/button";
import {RegisterUser} from "../../../data/index"
import { useNavigate } from "react-router-dom";

const Profile: React.FC = () => {
    const Navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
        useEffect(() => {
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token)
        }, [])
    const handleLogOut = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false)
        Navigate("/login")
        console.log(handleLogOut())
    }
    const [open, setOpen] = useState<boolean>(false);
    return (
        <main className='min-h-screen w-full flex flex-col  overflow-hidden  '>
            <div>
                <Navbar setOpen={setOpen}/>
            </div>
            <div className='flex items-center justify-start flex-row bg-[#FFF8F4] w-full min-h-screen'>
                <Sidebar/>
                <div className='w-full min-h-screen flex-col flex items-center justify-center gap-3'>
                    <div className='flex items-center justify-center w-full h-auto flex-col'>
                        <ChangePicture/>
                    </div>
                    <div className='flex items-center justify-center gap-7 w-full h-auto max-lg:flex-col'>
                        <div className='flex flex-col items-center justify-center gap-3'>
                            {RegisterUser.slice(0, 3).map((_,idx)=>(
                                <Input
                                    key={idx}
                                    content={_.content}
                                    className='w-full h-auto px-4 rounded-xl'
                                    type={_.type}
                                    placeholder={_.placeholder}
                                    width='w-100'
                                />
                            ))}
                        </div>
                        <div className='flex flex-col items-center justify-center gap-3 max-md:p-2 '>
                        {RegisterUser.slice(3, 6).map((_,idx)=>(
                                <Input
                                    key={idx}
                                    content={_.content}
                                    className='w-full h-auto px-4 rounded-xl'
                                    type={_.type}
                                    placeholder={_.placeholder}
                                    width='w-100'
                                />
                            ))}
                        </div>
                    </div>
                    <div className='flex items-center jsutify-center gap-5 w-full h-full flex-col '>
                        <div className='w-[40%] h-[70%] flex flex-wrap justify-center items-center gap-5 max-lg:w-[70%] max-md:w-full'>
                            <Button 
                            type='submit'
                            label='Simpen'
                            rounded
                            className='w-1/4 h-1/2 px-5 py-3 text-white font-Poppins font-semibold text-xl bg-teal-700/85 rounded-full drop-shadow-xl'
                            style={{backgroundColor: 'var(--teal-700)', border:'none'}}
                            />
                            
                        </div>
                        <div className='w-[48%] h-[70%] flex flex-wrap justify-center items-center gap-5 max-lg:w-[70%] max-md:w-full'>
                            <Button 
                            type='submit'
                            label='Logout'
                            rounded
                            className='w-1/4 h-1/2 px-5 py-3 text-white font-Poppins font-semibold text-xl bg-teal-700/85 rounded-full drop-shadow-xl'
                            style={{border:'none'}}
                            severity='danger'
                            onClick={handleLogOut}
                            />
                            <Button 
                            type='submit'
                            label='Ganti Password'
                            rounded
                            className='w-48 h-1/2 px-5 py-3 text-white font-Poppins font-semibold text-xl bg-teal-700/85 rounded-full drop-shadow-xl focus:outline-none'
                            style={{border:'none', backgroundColor:'var(--cyan-500)', outline:'none'}}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <Footer/>
            </div>
            <Modal open={open} onClose={() => setOpen(false)} />
        </main>
    )
}

export default Profile
