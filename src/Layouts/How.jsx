import React from 'react'
import LogicHow from '../Componets/Elements/How/LogicHow'
import Image1 from '../assets/Background/How/pexels-dima-valkov-1186343-3864682.jpg'
import Image2 from '../assets/Background/How/pexels-dadanr-18284818.jpg'
import Image3 from '../assets/Background/How/brooke-lark-C1fMH2Vej8A-unsplash.jpg'
import Image4 from '../assets/Background/How/brooke-lark-oaz0raysASk-unsplash.jpg'
import Image5 from '../assets/Background/How/brooke-lark-IDTEXXXfS44-unsplash.jpg'


const How = () => {

    const Content = [
        {item: "Langkah Pertama", text:"Cari atau temukan makanan yang bisa diselamatkan", Image: Image1},
        {item: "Langkah Kedua", text:"Lorem ipsum dolor sit amet, consectetur adipiscing elit", Image: Image2},
        {item: "Langkah Ketiga", text:"Lorem ipsum dolor sit amet, consectetur adipiscing elit", Image: Image3},
        {item: "Langkah KeEmpat", text:"Lorem ipsum dolor sit amet, consectetur adipiscing elit", Image: Image4},
        {item: "Langkah KeLima", text:"Lorem ipsum dolor sit amet, consectetur adipiscing elit", Image: Image5}
    ]

    return (
        <div className='min-h-screen relative flex items-center justify-center bg-[#FFF8F4] max-xl:min-h-[80vh]'>
            
            <LogicHow slides={Content}/>
        
        </div>
    )
}

export default How
