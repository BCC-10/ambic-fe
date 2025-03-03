import React, {useState, useEffect} from 'react'
import Input from '../Componets/Elements/Auth/input'
import { Logins } from "../data/index";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2'


const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        identifier: "",
        password: "",
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [successMessage, setSuccessMessage] = useState("");
    const [email, setEmail] = useState("");
    const [resendMessage, setResendMessage] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Ambil pesan sukses dari sessionStorage
        const message = sessionStorage.getItem("registrationSuccess");
        const email = sessionStorage.getItem("email");
        if (message) {
            setSuccessMessage(message);
            sessionStorage.removeItem("registrationSuccess"); // Hapus agar tidak muncul lagi setelah refresh
        }
        if (email) {
            setEmail(email);
            sessionStorage.removeItem("email"); // Hapus agar tidak muncul lagi setelah refresh
        }
    }, []);
    
      // Fungsi untuk mengirim ulang email verifikasi
        const handleResendVerification = async () => {
        setLoading(true);
        setResendMessage(""); // Reset pesan sebelumnya
    
        try {
        const response = await axios.post("https://ambic.live:443/api/v1/auth/request-verification", {
            
            email: email, // Gunakan email yang dimasukkan user
            }, {
            headers: {
                "Content-Type": "application/json",
            },
        });
    
            setResendMessage("Link verifikasi telah dikirim ulang ke email Anda.");
        } catch (error) {
            setResendMessage("Terjadi kesalahan saat mengirim ulang verifikasi.");
            console.error(error);
        } finally {
            setLoading(false);
        } 
        };


    const handleLogin = async () => {
      setErrors({}); // Reset error sebelum request baru
    
        try {
        const { data } = await axios.post(
            "https://ambic.live:443/api/v1/auth/login",
            formData,
            {
            headers: {
                "Content-Type": "application/json",
            },
            }
        );
        localStorage.setItem("token", data.payload.token);
        navigate("/")
        } catch (err: any) {
            if (err.response) {
    
            const apiErrors = err.response.data.payload?.errors || {};
    
            let newErrors: Record<string, string> = {};
    
          // Tangani error email
            if (apiErrors.identifier) {
                if (apiErrors.identifier.includes("incorrect")) {
                    newErrors.identifier = " Username atau Password Salah!";
            } else if (apiErrors.identifier.includes("required")) {
                newErrors.identifier = "Harus diisi ya..";
            } else {
                newErrors.identifier = ""// Default dari API jika tidak dikenali
            }
        }
    
          // Tangani error password
            if (apiErrors.password) {
                if (apiErrors.password.includes("min")) {
                    newErrors.password = "Password Minimal 6 Karakter.";
            } else if (apiErrors.password.includes("required")) {
                newErrors.password = "Wajib isi yaa..";
            } else if (apiErrors.password.includes("incorrect")) {
                newErrors.password = "Username atau Password salah!";
            } else {
                newErrors.password = apiErrors.password;
            }
        }

            if(err.response.data.status_code === 403) {
            Swal.fire({
                title: 'Akun Belum diVerifikasi',
                text: "Cek Emailmu untuk Memverifikasi!",
                icon: 'error',
                confirmButtonText: 'Oke'
            })
        }
    
            setErrors(newErrors);
        } else {
            setErrors({ general: "Terjadi kesalahan. Coba lagi nanti." });
        }
    }}
    return (
        <div className='flex items-center justify-center min-w-full min-h-screen flex-row-reverse'>
            <div className='relative right-15 flex items-center justify-center p-2 w-auto h-auto flex-col bg-none rounded-lg drop-shadow-xl gap-5'>
                <h1 className='font-Poppins text-2xl font-semibold'>Login</h1>
                {successMessage && (
                <div className="text-green-600 bg-green-100 p-2 rounded-md w-full text-center">
                    {successMessage}
                    <br />
                    <button
                    onClick={handleResendVerification}
                    className="text-blue-600 underline mt-2"
                    disabled={loading}
                    >
                    {loading ? "Mengirim..." : "Kirim ulang verifikasi"}
                    </button>
                </div>
                    )}

                {resendMessage && (
                    <p className="text-blue-600 bg-blue-100 p-2 rounded-md w-full text-center mt-2">
                    {resendMessage}
                    </p>
                    )}
                <div className='flex flex-col items-center justify-start p-2 gap-5 '>
                    {Logins.map((field,idx) => (
                    <div key={idx}>
                        <Input
                            type={field.type} 
                            placeholder={field.placeholder} 
                            content={field.content}
                            icon={field.icon}
                            className='focus:outline-none bg-[#D9D9D9] p-2 rounded-2xl w-[120%] h-[10%] placeholder:text-sm'
                            value={formData[field.name as keyof typeof formData] || ""}
                            onChange={(e) =>
                            setFormData({ ...formData, [field.name]: e.target.value })
                            }
                        />
                        {errors[field.name] && (
                        <p className="text-red-500 text-sm mt-1">{errors[field.name]}</p>
                        )}
                        </div>
                    ))}
                </div>
                <p className=''>Lupa Password?</p>
                <button type="submit" className='w-full py-2 rounded-2xl text-white font-Poppins font-semibold bg-teal-700/85 transition-transform duration-300 ease-in hover:scale-95 focus:outline-2 focus:outline-offset-2 focus:outline-offset-teal-700/85 cursor-pointer' onClick={handleLogin}>Masuk</button>
                <h3 className='font-Poppins text-lg font-semibold'>Atau</h3>
            </div>
            <div className='bg-teal-700/85 -translate-x-55 h-screen w-1/2 rounded-r-[300px] flex items-center justify-center flex-col gap-2'>
                <h1 className='text-white font-bold font-Poppins text-3xl'>Welcome Back!</h1>
                <p className='text-white font-medium font-Poppins text-lg'>Belum punya Akun?</p>
                <button className='w-[35%] py-2 rounded-2xl text-black font-Poppins font-semibold bg-white/85 transition-transform duration-300 ease-in hover:scale-95 cursor-pointer'>
                <Link to="/register" className="w-full h-full flex items-center justify-center">
                Daftar
                </Link>
                </button>
            </div>
        </div>
    )
}

export default Login;
