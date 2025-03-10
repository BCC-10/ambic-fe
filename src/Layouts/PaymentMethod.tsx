import React from 'react'
import {Images} from '../data/index.tsx';

const PaymentMethod: React.FC = () => {



    return (
        <div className='min-h-[50vh] flex flex-col items-center justify-center  bg-teal-700/85 w-full p-10 gap-2'>
            <div className='flex items-center justify-center '>
                <h1 className='font-Poppins font-bold text-3xl text-white'>Metode Pembayaran</h1>
            </div>
            <div className='w-[40%]  p-5 grid grid-cols-3 place-content-center place-items-center gap-5 max-lg:grid-cols-2 max-md:grid-cols-1'>
                {Images.map((_,idx) => (
                    <img key={idx} src={_.Image} alt="" className='max-lg:last:col-span-2 max-md:last:col-span-1 rounded-lg'/>
                ))}
            </div>
        </div>
    )
}

export default PaymentMethod
