import React, {useState, useEffect, useRef} from 'react'
import Navbar from '../../Layouts/Navbar';
import Modal from '../../Componets/Elements/Navbar/ModalLocate';
import Footer from "../../Layouts/Footer";
import { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { SwiperRef } from "swiper/react";
import OrderItem from "../User/MyOrder/Component/OrderItem";
import {cards} from "../../data/index";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../Componets/Util/useCart";
import { dummyProducts } from '../../data/index';

interface CardItem {
    id: number;
    description: string;
}
const Order = () => {
    const [open, setOpen] = useState<boolean>(false);
    const prevRef = useRef<HTMLButtonElement | null>(null);
    const nextRef = useRef<HTMLButtonElement | null>(null);
    const swiperRef = useRef<SwiperType | null>(null); // Simpan referensi Swiper
    const SwiperRef = useRef<SwiperRef  | null>(null);
    const navigate = useNavigate();
    const {addToCart} = useCart();

    // Pastikan referensi tombol navigasi tersedia sebelum menginisialisasi swiper
    useEffect(() => {
        if (swiperRef.current && prevRef.current && nextRef.current) {
            (swiperRef.current.params.navigation as any).prevEl = prevRef.current;
            (swiperRef.current.params.navigation as any).nextEl = nextRef.current;
            swiperRef.current.navigation.init();
            swiperRef.current.navigation.update();
        }
    }, []);


    return (
        <main className='relative min-h-screen w-full flex flex-col overflow-hidden '>
            <div>
                
                <Navbar setOpen={setOpen} open={undefined}/>
            </div>
            <div className='w-full min-h-[20vh] flex items-center justify-center bg-teal-700 relative top-30 gap-20'>
                <Link to="/order/active" className="px-20 py-2 bg-[#FFF8F4] rounded-full drop-shadow-lg text-teal-700 font-Poppins font-semibold transition-transform duration-330 hover:scale-95 ease-in cursor-pointer">Pesanan Aktif</Link>
                <Link to="/order/done" className="px-20 py-2 bg-[#FFF8F4] rounded-full drop-shadow-lg text-teal-700 font-Poppins font-semibold transition-transform duration-330 hover:scale-95 ease-in cursor-pointe">Pesanan Selesai</Link>
            </div>
            <div className='relative top-30 bg-[#FFF8F4] min-h-[60vh] w-full flex items-center justify-center flex-col gap-5'>
                <h1 className='font-Poppins text-center text-3xl font-semibold'>Di Sekitar Kamu</h1>
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
                    className='swiper w-[70%]'
                >
                        {dummyProducts.map((_,index)=> (
                            <SwiperSlide ><OrderItem key={_.id} onClick={() => navigate("/order/description")} text="+ Keranjang" product={_} onAddToCart={() => _ && addToCart(_)}/></SwiperSlide>
                        ))}
                        
                </Swiper>
            </div>
            <div className='relative top-28 bg-teal-700 w-full min-h-[60vh] flex items-center justify-center flex-col'>
            <h1 className=' absolute font-Poppins text-center text-3xl font-semibold top-10 text-white '>Mitra</h1>
            <Swiper
                
                modules={[Navigation, Autoplay]}
                style={{ cursor: "grab" }}
                onTouchStart={() => {
                    const swiperEl = document.querySelector('.swiper') as HTMLElement | null;
                    swiperEl?.style.setProperty("cursor", "grabbing");
                }}
                onTouchEnd={() => {
                    const swiperEl = document.querySelector('.swiper') as HTMLElement | null;
                    swiperEl?.style.setProperty("cursor", "grab");
                }}
                slidesPerView={1}
                spaceBetween={5}
                autoplay={{ delay: 3300 }}
                navigation={{
                    prevEl: prevRef.current,
                    nextEl: nextRef.current
                }}
                breakpoints={{
                    640: { slidesPerView: 1, spaceBetween: 5 },
                    768: { slidesPerView: 2, spaceBetween: 10 },
                    1024: { slidesPerView: 3, spaceBetween: 20 }
                }}
                onBeforeInit={(swiper) => {
                    swiperRef.current = swiper as SwiperType; // Simpan referensi Swiper
                }}
                ref={SwiperRef}
                className='swiper w-[50%] absolute bottom-20'
            >
                {cards.map((card: CardItem) => (
                    <SwiperSlide key={card.id} className='w-full'>
                        <div className="bg-none rounded-xl p-6 text-center w-full flex items-center justify-center">
                            <img src={card.description} alt="" className='w-full h-full  max-sm:w-1/2 object-cover bg-none drop-shadow-xl'/>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            </div>
            <div className='absolute -bottom-3 flex items-center justify-center w-full '>
                <Footer/>
            </div>
            <Modal open={open} onClose={() => setOpen(false)} />
        </main>
    )
}

export default Order
