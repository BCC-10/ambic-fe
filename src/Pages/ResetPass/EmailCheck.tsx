import React from 'react'
import Pettern from '../../assets/Pettern/image 11.png'
import Amplop from "../../assets/ICons/Reset/image 16.png"

const EmailCheck = () => {
    return (
        <main className='relative bg-teal-700 w-full min-h-screen flex items-center justify-center overflow-hidden'>
            {/* BG + Content*/}
            <img src={Pettern} alt="" className='absolute inset-0 w-full h-full object-cover '/>
            <div className='absolute z-50 bg-white w-[50%] h-[80%] flex items-center justify-center flex-col rounded-[321px]'>
                <div className='absolute flex flex-col items-center justify-center '>
                    <div className='w-3/4 h-3/4'>
                        <img src={Amplop} alt="" className='w-full h-full object-cover'/>
                    </div>
                    <div className=''>
                        <h1 className='font-Poppins text-4xl font-semibold'>Periksa Email Anda</h1>
                    </div>
                    <div className='w-3/4 h-3/4'>
                        <h5 className='text-xl text-center font-Poppins'>Kami telah mengirimkan instruksi pemulihan kata sandi ke email anda</h5>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default EmailCheck
