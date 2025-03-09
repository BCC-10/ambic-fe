import Image1 from '../assets/Background/How/pexels-dima-valkov-1186343-3864682.jpg'
import Image2 from '../assets/Background/How/pexels-dadanr-18284818.jpg'
import Image3 from '../assets/Background/How/brooke-lark-C1fMH2Vej8A-unsplash.jpg'
import Image4 from '../assets/Background/How/brooke-lark-oaz0raysASk-unsplash.jpg'
import Image5 from '../assets/Background/How/brooke-lark-IDTEXXXfS44-unsplash.jpg'
import Banner1 from "../../src/assets/Background/Hero/anastasia-zhenina-YT_DCMps5Wg-unsplash.jpg";
import Banner2 from "../../src/assets/Background/Hero/jonathan-pielmayer-c69HK1HKHYs-unsplash.jpg";
import Banner3 from "../../src/assets/Background/Hero/v2osk-c9OfrVeD_tQ-unsplash.jpg";
import PaymentMethod1 from "../assets/ICons/PaymenMethod/Rectangle 30.png"
import PaymentMethod2 from "../assets/ICons/PaymenMethod/Screenshot 2025-03-01 013329.png"
import PaymentMethod3 from "../assets/ICons/PaymenMethod/Rectangle 41.png"
import BrandTalk from "../assets/Background/Mitra/image 9 (1).png";
import JCO from "../assets/Background/Mitra/Group 45.png";
import RotiO from "../assets/Background/Mitra/Mask group.png";
import Bakery from "../assets/Background/Mitra/image 10.png";
import Filkom from "../assets/Background/Sponsor/image 6.png"
import Pertamuda from "../assets/Background/Sponsor/image 2.png"
import KementerianLingkungan from "../assets/Background/Sponsor/image 3.png"
import UB from "../assets/Background/Sponsor/image 4.png"
import BCC from "../assets/Background/Sponsor/image 5.png"
import Footer1 from "../assets/ICons/Footer/Rectangle 18.png"
import Footer2 from "../assets/ICons/Footer/Rectangle 40 (1).png"
import Footer3 from "../assets/ICons/Footer/Rectangle 41 (1).png"
import { IoMdContact } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import React from "react"


const menuItems: Array<{text: string, to?:string}> = [
        { text: "Beranda", to: "/"},
        { text: "Food Waste" },
        { text: "Mitra", to: "/mitra"},
        { text: "Donasi" },
        { text: "Relawan" },
        { text: "Tentang Kami" },
];

const Content: Array<{item: string, text: string, Image: string}> = [
    {item: "Atur Lokasi", text:"Atur lokasi agar menemukan restoran terdekat.", Image: Image1},
    {item: "Lihat Makanan Terdekat", text:"Jelajahi menu dari restoran di sekitar.", Image: Image2},
    {item: "Pilih Makanan", text:"Pilih makanan sesuai selera dan kebutuhan", Image: Image3},
    {item: "Beli Sekarang", text:"Tambahkan produk ke keranjang dan lanjut ke checkout", Image: Image4},
    {item: "Bayar", text:"Melakukan pembayaran dan selesaikan transaksi", Image: Image5}
]

const slides: Array<{Image: string}> = [{ Image: Banner1 }, { Image: Banner2 }, { Image: Banner3 }];

const Images: Array<{Image: string}> = [
    {Image: PaymentMethod1},
    {Image: PaymentMethod2},
    {Image: PaymentMethod3},
]

    const cards = [
        { id: 1, title: "Card 1", description: BrandTalk },
        { id: 2, title: "Card 2", description: JCO },
        { id: 3, title: "Card 3", description:  RotiO },
        { id: 4, title: "Card 4", description: Bakery },
        
    ];

const Sponsors = [
    { id : 1, title : "Card 1", description: Filkom},
    { id : 2, title : "Card 2", description: Pertamuda},
    { id : 3, title : "Card 3", description: KementerianLingkungan},
    { id : 4, title : "Card 4", description: UB},
    { id : 5, title : "Card 5", description: BCC},
]

const Logins: Array<{name:string, type: string, placeholder: string, icon?: React.ReactNode, content:string}> = [
    { name: "identifier", type : "identifier" , placeholder : "ex: farid@xml.com", icon: <MdEmail className='relative bottom-8 left-[100%]'/>, content: "Email"},
    { name:"password", type : "password" , placeholder : "ex: 1@bds;", icon: <FaLock className='relative bottom-8 left-[100%]'/>, content: "password"},
]
const Registers: Array<{name?:any, type: string, placeholder: string, icon?: React.ReactNode, content:string}> = [
    {  name: "username", type : "text" , placeholder : "farid", icon: <IoMdContact className='relative bottom-8 left-[100%]'/>, content: "Username"},
    {  name: "email", type : "email" , placeholder : "ex: farid@xml.com", icon: <MdEmail className='relative bottom-8 left-[100%]'/>, content: "Email"},
    { name: "password", type : "password" , placeholder : "ex: 1@bds;", icon: <FaLock className='relative bottom-8 left-[100%]'/>, content: "password"},
]

const PassNew: Array<{name?:any, type: string, placeholder: string, icon: React.ReactNode, content:string }> = [
    { name: "password", type : "password" , placeholder : "ex: 1@bds;", icon: <FaLock className='relative bottom-8 left-[100%]'/>, content: "Password Baru"},
    { name: "confirmPassword", type : "password" , placeholder : "ex: 1@bds;", icon: <FaLock className='relative bottom-8 left-[100%]'/>, content: "Konfirmasi Password Baru"},
]

const Cards: Array<{content: string, text:string}> = [
    {content : "Waktu penjualan yang fleksibel", text: "Biaya bagi hasil yang sangat rendah"},
    {content : "Mendapatkan keuntungan menjual makanan dari stok berlebih", text:"dipromosikan diberbagai media dan kegiatan Ambic"},
    {content : "Dikenal sebagai bisnis yang ramah lingkungan", text: "Menjangkau pelanggan baru"}
]

const RegisterMitra: Array<{content:string, type:string, placeholder:string, text:string}> = [
    {content: "Nama Bisnis", type: "text", placeholder: "Nama Bisnis", text: "Farid"},
    {content: "Jenis Bisnis", type: "text", placeholder: "Jenis Bisnis", text: "Bakery"},
    {content: "Instagram Bisnis", type: "text", placeholder: "Ig Bisnis", text: "@Farid"},
    {content: "Alamat Bisnis", type: "text", placeholder: "Alamat Bisnis", text: "Batam"},
    {content: "Link Posisi Alamat Bisnis", type: "text", placeholder: "", text: "balblabla"},
    {content: "Kota", type: "text", placeholder: "ex: Semarang", text:"Semarang"},
]

const RegisterUser = [
    {content: "Username", type: "text", placeholder:"Your username"},
    {content: "Nama", type: "text", placeholder:"Your Name"},
    {content: "Email", type: "email", placeholder:"Your Email"},
    {content: "Nomor Telepon", type: "number", placeholder:"Your Number Phone"},
    {content: "jenis Kelamin", type: "text", placeholder:"Your Gender"},
    {content: "Almat", type: "text", placeholder:"Your Address"},
]

const Footers: Array<{Image:string}> = [
    {Image : Footer1},
    {Image : Footer2},
    {Image : Footer3},
]


export { menuItems, Content, slides, Images, cards, Sponsors, Logins, Registers, PassNew, Cards, RegisterMitra, Footers, RegisterUser };




