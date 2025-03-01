import React from 'react'
import "../../../assets/global.css"

const PromoNChat = (props) => {

    const {Content, Icon, Variant} = props;

    return (
        <div className={`fixed bg-white right-8 ${Variant} flex items-center justify-center w-35 h-17 font-semibold font-Poppins text-2xl rounded-lg drop-shadow-lg gap-3 transition-transform duration-330 ease-in hover:scale-110 cursor-pointer `}>
            {Icon}
            {Content}
        </div>
    )
}

export default PromoNChat
