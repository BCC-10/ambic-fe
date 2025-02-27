import React from "react";
import WhyComRight from "../Componets/Elements/Why/WhyComRight";
import WhyComLeft from "../Componets/Elements/Why/WhyComLeft";
import WhyComCenter from "../Componets/Elements/Why/WhyComCenter";
import Content from "../Background/Rectangle 3.png";
import HeaderWhy from "../Background/HeaderWhy.png";
import Icon1 from "../ICons/circum_discount-1.png";
import Icon2 from "../ICons/fluent_food-pizza-20-regular.png";
import Icon3 from "../ICons/iconoir_shop.png";
import Icon4 from "../ICons/ph_clover.png";
import Icon5 from "../ICons/mdi_donation-outline.png";
import Icon6 from "../ICons/subway_world-1.png";

const Why = () => {
  return (
    <div className="relative flex flex-col min-h-screen bg-[#FFF8F4] opacity-85 items-center max-xl:min-h-380">
      <div className=" relative top-25 w-full max-w-[90%] flex flex-col py-9 px-5 h-auto items-center  max-h-auto max-xl:top-10 max-xl:gap-4">
        <h1 className="text-black font-Poppins font-semibold text-4xl max-sm:text-center max-xl:text-2xl">
          Kenapa Menggunakan
        </h1>
        <img src={HeaderWhy} alt="" className="w-75 h-auto max-xl:w-60 " />
      </div>
      <div className="absolute w-[90%] top-75 h-[50%] flex items-center justify-center gap-10 max-xl:hidden">
        <div className="w-100 h-100 flex items-center justify-center">
          <div className="relative flex flex-wrap justify-center gap-40 ">
            <WhyComRight
              Variant="justify-end"
              Content="Nikmati makanan enak dengan harga 1/2 atau kurang dari itu"
              Icon={Icon1}
            />
            <WhyComRight
              Variant="justify-end"
              Content="Selamatkan makanan di dekat Anda"
              Icon={Icon2}
            />
          </div>
        </div>
        <div className="w-100 h-100">
          <div className="relative w-full h-full flex content-center">
            <img src={Content} alt="" className="object-cover" />
          </div>
        </div>
        <div className="w-100 h-100 flex items-center justify-center">
          <div className="flex flex-col justify-center gap-40 ">
            <WhyComLeft
              Variant="justify-end"
              Content="Coba sesuatu yang baru dari kafe, toko roti, atau restoran terdekat"
              Icon={Icon3}
            />
            <WhyComLeft
              Variant="justify-end"
              Content="Membantu lingkungan dengan mengurangi limbah makanan"
              Icon={Icon6}
            />
          </div>
        </div>
      </div>
      <div className="absolute top-220 w-[90%] text-black h-[10%] p-5 flex items-center justify-center gap-25 max-xl:hidden">
        <div className=" max-w-auto p-3">
          <WhyComCenter
            Variant={"justify-center gap-4"}
            Content="Turut berkontribusi dalam kegiatan donasi"
            Icon={Icon4}
            Text={"text-2xl"}
            Size={"w-15"}
          />
        </div>
        <div className=" max-w-auto ">
          <WhyComCenter
            Variant={"justify-center gap-4"}
            Content="Pesan makanan degan lebih ramah lingkungan"
            Icon={Icon5}
            Text={"text-2xl"}
            Size={"w-15"}
          />
        </div>
      </div>
      {/* FOR MOBILE */}
      <div className="absolute top-60 min-h-200 min-w-3/4 flex flex-col items-center justify-start p-7 gap-5 xl:hidden ">
        <div className="w-80 h-auto bg-none drop-shadow-lg transition duration-400 ease-in-out hover:scale-105 hover:drop-shadow-xl">
          <img src={Content} alt="" className="object-cover" />
        </div>
        <div className="w-full h-full flex justify-center flex-col gap-5 ">
          <WhyComCenter
            Variant={"justify-center p-5 gap-3"}
            Content="Nikmati makanan enak dengan harga 1/2 atau kurang dari itu"
            Icon={Icon1}
            Text={"text-lg"}
            Size={"w-10"}
          />
          <WhyComCenter
            Variant={"justify-center p-5 gap-3"}
            Content="Selamatkan makanan di dekat Anda"
            Icon={Icon2}
            Text={"text-lg"}
            Size={"w-10"}
          />
          <WhyComCenter
            Variant={"justify-center p-5 gap-3"}
            Content="Coba sesuatu yang baru dari kafe, toko roti, atau restoran terdekat"
            Icon={Icon3}
            Text={"text-lg"}
            Size={"w-10"}
          />
          <WhyComCenter
            Variant={"justify-center p-5 gap-3"}
            Content="Membantu lingkungan dengan mengurangi limbah makanan"
            Icon={Icon6}
            Text={"text-lg"}
            Size={"w-10"}
          />
          <WhyComCenter
            Variant={"justify-center p-5 gap-3"}
            Content="Pesan makanan degan lebih ramah lingkungan"
            Icon={Icon5}
            Text={"text-lg"}
            Size={"w-10"}
          />
        </div>
      </div>
    </div>
  );
};

export default Why;
