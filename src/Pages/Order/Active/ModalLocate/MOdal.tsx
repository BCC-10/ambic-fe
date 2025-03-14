import React from 'react'
import Stars from "../../../../assets/ICons/OrderItem/Bintang.png"

interface OrderItem {
    onClose?: (e: any) => void
}
const MOdal: React.FC<OrderItem> = ({onClose}) => {
    return (
        <main className='flex items-start flex-col p-3'>
        
    </main>
    )
}

export default MOdal
