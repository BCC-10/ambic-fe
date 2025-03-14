import React, {useState} from 'react'

import Stars from "../../../../assets/ICons/OrderItem/Bintang.png"
import { cartItem } from "../../../../Componets/Util/useCart";
import { Dialog } from 'primereact/dialog';
import { Rating } from 'primereact/rating';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import axios from 'axios';
import Swal from 'sweetalert2';

interface OrderItem{
    onClick?: (e:any) => void
    text: string
    product?: cartItem;
    onAddToCart?: () => void
    // pickup_time?: string
    // end_pickup_time?: string
    // stock?: number ;
    // star?: number;
    // count_rating?: number;
    // photo?: string
}
interface rating {
    product_id: string;
    star: number;
    feedback: string;
    photo: string
}

const OrderItem : React.FC<OrderItem> = ({onClick, text, product, onAddToCart}) => {

    const formatTime = (timeString?: string) => {
        if (!timeString) return "-"; // Jika tidak ada data, tampilkan "-"

        const timestamp = timeString.split(" ")
        const time = timestamp[1]
        const [hours, minutes] = time.split(":")

        return `${hours}:${minutes}`; // Format "HH:MM"
    };
    const [visible, setVisible] = useState(false);
    // const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [file, setFile] = useState(null);
    // console.log("Raw Pickup Time after parsing: ", formatTime(product?.pickup_time));
    // console.log("Raw End Pickup Time after parsing:", formatTime(product?.end_pickup_time));
    const handleHideDialog = () => {
        setVisible(false);
        // setRating(0);
        setComment('');
        setFile(null);
    };

    const handleFileUpload = (e) => {
        setCreateRating(prev => ({ ...prev, photo: e.files[0] }));
    };

    // const handleSubmit = () => {
    //     // Logic to handle upload, for example, send data to server
    //     console.log({
    //         createRating,
    //         comment,
    //         file
    //     });
    //     handleHideDialog();
    // };
        const [createRating, setCreateRating] = useState<rating>({
            product_id: product?.id ?? '' ,
            star: 0,
            feedback: '',
            photo: ''
        })

        const handleSendRating = async () => {
        console.log(createRating);
        try {
            const response = await axios.post(`https://ambic.live:443/api/v1/ratings`, 
                createRating,{
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'multipart/form-data'
                }
            })
            if(response.data.status_code === 200) {
                setVisible(false)
                Swal.fire({
                    title: "Berhasil!",
                    text: "Anda telah berhasil memberikan feedback terhadap produk!",
                    icon: "success"
                });
            }
        } catch (error) {
            console.log(error)
        }   
    }



    return (
        <main onClick={onClick} className='flex items-start flex-col p-3 cursor-pointer'>
            <div className='relative min-h-[370px] max-w-[300px] flex items-start justify-start flex-col bg-white drop-shadow-xl rounded-3xl'>
                <div className='relative w-full flex items-center justify-center rounded-xl h-1/4  '>
                    <img src={product?.photo } alt="" />
                        <p className='bg-white/80 px-1.5 absolute rounded-full right-4 bottom-3'>{(product?.distance ? (Number(product.distance) / 1000 ) : 0).toFixed(2)}Km</p>
                        <p className='bg-red-400/75 px-1.5 py-0.5 absolute rounded-full left-4 top-3'>40%</p>
                </div>
            <div className='w-full h-1/4 p-5 flex flex-col'>
                <label htmlFor="" className='font-Poppins font-normal text-teal-700'>{product?.stock} tersedia</label>
                <h4 className='font-Poppins text-lg font-medium'>{product?.name}</h4>
                <p className='text-sm'>Waktu Pengambilan, {formatTime(product?.pickup_time)} - {formatTime(product?.end_pickup_time)}</p>
            </div>
            <div className='relative w-full h-full p-5 flex flex-col gap-3'>
                <h3 className='text-base font-Poppins font-medium'>Rp{new Intl.NumberFormat("id-ID").format(product?.final_price ?? 0)} <span className='line-through text-xs relative -top-1 text-gray-500'>Rp{new Intl.NumberFormat("id-ID").format(product?.initial_price ?? 0)}</span></h3>
                <img src={Stars} alt="" className='w-5'/>
                <h5 className='absolute top-15 left-13 text-gray-500 text-sm '>{product?.star} {(product?.count_rating)}</h5>
                <div className='w-26 h-7 bg-teal-700 rounded-full flex items-center justify-center drop-shadow-lg transition-transform duration-330 hover:scale-95 cursor-pointer absolute right-5 bottom-4 p'>
                    <button className='text-white font-Poppins text-sm font-medium cursor-pointer' onClick={() => {
                        setVisible(true);
                    }}>{text}</button>
                </div>
            </div>
        </div>
        <Dialog
            header="Black Jack - JCO"
            visible={visible}
            onHide={handleHideDialog}
        >
            <div className='flex items-center justify-center flex-col gap-4' >
                <img src={product?.photo} alt="Donut" style={{ width: '100px', height: '100px', borderRadius: '50%' }} className='text-center'/>
                <Rating value={createRating.star} onChange={(e) => setCreateRating(prev => ({ ...prev, star: e.value ?? 0 }))} stars={5} cancel={false} />
            </div>
            <div style={{ margin: '20px 0' }}>
                <InputText 
                    placeholder="Bagikan ulasanmu di sini..." 
                    value={createRating.feedback} 
                    onChange={(e) => setCreateRating(prev => ({ ...prev, feedback: e.target.value }))} 
                    style={{ width: '100%' }} 
                />
            </div>
            <FileUpload 
                name="demo[]"
                accept="image/*"
                maxFileSize={1000000}
                onUpload={handleFileUpload}
                chooseLabel="Tambahkan Foto"
            />
            <div style={{ marginTop: '20px', textAlign: 'center' }}>
                <Button label="Kirim" icon="pi pi-check" onClick={handleSendRating} style={{backgroundColor: "var(--teal-700)", color: "white", width: "170px"}} className='' rounded/>
            </div>
        </Dialog>
        </main >
    )
}

export default OrderItem
