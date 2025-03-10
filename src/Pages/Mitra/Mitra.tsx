import React, {useState} from 'react'
import Navbar from '../../Layouts/Navbar'
import Modal from '../../Componets/Elements/Navbar/ModalLocate'
import {Cards} from '../../data/index'
import Footer from "../../Layouts/Footer"
import { Link } from "react-router-dom";

interface cardType {
    content?: string
    variant: string
    image: string
}

const Card : React.FC<cardType> = ({content, variant, image}) => {
    return (
        <div className='h-auto w-full md:w-[23%] flex flex-col items-center justify-center gap-5 bg-none drop-shadow-xl'>
            <div className='relative w-[20rem] h-[20rem]  flex items-center justify-center '>
                <img src={image} alt="" className='w-full'/>
            </div>
            <div className='w-full h-auto' >
                <h3 className={`font-Poppins font-semibold ${variant} text-2xl text-center`}>{content}</h3>
            </div>
        </div>
    );
}

const Mitra: React.FC = () => {
    const [open, setOpen] = useState<boolean>(false);
    return (
        <main className='min-screen relative flex flex-col overflow-hidden'>
            <Navbar setOpen={setOpen} open={undefined}/>
            <div className='pt-35 min-h-[30vh] flex items-center justify-center bg-[#FFF8F4] '>
                <div className='flex items-center justify-center w-3/4 h-1/2 gap-30 flex-wrap'>
                    
                    <Link to="/mitra/profile" className='w-[20%] h-auto p-2 flex items-center justify-center bg-teal-700/85 drop-shadow-xl rounded-full text-white font-Poppins font-semibold cursor-pointer trasition-transform duration-300 hover:scale-95 '>
                        <button >Masuk</button>
                    </Link>
                    <Link to="/mitra/register" className='w-[20%] h-auto p-2 flex items-center justify-center bg-teal-700/85 drop-shadow-xl rounded-full text-white font-Poppins font-semibold cursor-pointer trasition-transform duration-300 hover:scale-95'  >
                        <button >Daftar</button>
                    </Link>
                </div>
            </div>
            <div className='flex bg-teal-700/85 items-center justify-center w-full min-h-[55vh] flex-col gap-5 p-5'>
                <div className='flex w-3/4 items-center justify-center '>
                    <h1 className='font-Poppins text-3xl text-white font-semibold text-center '>Manfaat menjadi mitra kami</h1>
                </div>
                <div className='w-[110%] flex max-xl:flex-col gap-10 items-center justify-center px-5 '>
                    {Cards.slice(0, 3).map((_,idx) => (
                        <Card key={idx} content={_.content} variant="text-white" image={_.image}/>
                    ))}
                </div>
            </div>
            <div className='flex bg-[#FFF8F4] items-center justify-center w-full min-h-[55vh] flex-col gap-5 p-5'>
                <div className='w-[110%] flex max-xl:flex-col gap-10 items-center justify-center px-5 '>
                    {Cards.slice(3, 6).map((_,idx) => (
                        <Card key={idx} content={_.content} variant="text-teal-700/85" image={_.image}/>
                    ))}
                </div>
            </div>
            <Modal open={open} onClose={() => setOpen(false)} />
            <Footer />
        </main>
    )
}

export default Mitra
