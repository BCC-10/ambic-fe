import React, {useState, useEffect, useRef} from 'react'
import Navbar from '../../../Layouts/Navbar';
import Modal from '../../../Componets/Elements/Navbar/ModalLocate';
import Footer from "../../../Layouts/Footer";
import OrderItem from "../../User/MyOrder/Component/OrderItem";
import { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { SwiperRef } from "swiper/react";
import { dummyProducts } from '../../../data';
import { useCart, cartItem } from "../../../Componets/Util/useCart";
import axios from 'axios';

interface transaction {
    id: string;
    payment: {
        id: string;
        order_id: string;
        custom_field1: string
        transaction_status: string;
        status_message: string;
        payment_type: string;
        fraud_status: string;
        transaction_time: string;
        settlement_time: string;
    }
    invoice: string;
    total: number;
    status: string;
    note: string
    datetime: string
}



const OrderDone = () => {
    const [open, setOpen] = useState<boolean>(false);
    const prevRef = useRef<HTMLButtonElement | null>(null);
    const nextRef = useRef<HTMLButtonElement | null>(null);
    const swiperRef = useRef<SwiperType | null>(null); // Simpan referensi Swiper
    const SwiperRef = useRef<SwiperRef  | null>(null);
    const [transaction, setTransaction] = useState<transaction>()
    const [product, setProduct] = useState<cartItem[]>([])


    // Pastikan referensi tombol navigasi tersedia sebelum menginisialisasi swiper
    useEffect(() => {
        if (swiperRef.current && prevRef.current && nextRef.current) {
            (swiperRef.current.params.navigation as any).prevEl = prevRef.current;
            (swiperRef.current.params.navigation as any).nextEl = nextRef.current;
            swiperRef.current.navigation.init();
            swiperRef.current.navigation.update();
        }
    }, []);

    useEffect(() => {
        const fatchingDoneOrder = async () => {
            try{
                const response = await axios.get("https://ambic.live:443/api/v1/transactions?status=finish",  {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    }
                })
                setTransaction(response.data.payload.transactions)
                for (const transaction of response.data.payload.transactions) {
                    const responseProduct = await axios.get(`https://ambic.live:443/api/v1/transactions/${transaction.id}`, {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        }
                    })
                    responseProduct.data.payload.transaction_details.items.forEach((item) => {
                        item.transaction_id = transaction.id
                    })
                    setProduct([...product,...responseProduct.data.payload.transaction_details.items])
                    // console.log(responseProduct.data.payload.transaction_details.items)
                }
            }catch (err) {
                console.log(err)
            }
        }
        fatchingDoneOrder()
    },[])

    return (
        <main className='w-full min-h-screen flex flex-col overflow-hidden '>
            <div>
                <Navbar setOpen={setOpen} open={undefined}/>
            </div>
            <div className='min-h-[120vh] w-full flex items-center justify-center bg-[#FFF8F4] p-30 flex-col gap-10'>
                <h1 className='font-Poppins font-semibold text-4xl'>Pesanan Selesai</h1>
                <div className='w-full h-full items-center justify-center '>
                <Swiper
                    modules={[Navigation, Autoplay]}
                    style={{cursor: "grab"}}
                    onTouchStart={() => {
                        const swiperEl = document.querySelector('.swiper') as HTMLElement | null;
                        swiperEl?.style.setProperty("cursor", "grabbing");
                    }}
                    onTouchEnd={() => {
                        const swiperEl = document.querySelector('.swiper') as HTMLElement | null;
                        swiperEl?.style.setProperty("cursor", "grab");
                    }}
                    slidesPerView={4}
                    spaceBetween={5}
                    autoplay={{delay: 3000}}
                    navigation={{
                        prevEl: prevRef.current,
                        nextEl: nextRef.current
                    }}
                    breakpoints={{
                        640: { slidesPerView: 1, spaceBetween: 2 },
                        768: { slidesPerView: 3, spaceBetween: 3 },
                        1024: { slidesPerView: 4, spaceBetween: 5 }
                    }}
                    onBeforeInit={(swiper) => {
                        swiperRef.current = swiper as SwiperType; 
                    }}
                    ref={SwiperRef}
                    className='swiper w-full'
                >
                        {product.map((_, idex)=> (
                            <SwiperSlide key={idex}><OrderItem text="Nilai"  product={_}/></SwiperSlide>
                        ))}
                        
                    </Swiper>
                </div>
            </div>
            <div>
                <Footer />
            </div>
            <Modal open={open} onClose={() => setOpen(false)} />
        </main>
    )
}

export default OrderDone
