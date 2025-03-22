import React, {useState} from 'react'
import Sidebar from "../SideBar/SideBar";
import Navbar from '../../../Layouts/Navbar';
import Modal from '../../../Componets/Elements/Navbar/ModalLocate';
import Footer from "../../../Layouts/Footer";
import Coin from "../../../assets/Background/coin/cryptocurrency-color_gold.png"
import {Notif} from "../Notifikasi/Notification"

const Koin = () => {
    const [open, setOpen] = useState<boolean>(false);
    return (
        <main className='min-h-screen w-full overflow-hidden flex flex-col '>
            <div>
                <Navbar setOpen={setOpen}/>
            </div>
            <div className='flex items-center justify-start flex-row w-screen min-h-screen bg-[#FFF8F4]'>
                <Sidebar/>
                <div className='w-screen h-auto flex items-center justify-center flex-col'>
                    <div className='w-[80%] flex items-center justify-center my-4'>
                        <h1 className='font-Poppins text-2xl font-semibold'>Koin Ambic Saya</h1>
                    </div>
                    <div className='w-[90%] h-auto bg-white flex items-center justify-center flex-col'>
                        <div className='flex justify-center items-center gap-6'>
                            <img src={Coin} alt="" className='w-[18%]'/>
                            <h1 className='font-Poppins text-yellow-500 text-7xl font-semibold'>0</h1>
                            <div className='flex items-start justify-center flex-col'>
                                <label htmlFor="" className='text-yellow-500 text-2xl font-semibold'>Koin Tersedia</label>
                                <h4 className='font-semibold font-Poppins text-ls'>0 koin akan berakhir pada 31-07-2025</h4>
                            </div>
                        </div>
                        <div className='w-full'>
                            {/* {[...Array(4)].map((_,idx)=> (
                                // <Notif key={idx}/>
                            ))} */}
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

export default Koin
