import React from 'react'
import {Images} from '../data/index.tsx';

const PaymentMethod: React.FC = () => {



    return (
        <div className='min-h-[50vh] flex flex-col items-center justify-center  bg-teal-700/85 w-full p-10 gap-7'>
            <div className='flex items-center justify-center '>
                <h1 className='font-Poppins font-bold text-3xl text-white'>Metode Pembayaran</h1>
            </div>
            <div className='w-[90%] flex items-center justify-center gap-7 '>
                {Images.map((_,idx) => (
                    <img key={idx} src={_.Image} alt="" className='w-[15%] bg-none drop-shadow-xl'/>
                ))}
            </div>
        </div>
    )
}

export default PaymentMethod
