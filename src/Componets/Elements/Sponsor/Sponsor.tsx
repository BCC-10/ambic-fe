import React, { useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "../../../assets/global.css";
import {Sponsors} from "../../../data/index";
import { Swiper as SwiperType } from "swiper";
import { SwiperRef } from "swiper/react";

interface CardItem {
    id: number;
    description: string;
}
const Sponsor: React.FC = () => {
    const prevRef = useRef<HTMLButtonElement | null>(null);
    const nextRef = useRef<HTMLButtonElement | null>(null);
    const swiperRef = useRef<SwiperType | null>(null); // Simpan referensi Swiper
    const SwiperRef = useRef<SwiperRef  | null>(null); // Simpan referensi Swiper



    useEffect(() => {
        if (swiperRef.current && prevRef.current && nextRef.current) {
            (swiperRef.current.params.navigation as any).prevEl = prevRef.current;
            (swiperRef.current.params.navigation as any).nextEl = nextRef.current;
            swiperRef.current.navigation.init();
            swiperRef.current.navigation.update();
        }
    }, []);

    return (
        <div className='overflow-hidden relative flex flex-col gap-7 max-md:gap-1 max-sm:gap-1 top-10'>
            <div className='flex items-center justify-center w-full px-2'>
                <h1 className='font-Poppins font-bold text-3xl text-white'>Sponsor</h1>
            </div>
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
                    640: { slidesPerView: 2, spaceBetween: 5 },
                    768: { slidesPerView: 3, spaceBetween: 10 },
                    1024: { slidesPerView: 4, spaceBetween: 20 }
                }}
                onBeforeInit={(swiper) => {
                    swiperRef.current = swiper as SwiperType; // Simpan referensi Swiper
                }}
                ref={SwiperRef}
                className='swiper w-full'
            >
                {Sponsors.map((card: CardItem) => (
                    <SwiperSlide key={card.id} className='w-full'>
                        <div className="bg-none rounded-xl p-6 text-center w-full flex items-center justify-center">
                            <img src={card.description} alt="" className='w-full h-full  max-sm:w-1/2 object-cover bg-none drop-shadow-xl '/>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className='flex justify-center items-center gap-4 relative top-3'>
                <button ref={prevRef} className='flex items-center justify-center w-12 h-12 transition-all duration-330 cursor-pointer'>
                    <FaChevronLeft className='hover:text-black transition-all duration-330 ease-in-out text-white' size={30}/>
                </button>
                <button ref={nextRef} className='flex items-center justify-center w-12 h-12 transition-all duration-330 cursor-pointer'>
                    <FaChevronRight className='hover:text-black transition-all duration-330 ease-in-out text-white' size={30}/>
                </button>
            </div>
        </div>
    );
};

export default Sponsor;
