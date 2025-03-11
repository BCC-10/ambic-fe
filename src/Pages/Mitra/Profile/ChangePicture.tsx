import React, {useState} from 'react'
import AvatarEditor from "react-avatar-edit";
import { Dialog } from "primereact/dialog";
import Profile from "../../../assets/Background/Sponsor/image 4.png"
import { BiCamera } from "react-icons/bi";
import axios from 'axios';
import Swal from 'sweetalert2';
const ChangePicture: React.FC = () => {
    const [preview, setPreview] = useState<string | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [cropedImage, setCropedImage] = useState<Blob | null>(null)
    const [loading, setLoading] = useState<boolean>(false);

    const token = localStorage.getItem("token");

    // Saat user memilih gambar
    const onClose = () => {
        setPreview(null);
        setCropedImage(null);
    };

    // Simpan hasil crop ke state
    const onCrop = (preview: string) => {
        setPreview(preview);

        fetch(preview)
            .then((res) => res.blob())
            .then((blob) => {
                setCropedImage(blob)
            })
    };

    const uploadProfilePicture = async () => {
        if(!cropedImage) {
            alert("Pilih Gambar Dulu")
            return;
        }

        setLoading(true);
        const formData = new FormData();
        formData.append("photo", cropedImage, "profile.jpg");

        try {
            const response = await axios.patch("https://ambic.live:443/api/v1/users", formData, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            }
        )
        if(response.data.status_code === 200){
            alert("foto profile berhasil diperbarui!")
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
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex items-center justify-center text-center p-4">
            <div className="relative flex flex-col justify-center items-center w-[100px] h-[100px]">
                {/* Preview Gambar */}
                <img
                    src={preview || Profile}
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
