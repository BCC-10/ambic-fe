import React from "react";
import Image from "../assets/Background/Hero/Rectangle 92.png"

const Hero: React.FC = () => {


  return (
    <div className="relative flex mt-30 ">
        <img src={Image} alt="" className="w-full "/>
        {/* OVERLAY GRADIENT */}
        <div className="absolute flex items-center justify-center  w-full h-[30%] bottom-0 " style={{background: "linear-gradient(0deg, rgba(255, 248, 244, 1) 3%, rgba(255, 255, 255, 0) 50%)",}}>
          <h1 className="w-[95%] text-center text-wrap font-Poppins text-[25px] font-semibold absolute bottom-0 max-xl:text-xl leading-8 text-black max-lg:text-lg max-md:text-sm [text-shadow:_2px_2px_9px_white] max-lg:leading-5 max-md:leading-5 max-sm:leading-4" >Food weste adalah makanan yang masih layak konsumsi, tetap dibuang sebagai sampah. Food weste bisa terjadi karena makanan tidak dihabiskan, kadaluwarsa, atau karena kelalaian proses produksi, pengolahan, dan distribusi</h1>
        </div>
    </div>
  );
};

export default Hero;
