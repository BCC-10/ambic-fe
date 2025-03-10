import React, {useState} from 'react'
import Sidebar from "../SideBar/SideBar";
import Navbar from '../../../Layouts/Navbar';
import Modal from '../../../Componets/Elements/Navbar/ModalLocate';
import Footer from "../../../Layouts/Footer";
import Image from "../../../assets/Background/Notification/Rectangle 80.png"

export const Notif = () => {
    return (
        <div className='flex flex-row items-center justify-between w-full h-[20%] bg-white p-4 drop-shadow-lg'>
            <div className='flex flex-row items-center justify-start'>
                <img src={Image} alt="" className='w-20 object-cover'/>
                <div className='mx-5'>
                    <strong className='mb-5'>Pesanan Selesai</strong><br />
                    <label htmlFor="">Pesanan 25OKSHYXXY68. Telah diambil</label>
                    <p>19-02-2025   11:42</p>
                </div>
            </div>
        </div>
    )
}
const Notification = () => {
    const [open, setOpen] = useState<boolean>(false);
    return (
        <main className='min-h-screen w-full flex flex-col overflow-hidden'>
            <div>
                <Navbar setOpen={setOpen}/>
            </div>
            <div className='flex flex-row justify-start items-center bg-[#FFF8F4] p-4'>
                <Sidebar/>
                <div className='w-full h-full flex flex-col gap-3 justify-center items-center '>
                    <div className='w-[80%] h-auto flex items-center justify-start p-3'>
                        <h1 className='font-Poppins text-3xl font-semibold '>Notifikasi</h1>
                    </div>
                    {[...Array(5)].map((_,idx)=> (
                        <Notif key={idx}/>
                    ))}
                </div>
            </div>
            <div>
                <Footer/>
            </div>
            <Modal open={open} onClose={() => setOpen(false)} />
        </main>
    )
}

export default Notification
