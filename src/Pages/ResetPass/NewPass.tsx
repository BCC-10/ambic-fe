import React from "react";
import Input from "../../Componets/Elements/Input/input";
import { PassNew } from "../../data/index";
import Logo from "../../assets/ICons/Reset/Frame 258.png";
import Pattern from "../../assets/Pettern/image 11.png";

const NewPass: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-white flex flex-row-reverse items-center justify-center w-full p-5 gap-5">
      <div className="relative lg:left-75 w-[15%] max-2xl:w-[20%] max-xl:w-[25%] max-lg:w-[30%] max-md:w-[40%] max-sm:w-[60%] h-auto flex flex-col justify-start p-2 gap-4">
        <h1 className="font-Poppins font-semibold text-3xl">
          Buat Password Baru
        </h1>
        <p className="">
          Kata sandi baru Anda harus berbeda dari kata sandi yang digunakan
          sebelumnya
        </p>
        {PassNew.map((_, idx) => (
          <Input
            key={idx}
            type={_.type}
            placeholder={_.placeholder}
            content={_.content}
            icon={_.icon}
            className="w-full"
            color="text-gray-600"
          />
        ))}
        <div className="flex justify-center">
          <button
            type="submit"
            className="w-[60%] h-[20%] p-2 text-white font-Poppins font-semibold text-lg bg-teal-700/85 rounded-full drop-shadow-xl "
          >
            Reset Pasword
          </button>
        </div>
      </div>
      <div className="group max-lg:hidden bg-teal-700/85 rounded-r-[321px] absolute left-0 w-[40%] h-screen flex items-center justify-center ">
        <div className="w-3/4 h-3/4 flex items-center justify-center">
          <img
            src={Pattern}
            alt=""
            className="absolute top-0 left-0 w-full h-full object-cover rounded-r-[321px] opacity-50"
          />
          <img src={Logo} alt="" className="z-10 w-full object-cover " />
        </div>
      </div>
    </div>
  );
};

export default NewPass;
