import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { ID, GB } from "country-flag-icons/react/3x2";
import "../../assets/global.css";
import { VscAccount } from "react-icons/vsc";
import { IoLocationOutline } from "react-icons/io5";
import Cart from "../Background/Group.png";
import { FaBars, FaTimes } from "react-icons/fa";
import IconButton from "../Componets/Elements/Navbar/IconButton";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const menuItems = [
    { text: "Beranda" },
    { text: "Food Waste" },
    { text: "Mitra" },
    { text: "Donasi" },
    { text: "Relawan" },
    { text: "Tentang Kami" },
  ];

  const [isOpen, setIsOpen] = useState(true);

  return (
    <nav
      className={`fixed flex justify-between flex-col bg-white z-50 p-3 w-full py-5 transition duration-300 ease-in ${
        isScrolled ? "bg-white shadow-xl py-3" : "bg-transparent"
      }`}
    >
      {/* LOGO  SECTION*/}
      <div className="flex justify-between w-full px-12">
        <div className="bg-[#D9D9D9] w-25 h-12 flex justify-center items-center font-bold font-Poppins hover:scale-110 transition duration-330 cursor-pointer ease-in ">
          LOGO
        </div>
        {/* HUMBERGER MENU */}
        <div className="flex flex-row gap-4 xl:hidden items-center justify-center ">
          <div className="flex w-10 h-10 justify-center items-center  ">
            <FaSearch
              className="hover:text-[#1d8583] transition duration-300 cursor-pointer ease-in"
              size={20}
            />
          </div>
          <div className="flex w-10 h-10 p-1 justify-center items-center ">
            <ID title="United States" className="rounded-xs" />
          </div>
          <div
            className="flex xl:hidden items-center cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? <FaBars size={30} /> : <FaTimes size={30} />}
          </div>
        </div>
        {/* SEARCH */}
        <div className="hidden xl:flex justify-center items-center w-68 gap-3">
          {/* Wrapper untuk Search & Flag (Gunakan `group`) */}
          <div className="flex items-center gap-4 group ">
            {/* Search Icon - Bergeser saat hover pada Flag */}
            <div className="flex w-10 h-10 justify-center items-center transition-transform duration-300 ease-in group-hover:-translate-x-10">
              <FaSearch className="hover:text-[#1d8583] transition duration-300 cursor-pointer ease-in" />
            </div>
            {/* Flag Button */}
            <div className="flex w-10 h-10 justify-center items-center">
              <IconButton text="" color="bg-white">
                <ID title="Indonesia" className="rounded-xs w-6 h-6" />
                <GB title="Indonesia" className="rounded-xs w-6 h-6" />
              </IconButton>
            </div>
          </div>
          {/* Daftar Button */}
          <div className="w-30 mx-3 flex items-center">
            <div className="rounded-full bg-[#D9D9D9] px-3 py-2 w-full h-9 flex items-center justify-center gap-2 hover:scale-110 transition duration-335 cursor-pointer ease-in">
              <VscAccount className="font-bold" />
              <span className="font-Poppins font-semibold">Daftar</span>
            </div>
          </div>
        </div>
      </div>
      {/* MENU SECTION */}
      <div className="hidden scale-0 xl:flex xl:scale-100 justify-between w-full mt-6 px-12 list-none no-underline transition-transform duration-330 ease-out ">
        <div className="flex gap-12 font-Poppins font-semibold items-center">
          {menuItems.map((items, index) => (
            <button
              className="cursor-pointer hover:text-[#1d8583] hover:opacity-85 transition duration-300 ease-in"
              key={index}
            >
              <span>{items.text}</span>
            </button>
          ))}
        </div>
        <div className="flex gap-1 items-center jsutify-center w-90 h-8 ">
          <div className="rounded-full bg-[#1d8583] opacity-85 flex items-center justify-center font-Poppins font-semibold px-5 py-1 mx-2 w-30 text-white hover:scale-110 transition duration-330 cursor-pointer ease-in">
            Pesan
          </div>
          <div className="rounded-full bg-[#1D8583] opacity-85 flex items-center justify-center font-Poppins font-semibold px-5 py-1 w-40 text-white hover:scale-110 transition duration-330 ease-in cursor-pointer">
            <IoLocationOutline /> <span className="ml-1">Atur Lokasi</span>
          </div>
          <div className="flex justify-center items-center hover:scale-110 transition duration-330 cursor-pointer ease-in">
            <img src={Cart} alt="" className="w-7 h-7 ml-2" />
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`xl:hidden bg-white/30 absolute top-22 left-0 min-w-full min-h-screen sm:min-w-full backdrop-blur-xl flex flex-col items-center justify-center transition-transform duration-330 ease-out ${
          isOpen ? "translate-x-full" : "translate-x-0"
        }`}
      >
        <div className="flex flex-col gap-4 font-Poppins font-semibold items-center">
          <div className="w-30 mx-3 flex items-center">
            <div className="rounded-full bg-[#D9D9D9] px-3 py-2 w-full h-9 flex items-center justify-center gap-2 hover:scale-110 transition duration-335 cursor-pointer ease-in">
              <VscAccount className="font-bold" />
              <span className="font-Poppins font-semibold">Daftar</span>
            </div>
          </div>
          {menuItems.map((items, index) => (
            <button
              className="cursor-pointer hover:text-[#1D8583] hover:opacity-85 transition duration-300 ease-in"
              key={index}
            >
              <span>{items.text}</span>
            </button>
          ))}
          <div className="rounded-full bg-[#D9D9D9] opacity-85 flex items-center justify-center font-Poppins font-semibold px-5 py-1 mx-2 w-30 hover:scale-110 transition  duration-330 cursor-pointer ease-in">
            Pesan
          </div>
          <div className="rounded-full bg-[#D9D9D9] opacity-85 flex items-center justify-center font-Poppins font-semibold px-5 py-1 w-40 hover:scale-110 transition duration-330 ease-in cursor-pointer">
            <IoLocationOutline /> <span className="ml-1">Atur Lokasi</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
