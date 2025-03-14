import React, { useState, useEffect, useRef } from 'react';
import Sidebar from "../SideBar/SideBar";
import Navbar from '../../../Layouts/Navbar';
import Modal from '../../../Componets/Elements/Navbar/ModalLocate';
import Footer from "../../../Layouts/Footer";
import OrderItem from "./Component/OrderItem";
import { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { SwiperRef } from "swiper/react";
import { dummyProducts } from '../../../data';
import {  cartItem } from "../../../Componets/Util/useCart";
import { Dialog } from 'primereact/dialog';
import { Rating } from 'primereact/rating';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import axios from 'axios';

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

const MyOrder = () => {
    const [open, setOpen] = useState<boolean>(false);
    const prevRef = useRef<HTMLButtonElement | null>(null);
    const nextRef = useRef<HTMLButtonElement | null>(null);
    const swiperRef = useRef<SwiperType | null>(null); // Simpan referensi Swiper
    const SwiperRef = useRef<SwiperRef  | null>(null);
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
                const response = await axios.get("https://ambic.live:443/api/v1/transactions?status=finish",  {
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

        const [visible, setVisible] = useState(false);
        const [rating, setRating] = useState(0);
        const [comment, setComment] = useState('');
        const [file, setFile] = useState(null);
        // console.log("Raw Pickup Time after parsing: ", formatTime(product?.pickup_time));
        // console.log("Raw End Pickup Time after parsing:", formatTime(product?.end_pickup_time));
        const handleHideDialog = () => {
            setVisible(false);
            setRating(0);
            setComment('');
            setFile(null);
        };
    
        const handleSubmit = () => {
            // Logic to handle upload, for example, send data to server
            console.log({
                rating,
                comment,
                file
            });
            handleHideDialog();
        };

        const handleFileUpload = (e) => {
            setFile(e.files[0]);
        };

        const handleOpenDialog = () => {
            setVisible(true);
            console.log("KEBUKAAAAAA")
        }
    

    return (
        <main className='min-h-auto w-full overflow-hidden flex flex-col'>
            <div>
                <Navbar setOpen={setOpen} />
            </div>
            <div className='min-h-screen flex items-center justify-start flex-row bg-[#FFF8F4] py-5'>
                <Sidebar />
                <div className='w-full min-h-screen flex flex-col items-center justify-center gap-5'>
                    <div className='w-[80%] h-auto flex items-center justify-start flex-col gap-9'>
                        <h1 className='font-Poppins text-3xl font-semibold'>Pesanan Selesai</h1>
                        <div className='flex items-center justify-center gap-6 w-[82%] h-full flex-row '>
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
                                    1024: { slidesPerView: 4, spaceBetween: 5 }
                                }}
                                onBeforeInit={(swiper) => {
                                    swiperRef.current = swiper as SwiperType; 
                                }}
                                ref={SwiperRef}
                                className='swiper w-full'
                            >
                                {product.map((_, idx)=> (
                                    <SwiperSlide key={idx}><OrderItem text="Nilai" product={_} /></SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <Footer />
            </div>
            <Modal open={open} onClose={() => setOpen(false)} />
        </main>
    );
};

export default MyOrder;
