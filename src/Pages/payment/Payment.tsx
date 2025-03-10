import React, {useState, useEffect, useMemo} from 'react'
import Navbar from '../../Layouts/Navbar';
import Modal from '../../Componets/Elements/Navbar/ModalLocate';
import Footer from "../../Layouts/Footer";
import DataTable from "../Cart/DataTable/DataTable"

const Payment = () => {
    const [open, setOpen] = useState<boolean>(false);
    return (
        <main className='min-h-screen w-full flex flex-col overflow-hidden '>
            <div>
                <Navbar setOpen={setOpen} open={undefined}/>
            </div>
            <div className='mt-30 w-full min-h-screen flex items-center justify-start bg-[#FFF8F4] p-20 flex-col gap-5'>
                <div className='w-full flex items-start justify-start'>
                    <h1 className='font-Poppins font-semibold text-2xl '>Keranjang</h1>
                </div>
                <div className='w-full h-full '>
                    <DataTable isVisible={false}/>
                </div>
            </div>
            <div>
                <Footer/>
            </div>
            <Modal open={open} onClose={() => setOpen(false)} />
        </main>
    )
}

export default Payment
