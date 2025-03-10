import React, {useState} from 'react'
import Navbar from "../../Layouts/Navbar"
import Modal from "../../Componets/Elements/Navbar/ModalLocate"
import Footer from "../../Layouts/Footer"
import Hiasan1 from "../../assets/Hiasan/Fact Food Weste/Rectangle 85.png"
import Hiasan2 from "../../assets/Hiasan/Fact Food Weste/Rectangle 85 (1).png"
import Hiasan3 from "../../assets/Hiasan/Fact Food Weste/Rectangle 85 (2).png"
import Hiasan4 from "../../assets/Hiasan/Fact Food Weste/Rectangle 85 (3).png"
import Hiasan5 from "../../assets/Hiasan/Fact Food Weste/Rectangle 85 (4).png"

const FoodWeste = () => {
    const [open, setOpen] = useState<boolean>(false);
    return (
        <main className='flex flex-col w-full min-h-screen overflow-hidden '>
            <div>
                <Navbar setOpen={setOpen} open={undefined}/>
            </div>
            <div className='min-h-screen w-full flex flex-col items-center '>
                <div className='w-full h-50 mt-35 max- bg-teal-700/85 flex items-center justify-center '>
                    <h1 className='font-Poppins text-4xl font-semibold text-white'>Fakta Food Weste</h1>
                </div>
                <div className='w-full h-150 max-lg:h-210 max-md:h-250  flex items-center p-20 flex-row-reverse bg-[#F9F3F0] justify-between text-teal-700/95 flex-wrap' >
                    <div className='w-100 h-100 '>
                        <img src={Hiasan1} alt="" className='w-full h-full object-cover bg-none drop-shadow-xl'/>
                    </div>
                    <div className='w-[55%] max-lg:w-[30%] max-md:w-full h-auto flex flex-col justify-start items-start text-wrap gap-6'>
                        <h1 className='font-Poppins text-3xl font-semibold '>Berapa banyak makanan yang terbuang secara global?</h1>
                        <p className='text-xl font-Poppins '>Menurut WWF (2021), 40% makanan yang kita produksi secara global terbuang  sia-sia. Artinya, 2,5 miliar ton makanan terbuang setiap tahunnya. Jumlah ini  setara dengan 80.000 kilogram makanan terbuang di seluruh dunia setiap  detiknya.</p>
                    </div>
                </div>
                <div className='w-full h-150 flex items-center p-20 flex-row bg-teal-700/85 justify-between text-[#F9F3F0] flex-wrap max-lg:h-210 max-md:h-250 ' >
                    <div className='w-100 h-100 '>
                        <img src={Hiasan2} alt="" className='w-full h-full object-cover bg-none drop-shadow-xl'/>
                    </div>
                    <div className='w-[55%] h-auto max-lg:w-[30%] max-md:w-full flex flex-col justify-start items-start text-wrap gap-6'>
                        <h1 className='font-Poppins text-3xl font-semibold '>Berapa banyak makanan yang terbuang di Indonesia?</h1>
                        <p className='text-xl font-Poppins '>Indonesia menghasilkan 20,94 juta metrik ton limbah makanan dari rumah tangga pada 2020. Dalam periode 2000-2019, limbah makanan diperkirakan mencapai 23-48 juta ton per tahun, atau 115-184 kg per kapita. Hal ini berdampak pada ketahanan pangan, ekonomi, dan lingkungan.</p>
                    </div>
                </div>
                <div className='w-full h-150 flex items-center p-20 flex-row-reverse bg-[#9F3F0] justify-between text-teal-700/85 flex-wrap max-lg:h-210 max-md:h-250 ' >
                    <div className='w-100 h-100 '>
                        <img src={Hiasan3} alt="" className='w-full h-full object-cover bg-none drop-shadow-xl'/>
                    </div>
                    <div className='w-[55%] h-auto flex flex-col justify-start items-start text-wrap gap-6 max-lg:w-[30%] max-md:w-full '>
                        <h1 className='font-Poppins text-3xl font-semibold '>Makanan apa yang paling banyak terbuang?</h1>
                        <p className='text-xl font-Poppins '>Di Indonesia, makanan yang paling banyak terbuang adalah:</p>
                        <ul className='list-disc pl-5 text-lg'>
                            <li>Sayuran (31%) – karena pembelian berlebih dan penyimpanan buruk.</li>
                            <li>Nasi (20%) – sering dibuang karena porsi berlebih.</li>
                            <li>Daging (11%), produk susu (10%), dan ikan (10%) – terbuang karena kedaluwarsa atau penyimpanan tidak tepat.</li>
                        </ul>
                    </div>
                </div>
                <div className='w-full h-150 flex items-center p-20 flex-row bg-teal-700/85 justify-between text-[#F9F3F0] flex-wrap max-lg:h-210 max-md:h-250 ' >
                    <div className='w-100 h-100 '>
                        <img src={Hiasan4} alt="" className='w-full h-full object-cover bg-none drop-shadow-xl'/>
                    </div>
                    <div className='w-[55%] h-auto flex flex-col justify-start items-start text-wrap gap-6 max-lg:w-[30%] max-md:w-full'>
                        <h1 className='font-Poppins text-3xl font-semibold '>Mengapa limbah makanan menjadi masalah?</h1>
                        <p className='text-lg font-Poppins font-light '>Limbah makanan memboroskan sumber daya (air, energi, dan lahan) serta berkontribusi pada kelaparan global. Selain itu, limbah makanan mencerminkan ketidakefisienan ekonomi dan meningkatkan volume sampah, yang memperparah pencemaran lingkungan.</p>
                    </div>
                </div>
                <div className='w-full h-150 flex items-center p-20 flex-row-reverse bg-[#F9F3F0] justify-between text-teal-700/85 flex-wrap max-lg:h-210 max-md:h-265' >
                    <div className='w-100 h-100 '>
                        <img src={Hiasan5} alt="" className='w-full h-full object-cover bg-none drop-shadow-xl'/>
                    </div>
                    <div className='w-[55%] h-auto flex flex-col justify-start items-start text-wrap gap-5 max-lg:w-[30%] max-md:w-full'>
                        <h1 className='font-Poppins text-3xl font-semibold '>Bagaimana sisa makanan mempengaruhi lingkungan dan iklim?</h1>
                        <p className='text-lg font-Poppins font-medium '>Sisa makanan yang membusuk menghasilkan gas metana, yang 25 kali lebih kuat dari CO₂ dalam memerangkap panas. Selain itu, produksi makanan yang terbuang tetap menghasilkan emisi dari pertanian, transportasi, dan distribusi. Dampaknya mencakup:</p>
                        <ul className='list-disc pl-5 text-lg'>
                            <li>Emisi gas rumah kaca (8–10% global)</li>
                            <li>Pemborosan air (misalnya, 1 kg daging sapi butuh 15.400 liter air)</li>
                            <li>Penggunaan lahan yang sia-sia</li>
                            <li>Peningkatan sampah di TPA</li>
                        </ul>
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

export default FoodWeste
