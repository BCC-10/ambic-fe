import React from 'react'

interface WhyComProps {
    Content?: string
    Variant?: 'left' | 'right' | 'center' | undefined
    Icon?: string
}
const WhyCom: React.FC<WhyComProps> = ({Content, Variant, Icon} ) => {


    return (
        <div className={` w-auto flex items-center ${Variant === 'left' ? "flex-row-reverse" : Variant === 'right' ? "flex-row" : Variant === 'center' ? " flex-col" : "p-5 gap-3"}  transition duration-400 ease-in-out hover:scale-105 hover:drop-shadow-xl gap-5 text-teal-700/85`}>
            <img src={Icon} alt="" className='w-15 h-auto' />
            <h1 className={`relative font-Poppins font-semibold text-xl  w-full ${Variant === 'left' ? "text-right" : Variant === 'right' ? "text-left" : Variant === 'center' ? "text-center " : ""} `}>{Content}</h1>
        </div>
    )
}

export default WhyCom
