import React, {useState, useEffect} from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const LogicHero = ({ children: slides, autoSlide = false, autoSlideInterval = 3000 }) => {
    const [curr, setCurr] = useState(0);

    const prev = () => setCurr((curr) => (curr === 0 ? slides.length -1 : curr - 1))
    
    const next = () => setCurr((curr) => (curr === slides.length -1 ? 0 : curr + 1))

    useEffect(() => {
        if(!autoSlide) return
        const slideInterval = setInterval(next, autoSlideInterval) 
        return () => clearInterval(slideInterval)
    }, [])

    return (
        <div className="overflow-hidden relative">
            <div className="flex transition-transform ease-out duration-500" style={{ transform: `translateX(-${curr * 100}%)`}}>{slides}</div>
            <div className="absolute inset-0 flex items-center justify-between p-4 rounded-full ">
                <button onClick={prev} className="p-1 rounded-full hover:text-white transition duration-300 ease cursor-pointer hover:shadow-md">
                    <FaChevronLeft size={40}/>
                </button>
                <button onClick={next} className="p-1  rounded-full hover:text-white transition duration-300 ease-in cursor-pointer hover:shadow-md ">
                    <FaChevronRight size={40}/>
                </button>
            </div>
            {/* OVERLAY GRADIENT */}
            <div className="absolute block w-full h-[30%] bottom-0" style={{background: "linear-gradient(0deg, rgba(255, 248, 244, 1) 3%, rgba(255, 255, 255, 0) 50%)",}}/>
            {/* POINT BELOW */}
            <div className="absolute bottom-4 right-0 left-0">
                <div className="flex items-center justify-center gap-2">
                    {slides.map((_, idx) => (
                        <div key={idx} className={`transition-all w-3 h-3 outline outline-black rounded-full ${curr === idx ? "p-2 bg-black" : "bg-opacity-50"}`} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LogicHero;
