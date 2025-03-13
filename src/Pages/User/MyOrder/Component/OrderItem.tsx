import React from 'react'

import Stars from "../../../../assets/ICons/OrderItem/Bintang.png"
import { cartItem } from "../../../../Componets/Util/useCart";

interface OrderItem{
    onClick?: (e:any) => void
    text: string
    product?: cartItem;
    onAddToCart?: (e:any) => void
    pickup_time?: string
    end_pickup_time?: string
    stock?: number ;
    star?: number;
    count_rating?: number;
    photo?: string
}

const OrderItem : React.FC<OrderItem> = ({onClick, text, product, onAddToCart, pickup_time, end_pickup_time, stock, star, count_rating, photo}) => {
    
    return (
        <main onClick={onClick} className='flex items-start flex-col p-3 cursor-pointer'>
            <div className='relative min-h-[370px] max-w-[300px] flex items-start justify-start flex-col bg-white drop-shadow-xl rounded-3xl'>
                <div className='relative w-full flex items-center justify-center rounded-xl h-1/4  '>
                    <img src={product?.image} alt="" />
                        <p className='bg-white/80 px-1.5 absolute rounded-full right-4 bottom-3'>0.8Km</p>
                        <p className='bg-red-400/75 px-1.5 py-0.5 absolute rounded-full left-4 top-3'>40%</p>
                </div>
            <div className='w-full h-1/4 p-5 flex flex-col'>
                <label htmlFor="" className='font-Poppins font-normal text-teal-700'>{stock}Tersedia</label>
                <h4 className='font-Poppins text-lg font-medium'>{product?.name}</h4>
                <p className='text-sm'>Waktu Pengambilan, {pickup_time} - {end_pickup_time}</p>
            </div>
            <div className='relative w-full h-full p-5 flex flex-col gap-3'>
                <h3 className='text-base font-Poppins font-medium'>Rp {new Intl.NumberFormat("id-ID").format(product?.price ?? 0)} <span className='line-through text-xs relative -top-1 text-gray-500'>Rp 30.000</span></h3>
                <img src={Stars} alt="" className='w-5'/>
                <h5 className='absolute top-15 left-13 text-gray-500 text-sm '>{star} {(count_rating)}</h5>
                <div className='w-26 h-7 bg-teal-700 rounded-full flex items-center justify-center drop-shadow-lg transition-transform duration-330 hover:scale-95 cursor-pointer absolute right-5 bottom-4 p'>
                    <button className='text-white font-Poppins text-sm font-medium cursor-pointer' onClick={onAddToCart}>{text}</button>
                </div>
            </div>
        </div>
        </main >
    )
}

export default OrderItem
