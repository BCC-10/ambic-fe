import React from 'react'

const Sponshorship = () => {

    const Item = () => {
        return (
            <>
                <div className='bg-white p-6 rounded-lg w-50 h-25 drop-shadow-lg'/>
            </>
        )
    }

    return (
        <div className='min-h-[50vh] flex flex-col items-center justify-center  bg-teal-700/85 w-full p-10 gap-2'>
            <div className='flex items-center justify-center '>
                <h1 className='font-Poppins font-bold text-3xl text-white'>Sponsor</h1>
            </div>
            <div className='w-1/2  p-5 flex items-center justify-center flex-wrap gap-5'>
                {[...Array(5)].map((__,idx) => (
                    <Item key={idx}/>
                ))}
            </div>
        </div>
    )
}

export default Sponshorship
