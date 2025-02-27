import React, { useState } from "react";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";

const LogicHow = ({ slides }) => {
    const [curr, setCurr] = useState(0);

    const prev = () =>
        setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1));

    const next = () =>
        setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1));

    return (
    <div className='relative w-[95%] h-[80%] flex items-center justify-center gap-5 max-xl:flex-col max-xl:bottom-15 max-lg:bottom-45 max-sm:bottom-40'>
        <div className=' w-[47%] h-[90%] flex flex-col items-center justify-center gap-10 '>
            <div className=' w-[80%] h-[15%] flex items-center justify-center text-teal-700/85'>
                <h1 className='font-Poppins font-semibold text-3xl text-center max-xl:text-2xl max-lg:text-xl max-sm:text-lg'>Bagaimana cara memesan makanan</h1>
            </div>
            <div className=' w-[85%] h-[30%]  flex items-center justify-center '>
                <div className="relative flex flex-col items-center w-full ">
                    {/* Tampilan Text */}
                    <div className="overflow-hidden relative w-full h-10 flex items-center justify-center  ">
                        <h1 className="text-2xl text-teal-700/85 font-semibold font-Poppins max-xl:text-xl max-lg:text-lg max-sm:text-sm" >{slides[curr].item}</h1>
                    </div>
                    {/* Tombol Prev & Next */}
                    <div className="flex justify-between w-[135%] px-4 max-lg:w-[160%] max-md:w-[180%] ">
                        <button
                        onClick={prev}
                        className=" hover:text-teal-700/85 transition duration-330 ease-in-out cursor-pointer"
                        >
                            <FaArrowLeftLong size={50}/>
                        </button>
                        <button
                        onClick={next}
                        className=" hover:text-teal-700/85 transition duration-330 ease-in-out cursor-pointer"
                        >
                            <FaArrowRightLong size={50}/>
                        </button>
                    </div>
                    {/* Display Text */}
                    <div className="overflow-hidden relative bottom-12 w-full h-20 flex items-center justify-center  ">
                        <h1 className="text-2xl font-semibold font-Poppins text-center max-xl:text-xl max-lg:text-lg  max-sm:text-sm text-teal-700/85">{slides[curr].text}</h1>
                    </div>
                </div>
            </div>
        </div>
        <div className=' w-[47%] h-[90%] flex flex-col items-center justify-center gap-25'>
            <div className='overflow-hidden relative w-[70%] h-[60%] flex items-center justify-center rounded-lg  bg-none drop-shadow-lg' >
                <AnimatePresence mode="wait">
                        <motion.img
                            key={curr} // Agar animasi berjalan saat slide berubah
                            src={slides[curr].Image}
                            alt=""
                            className="object-cover w-full h-full transition-transform ease-out duration-500"
                            initial={{ x: -100, opacity: 0 }} // Gambar masuk dari kanan
                            animate={{ x: 0, opacity: 1 }} // Gambar ke tengah
                            exit={{ x:  100, opacity:  0}} // Gambar keluar ke kiri
                            transition={{ duration: 0.33, ease: "easeInOut" }} // Efek transisi lebih smooth
                        />
                </AnimatePresence>
            </div>
        </div>
    </div>
    );
};

export default LogicHow;
