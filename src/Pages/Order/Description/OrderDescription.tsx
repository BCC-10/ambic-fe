import React, { useState, useEffect } from 'react';
import Navbar from '../../../Layouts/Navbar';
import Modal from '../../../Componets/Elements/Navbar/ModalLocate';
import Footer from '../../../Layouts/Footer';
import Donat from '../../../assets/Background/Order/image 1.png';
import Stars from '../../../assets/ICons/OrderItem/Bintang.png';
import Kucing from '../../../assets/ICons/Order/Ellipse 3.png';
import Roti from '../../../assets/ICons/Order/Rectangle 93.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';

interface Produk {
  id: string;
  partner_id: string;
  name: string;
  description: string;
  initial_price: number;
  final_price: number;
  stock: number;
  pickup_time: string;
  end_pickup_time: string;
  photo: string;
  star: number;
  count_rating: number;
}

interface Rating {
  id: string;
  name: string;
  product_id: string;
  user_id: string;
  star: number;
  feedback: string;
  photo: string;
  date: string;
}

const Comment = ({ ratings }: { ratings: Rating }) => {
  const [rating, setRating] = useState<Rating[]>([]);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const product_id = searchParams.get('id');
    const fetchRating = async () => {
      try {
        const response = await axios.get(
          import.meta.env.VITE_API_URL + `/api/v1/ratings?id=${product_id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        setRating(response.data.payload.ratings);
        console.log(product_id);
      } catch (err) {
        console.log(err);
      }
    };
    fetchRating();
  }, []);

  return (
    <>
      ``
      <div className="w-[90%] flex items-center justify-between ">
        <div className="w-full flex items-start justify-center flex-col gap-2 text-wrap ">
          <div className="w-[20%] flex gap-3 irems-center justify-center">
            <img src={ratings.photo} alt="" className="w-[40%]" />
            <div className="flex items-start justify-start flex-col w-full ">
              <h1 className="font-Poppins text-lg font-semibold">
                {ratings.name}
              </h1>
              <div className="flex items-start">
                {[...Array(5)].map((_, idx) => (
                  <img
                    src={idx < ratings.star ? Stars : Stars}
                    alt="Stars"
                    className="w-[15%]"
                    key={idx}
                  />
                ))}
              </div>
              <h4 className="mt-2 font-semibold font-Poppins text-xs ">
                {ratings.date}
              </h4>
            </div>
          </div>
          <p className="">{ratings.feedback}.</p>
        </div>
        <img src={ratings.photo} alt="" className="w-[7%]" />
      </div>
    </>
  );
};

const OrderDescription = () => {
  const [product, setProduct] = useState<Produk | null>(null);
  const [searchParams] = useSearchParams();

  const id = searchParams.get('id');

  const formatTime = (timeString?: string) => {
    if (!timeString) return '-'; // Jika tidak ada data, tampilkan "-"

    const timestamp = timeString.split(' ');
    const time = timestamp[1];
    const [hours, minutes] = time.split(':');

    return `${hours}:${minutes}`; // Format "HH:MM"
  };

  const [rating, setRating] = useState<Rating[]>([]);

  // useEffect(() => {
  //     const fetchRating = async () => {
  //         try{
  //             const response = await axios.get(import.meta.env.VITE_API_URL + "/api/v1/ratings", {
  //                 headers: {
  //                     'Authorization': `Bearer ${localStorage.getItem('token')}`,
  //                 }
  //             })
  //             setRating(response.data.payload.ratings)
  //         } catch (err) {
  //             console.log(err)
  //         }
  //     }
  //     fetchRating()
  // },[])

  useEffect(() => {
    const fatchingDescription = async () => {
      try {
        const response = await axios.get(
          import.meta.env.VITE_API_URL + `/api/v1/products/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
              'Content-Type': 'application/json',
            },
          }
        );
        setProduct(response.data.payload.product);
      } catch (err) {
        console.log(err);
      }
    };
    const fetchRating = async () => {
      try {
        const response = await axios.get(
          import.meta.env.VITE_API_URL + '/api/v1/ratings',
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        setRating(response.data.payload.ratings);
      } catch (err) {
        console.log(err);
      }
    };
    fetchRating();
    fatchingDescription();
  }, []);

  const [open, setOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  return (
    <main className=" relative min-h-screen w-full overflow=hidden flex items-start justify-center flex-col">
      <div>
        <Navbar setOpen={setOpen} open={undefined} />
      </div>
      <div className=" min-h-[120vh] w-full flex flex-col items-center justify-center bg-[#FFF8F4] gap-7">
        <div className="w-[50%] h-auto flex flex-row justify-start items-center gap-6">
          <img src={product?.photo} alt="" className="w-[40%] h-[40%]" />
          <div className="w-full flex flex-col justify-start items-start gap-4">
            <h1 className="font-Poppins text-2xl font-semibold ">
              {product?.name}
            </h1>
            <p className="w-full text-wrap text-base ">
              {product?.description}
            </p>
            <div className="w-full h-auto flex items-center justify-center flex-col ">
              <h2 className="flex gap-4">
                <span className="line-through text-gray-500 text-lg font-Poppins font-medium">
                  Rp
                  {new Intl.NumberFormat('id-ID').format(
                    product?.initial_price ?? 0
                  )}
                </span>
                <span className="text-teal-700 font-Poppins text-xl font-semibold">
                  Rp
                  {new Intl.NumberFormat('id-ID').format(
                    product?.final_price ?? 0
                  )}
                </span>
              </h2>
            </div>
            <div className="w-full h-auto flex items-center justify-center gap-3 ">
              <img src={Stars} alt="" className="w-6" />
              <label
                htmlFor=""
                className="text-gray-500 font-Poppins text-xs relative top-1"
              >
                {product?.star ?? 0} ({product?.count_rating ?? 0})
              </label>
            </div>
            <div className="w-full h-auto flex items-center justify-center ">
              <h5 className="font-medium ">
                Waktu Pengambilan, {formatTime(product?.pickup_time)} -{' '}
                {formatTime(product?.end_pickup_time)}
              </h5>
            </div>
            <div className="w-full h-auto flex items-center justify-center gap-6">
              <button
                className="font-Poppins text-lg text-white bg-teal-700/85 rounded-xl drop-shadow-lg px-4 py-2 font-semibold transition-transform duration-200 hover:scale-95 cursor-pointer"
                onClick={() => navigate('/cart')}
              >
                Keranjang
              </button>
              <button
                className="font-Poppins text-lg text-white bg-teal-700/85 rounded-xl drop-shadow-lg px-4 py-2 font-semibold  transition-transform duration-200 hover:scale-95 cursor-pointer"
                onClick={() => navigate('/payment')}
              >
                Beli Sekarang
              </button>
            </div>
          </div>
        </div>
        <div className="relative w-[70%] h-[50%] bg-white py-5 flex items-start justify-between flex-col pl-20 gap-17">
          {rating.map((rating, idx) => (
            <Comment key={idx} ratings={rating} />
          ))}
        </div>
      </div>
      <div></div>
      <Footer />
      <Modal open={open} onClose={() => setOpen(false)} />
    </main>
  );
};

export default OrderDescription;
