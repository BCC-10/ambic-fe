import React from 'react'


const WhyComRight = (props) => {

    const {Content, Variant, Icon} = props

    return (
        <div className={` w-auto flex items-center ${Variant}  transition duration-400 ease-in-out hover:scale-105 hover:drop-shadow-xl  gap-4 text-teal-700/85`}>
            <img src={Icon} alt="" className='w-20 h-auto' />
            <h1 className='relative font-Poppins font-semibold text-2xl text-left w-full'>{Content}</h1>
        </div>
    )
}

export default WhyComRight
