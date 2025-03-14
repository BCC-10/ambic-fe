import React, {useEffect, useState} from 'react'
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

const Verify = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [massage, setMassage] = useState("Memverivikasi akun...");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = searchParams.get("token");
        const email = searchParams.get("email");

        if(!token){
            setMassage("Token tidak valid atau sudah kadaluarsa")
            setLoading(false);
            return;
        }

        const verifyAccount = async () => {
            try {
                const response = await axios.post("https://ambic.live:443/api/v1/auth/verification", {token, email})
                console.log(response.data.statusCode);
                console.log(response.data.status_code);
                if(response.data.status_code == 200){
                    setMassage("Akun Anda telah berhasil diverifikasi. Silahkan login")
                    setLoading(false);
                    navigate("/login");
                } else {
                    setMassage("Verifikasi gagal, Token mungkin sudah tidak valid")
                }
            } catch (error) {
                setMassage("Terjadi kesalahan saat memverifikasi akun")
                console.error(error)
            } finally {
                setLoading(false)
            }
        }

        verifyAccount();
    }, [navigate, searchParams])

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold text-teal-600">Verifikasi Akun</h2>
            <p className="text-gray-600 mt-2">{massage}</p>
            {!loading && (
            <button
                onClick={() => navigate("/login")}
                className="mt-4 inline-block bg-teal-600 text-white px-4 py-2 rounded-lg"
            >
                Masuk ke Akun
            </button>
            )}
        </div>
    </div>
    );
}

export default Verify;