import React, {useState} from 'react'
import Navbar from "../../../Layouts/Navbar"
import Footer from "../../../Layouts/Footer"
import Modal from '../../../Componets/Elements/Navbar/ModalLocate'
import SideBar from "../Component/SideBar"
import Datatable from './DataTable/Datatable'

const Order = () => {
    const [open, setOpen] = useState<boolean>(false);
    return (
        <main className='w-full min-h-screen flex flex-col overflow-hidden '>
        <div>
            <Navbar setOpen={setOpen} open={undefined}/>
        </div>
        <div className='min-h-[120vh] flex flex-row items-center justify-start bg-[#FFF8F4] w-full'>
            <SideBar/>
            <div className='w-full h-full flex items-center justify-center '>
                <Datatable className='w-[90%]'/>
            </div>
        </div>
        <div>
            <Footer />
        </div>
        <Modal open={open} onClose={() => setOpen(false)} />
    </main>
    )
}

export default Order
