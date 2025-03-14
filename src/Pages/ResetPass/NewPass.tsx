import React, {useState, useEffect} from "react";
import Input from "../../Componets/Elements/Input/input";
import Logo from "../../assets/ICons/Reset/Frame 258.png";
import Pattern from "../../assets/Pettern/image 11.png";
import axios from "axios";
import { useSearchParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FaLock } from "react-icons/fa";


interface Data {
  email: string;
  token: string | null;
  password: string;
}

const NewPass: React.FC = () => {

  

  const [formData, setFormData] = useState<Data>({
    email: '',
    token: '',
    password: '',
  })
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // useEffect(() => {
  //   if(!token){
  //     navigate("/login");
  //     return;
  //   }
  // },[token, navigate])

  const handleResetPassword = async() => {
    if (password !== confirmPassword) {
      Swal.fire("Oops...", "Password tidak cocok!", "error");
      return;
    }

    const email = searchParams.get("email")
    const token = searchParams.get("token")
    const passwords = searchParams.get("password")
    setLoading(true)
    try{
      const response = await axios.patch("https://ambic.live:443/api/v1/auth/reset-password",  {
        email,
        token,  
        password,
      }, {
        headers: {
          'Content-Type' : 'application/json',
        },
      });
      if(response.data.status_code === 200){
        Swal.fire("Berhasil", "Berhasil merubah password", "success");
        navigate("/login");
      }
    }catch(err){
      console.log( err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen bg-white flex flex-row-reverse items-center justify-center w-full p-5 gap-5">
      <div className="relative lg:left-75 w-[15%] max-2xl:w-[20%] max-xl:w-[25%] max-lg:w-[30%] max-md:w-[40%] max-sm:w-[60%] h-auto flex flex-col justify-start p-2 gap-4">
        <h1 className="font-Poppins font-semibold text-3xl">
          Buat Password Baru
        </h1>
        <p className="">
          Kata sandi baru Anda harus berbeda dari kata sandi yang digunakan
          sebelumnya
        </p>
          <Input
            type="password"
            placeholder="ex: 67bhjlg"
            content="New Password"
            icon={ <FaLock className='relative bottom-8 left-[100%]'/>}
            className="w-full"
            color="text-gray-600"
            value={password}
            onChange={(e) => setPassword(e.target.value) }
          />
          <Input
            type="password"
            placeholder="ex: 67bhjlg"
            content="Confirm Password"
            icon={ <FaLock className='relative bottom-8 left-[100%]'/>}
            className="w-full"
            color="text-gray-600"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value) }
          />
        <div className="flex justify-center">
          <button
            type="submit"
            className="w-[60%] h-[20%] p-2 text-white font-Poppins font-semibold text-lg bg-teal-700/85 rounded-full drop-shadow-xl "
            onClick={handleResetPassword}
          >
            {loading ? "Mengirim..." : "Reset Password"}
          </button>
        </div>
      </div>
      <div className="group max-lg:hidden bg-teal-700/85 rounded-r-[321px] absolute left-0 w-[40%] h-screen flex items-center justify-center ">
        <div className="w-3/4 h-3/4 flex items-center justify-center">
          <img
            src={Pattern}
            alt=""
            className="absolute top-0 left-0 w-full h-full object-cover rounded-r-[321px] opacity-50"
          />
          <img src={Logo} alt="" className="z-10 w-full object-cover " />
        </div>
      </div>
    </div>
  );
};

export default NewPass;
