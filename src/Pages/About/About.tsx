import React, {useState} from 'react'
import Navbar from "../../Layouts/Navbar"
import Modal from "../../Componets/Elements/Navbar/ModalLocate"
import Footer from "../../Layouts/Footer"

const About = () => {
    const [open, setOpen] = useState<boolean>(false);
    return (
        <main className='w-full flex flex-col overflow-hidden min-h-screen min-w-[540px]'>
            <div>
                <Navbar setOpen={setOpen} open={undefined}/>
            </div>
            <div className='min-h-screen w-full flex flex-col items-center'>
                <div className='w-full h-50 mt-35 max- bg-teal-700/85 flex items-center justify-center '>
                    <h1 className='font-Poppins text-4xl font-semibold text-white'>Tentang Kami</h1>
                </div>
                <div className='w-full h-150 max-lg:h-500 max-md:h-250 flex items-center p-20 flex-row-reverse bg-[#F9F3F0] justify-center text-teal-700/95 flex-wrap ' >
                    <div className='w-[80%] max-lg:w-[30%] max-md:w-full h-auto flex flex-col justify-start items-start text-wrap gap-6'>
                        <p className='text-center text-2xl font-Poppins h-auto '>Kami adalah platform digital yang menyediakan penjualan makanan berlebih dengan harga terjangkau, berfokus pada
                        pengurangan food waste sekaligus memberikan nilai lebih pada setiap porsi yang masih layak konsumsi. Melalui website 
                        kami, konsumen dapat dengan mudah menemukan dan menikmati hidangan berkualitas yang berasal dari kelebihan stok 
                        makanan, hasil kerja sama erat dengan bisnis makanan. Kami percaya setiap makanan memiliki potensi untuk dinikmati
                        kembali dan tidak hanya menjadi sampah, sehingga setiap transaksi di platform kami berkontribusi pada upaya pengelolaan 
                        sumber daya secara lebih efektif.
                        </p>
                    </div>
                </div>
                <div className='w-full h-150 max-lg:h-210 max-md:h-300 flex items-center p-20 bg-teal-700/85 justify-center text-[#F9F3F0] max-2xl:flex-wrap flex-row max-xl:gap-10 max-lg:gap-40 max-md:gap-0' >
                    <div className='w-[80%] max-lg:w-[30%] max-md:w-full h-auto flex flex-col justify-start items-center text-wrap gap-6'>
                        <h1 className='text-5xl font-Poppins font-semibold '>Visi</h1>
                        <p className='text-center font-Poppins text-xl font-medium w-1/2'>Menjadi platform terdepan dalam mengurangi 
                        food waste dengan menyediakan solusi 
                        berkelanjutan bagiindustri makanan dan konsumen 
                        melalui penjualanmakanan berlebih dengan 
                        harga terjangkau.
                        </p>
                    </div>
                    <div className='w-[80%] max-lg:w-[30%] max-md:w-full h-auto flex flex-col justify-center items-center text-wrap gap-6'>
                        <h1 className='text-5xl font-Poppins font-semibold '>Misi</h1>
                        <ol className=' list-decimal w-full text-left flex flex-col items-center '>
                            <li> Mengurangi Pemborosan Makanan </li>
                            <li> Meningkatkan Akses Makanan Terjangkau</li>
                            <li> Mendukung Keberlanjutan Lingkungan </li>
                            <li> Memberdayakan Mitra Usaha </li>
                        </ol>
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

export default About
