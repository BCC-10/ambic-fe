import React from "react";
import Input from "../../Componets/Elements/Input/input";
import { MdEmail } from "react-icons/md";
import Logo from "../../assets/ICons/Reset/Frame 258.png";
import Pattern from "../../assets/Pettern/image 11.png";
const Reset: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-white flex flex-row items-center justify-center w-full p-5 gap-5">
      <div className="relative lg:right-75 w-[15%] max-2xl:w-[20%] max-xl:w-[25%] max-lg:w-[30%] max-md:w-[40%] max-sm:w-[60%] h-auto flex flex-col justify-start p-2 gap-4">
        <h1 className="font-Poppins font-semibold text-3xl">Reset Password</h1>
        <p className="">
          Masukkan email yang terkait dengan akun Anda dan kami akan mengirim
          email dengan instruksi untuk mengatur ulang kata sandi Anda
        </p>
        <Input
          type="email"
          placeholder="Enter Your Email"
          content="Alamat Email"
          icon={<MdEmail className="relative bottom-8 left-[100%]"/>}
          className="w-full"
          color="text-gray-600"
        />
        <div className="flex justify-center">
          <button
            type="submit"
            className="w-[60%] h-[20%] p-2 text-white font-Poppins font-semibold text-lg bg-teal-700/85 rounded-full drop-shadow-xl "
          >
            Kirim Email
          </button>
        </div>
      </div>
      <div className="max-lg:hidden bg-teal-700/85 rounded-l-[321px] absolute right-0 w-[40%] h-screen flex items-center justify-center ">
        <div className="w-3/4 h-3/4 flex items-center justify-center">
          <img
            src={Pattern}
            alt=""
            className="absolute top-0 left-0 w-full h-full object-cover rounded-l-[321px] opacity-50"
          />
          <img src={Logo} alt="" className="z-10 w-full object-cover " />
        </div>
      </div>
    </div>
  );
};

export default Reset;
