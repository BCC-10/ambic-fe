import React, { useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "../../../assets/global.css";

const LogicMitra = () => {
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    const swiperRef = useRef(null); // Simpan referensi Swiper

    const cards = [
        { id: 1, title: "Card 1", description: "This is the first card" },
        { id: 2, title: "Card 2", description: "This is the second card" },
        { id: 3, title: "Card 3", description: "This is the third card" },
        { id: 4, title: "Card 4", description: "This is the fourth card" },
        { id: 5, title: "Card 5", description: "This is the fifth card" },
        { id: 6, title: "Card 6", description: "This is the sixth card" },
        { id: 7, title: "Card 7", description: "This is the seventh card" },
        { id: 8, title: "Card 8", description: "This is the eighth card" },
        { id: 9, title: "Card 9", description: "This is the ninth card" },
        { id: 10, title: "Card 10", description: "This is the tenth card" }
    ];

    useEffect(() => {
        if (swiperRef.current && prevRef.current && nextRef.current) {
            swiperRef.current.params.navigation.prevEl = prevRef.current;
            swiperRef.current.params.navigation.nextEl = nextRef.current;
            swiperRef.current.navigation.init();
            swiperRef.current.navigation.update();
        }
    }, []);

    return (
        <div className='overflow-hidden relative flex flex-col gap-7 max-md:gap-10 max-sm:gap-15'>
            <div className='flex items-center justify-center w-full px-2'>
                <h1 className='font-Poppins font-bold text-3xl text-white'>Mitra</h1>
            </div>
            <Swiper
                ref={swiperRef} 
                modules={[Navigation, Autoplay]}
                style={{ cursor: "grab" }}
                onTouchStart={() => (document.querySelector('.swiper').style.cursor = "grabbing")}
                onTouchEnd={() => (document.querySelector('.swiper').style.cursor = "grab")}
                slidesPerView={1}
                spaceBetween={20}
                autoplay={{ delay: 3300 }}
                navigation={{
                    prevEl: prevRef.current,
                    nextEl: nextRef.current
                }}
                breakpoints={{
                    640: { slidesPerView: 2, spaceBetween: 20 },
                    768: { slidesPerView: 4, spaceBetween: 40 },
                    1024: { slidesPerView: 5, spaceBetween: 50 }
                }}
                onBeforeInit={(swiper) => {
                    swiperRef.current = swiper; // Simpan referensi Swiper
                }}
                className='mySwiper w-full'
            >
                {cards.map((card) => (
                    <SwiperSlide key={card.id} className='w-full'>
                        <div className="bg-white shadow-lg rounded-xl p-6 text-center w-full">
                            <h2 className="text-xl font-bold">{card.title}</h2>
                            <p className="text-gray-600">{card.description}</p>
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

export default LogicMitra;
