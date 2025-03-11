import React, {useState} from 'react'
import Navbar from "../../../Layouts/Navbar"
import Footer from "../../../Layouts/Footer"
import Modal from '../../../Componets/Elements/Navbar/ModalLocate'
import SideBar from "../Component/SideBar"
import Penilaian from "../Penilaian/DataTable/Penilaian"

const Index = () => {
    const [open, setOpen] = useState<boolean>(false);
    return (
        <main className='w-full min-h-screen flex flex-col overflow-hidden'>
            <div>
                <Navbar setOpen={setOpen} open={undefined}/>
            </div>
            <div className='min-h-screen w-full flex items-center justify-start bg-[#FFF8F4] flex-row'>
                <SideBar/>
                <div className='w-full h-full flex items-center justify-start '>
                    <Penilaian/>
                </div>
            </div>
            <div>
                <Footer />
            </div>
            <Modal open={open} onClose={() => setOpen(false)} />
        </main>
    )
}

export default Index
