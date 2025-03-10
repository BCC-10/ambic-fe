import React, { useState, useEffect } from "react";
import Input from "../../Componets/Elements/Input/input";
import { Logins } from "../../data/index";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { useAuth } from "../../Componets/Util/AuthContext";
import { FcGoogle } from "react-icons/fc";
import Pettern from "../../assets/Pettern/image 11.png";

const Login = () => {
  const { login } = useAuth();
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
  const [resendCount, setResendCount] = useState<number>(
    parseInt(localStorage.getItem("resendCount") || "0", 10)
  );
  const [resendDisabled, setResendDisabled] = useState<boolean>(false);
  const [googleLink, setGoogleLink] = useState("");
  const {isAuthenticated} = useAuth();

  useEffect(() => {
    if(isAuthenticated) {
      navigate("/user/profile")
    }
  }, [isAuthenticated, navigate])

  useEffect(() => {
    const fetchGoogleLink = async () => {
      try {
        const response = await axios.post(
          "https://ambic.live:443/api/v1/auth/google"
        );
        setGoogleLink(response.data.payload);
        // Sesuaikan dengan format response API
      } catch (error) {
        console.error("Error fetching Google login URL:", error);
      }
    };
    fetchGoogleLink();
  }, []);

  useEffect(() => {
    const lastResendTime = localStorage.getItem("lastResendTime");
    if (lastResendTime) {
      const timePassed = Date.now() - parseInt(lastResendTime, 10);
      if (timePassed < 15 * 60 * 1000) {
        setResendDisabled(true);

        // Hitung sisa waktu dan atur timer untuk mengaktifkan tombol kembali
        const remainingTime = 15 * 60 * 1000 - timePassed;
        setTimeout(() => {
          setResendDisabled(false);
          localStorage.removeItem("resendCount");
          localStorage.removeItem("lastResendTime");
        }, remainingTime);
      } else {
        // Jika sudah lebih dari 15 menit, reset data
        localStorage.removeItem("resendCount");
        localStorage.removeItem("lastResendTime");
      }
    }
  }, []);

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
    if (resendCount >= 2) {
      Swal.fire({
        icon: "warning",
        title: "Batas Tercapai",
        text: "Anda telah mencapai batas pengiriman ulang verifikasi. Silakan coba lagi dalam 15 menit.",
      });
      return;
    }

    setLoading(true);
    setResendMessage("");

    try {
      await axios.post(
        "https://ambic.live:443/api/v1/auth/verification",
        { email: email },
        { headers: { "Content-Type": "application/json" } }
      );

      setResendMessage("Link verifikasi telah dikirim ulang ke email Anda.");
      const newResendCount = resendCount + 1;
      setResendCount(newResendCount);
      localStorage.setItem("resendCount", newResendCount.toString());

      if (newResendCount > 2) {
        localStorage.setItem("lastResendTime", Date.now().toString());
        setResendDisabled(true);

        Swal.fire({
          icon: "info",
          title: "Batas Tercapai",
          text: "Anda harus menunggu 15 menit sebelum mencoba lagi.",
        });

        setTimeout(() => {
          setResendDisabled(false);
          localStorage.removeItem("resendCount");
          localStorage.removeItem("lastResendTime");
        }, 15 * 60 * 1000);
      }
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
      login();
      navigate("/");
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
            newErrors.identifier = ""; // Default dari API jika tidak dikenali
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

        if (err.response.data.status_code === 403) {
          Swal.fire({
            title: "Akun Belum diVerifikasi",
            text: "Cek Emailmu untuk Memverifikasi!",
            icon: "error",
            confirmButtonText: "Oke",
          });
        }

        setErrors(newErrors);
      } else {
        setErrors({ general: "Terjadi kesalahan. Coba lagi nanti." });
      }
    }
  };
  return (
    <div className="relative flex flex-wrap items-center justify-center min-w-full min-h-screen flex-row-reverse ">
      <div className="relative lg:left-50 flex items-center justify-center p-2 w-auto h-auto flex-col bg-none rounded-lg drop-shadow-xl gap-5">
        <h1 className="font-Poppins text-2xl font-semibold">Login</h1>
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
        <div className="flex flex-col items-center justify-start p-2 gap-5 w-full">
        {Logins.map((field, idx) => (
          <div key={idx}>
            <Input
            type={field.type}
            placeholder={field.placeholder}
            content={field.content}
            icon={field.icon}
            className="focus:outline-none bg-[#D9D9D9] p-2 rounded-2xl w-full h-[10%] placeholder:text-sm"
            value={formData[field.name as keyof typeof formData] || ""}
            onChange={(e) =>
            setFormData({ ...formData, [field.name]: e.target.value })
            }
            color="text-gray-600"
          />
          {errors[field.name] && (
      <p className="text-red-500 text-sm mt-1">
        {errors[field.name]}
      </p>
    )}
  </div>
))}
        </div>
        <Link to="/reset"><p className="">Lupa Password?</p></Link>
        <button
          type="submit"
          className="w-full py-2 rounded-2xl text-white font-Poppins font-semibold bg-teal-700/85 transition-transform duration-300 ease-in hover:scale-95 focus:outline-2 focus:outline-offset-2 focus:outline-offset-teal-700/85 cursor-pointer"
          onClick={handleLogin}
        >
          Masuk
        </button>
        <h3 className="font-Poppins text-lg font-semibold">Atau</h3>
        <Link to={googleLink}>
          <FcGoogle size={40} />
        </Link>
        <div className="lg:hidden flex flex-col gap-5 items-center justify-center ">
          <h1 className="text-teal-700/85 font-bold font-Poppins text-3xl">
            Welcome Back
          </h1>
          <p className="text-teal-700/85 font-medium font-Poppins text-lg">
            Belum punya akun?
          </p>
          <button className="w-[40%] py-2 rounded-2xl text-black font-Poppins font-semibold bg-teal-700/85 transition-transform duration-300 ease-in hover:scale-95 cursor-pointer ">
            <Link
              to="/register"
              className="text-white w-full h-full flex items-center justify-center"
            >
              Daftar
            </Link>
          </button>
        </div>
      </div>
      <div className="group bg-teal-700/85 w-full md:w-1/2 lg:w-2/5 absolute left-0 h-screen rounded-r-[300px] flex items-center justify-center flex-col gap-2 max-lg:hidden  ">
        {/* Gambar sebagai Background */}
        <img
          src={Pettern}
          alt=""
          className="absolute top-0 left-0 w-full h-full object-cover rounded-r-[300px] opacity-50"
        />
        {/* Konten di atas gambar */}
        <div className="z-10 flex flex-col items-center text-center px-5 gap-3">
          <h1 className="text-white font-bold font-Poppins text-3xl">
            Welcome Back!
          </h1>
          <p className="text-white font-medium font-Poppins text-lg">
            Belum punya Akun?
          </p>
          <button className="w-[35%] py-2 rounded-2xl text-black font-Poppins font-semibold   bg-white/85 transition-transform duration-300 ease-in hover:scale-95 cursor-pointer">
            <Link
              to="/register"
              className="w-full h-full flex items-center justify-center"
            >
              Daftar
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
