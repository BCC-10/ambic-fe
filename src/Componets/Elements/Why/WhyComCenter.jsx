import React from 'react'


const WhyComCenter = (props) => {

    const {Content, Variant, Icon, Text, Size} = props

    return (
        <div className={` w-auto flex flex-col items-center ${Variant}  transition duration-400 ease-in-out hover:scale-105 hover:drop-shadow-xl text-teal-700/85`}>
            <img src={Icon} alt="" className={`${Size} h-auto`} />
            <h1 className={`relative font-Poppins font-semibold text-center w-90 ${Text}`}>{Content}</h1>
        </div>
    )
}

export default WhyComCenter
