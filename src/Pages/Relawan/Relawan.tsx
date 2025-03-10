import React, {useState} from 'react'
import Navbar from "../../Layouts/Navbar"
import Modal from "../../Componets/Elements/Navbar/ModalLocate"
import Footer from "../../Layouts/Footer"
import Hiasan1 from "../../assets/Hiasan/Relawan/Rectangle 85 (5).png"
import Hiasan2 from "../../assets/Hiasan/Relawan/Rectangle 85 (6).png"

const Relawan = () => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <main className='flex flex-col w-full min-h-screen overflow-hidden '>
            <div>
                <Navbar setOpen={setOpen} open={undefined}/>
            </div>
            <div className='min-h-screen w-full flex flex-col items-center '>
                <div className='w-full h-50 mt-35 max- bg-teal-700/85 flex items-center justify-center '>
                    <h1 className='font-Poppins text-4xl font-semibold text-white'>Relawan Ambic</h1>
                </div>
                <div className='w-full h-150 max-lg:h-210 max-md:h-250  flex items-center p-20 flex-row-reverse bg-[#F9F3F0] justify-between text-teal-700/95 flex-wrap' >
                    <div className='w-100 h-100 '>
                        <img src={Hiasan1} alt="" className='w-full h-full object-cover bg-none drop-shadow-xl'/>
                    </div>
                    <div className='w-[55%] max-lg:w-[30%] max-md:w-full h-auto flex flex-col justify-start items-start text-wrap gap-6'>
                        <h1 className='font-Poppins text-3xl font-semibold '>1. Relawan Bank Makanan (Food Bank Volunteer)</h1>
                        <ul className='list-disc pl-5 text-lg'>
                          <li>Membantu mengumpulkan makanan berlebih dari restoran, supermarket, atau acara.</li>
                          <li>Menyortir dan mendistribusikan makanan kepada orang yang membutuhkan.</li>
                        </ul>
                        <p className='text-xl font-Poppins '>Contoh: Bergabung dengan organisasi seperti Food Bank Indonesia atau Setara Foundation.</p>
                    </div>
                </div>
                <div className='w-full h-150 flex items-center p-20 flex-row bg-teal-700/85 justify-between text-[#F9F3F0] flex-wrap max-lg:h-210 max-md:h-250 ' >
                    <div className='w-100 h-100 '>
                        <img src={Hiasan2} alt="" className='w-full h-full object-cover bg-none drop-shadow-xl'/>
                    </div>
                    <div className='w-[55%] h-auto max-lg:w-[30%] max-md:w-full flex flex-col justify-start items-start text-wrap gap-6'>
                        <h1 className='font-Poppins text-3xl font-semibold '>Relawan Kompos & Pertanian Perkotaan</h1>
                        <ul className='list-disc pl-5 text-lg'>
                          <li>Mengelola limbah organik dari rumah tangga atau restoran untuk dijadikan pupuk kompos.</li>
                          <li>Mengajarkan masyarakat cara mengubah food waste menjadi sesuatu yang bermanfaat.</li>
                        </ul>
                        <p className='text-xl font-Poppins font-medium'>Contoh: Bergabung dengan komunitas urban farming atau program pengomposan lokal.</p>
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

export default Relawan
