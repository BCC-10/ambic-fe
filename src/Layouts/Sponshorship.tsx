import React from 'react'
import Sponsors from "../Componets/Elements/Sponsor/SPonsor"


const Sponshorship: React.FC = () => {

    const Item = () => {
        return (
            <>
                <div className='bg-white p-6 rounded-lg w-50 h-25 drop-shadow-lg'/>
            </>
        )
    }

    return (
        <div className='min-h-[56.63vh] max-md:h-[34.51vh] max-sm:h-[44.2vh] bg-teal-700/85 flex items-center justify-center max-lg:pt-3 max-md:pt-1'>
            <div className='flex items-center justify-center w-[90%] h-[80%] p-5'>
            <Sponsors/>
        </div>
    </div>
    )
}

export default Sponshorship
