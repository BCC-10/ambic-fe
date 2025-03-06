import React, {useState} from 'react'
import Navbar from "../../../Layouts/Navbar"
import Footer from "../../../Layouts/Footer"
import Modal from '../../../Componets/Elements/Navbar/ModalLocate'
import SideBar from "../Component/SideBar"
import { LuMessageSquareWarning } from "react-icons/lu";
import { FiPackage } from "react-icons/fi";
import { IoCartOutline } from "react-icons/io5";
import { GiMoneyStack } from "react-icons/gi";

interface Content {
    color: string,
    header: string,
    number: string,
    icon: React.ReactNode
}
const Content: React.FC<Content> = ({color, header, number, icon}) => {
    return (
        <div className={`${color} w-[30%] h-[20%] p-3 flex items-center justify-between rounded-xl max-xl:w-[40%] max-lg:w-[50%] max-md:w-[70%] max-sm:w-full`}>
            <div className='flex flex-col items-start justify-start '>
                <h1 className='font-Poppins text-2xl font-semibold '>{header}</h1>
                <h1 className='font-Poppins text-2xl font-bold '>{number}</h1>
            </div>
            <div>
                {icon}
            </div>
        </div>
    )
}
const Dashboard: React.FC = () => {
    const [open, setOpen] = useState<boolean>(false);
    return (
        <main className='w-full min-h-screen flex flex-col overflow-hidden '>
            <div>
                <Navbar setOpen={setOpen} open={undefined}/>
            </div>
            <div className='min-h-screen flex flex-row items-center justify-start bg-[#FFF8F4] w-full'>
                <SideBar/>
                <div className='w-full h-full flex items-center justify-center '>
                    <div className='w-[80%] h-[85%] flex items-center justify-center gap-5 flex-col'>
                        <h1 className='font-Poppins text-2xl font-semibold '>Dashboard Penjualan</h1>
                        <div className='w-full h-full flex flex-wrap items-center justify-center gap-5 max-xl:flex-col'>
                            <Content color="bg-[#FFB4B4]" header="Umpan balik" number={`302`} icon={<LuMessageSquareWarning size={50}/>}/>
                            <Content color="bg-[#FDFFA0]" header="Total Produk" number={`60`} icon={<FiPackage size={50}/>}/>
                            <Content color="bg-[#93A8FF]" header="Total Penjualan" number={`53`} icon={<IoCartOutline size={50}/>}/>
                            <Content color="bg-[#96FFA7]" header="Total Pendapatan" number={`Rp. 234.000`} icon={<GiMoneyStack size={50}/>}/>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <Footer />
            </div>
            <Modal open={open} onClose={() => setOpen(false)} />
        </main>
    )
}

export default Dashboard
