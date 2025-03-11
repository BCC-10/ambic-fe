import Image1 from '../assets/Background/How/pexels-dima-valkov-1186343-3864682.jpg'
import Image2 from '../assets/Background/How/pexels-dadanr-18284818.jpg'
import Image3 from '../assets/Background/How/brooke-lark-C1fMH2Vej8A-unsplash.jpg'
import Image4 from '../assets/Background/How/brooke-lark-oaz0raysASk-unsplash.jpg'
import Image5 from '../assets/Background/How/brooke-lark-IDTEXXXfS44-unsplash.jpg'
import Banner1 from "../../src/assets/Background/Hero/anastasia-zhenina-YT_DCMps5Wg-unsplash.jpg";
import Banner2 from "../../src/assets/Background/Hero/jonathan-pielmayer-c69HK1HKHYs-unsplash.jpg";
import Banner3 from "../../src/assets/Background/Hero/v2osk-c9OfrVeD_tQ-unsplash.jpg";
import PaymentMethod1 from "../assets/ICons/PaymenMethod/Group 49 (1).png"
import PaymentMethod2 from "../assets/ICons/PaymenMethod/image (1).png"
import PaymentMethod3 from "../assets/ICons/PaymenMethod/image (2).png"
import PaymentMethod4 from "../assets/ICons/PaymenMethod/image.png"
import RotiO from "../assets/Background/Mitra/Group 47.png"
import JCO from "../assets/Background/Mitra/Group 48.png"
import BreadTalk from "../assets/Background/Mitra/Group 49.png"
import Bakery from "../assets/Background/Mitra/image 10.png"
import Hokben from "../assets/Background/Mitra/Hokben Logo PNG Vector (AI,  CDR,  EPS,  PDF,  SVG) Free Download.jpeg 1.png"
import Puyo from "../assets/Background/Mitra/Puyo Desserts Logo.jpeg 1.png"
import KFC from "../assets/Background/Mitra/WhatsApp Image 2025-03-09 at 21.45.07_56c2d428 1.png"
import Dapur from "../assets/Background/Mitra/WhatsApp Image 2025-03-09 at 21.45.07_8606fbe1 1.png"
import Harbour from "../assets/Background/Mitra/WhatsApp Image 2025-03-09 at 21.45.07_8f903960 1.png"
import Filkom from "../assets/Background/Sponsor/Frame 324.png"
import Pertamuda from "../assets/Background/Sponsor/Frame 325.png"
import KementerianLingkungan from "../assets/Background/Sponsor/Frame 327.png"
import UB from "../assets/Background/Sponsor/Frame 326.png"
import BCC from "../assets/Background/Sponsor/Frame 328.png"
import BPN from "../assets/Background/Sponsor/Frame 323.png"
import Footer1 from "../assets/ICons/Footer/Rectangle 18.png"
import Footer2 from "../assets/ICons/Footer/Rectangle 40 (1).png"
import Footer3 from "../assets/ICons/Footer/Rectangle 41 (1).png"
import { IoMdContact } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import React from "react"
import Mitra1 from "../assets/Hiasan/Mitra/Rectangle 42.png"
import Mitra2 from "../assets/Hiasan/Mitra/Rectangle 42 (1).png"
import Mitra3 from "../assets/Hiasan/Mitra/Rectangle 42 (2).png"
import Mitra4 from "../assets/Hiasan/Mitra/Rectangle 42 (3).png"
import Mitra5 from "../assets/Hiasan/Mitra/Rectangle 42 (4).png"
import Mitra6 from "../assets/Hiasan/Mitra/Rectangle 42 (5).png"
import Order1 from "../assets/Background/OrderItem/Rectangle 76.png"
import Order2 from "../assets/Background/OrderItem/Rectangle 76 (1).png"
import Order3 from "../assets/Background/OrderItem/Rectangle 76 (2).png"
import Order4 from "../assets/Background/OrderItem/Rectangle 76 (3).png"


const menuItems: Array<{text: string, to?:string}> = [
        { text: "Beranda", to: "/"},
        { text: "Food Waste", to: "/foodweste" },
        { text: "Mitra", to: "/mitra"},
        { text: "Relawan", to: "/relawan" },
        { text: "Tentang Kami", to: "/about" },
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
    {Image: PaymentMethod4},
]

    const cards = [
        { id: 1, title: "Card 1", description: BreadTalk },
        { id: 2, title: "Card 2", description: JCO },
        { id: 3, title: "Card 3", description:  RotiO },
        { id: 4, title: "Card 4", description: Bakery },
        { id: 5, title: "Card 5", description: Hokben },
        { id: 6, title: "Card 6", description: Puyo },
        { id: 7, title: "Card 7", description: KFC},
        { id: 8, title: "Card 8", description: Harbour},
        { id: 9, title: "Card 9", description: Dapur },
    ];

const Sponsors = [
    { id : 1, title : "Card 1", description: Filkom},
    { id : 2, title : "Card 2", description: Pertamuda},
    { id : 3, title : "Card 3", description: KementerianLingkungan},
    { id : 4, title : "Card 4", description: UB},
    { id : 5, title : "Card 5", description: BCC},
    { id : 5, title : "Card 5", description: BPN},
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

const Cards: Array<{content: string, image:string}> = [
    {content : "Waktu penjualan yang fleksibel", image: Mitra1},
    {content : "Mendapatkan keuntungan menjual makanan dari stok berlebih", image: Mitra2},
    {content : "Dikenal sebagai bisnis yang ramah lingkungan", image: Mitra3},
    {content: "Biaya bagi hasil yang sangat rendah", image: Mitra4},
    {content:"dipromosikan diberbagai media dan kegiatan Ambic", image: Mitra5},
    {content: "Menjangkau pelanggan baru", image: Mitra6}
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
    {name: "name",content: "Nama", type: "text", placeholder:"Your Name"},
    {content: "Email", type: "email", placeholder:"Your Email"},
    {name: "phone",content: "Nomor Telepon", type: "number", placeholder:"Your Number Phone"},
    {name: "gender",content: "jenis Kelamin", type: "text", placeholder:"Your Gender"},
    {name: "address",content: "Almat", type: "text", placeholder:"Your Address"},
]

const Footers: Array<{Image:string}> = [
    {Image : Footer1},
    {Image : Footer2},
    {Image : Footer3},
]

const dummyProducts = [
    {  name: "Black Jack", price: 11000, image: Order1, quantity: 1, checked: false },
    {  name: "Alcapone", price: 12000, image: Order2, quantity: 1, checked: false },
    {  name: "Copa Banana", price: 8000, image: Order3, quantity: 1, checked: false },
    {  name: "Pisang Keju", price: 8000, image: Order4, quantity: 1 , checked: false},
];


export { menuItems, Content, slides, Images, cards, Sponsors, Logins, Registers, PassNew, Cards, RegisterMitra, Footers, RegisterUser, dummyProducts};




