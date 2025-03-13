import React, {useState, useEffect} from 'react'
import AvatarEditor from "react-avatar-edit";
import { Dialog } from "primereact/dialog";
import Profile from "../../../assets/Background/Sponsor/image 4.png"
import { BiCamera } from "react-icons/bi";
import axios from 'axios';
import Swal from 'sweetalert2';

interface userData {
    photo: string | Blob | File 
}
const ChangePicture: React.FC = () => {
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [cropedImage, setCropedImage] = useState<Blob | null>(null)
    const [loading, setLoading] = useState<boolean>(false);
    const [preview, setPreview] = useState<userData | null >({ photo: ' '  } ) ;
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
            useEffect(() => {
            const token = localStorage.getItem("token");
            setIsLoggedIn(!!token)
            }, [])

    const token = localStorage.getItem("token");
    // const [formData, setFormData] = useState({
    //     photo: '',
    // })

    // Saat user memilih gambar
    const onClose = () => {
        setPreview(null);
        setCropedImage(null);
    };

    // Simpan hasil crop ke state
    const onCrop = (preview : any) => {
        setPreview(preview);

        fetch(preview)
            .then((res) => res.blob())
            .then((blob) => {
                setCropedImage(blob)
            })
    };

    
    const fecthUserData = async () => {
        try {
            setLoading(true);
            const response = await axios.get("https://ambic.live:443/api/v1/partners", {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            if (response.data.status_code == 200) {
                // Pastikan mengambil data dari response dengan struktur yang benar
                const apiUser = response.data.payload.partner; // Ambil data dari "partner"
                
                setPreview({
                    photo: apiUser.photo 
                });
            }
        } catch (err: any) {
            console.log("Error Fetching user data:", err);
        } finally {
            setLoading(false);
        }
    };
    
        useEffect(() => {
            if(token) {
                setIsLoggedIn(true);
                fecthUserData();
            } else {
                setIsLoggedIn(false);
            }
        }, [])


    const uploadProfilePicture = async () => {
        if(!cropedImage) {
            alert("Pilih Gambar Dulu")
            return;
        }
        

        try {
            Swal.fire({
                title: "Sedang Memproses...",
                text: "Mohon tunggu sebentar",
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });
            const formData = new FormData();
            formData.append("photo", cropedImage);
            const response = await axios.patch("https://ambic.live:443/api/v1/partners", formData,  {
                // withCredentials: true,
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            }
        )
        Swal.close();
        if( response.data.status_code === 200){
            Swal.fire("Berhasil", "Berhasil mengupdate data", "success");
            setIsDialogOpen(false);
        }
        }catch (err : any){
            if(err.response.data.status_code === 422){
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Harus gambar ya..",
                });
            }
            if(err.response.data.status_code === 413){
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Gambarmu terlalu besar. Max 5MB",
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Gagal terhubung ke server.",
                });
            }
            console.log(err)
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex items-center justify-center text-center p-4">
            <div className="relative flex flex-col justify-center items-center w-[100px] h-[100px]">
                {/* Preview Gambar */}
                <img
                    src={typeof preview?.photo === "string"
                        ? preview?.photo : (preview instanceof Blob || preview instanceof File ? URL.createObjectURL(preview) : Profile)}
                    alt="Profile"
                    className="w-[120px] h-[120px] rounded-full object-cover bg-none drop-shadow-xl"
                />
                {/* Tombol Edit */}
                <button
                    className="mt-4 px-2 py-2 text-white rounded-full absolute bottom-0 right-1 bg-[#438BFF]"
                    onClick={() => setIsDialogOpen(true)}
                >
                    <BiCamera />
                </button>
                {/* Dialog Crop Gambar */}
                <Dialog
                    visible={isDialogOpen}
                    onHide={() => setIsDialogOpen(false)}
                    header={() => (
                        <p className="text-2xl font-semibold text-black">
                            Edit Foto Profil
                        </p>
                    )}
                >
                    {/* Komponen Avatar Editor */}
                    <AvatarEditor
                        width={300}
                        height={300}
                        onCrop={onCrop}
                        onClose={onClose}
                        backgroundColor='#f8f8f8'
                        label="Click for Upload"
                    />
                    {/* Tombol Simpan */}
                    <button
                        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md w-full"
                        onClick={uploadProfilePicture}
                        disabled={loading}
                    >
                        {loading ? "Menyimpan...." : "Simpan"}
                    </button>
                </Dialog>
            </div>
        </div>
    )
}

export default ChangePicture
