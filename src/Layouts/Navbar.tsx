import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { ID, GB } from "country-flag-icons/react/3x2";
import "../../src/assets/global.css";
import { VscAccount } from "react-icons/vsc";
import { IoLocationOutline } from "react-icons/io5";
import { FaBars, FaTimes } from "react-icons/fa";
import IconButton from "../Componets/Elements/Navbar/IconButton.tsx";
import Logo from "../assets/ICons/Navbar/Frame 18.png"
import Cart from "../../src/assets/ICons/Navbar/Group.png";
import {menuItems} from "../data/index.tsx";
import Modal from "../Componets/Elements/Navbar/ModalLocate";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {useAuth} from "../Componets/Util/AuthContext.tsx"

interface NavbarProps  {
  setOpen : (React.Dispatch<React.SetStateAction<boolean>>)
  open? : boolean | undefined
}

const LocateButton: React.FC<NavbarProps> = ({open,setOpen}) => {

  return (
    <button className="rounded-full bg-[#1D8583] opacity-85 flex items-center justify-center font-Poppins font-semibold px-5 py-1 w-40 text-white hover:scale-95 drop-shadow-lg transition duration-300 ease-in cursor-pointer focus:scale-100 focus:outline-2 focus:outline-offset-2 focus:outline-teal-700 active:bg-teal-500" onClick={() => setOpen(true)}>
          <IoLocationOutline /> <span className="ml-1">Atur Lokasi</span>
    </button>
  )
}
const Navbar: React.FC<NavbarProps> = ({open,setOpen}) => {
  
  const Navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token)
  }, [])



  const handleButtonClick = () => {
    if(isLoggedIn) {
      Navigate("/user/profile")
  } else {
    Navigate("/register")
  }
}
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const {isAuthenticated, logout} = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 50) {
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

  const [isOpen, setIsOpen] = useState<boolean>(true);

  const StyleMenu: React.FC = () => {
    const location = useLocation();

    return (
      <div className="flex gap-7 font-Poppins font-semibold items-center">
        {menuItems.map((items, index) => {
          const isActive = location.pathname === items.to; // Cek apakah aktif
  
          return (
            <button
              key={index}
              className={`cursor-pointer px-4 py-1 rounded-full transition duration-290 ease-linear 
                ${isActive ? "bg-teal-700/85 text-white" : "bg-transparent text-black hover:text-teal-700/85"}`}
            >
              {items.to ? (
                <Link to={items.to}>
                  <span>{items.text}</span>
                </Link>
              ) : (
                <span>{items.text}</span>
              )}
            </button>
          );
        })}
      </div>
    );
  };

  return (
    <nav
      className={`fixed flex justify-between flex-col bg-white z-50 p-3 w-full py-5 transition duration-300 ease-in ${
        isScrolled ? "bg-white shadow-xl py-3" : "bg-transparent"
      }`}
    >
      {/* LOGO  SECTION*/}
      <div className="flex justify-between w-full px-12">
        <Link to="/" className="w-50 h-auto flex justify-center items-center font-bold font-Poppins hover:scale-105 transition duration-330 cursor-pointer ease-in ">
          <img src={Logo} alt="" className="object-cover"/>
        </Link >
        {/* HUMBERGER MENU */}
        <div className="flex flex-row gap-4 xl:hidden items-center justify-center ">
          <div className="flex items-center justify-center p-2 group hover:border-2 border-teal-700/85  focus:border-teal-700/85 rounded-full  ">
            <input type="search" placeholder="Selamatkan yuuk.." className="w-0 p-0 group-hover:w-40 group-hover:px-2 duration-330 transition-all focus:outline-none focus:w-40 focus:opacity-100 focus:px-2 group-hover:origin-right placeholder:text-black "/>
            <FaSearch className="cursor-pointer" />
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
        {/* WRAPPER SEARCH , FLAG, DAFTAR */}
        <div className="hidden xl:flex justify-center items-center gap-3 ">
          {/* SEARCH */}
          <div className="flex items-center justify-center p-2 group hover:border-2 border-teal-700/85  focus:border-teal-700/85 rounded-full  ">
            <input type="search" placeholder="Selamatkan yuuk.." className="w-0 p-0 group-hover:w-40 group-hover:px-2 duration-330 transition-all focus:outline-none focus:w-40 focus:opacity-100 focus:px-2 group-hover:origin-right placeholder:text-black "/>
            <FaSearch className="cursor-pointer" />
          </div>
          {/* FLAG */}
          <div className="flex items-center justify-center ">
              <IconButton text={<GB title="Indonesia" className="rounded-xs w-6 h-6" />} color="bg-white">
                  <ID title="Indonesia" className="rounded-xs w-6 h-6" />
              </IconButton>
          {/* Daftar Button */}
          </div>
          {/* DAFTAR */}
          <div>
            {isLoggedIn ? (<button className="rounded-full bg-[#D9D9D9] px-3 py-2 w-30 h-9 flex items-center justify-center gap-2 hover:scale-110 transition duration-335 cursor-pointer ease-in" onClick={logout}>
              <VscAccount className="font-bold" />
              <Link to="/user/profile" className="font-Poppins font-semibold" onClick={handleButtonClick}>
                Profile
              </Link>
            </button>) : (<button className="rounded-full bg-[#D9D9D9] px-3 py-2 w-30 h-9 flex items-center justify-center gap-2 hover:scale-110 transition duration-335 cursor-pointer ease-in">
              <VscAccount className="font-bold" />
              <Link to="/register" className="font-Poppins font-semibold">
                Daftar
              </Link>
            </button>)}
          </div>
        </div>
      </div>
      {/* MENU SECTION */}
      <div className="hidden scale-0 xl:flex xl:scale-100 justify-between w-full mt-6 px-12 list-none no-underline transition-transform duration-330 ease-out ">
        <StyleMenu/>
        <div className="flex gap-1 items-center jsutify-center w-90 h-8 ">

            <Link to="/order" className="rounded-full bg-[#1d8583] opacity-85 flex items-center justify-center font-Poppins font-semibold px-5 py-1 mx-2 w-30 drop-shadow-lg text-white hover:scale-95 transition duration-330 cursor-pointer ease-in">Pesan</Link>

          <LocateButton setOpen={setOpen} open={isOpen}/>
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
            <button className="rounded-full bg-[#D9D9D9] px-3 py-2 w-full h-9 flex items-center justify-center gap-2 hover:scale-110 transition duration-335 cursor-pointer ease-in">
              <VscAccount className="font-bold" />
              <Link to="/register" className="font-Poppins font-semibold">
                Daftar
              </Link>
            </button>
          </div>
          {menuItems.map((items, index) => (
            <button
              className="cursor-pointer hover:text-[#1D8583] hover:opacity-85 transition duration-300 ease-in"
              key={index}
            >
              {items.to ? (<Link to={items.to}><span>{items.text}</span></Link>) : <span>{items.text}</span>}
            </button>
          ))}

            <Link to="/order" className="rounded-full bg-[#D9D9D9] opacity-85 flex items-center justify-center font-Poppins font-semibold px-5 py-1 mx-2 w-30 hover:scale-95 transition  duration-330 cursor-pointer ease-in-out">Pesan</Link>

          <button className="rounded-full bg-[#D9D9D9] opacity-85 flex items-center justify-center font-Poppins font-semibold px-5 py-1 w-40 hover:scale-95 drop-shadow-lg transition duration-330 ease-in cursor-pointer" onClick={() => setOpen(prev => !prev)}>
            <IoLocationOutline /> <span className="ml-1">Atur Lokasi</span>
            <Modal open={open ?? false} onClose={() => setOpen(false)} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
