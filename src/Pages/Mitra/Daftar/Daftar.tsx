import React, {useState, useCallback, useEffect} from 'react'
import Navbar from "../../../Layouts/Navbar"
import Modal from '../../../Componets/Elements/Navbar/ModalLocate'
import {cards} from '../../../data/index'
import Input from "../../../Componets/Elements/Input/input"
import DragDropUpload from "../../../Componets/Elements/Input/DragDropUpload"
import Footer from '../../../Layouts/Footer'
import axios from 'axios'
import {useNavigate, Link} from 'react-router-dom'
import Swal from 'sweetalert2'
import { useDropzone } from 'react-dropzone';
import { LuPackageOpen } from "react-icons/lu";


interface bussinesTypes{
    id: string
    name: string
}

interface bussines{
    address: string,
    city: string,
    place_id: string,
    name: string,
    instagram: string,
    business_type_id: string,
    photo?: File | undefined,
}


const Daftar: React.FC = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [bussinesTypes, setBusinesTypes] = useState<bussinesTypes[]> ([]);
    const [loading, setLoading] = useState<boolean>(false)
    const [dataUsers, setDataUsers] = useState<bussines >({
        name: '',
        business_type_id: '',
        instagram: '',
        address: '',
        place_id: '',
        city: '',
        photo: undefined
    })
    const [query, setQuery] = useState(" ");
    const [suggestions, setSuggestions] = useState<{ place_id: string; name: string }[]>([]);
    const [latitude, setLatitude] = useState<string | null>(null);
    const [longitude, setLongitude] = useState<string | null>(null);
    const [files, setFiles] = useState<File[]>([]);
    const [error, setError] = useState<string | null>(null)
    const [preview, setPreview] = useState<string >("");
    const [fileName, setFileName] = useState<string | null>(null);

    const token = localStorage.getItem("token");
    const navigate = useNavigate();


    // Logika Daftar Mitra + Integrasi backend
    const handleRegisterMitra = async () => {
        if(!token){
            Swal.fire({
                title: "Anda User?",
                text: "Silakan Login Sebagai User Dahulu",
                icon: "question",
                footer: <Link to="/login">Press Me to Login</Link>
            });
            return;
        }
        try{
            Swal.fire({
                title: "Sedang Memproses...",
                text: "Mohon tunggu sebentar",
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });
            console.log(dataUsers)
            const response = await axios.post("https://ambic.live:443/api/v1/partners", dataUsers, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            })
            localStorage.setItem("token", response.data.payload.token)
            Swal.close();
            if(response.data.status_code === 200) {
                Swal.fire({
                    title: "Sukses Mendaftarkan diri sebagai mitra",
                    icon: "success",
                    text: "Berhasil Mendaftarkan Mitra",
                });
                navigate('/mitra/profile')
                const apiUser = response.data.payload.business_types; // Ambil data dari "user"
                console.log(apiUser)
                setDataUsers({
                    name: apiUser.name,
                    business_type_id: apiUser.business_type_id,
                    instagram: apiUser.instagram,
                    address: apiUser.address,
                    place_id: apiUser.place_id,
                    city: apiUser.city,
                    photo: apiUser.photo
                });
            }
        }catch (err) {
            console.log(err);
            if(err.response?.data?.status_code === 409){
                Swal.fire({
                    icon: "error",
                    title: "Ohh Noo...",
                    text: "Mitra Sudah Terdaftar!",
                    footer: 'Butuh Bantuan?'
                });
            } else if(err.response?.data?.status_code === 403){
                Swal.fire({
                    icon: "error",
                    title: "Ohh Noo...",
                    text: "Data Mitra Belum Lengkap!",
                    footer: 'Butuh Bantuan?'
                });
            }
        }
    }


    // Minta Akses Lokasi Terkini
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                setLatitude(position.coords.latitude.toString());
                setLongitude(position.coords.longitude.toString());
                },
                (error) => {
                console.error("Error getting location:", error);
                alert("Gagal mendapatkan lokasi, pastikan izin lokasi diaktifkan.");
                }
            );
            } else {
            alert("Geolocation tidak didukung di browser ini.");
            }
        }, []);
    
    // Ambil data Lokasi dari Backend 
    const fetchLocations = async (searchTerm: string) => {
        if (!searchTerm || !latitude || !longitude) {
            setSuggestions([]);
            return;
            }
            try {
            const response = await axios.get("https://ambic.live:443/api/v1/locations", {
                params: {
                query: searchTerm,
                lat: latitude,
                long: longitude,
                radius: "20000",
                },
                headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
                },
            });
        
            if (response.data.payload && response.data.payload.locations) {
                setSuggestions(response.data.payload.locations);
            } else {
                setSuggestions([]);
            }
            } catch (error) {
            console.error("Error fetching locations:", error);
            setSuggestions([]);
        }
    };
    // ganti
    const handleInputChange = (e ) => {
        const {name, value} = e.target
        setDataUsers((prev) => ({
            ...prev, 
            [name]: value 
        }));
        if (name === "place_id") {
            setQuery(value);
            fetchLocations(value);
        }
    }
    // Ambil data Lokasi dari Backend 
    useEffect(() => {
        const fetchBusinesType = async () => {
            setLoading(true)
            try {
                const response = await axios.get("https://ambic.live:443/api/v1/business-types", {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                })
                if(response.data.status_code === 200){
                    setBusinesTypes(response.data.payload.business_types)
                }
            } catch (err) {
                console.log("Letak Eror :" + err)
            } finally {
                setLoading(false)
            }
        }
        fetchBusinesType()
    },[])

    // Pilih Lokasi terdekat
    const handleSelectLocation = (name: string, place_id: string) => {
        setQuery(name);
        setDataUsers((prev) => ({ ...prev, place_id }));
        setSuggestions([]);
    };
    
    // Drag&Drop Gambar
    const onDrop = useCallback((acceptedFiles: File[], fileRejections: any) => {
        if(fileRejections.length > 0) {
            setError("File tidak valid! Pastikan file adalah gambar (PNG, JPG, JPEG) dan ukurannya < 5MB")
            return;
        }
        setFiles(acceptedFiles)
        setError(null)

        // Buat URL preview
        const file = acceptedFiles[0]
        const previewURL = URL.createObjectURL(file);
        setPreview(previewURL);
        setFileName(file.name)

        // Update state dataUsers untuk menyimpan foto
        setDataUsers(prevData => ({
            ...prevData,
            photo: file // Pastikan ini adalah File, bukan URL
        }));
    }, [])
    
    // Drag&Drop Gambar
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
            onDrop,
            accept: {'image/png' : [], 'image/jpg' : [], 'image/jpeg' : []},
            maxSize: 5 * 1024 * 1024,
            maxFiles: 1,
            multiple: false
        })

    return (
        <main className='min-h-screen flex flex-col overflow-hidden w-full '>
            <div>
                <Navbar setOpen={setOpen} open={undefined}/>
            </div>
            <div className='flex flex-row items-start justify-start'>
                <div className='w-[25%] min-h-[120vh] flex flex-col items-center gap-4 bg-teal-700/85 pt-60 max-md:justify-start max-md:pt-120 max-lg:pt-0 max-lg:justify-center '>
                    <h1 className='font-Poppins text-3xl text-white font-semibold max-lg:text-center'>Mitra Ambic</h1>
                    <div className='flex items-center justify-center flex-col gap-20 '>
                        {cards.slice(0,3).map((_,idx) => (
                            <img key={idx} src={_.description} alt="" className='w-1/2 bg-none drop-shadow-xl'/>
                        ))}
                    </div>
                </div>
                <div className='bg-[#FFF8F4] w-full min-h-[116vh] mt-10 flex flex-col items-center justify-center gap-7 relative max-md:min-h-[116vh] max-md:justify-start max-md:pt-80'>
                    <div className= 'w-[50%] h-auto flex items-center justify-center '>
                        <h1 className=' w-full text-center font-Poppins text-4xl font-semibold'>Form Pendaftaran Mitra Ambic</h1>
                    </div>
                    <div className='w-full flex items-center justify-center gap-6 flex-col h-auto bg-none drop-shadow-xl'>
                            <div className='w-3/4 h-auto flex items-center justify-start flex-col gap-5'>
                                <Input 
                                type="text" 
                                name='name'
                                value={dataUsers.name}
                                onChange={handleInputChange}
                                placeholder="Nama Bisnis" 
                                className='w-full h-full px-4 rounded-xl ' 
                                content="Nama Bisnis" 
                                width="w-[55%] max-sm:w-full max-lg:w-[90%] max-xl:w-[90%] "
                                color="text-teal-700 "/>
                                <div className='flex items-start flex-col w-full justify-center gap-2'>
                                    <div className='flex gap-2 justify-start items-start '>
                                        <label htmlFor="businessType" className='font-Poppins text-md font-semibold text-teal-700 ml-72 max-2xl:ml-49 max-xl:ml-10 max-lg:ml-6 max-sm:ml-0'>Jenis Bisnis</label>
                                    </div>
                                    <div className='flex w-full items-center justify-center'>
                                        <select 
                                            id="businessType"
                                            name='business_type_id'
                                            className='w-[55%] max-sm:w-full max-lg:w-[90%] max-xl:w-[90%] p-2 pr-12  rounded-2xl bg-gray-200 focus:outline-none'
                                            // formData[field.name as keyof typeof formData] || ""
                                            value={dataUsers.business_type_id as string}
                                            onChange={handleInputChange
                                            }
                                            disabled={loading}
                                        >
                                            {bussinesTypes.map((Type) => (
                                                <option value={Type.id} key={Type.id}>
                                                    {/* {loading && <p className="p-2 text-gray-500">Loading...</p>} */}
                                                    {Type.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <Input 
                                type="text"
                                name='instagram'
                                value={dataUsers.instagram} 
                                onChange={handleInputChange}
                                placeholder="Instagram Bisnis" 
                                className='w-full h-full px-4 rounded-xl ' 
                                content="Instagram Bisnis" 
                                width="w-[55%] max-sm:w-full max-lg:w-[90%] max-xl:w-[90%] "
                                color="text-teal-700 "/>
                                <Input 
                                type="text" 
                                name='address'
                                value={dataUsers.address}
                                onChange={handleInputChange}
                                placeholder="Alamat Bisnis" 
                                className='w-full h-full px-4 rounded-xl ' 
                                content="Alamat Bisnis" 
                                width="w-[55%] max-sm:w-full max-lg:w-[90%] max-xl:w-[90%] "
                                color="text-teal-700 "/>
                                <div className='relative z-100 w-full flex items-center justify-center'>
                                <Input
                                    type='text'
                                    name="place_id"
                                    content="Posisi Alamat Bisnis"
                                    color="text-teal-700 "
                                    className='w-full h-full px-4 rounded-xl '
                                    width="w-[55%] max-sm:w-full max-lg:w-[90%] max-xl:w-[90%] "
                                    value={query}
                                    onChange={handleInputChange}
                                    placeholder="Cari lokasi..."
                                    />
                                    {suggestions.length > 0 && (
                                    <ul className="absolute top-full left-70 w-[56%] bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto">
                                        {suggestions.map((location) => (
                                        <li
                                            key={location.place_id}
                                            className="p-2 hover:bg-gray-100 cursor-pointer"
                                            onMouseDown={() => handleSelectLocation(location.name, location.place_id)}
                                        >
                                            {location.name}
                                        </li>
                                        ))}
                                    </ul>
                                    )}
                                </div>
                                <Input 
                                type="text"
                                name='city'
                                value={dataUsers.city}
                                onChange={handleInputChange}
                                placeholder="ex: Semarang" 
                                className='w-full h-full px-4 rounded-xl '
                                content="Kota" 
                                width="w-[55%] max-sm:w-full max-lg:w-[90%] max-xl:w-[90%] "
                                color="text-teal-700 "/>
                                <div className='w-full flex items-center justify-center '>
                                    <div {...getRootProps()} className='relative w-[55%] rounded-xl flex flex-col  cursor-pointer gap-3  max-sm:w-[79%] max-xl:w-[90%] '>
                                        <label className={`font-semibold font-Poppins text-teal-700/85`}>Masukkan Gambar Bisnis</label>
                                        <div className={`w-full flex items-center pl-17 py-5 max-sm:pl-14 border-2 border-dashed border-gray-400 hover:bg-gray-100 rounded-xl ${preview ? "flex-col gap-5" : ""}`}>
                                            <input 
                                                {...getInputProps()} 
                                                type='file'
                                                name='photo'
                                                onChange={(e) => {
                                                    if (e.target.files && e.target.files.length > 0) {
                                                        const file = e.target.files[0];
                                                        setDataUsers((prevData) => ({
                                                            ...prevData,
                                                            photo: file
                                                        }));
                                                        
                                                        // Buat preview gambar
                                                        const previewURL = URL.createObjectURL(file);
                                                        setPreview(previewURL);
                                                        setFileName(file.name);
                                                        }
                                                    }}/>
                                                <LuPackageOpen size={28} className='absolute top-13 left-5'/>
                                                {isDragActive && !preview ? 
                                                <p className='text-gray-600 '>Drop the file heree..</p> : 
                                                !isDragActive && !preview ? 
                                                <p className='text-gray-600'>Drag & drop file here, or click to select</p> : 
                                                preview ?  
                                                <img src={preview} alt="Preview" className="w-40 h-40 object-cover rounded-lg shadow-md mx-auto" /> : 
                                                <></>
                                                }
                                                {preview ? <p className='text-sm text-teal-700 font-medium'>{fileName}</p> : <></>}
                                                {error && <p className='text-red-500 text-sm mt-2'>{error}</p>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                    </div>
                    <button
                    type="submit"
                    className="w-40 h-12 p-2 text-white font-Poppins font-semibold text-lg bg-teal-700/85 rounded-full drop-shadow-xl transition-transform duration-300 hover:scale-95 cursor-pointer"
                    onClick={handleRegisterMitra}
                    >
                    Submit
                    </button>
                </div>
            </div>
            <div>
                <Footer />
            </div>
            <Modal open={open} onClose={() => setOpen(false)} />
        </main>
    )
}

export default Daftar
