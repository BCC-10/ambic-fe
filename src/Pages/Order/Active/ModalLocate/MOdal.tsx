import React from 'react'
import Stars from "../../../../assets/ICons/OrderItem/Bintang.png"

interface OrderItem {
    onClose?: (e: any) => void
}
const MOdal: React.FC<OrderItem> = ({onClose}) => {
    return (
        <main className='flex items-start flex-col p-3'>
        <div className='relative min-h-[370px] max-w-[300px] flex items-start justify-start flex-col bg-white drop-shadow-xl rounded-3xl'>
            <div className='relative w-full flex items-center justify-center rounded-xl h-1/4  '>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3951.4490541064984!2d112.61110207588864!3d-7.952459679235344!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e78827f2d620975%3A0xf19b7459bbee5ed5!2sUniversitas%20Brawijaya!5e0!3m2!1sen!2sid!4v1741443487627!5m2!1sen!2sid" allowFullScreen={false} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className='rounded-xl'></iframe>
                    <p className='bg-white/80 px-1.5 absolute rounded-full right-4 bottom-3'>0.8Km</p>
                    <p className='bg-red-400/75 px-1.5 py-0.5 absolute rounded-full left-4 top-3'>40%</p>
            </div>
        <div className='w-full h-1/4 p-5 flex flex-col'>
            <label htmlFor="" className='font-Poppins font-normal text-teal-700'>Tersedia</label>
            <h4 className='font-Poppins text-lg font-medium'>Copa Banana</h4>
            <p className='text-sm'>Waktu Pengambilan, 10:00 - 13:00</p>
        </div>
        <div className='relative w-full h-full p-5 flex flex-col gap-3'>
            <h3 className='text-base font-Poppins font-medium'>Rp 22.000 <span className='line-through text-xs relative -top-1 text-gray-500'>Rp 30.000</span></h3>
            <img src={Stars} alt="" className='w-5'/>
            <h5 className='absolute top-15 left-13 text-gray-500 text-sm '>4.9 (34)</h5>
        </div>
    </div>
    </main>
    )
}

export default MOdal
