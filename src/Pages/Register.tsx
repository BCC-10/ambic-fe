import React, { useState } from "react";
import { Registers } from "../data/index";
import Input from "../Componets/Elements/Auth/input";
import { Link, useNavigate  } from "react-router-dom";
import axios from "axios";

const Register = () => {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState("");

  const handleRegister = async () => {
    setErrors({}); // Reset error sebelum request baru
  
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
      navigate("/login")

      sessionStorage.setItem(
        "registrationSuccess",
        "Pendaftaran berhasil! Cek email untuk verifikasi."
      );

      sessionStorage.setItem(
        "email",
        formData.email
      );

      setSuccessMessage("Pendaftaran berhasil! Cek email untuk verifikasi.");

    } catch (err: any) {
      if (err.response) {
        console.log("Error Response Data:", err.response.data);
  
        const apiErrors = err.response.data.payload?.errors || {};
  
        let newErrors: Record<string, string> = {};
  
        // Tangani error email
        if (apiErrors.email) {
          if (apiErrors.email.includes("already exists")) {
            newErrors.email = " Email ini sudah digunakan! Coba yang lain.";
          } else if (apiErrors.email.includes("required")) {
            newErrors.email = "Harus diisi ya..";
          } else {
            newErrors.email = "Mohon diperhatikan format email ya.."// Default dari API jika tidak dikenali
          }
        }
  
        // Tangani error username
        if (apiErrors.username) {
          if (apiErrors.username.includes("already exists")) {
            newErrors.username = "Username sudah dipakai!.";
          } else if (apiErrors.username.includes("required")) {
            newErrors.username = "Harus diisi yaa..";
          } else {
            newErrors.username = apiErrors.username;
          }
        }
  
        // Tangani error password
        if (apiErrors.password) {
          if (apiErrors.password.includes("min")) {
            newErrors.password = "Password Minimal 6 Karakter.";
          } else if (apiErrors.password.includes("required")) {
            newErrors.password = "Wajib isi yaa..";
          } else {
            newErrors.password = apiErrors.password;
          }
        }
  
        setErrors(newErrors);
      } else {
        setErrors({ general: "Terjadi kesalahan. Coba lagi nanti." });
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-w-full min-h-screen flex-row">
      <div className="relative right-15 flex items-center justify-center p-2 w-auto h-auto flex-col bg-none rounded-lg drop-shadow-xl gap-5">
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
      </div>
      <div className="bg-teal-700/85 translate-x-55 xl:translate-x-60 h-screen w-1/2 rounded-l-[300px] flex items-center justify-center flex-col gap-2">
        <h1 className="text-white font-bold font-Poppins text-3xl">Hello, Welcome!</h1>
        <p className="text-white font-medium font-Poppins text-lg">Sudah punya akun?</p>
        <button className="w-[35%] py-2 rounded-2xl text-black font-Poppins font-semibold bg-white/85 transition-transform duration-300 ease-in hover:scale-95 cursor-pointer">
          <Link to="/login" className="w-full h-full flex items-center justify-center">
            Masuk
          </Link>
        </button>
      </div>
    </div>
  );
};

export default Register;
