import React, {useState, useEffect, useRef} from 'react'
import Navbar from '../../../Layouts/Navbar';
import Modal from '../../../Componets/Elements/Navbar/ModalLocate';
import Footer from "../../../Layouts/Footer";
import OrderItem from "../../User/MyOrder/Component/OrderItem";
import { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { SwiperRef } from "swiper/react";
import { Dialog } from "primereact/dialog";
import Modals from "./ModalLocate/MOdal"
import { dummyProducts } from '../../../data';
import axios from 'axios';
import { cartItem } from '../../../Componets/Util/useCart';
import Stars from "../../../assets/ICons/OrderItem/Bintang.png"


interface transaction {
    id: string;
    payment: {
        id: string;
        order_id: string;
        custom_field1: string
        transaction_status: string;
        status_message: string;
        payment_type: string;
        fraud_status: string;
        transaction_time: string;
        settlement_time: string;
    }
    invoice: string;
    total: number;
    status: string;
    note: string
    datetime: string
}

const OrderActive = () => {
    const [open, setOpen] = useState<boolean>(false);const prevRef = useRef<HTMLButtonElement | null>(null);
    const nextRef = useRef<HTMLButtonElement | null>(null);
    const swiperRef = useRef<SwiperType | null>(null); // Simpan referensi Swiper
    const SwiperRef = useRef<SwiperRef  | null>(null);
    const [visible, setVisible] = useState(false);
    const [transaction, setTransaction] = useState<transaction>()
    const [product, setProduct] = useState<cartItem[]>([])

    // Pastikan referensi tombol navigasi tersedia sebelum menginisialisasi swiper
    useEffect(() => {
        if (swiperRef.current && prevRef.current && nextRef.current) {
            (swiperRef.current.params.navigation as any).prevEl = prevRef.current;
            (swiperRef.current.params.navigation as any).nextEl = nextRef.current;
            swiperRef.current.navigation.init();
            swiperRef.current.navigation.update();
        }
    }, []);


    useEffect(() => {
        const fatchingDoneOrder = async () => {
            try{
                const response = await axios.get("https://ambic.live:443/api/v1/transactions?status=process",  {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    }
                })
                setTransaction(response.data.payload.transactions)
                for (const transaction of response.data.payload.transactions) {
                    const responseProduct = await axios.get(`https://ambic.live:443/api/v1/transactions/${transaction.id}`, {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        }
                    })
                    responseProduct.data.payload.transaction_details.items.forEach((item) => {
                        item.transaction_id = transaction.id
                    })
                    setProduct([...product,...responseProduct.data.payload.transaction_details.items])
                    // console.log(responseProduct.data.payload.transaction_details.items)
                }
            }catch (err) {
                console.log(err)
            }
        }
        fatchingDoneOrder()
    },[])

    // console.log(product)

    return (
        <main className='w-full min-h-screen flex flex-col overflow-hidden'>
            <div>
                <Navbar setOpen={setOpen}/>
            </div>
            <div className='mt-30 min-h-screen bg-[#FFF8F4] flex items-start justify-start flex-col p-30 gap-2 w-full'>
                <h1 className='font-semibold font-Poppins text-3xl '>Pesanan Aktif</h1>
                <Swiper
                    modules={[Navigation, Autoplay]}
                    style={{cursor: "grab"}}
                    onTouchStart={() => {
                        const swiperEl = document.querySelector('.swiper') as HTMLElement | null;
                        swiperEl?.style.setProperty("cursor", "grabbing");
                    }}
                    onTouchEnd={() => {
                        const swiperEl = document.querySelector('.swiper') as HTMLElement | null;
                        swiperEl?.style.setProperty("cursor", "grab");
                    }}
                    slidesPerView={4}
                    spaceBetween={5}
                    autoplay={{delay: 3000}}
                    navigation={{
                        prevEl: prevRef.current,
                        nextEl: nextRef.current
                    }}
                    breakpoints={{
                        640: { slidesPerView: 1, spaceBetween: 2 },
                        768: { slidesPerView: 3, spaceBetween: 3 },
                        1024: { slidesPerView: 4, spaceBetween: 3 }
                    }}
                    onBeforeInit={(swiper) => {
                        swiperRef.current = swiper as SwiperType; 
                    }}
                    ref={SwiperRef}
                    className='swiper w-full'
                >
                        {product.map((_, key) => (
                            <SwiperSlide key={key}><OrderItem onClick={() => setVisible(true)} text="Detail" product={_}/></SwiperSlide>
                        ))}
                    </Swiper>
                    <Dialog 
                        visible={visible} 
                        
                        onHide={() => setVisible(false)}
                        dismissableMask={true}
                        maskStyle={{ backgroundColor: "red" }}
                        className='custom-dialog'
                        >
                            <div className='relative min-h-[370px] max-w-[300px] flex items-start justify-start flex-col bg-white drop-shadow-xl rounded-3xl'>
                                <div className='relative w-full flex items-center justify-center rounded-xl h-1/4  '>
                                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3951.4490541064984!2d112.61110207588864!3d-7.952459679235344!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e78827f2d620975%3A0xf19b7459bbee5ed5!2sUniversitas%20Brawijaya!5e0!3m2!1sen!2sid!4v1741443487627!5m2!1sen!2sid" allowFullScreen={false} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className='rounded-xl'></iframe>
                                    <p className='bg-white/80 px-1.5 absolute rounded-full right-4 bottom-3'>0.8Km</p>
                                    <p className='bg-red-400/75 px-1.5 py-0.5 absolute rounded-full left-4 top-3'>40%</p>
                                </div>
                            <div className='w-full h-1/4 p-5 flex flex-col'>
                                <label htmlFor="" className='font-Poppins font-normal text-teal-700'>Tersedia</label>
                                <h4 className='font-Poppins text-lg font-medium'>Copa Banana</h4>
                                <p className='text-sm'>Waktu Pengambilan, 10:00 - 13:00</p>
                            </div>
                            <div className='relative w-full h-full p-5 flex flex-col gap-3'>
                                <h3 className='text-base font-Poppins font-medium'>Rp 22.000 <span className='line-through text-xs relative -top-1 text-gray-500'>Rp 30.000</span></h3>
                                <img src={Stars} alt="" className='w-5'/>
                                <h5 className='absolute top-15 left-13 text-gray-500 text-sm '>4.9 (34)</h5>
                                </div>
                            </div>
                        <Modals onClose={() => setVisible(false)}/>
                    </Dialog>
            </div>
            <div>
                <Footer />
            </div>
            <Modal open={open} onClose={() => setOpen(false)} />
        </main>
    )
}

export default OrderActive
