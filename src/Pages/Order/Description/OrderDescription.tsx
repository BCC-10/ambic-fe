import React, {useState} from 'react'
import Navbar from '../../../Layouts/Navbar';
import Modal from '../../../Componets/Elements/Navbar/ModalLocate';
import Footer from "../../../Layouts/Footer";
import Donat from "../../../assets/Background/Order/image 1.png"
import Stars from "../../../assets/ICons/OrderItem/Bintang.png"
import Kucing from "../../../assets/ICons/Order/Ellipse 3.png"
import Roti from "../../../assets/ICons/Order/Rectangle 93.png"
import {useNavigate} from 'react-router-dom'



const Comment = () => {
   return (
        <>
            <div className='w-[90%] flex items-center justify-between '>
                <div className='w-full flex items-start justify-center flex-col gap-2 text-wrap '>
                    <div className='w-[20%] flex gap-3 irems-center justify-center'>
                        <img src={Kucing} alt="" className='w-[40%]'/>
                        <div className='flex items-start justify-start flex-col w-full '>
                            <h1 className='font-Poppins text-lg font-semibold'>Vitroos</h1>
                            <div className='flex items-start'>
                                {[...Array(5)].map((_,idx) => (
                                    <img src={Stars} alt="" className='w-[15%]'key={idx}/>
                                ))}
                                
                            </div>
                            <h4 className='mt-2 font-semibold font-Poppins text-xs '>19-02-2025 11:42</h4>
                        </div>
                    </div>
                    <p className=''>Inisiatif yang sangat bagus! Produknya masih layak konsumsi dan rasanya enak. Semoga lebih banyak 
                    orang sadar akan pentingnya mengurangi food waste.</p>
                </div>
                <img src={Roti} alt="" className='w-[7%]'/>
            </div>
        </>
    )
}

const OrderDescription = () => {

    const [open, setOpen] = useState<boolean>(false);
    const navigate = useNavigate();
    return (
        <main className=' relative min-h-screen w-full overflow=hidden flex items-start justify-center flex-col'>
            <div>
                <Navbar setOpen={setOpen} open={undefined}/>
            </div>
            <div className=' min-h-[120vh] w-full flex flex-col items-center justify-center bg-[#FFF8F4] gap-7'>
                <div className='w-[50%] h-auto flex flex-row justify-start items-center gap-6'>
                    <img src={Donat} alt="" className='w-[40%] h-[40%]'/>
                    <div className='w-full flex flex-col justify-start items-start gap-4'>
                        <h1 className='font-Poppins text-2xl font-semibold '>Black Jack (JCO)</h1>
                        <p className='w-full text-wrap text-base '>Donat lembut berlapis cokelat hitam premium  dengan taburanserutan cokelat yang menggoda.  Perpaduan rasa manis dan pahit yang sempurna  untuk pecinta cokelat!</p>
                        <div className='w-full h-auto flex items-center justify-center flex-col '>
                            <h2 className='flex gap-4'>
                                <span className='line-through text-gray-500 text-lg font-Poppins font-medium'>Rp 17.000</span>
                                <span className='text-teal-700 font-Poppins text-xl font-semibold'>Rp 8000</span>
                            </h2>
                        </div>
                        <div className='w-full h-auto flex items-center justify-center gap-3 '>
                            <img src={Stars} alt="" className='w-6'/>
                            <label htmlFor="" className='text-gray-500 font-Poppins text-xs relative top-1'>4.9 (34)</label>
                        </div>
                        <div className='w-full h-auto flex items-center justify-center '>
                            <h5 className='font-medium '>Waktu Pengambilan, 10:00 - 13:00</h5>
                        </div>
                        <div className='w-full h-auto flex items-center justify-center gap-6'>
                            <button className='font-Poppins text-lg text-white bg-teal-700/85 rounded-xl drop-shadow-lg px-4 py-2 font-semibold transition-transform duration-200 hover:scale-95 cursor-pointer' onClick={() => navigate("/cart")}>Keranjang</button>
                            <button className='font-Poppins text-lg text-white bg-teal-700/85 rounded-xl drop-shadow-lg px-4 py-2 font-semibold'>Beli Sekarang</button>
                        </div>
                    </div>
                </div>
                <div className='relative w-[70%] h-[50%] bg-white py-5 flex items-start justify-between flex-col pl-20 gap-17'>
                    <Comment/>
                    <Comment/>
                </div>
            </div>
            <div>
            </div>
                <Footer/>
            <Modal open={open} onClose={() => setOpen(false)} />
        </main>
    )
}

export default OrderDescription
