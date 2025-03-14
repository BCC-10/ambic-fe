import React, {useState, useEffect} from 'react'
import Sidebar from "../SideBar/SideBar";
import Navbar from '../../../Layouts/Navbar';
import Modal from '../../../Componets/Elements/Navbar/ModalLocate';
import Footer from "../../../Layouts/Footer";
import Image from "../../../assets/Notifcation/Group 4.png"
import axios from 'axios';


interface Notification {
    id: string,
    title: string,
    content: string,
    link: string
    button: string,
    datetime: string
}







export const Notif = ({notification} : {notification : Notification}) => {

    const [getNotification, setGetNotification] = useState<Notification[]>([]);
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        const fatchNotification = async () => {
            setLoading(true)
            try{
                const response = await axios.get("https://ambic.live:443/api/v1/notifications",{
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json',
                    }
                })
                setGetNotification(response.data.payload.notifications)
            }   catch(err) {
                console.log(err)
            }  finally {
                setLoading(false)
            }
        }
        fatchNotification()
    },[])

    const formatDateTime = (dateString: string | number) => {
        const parseDateTime = (input: string | number) => {
            if (!input) return "Invalid Date";
            let date: Date;
            
            if (typeof input === "number") {
                date = new Date(input * 1000); // Jika timestamp dalam detik, ubah ke milidetik
            } else {
                date = new Date(input); // Jika string, langsung buat objek Date
            }
    
            return isNaN(date.getTime()) ? "Invalid Date" : date;
        };
    
        const date = parseDateTime(dateString);
        if (date === "Invalid Date") return date;
    
        const pad = (num: number) => num.toString().padStart(2, "0");
    
        return `${date.getFullYear()}:${pad(date.getMonth() + 1)}:${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
    };


    return (
        <div className='flex flex-row max-sm:flex-col max-sm:gap-3 items-center justify-between w-full h-[20%] bg-white p-4 drop-shadow-lg'>
            <div className='flex flex-row items-center '>
                <img src={Image} alt="" className='w-20 object-cover'/> 
                <div className='mx-5'>
                    <strong className='mb-5'>{notification.title}</strong><br />
                    <label htmlFor="">{notification.content}</label>
                    <p>{(notification.datetime)}</p>
                </div>
            </div>
            <div className='lg:w-[30%] md:w-[40%]   xl:w-[20%] 2xl:w-[12%]'>
                <button className='border-none rounded-full font-Poppins font-medium w-full px-4 py-2 text-white bg-teal-600 hover:bg-teal-700'>
                    {notification.button}
                </button>
            </div>
        </div>
    )
}
const Notification = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [getNotification, setGetNotification] = useState<Notification[]>([]);
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        const fatchNotification = async () => {
            setLoading(true)
            try{
                const response = await axios.get("https://ambic.live:443/api/v1/notifications",{
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json',
                    }
                })
                setGetNotification(response.data.payload.notifications)
            }   catch(err) {
                console.log(err)
            }  finally {
                setLoading(false)
            }
        }
        fatchNotification()
    },[])

    return (
        <main className='w-full flex flex-col overflow-hidden'>
            <div>
                <Navbar setOpen={setOpen}/>
            </div>
            <div className='flex flex-row justify-start items-center bg-[#FFF8F4] p-4'>
                <Sidebar/>
                <div className='w-full h-full flex flex-col gap-3 justify-center items-center '>
                    <div className='w-[80%] h-auto flex items-center justify-start p-3'>
                        <h1 className='font-Poppins text-3xl font-semibold '>Notifikasi</h1>
                    </div>
                    {getNotification.slice(0, 4).map((_,idx)=> (
                        <Notif key={idx} notification={_}/>
                    ))}
                </div>
            </div>
            <div>
                <Footer/>
            </div>
            <Modal open={open} onClose={() => setOpen(false)} />
        </main>
    )
}

export default Notification
