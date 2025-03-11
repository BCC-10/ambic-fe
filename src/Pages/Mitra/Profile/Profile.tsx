import React, {useState} from 'react'
import Navbar from '../../../Layouts/Navbar'
import Modal from '../../../Componets/Elements/Navbar/ModalLocate'
import SideBar from "../Component/SideBar"
import ChangePicture from "../Profile/ChangePicture"
import { RegisterMitra } from '../../../data/index'
import Information from "../Profile/Information"
import Footer from "../../../Layouts/Footer"


const Profile: React.FC = () => {
    const [open, setOpen] = useState<boolean>(false);
    return (
        <main className='min-h-screen flex flex-col overflow-hidden w-full'>
            <div>
                <Navbar setOpen={setOpen}/>
            </div>
            <div className='min-h-screen flex flex-row items-center justify-start bg-[#FFF8F4] w-full'>
                <SideBar />
                <div className='w-full h-[70%] flex flex-col justify-center items-center'>
                    <div className='w-[80%] h-[65%] flex items-start flex-col max-md:items-center'>
                        <h1 className='font-Poppins text-xl font-semibold '>Profile Picture</h1>
                        <div className='w-full flex items-center justify-center flex-col'>
                            {/* <ChangePicture/> */}
                            <div className='w-full h-full flex justify-center gap-7 max-md:flex-col max-md:items-center'>
                                <div className='flex flex-col gap-4 w-1/2 h-full'>
                                    {RegisterMitra.slice(0, 3).map((_,idx) => (
                                        <Information
                                        key={idx}
                                        content={_.content}
                                        className='w-full h-full px-4 rounded-xl'
                                        text={_.text}
                                        color="text-teal-700"
                                        />
                                    ))}
                                </div>
                                <div className='flex flex-col gap-4 w-1/2 h-full'>
                                    {RegisterMitra.slice(3, 6).map((_,idx) => (
                                        <Information
                                        key={idx}
                                        content={_.content}
                                        className='w-full h-full px-4 rounded-xl '
                                        text={_.text}
                                        color="text-teal-700"
                                        />
                                    ))}
                                </div>
                            </div>
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
