import React, {useState, useEffect, useRef} from 'react'
import Navbar from '../../../Layouts/Navbar';
import Modal from '../../../Componets/Elements/Navbar/ModalLocate';
import Footer from "../../../Layouts/Footer";
import OrderItem from "../../User/MyOrder/Component/OrderItem";
import { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { SwiperRef } from "swiper/react";

const OrderDone = () => {
    const [open, setOpen] = useState<boolean>(false);
    const prevRef = useRef<HTMLButtonElement | null>(null);
    const nextRef = useRef<HTMLButtonElement | null>(null);
    const swiperRef = useRef<SwiperType | null>(null); // Simpan referensi Swiper
    const SwiperRef = useRef<SwiperRef  | null>(null);

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
                    className='swiper w-[80%]'
                >
                        {[...Array(5)].map((_,index)=> (
                            <SwiperSlide><OrderItem text="Nilai"/></SwiperSlide>
                        ))}
                        
                    </Swiper>
                </div>
            </div>
            <div>
                <Footer />
            </div>
        </main>
    )
}

export default OrderDone
