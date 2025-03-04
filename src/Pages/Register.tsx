import React, { useState, useEffect } from "react";
import { Registers } from "../data/index";
import Input from "../Componets/Elements/Auth/input";
import { Link, useNavigate  } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import {useAuth} from "../Componets/Util/AuthContext"
import { FcGoogle } from "react-icons/fc";


const Register = () => {
  const {isAuthenticated} = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState("");
  const [googleLink, setGoogleLink] = useState("")

  useEffect(() => {
    const fetchGoogleLink = async () => {
      try {
        const response = await axios.post("https://ambic.live:443/api/v1/auth/google");
        setGoogleLink(response.data.payload);
     // Sesuaikan dengan format response API
      } catch (error) {
        console.error("Error fetching Google login URL:", error);
      }
      
    };
  
    fetchGoogleLink();
  }, []);

  useEffect(() => {
    if(isAuthenticated) {
      navigate("/")
    }
  }, [isAuthenticated, navigate])

  const handleRegister = async () => {
    setErrors({});
    
    // Menampilkan loading SweetAlert
    Swal.fire({
        title: "Sedang memproses...",
        text: "Mohon tunggu sebentar",
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading();
        },
    });

    try {
        const { data } = await axios.post(
            "https://ambic.live:443/api/v1/auth/register",
            formData,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        // Simpan pesan sukses
        sessionStorage.setItem(
            "registrationSuccess",
            "Pendaftaran berhasil! Cek email untuk verifikasi."
        );
        sessionStorage.setItem("email", formData.email);

        // Tampilkan pesan sukses dan redirect setelah 2 detik
        Swal.fire({
            icon: "success",
            title: "Pendaftaran Berhasil!",
            text: "Cek email untuk verifikasi.",
            timer: 5000,
            showConfirmButton: false,
        }).then(() => {
            navigate("/login");
        });

    } catch (err: any) {
        Swal.close(); // Tutup loading

        if (err.response) {
            console.log("Error Response Data:", err.response.data);

            const apiErrors = err.response.data.payload?.errors || {};
            let newErrors: Record<string, string> = {};

            if (apiErrors.email) {
                newErrors.email = apiErrors.email.includes("already exists")
                    ? "Email ini sudah digunakan! Coba yang lain."
                    : "Mohon diperhatikan format email ya..";
            }
            if (apiErrors.username) {
                newErrors.username = apiErrors.username.includes("already exists")
                    ? "Username sudah dipakai!."
                    : "Username harus valid.";
            }
            if (apiErrors.password) {
                newErrors.password = apiErrors.password.includes("min")
                    ? "Password Minimal 6 Karakter."
                    : "Password wajib diisi.";
            }

            setErrors(newErrors);

            // Tampilkan error di SweetAlert
            Swal.fire({
                icon: "error",
                title: "Pendaftaran Gagal",
                text: "Cek kembali data yang dimasukkan.",
            });

        } else {
            setErrors({ general: "Terjadi kesalahan. Coba lagi nanti." });

            Swal.fire({
                icon: "error",
                title: "Terjadi Kesalahan",
                text: "Silakan coba lagi nanti.",
            });
        }
    }
};

  return (
    <div className="relative flex items-center justify-center min-w-full min-h-screen flex-row ">
      <div className="relative lg:right-50 flex items-center justify-center p-2 w-auto h-auto flex-col bg-none rounded-lg drop-shadow-xl gap-5">
        <h1 className="font-Poppins text-2xl font-semibold">Daftar</h1>
        {successMessage && (
          <div className="text-green-600 bg-green-100 p-2 rounded-md w-full text-center">
            {successMessage}
          </div>
        )}
        <div className="flex flex-col items-center justify-start p-2 gap-5">
          {Registers.map((field, idx) => (
            <div key={idx} className="w-full">
              <Input
                type={field.type}
                placeholder={field.placeholder}
                content={field.content}
                icon={field.icon}
                value={formData[field.name as keyof typeof formData] || ""}
                onChange={(e) =>
                setFormData({ ...formData, [field.name]: e.target.value })
                }
                className="focus:outline-none bg-[#D9D9D9] p-2 rounded-2xl w-[120%] h-[10%] placeholder:text-sm"
              />
              {/* Menampilkan error jika ada */}
              {errors[field.name] && (
                <p className="text-red-500 text-sm mt-1">{errors[field.name]}</p>
              )}
            </div>
          ))}
        </div>
        <button
          type="submit"
          className="w-full py-2 rounded-2xl text-white font-Poppins font-semibold bg-teal-700/85 transition-transform duration-300 ease-in hover:scale-95 focus:outline-2 focus:outline-offset-2 focus:outline-offset-teal-700/85 cursor-pointer"
          onClick={handleRegister}
        >
          Daftar
        </button>
        <h3 className="font-Poppins text-lg font-semibold">Atau</h3>
        <Link to={googleLink} ><FcGoogle size={40}/></Link>
        <div className="lg:hidden flex flex-col gap-5 items-center justify-center ">
        <h1 className="text-teal-700/85 font-bold font-Poppins text-3xl">Hello, Welcome!</h1>
        <p className="text-teal-700/85 font-medium font-Poppins text-lg">Sudah punya akun?</p>
        <button className="w-[40%] py-2 rounded-2xl text-black font-Poppins font-semibold bg-teal-700/85 transition-transform duration-300 ease-in hover:scale-95 cursor-pointer ">
          <Link to="/login" className="text-white w-full h-full flex items-center justify-center">
            Masuk
          </Link>
        </button>
        </div>
      </div>
      <div className="bg-teal-700/85 absolute right-0 min-h-screen w-[30%] rounded-l-[300px] flex items-center justify-center flex-col gap-2 overflow-hidden max-lg:hidden">
        <h1 className="text-white font-bold font-Poppins text-3xl">Hello, Welcome!</h1>
        <p className="text-white font-medium font-Poppins text-lg">Sudah punya akun?</p>
        <button className="w-[25%] py-2 rounded-2xl text-black font-Poppins font-semibold bg-white/85 transition-transform duration-300 ease-in hover:scale-95 cursor-pointer ">
          <Link to="/login" className="w-full h-full flex items-center justify-center">
            Masuk
          </Link>
        </button>
      </div>
    </div>
  );
};

export default Register;
