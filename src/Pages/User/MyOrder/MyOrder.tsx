import React, { useState, useEffect, useRef } from 'react';
import Sidebar from "../SideBar/SideBar";
import Navbar from '../../../Layouts/Navbar';
import Modal from '../../../Componets/Elements/Navbar/ModalLocate';
import Footer from "../../../Layouts/Footer";
import OrderItem from "./Component/OrderItem";
import { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { SwiperRef } from "swiper/react";
import Image1 from "../../../assets/Background/OrderItem/Rectangle 76.png"
import Image2 from "../../../assets/Background/OrderItem/Rectangle 76 (1).png"
import Image3 from "../../../assets/Background/OrderItem/Rectangle 76 (2).png"
import Image4 from "../../../assets/Background/OrderItem/Rectangle 76 (3).png"

const MyOrder = () => {
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
    const dummyProducts = [
        { id: "1", name: "Black Jack", price: 11000, image: Image1, quantity: 1, checked: false },
        { id: "2", name: "Alcapone", price: 12000, image: Image2, quantity: 1, checked: false },
        { id: "3", name: "Copa Banana", price: 8000, image: Image3, quantity: 1, checked: false },
        { id: "4", name: "Pisang Keju", price: 8000, image: Image4, quantity: 1 , checked: false},
    ];

    return (
        <main className='min-h-auto w-full overflow-hidden flex flex-col'>
            <div>
                <Navbar setOpen={setOpen} />
            </div>
            <div className='min-h-screen flex items-center justify-start flex-row bg-[#FFF8F4] py-5'>
                <Sidebar />
                <div className='w-full min-h-screen flex flex-col items-center justify-center gap-5'>
                    <div className='w-[80%] h-auto flex items-center justify-start flex-col gap-9'>
                        <h1 className='font-Poppins text-3xl font-semibold'>Pesanan Selesai</h1>
                        <div className='flex items-center justify-center gap-6 w-[82%] h-full flex-row '>
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
                                className='swiper '
                            >
                                {dummyProducts.map((_,index)=> (
                                    <SwiperSlide><OrderItem text="Nilai" product={_} key={_.id}/></SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <Footer />
            </div>
            <Modal open={open} onClose={() => setOpen(false)} />
        </main>
    );
};

export default MyOrder;
