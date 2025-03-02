import React from 'react'
import LogicHow from '../Componets/Elements/How/How.tsx'
import  {Content} from "../data/index.tsx"



const How: React.FC = () => {



    return (
        <div className='min-h-screen relative flex items-center justify-center bg-[#FFF8F4] max-xl:min-h-[80vh] p-5'>
            
            <LogicHow slides={Content}/>
        
        </div>
    )
}

export default How
