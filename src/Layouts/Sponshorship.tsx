import React from 'react'
import Sponsors from "../Componets/Elements/Sponsor/Sponsor"


const Sponshorship: React.FC = () => {

    return (
        <div className='min-h-[56.63vh] max-md:h-[34.51vh] max-sm:h-[44.2vh] bg-teal-700/85 flex items-center justify-center max-lg:pt-3 max-md:pt-1'>
            <div className='flex items-center justify-center w-[60%] h-[80%] p-5 max-2xl:w-[80%]'>
            <Sponsors/>
        </div>
    </div>
    )
}

export default Sponshorship
