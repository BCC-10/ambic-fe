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
        <div className='min-h-[50vh] flex items-center justify-center  bg-teal-700/85 w-full p-10 '>
            <div className='w-1/2  p-5 flex items-center justify-center flex-wrap gap-5'>
                {[...Array(5)].map((__,idx) => (
                    <Item key={idx}/>
                ))}
            </div>
        </div>
    )
}

export default Sponshorship
