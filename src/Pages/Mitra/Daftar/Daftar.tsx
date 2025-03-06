import React, {useState, useCallback} from 'react'
import Navbar from "../../../Layouts/Navbar"
import Modal from '../../../Componets/Elements/Navbar/ModalLocate'
import {cards, RegisterMitra} from '../../../data/index'
import Input from "../../../Componets/Elements/Input/input"
import DragDropUpload from "../../../Componets/Elements/Input/DragDropUpload"
import Footer from '../../../Layouts/Footer'


const Daftar: React.FC = () => {
    const [open, setOpen] = useState<boolean>(false);
    
    return (
        <main className='min-h-screen  relative flex flex-row overflow-hidden w-full '>
            <Navbar setOpen={setOpen} open={undefined}/>
                <div className='w-[25%] min-h-[120vh] flex flex-col items-center  bg-teal-700/85 pt-60 max-md:justify-start max-md:pt-120 max-lg:pt-0 max-lg:justify-center '>
                    <h1 className='font-Poppins text-3xl text-white font-semibold max-lg:text-center'>Mitra Ambic</h1>
                    <div className='flex items-center justify-center flex-col gap-20 '>
                        {cards.map((_,idx) => (
                            <img key={idx} src={_.description} alt="" className='w-1/2 bg-none drop-shadow-xl'/>
                        ))}
                    </div>
                </div>
                <div className='bg-[#FFF8F4] w-full min-h-[120vh] flex flex-col  items-center justify-center gap-7 relative max-md:min-h-[180vh] max-md:justify-start max-md:pt-80'>
                    <div className= 'w-[50%] h-auto flex items-center justify-center '>
                        <h1 className=' w-full text-center font-Poppins text-4xl font-semibold'>Form Pendaftaran Mitra Ambic</h1>
                    </div>
                    <div className='w-full flex items-center justify-center gap-6 flex-col h-auto bg-none drop-shadow-xl'>
                        {RegisterMitra.map((_,idx) => (
                            <div className='w-3/4 h-auto flex items-center justify-center flex-col'>
                                <Input 
                                key={idx} 
                                type={_.type} 
                                placeholder={_.placeholder} 
                                className='w-full h-full px-4 rounded-xl ' 
                                content={_.content} 
                                width="w-[55%] max-sm:w-full max-lg:w-[90%] max-xl:w-[90%] "
                                color="text-teal-700 "/>
                            </div>
                        ))}
                    </div>
                    <DragDropUpload content="Masukkan Foto Bisnis"/>
                    <button
                    type="submit"
                    className="w-40 h-12 p-2 text-white font-Poppins font-semibold text-lg bg-teal-700/85 rounded-full drop-shadow-xl transition-transform duration-300 hover:scale-95 cursor-pointer"
                    >
                    Submit
                    </button>
                <Footer className='absolute bottom-0 '/>
                </div>
            <Modal open={open} onClose={() => setOpen(false)} />
        </main>
    )
}

export default Daftar
