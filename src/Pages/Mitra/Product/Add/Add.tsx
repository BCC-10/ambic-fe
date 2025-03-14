import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Button } from 'primereact/button';
import Input from '../../../../Componets/Elements/Input/input';
import { useNavigate } from 'react-router-dom';
import useProducts from '../../../../Componets/Util/useProduct';
import { useDropzone } from 'react-dropzone';
import { LuPackageOpen } from 'react-icons/lu';

const AddProduct: React.FC = () => {
    const navigate = useNavigate();
    const [product, setProduct] = useState({
        // id: "",
        name: '',
        initial_price: '',
        final_price: '',
        stock: '',
        pickup_time: '',
        end_pickup_time: '',
        description: '',
        // partner_id: "",
        photo: undefined as File | undefined,
        // star: 3.5,
        // count_rating: 2,
    });

    const { addProduct, products } = useProducts();
    const lastId = useRef(0);

    const formatDateTime = (dateString: string) => {
        console.log(dateString);
        const date = new Date(dateString);

        const pad = (num: number) => num.toString().padStart(2, '0');

        return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
            date.getDate()
        )} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(
            date.getSeconds()
        )}`;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        let formattedValue = value;
        if (name === 'pickup_time' || name === 'end_pickup_time') {
            // formattedValue = value.replace("T", " ");
            formattedValue = formatDateTime(value); // Menghilangkan "T"
        }

        setProduct((prev) => ({
            ...prev,
            [name]: [
                'initial_price',
                'final_price',
                'stock',
                'star',
                'count_rating',
            ].includes(name)
                ? Number(value) || 0
                : formattedValue,
        }));
    };

    useEffect(() => {
        console.log(product);
    }, [product]);

    const maxId =
        products.length > 0
            ? Math.max(...products.map((p) => Number(p.id)))
            : 0;
    lastId.current = maxId;

    const handleSubmit = () => {
        const newProduct = {
            ...product,
            // id: Number(maxId + 1),
            initial_price: Number(product.initial_price) || 0,
            final_price: Number(product.final_price) || 0,
            stock: Number(product.stock) || 0,
            pickup_time: String(product.pickup_time) || '',
            description: String(product.description) || '',
            // partner_id: String(product.partner_id) || "",
            photo: product.photo instanceof File ? product.photo : undefined,
            // star: Number(product.star) || 0,
            // count_rating: Number(product.count_rating) || 0,
        };

        addProduct(newProduct);
        navigate('/mitra/product');
    };

    const [files, setFiles] = useState<File[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [preview, setPreview] = useState<string>('');
    const [fileName, setFileName] = useState<string | null>(null);
    const onDrop = useCallback((acceptedFiles: File[], fileRejections: any) => {
        if (fileRejections.length > 0) {
            setError(
                'File tidak valid! Pastikan file adalah gambar (PNG, JPG, JPEG) dan ukurannya < 5MB'
            );
            return;
        }
        setFiles(acceptedFiles);
        setError(null);
    }, []);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'image/png': [], 'image/jpg': [], 'image/jpeg': [] },
        maxSize: 5 * 1024 * 1024,
        maxFiles: 1,
        multiple: false,
    });

    return (
        <div className="card p-4 h-[90%] flex items-center justify-center flex-col w-full">
            <h2 className="text-3xl font-semibold mb-4 text-center font-Poppins">
                Tambah Produk
            </h2>
            <div className="p-fluid">
                <div className="mb-3">
                    <Input
                        type="text"
                        name="name"
                        content="Nama Produk"
                        value={product.name as keyof typeof product}
                        onChange={handleInputChange}
                        color="text-teal-700/85"
                        className="w-full"
                    />
                </div>
                <div className="mb-3">
                    <Input
                        min={1}
                        type="number"
                        name="initial_price"
                        content="Harga Awal"
                        value={product.initial_price as keyof typeof product}
                        onChange={handleInputChange}
                        color="text-teal-700/85"
                        className="w-full"
                    />
                </div>
                <div className="mb-3">
                    <Input
                        min={1}
                        type="number"
                        name="final_price"
                        content="Harga Akhir"
                        value={product.final_price}
                        onChange={handleInputChange}
                        color="text-teal-700/85"
                        className="w-full"
                    />
                </div>
                <div className="mb-3">
                    <Input
                        min={1}
                        type="number"
                        name="stock"
                        content="Stok"
                        value={product.stock}
                        onChange={handleInputChange}
                        color="text-teal-700/85"
                        className="w-full"
                    />
                </div>
                <div className="mb-3">
                    <Input
                        type="datetime-local"
                        name="pickup_time"
                        content="Waktu Awal Pengambilan"
                        value={product.pickup_time}
                        onChange={handleInputChange}
                        color="text-teal-700/85"
                        className="w-full"
                    />
                </div>
                <div className="mb-3">
                    <Input
                        type="datetime-local"
                        name="end_pickup_time"
                        content="Waktu Akhir Pengambilan"
                        value={product.end_pickup_time}
                        onChange={handleInputChange}
                        color="text-teal-700/85"
                        className="w-full"
                    />
                </div>
                <div className="mb-3">
                    <Input
                        type="text"
                        name="description"
                        content="Deskripsi Produk"
                        value={product.description}
                        onChange={handleInputChange}
                        color="text-teal-700/85"
                        className="w-full"
                    />
                </div>
                <div className="mb-3">
                    <div
                        {...getRootProps()}
                        className="relative w-full rounded-xl flex flex-col  cursor-pointer gap-3  max-sm:w-[79%] max-xl:w-[90%] "
                    >
                        <label
                            className={`font-semibold font-Poppins text-teal-700/85`}
                        >
                            Masukkan Gambar Produk (Bila ada)
                        </label>
                        <div
                            className={`w-full flex items-center px-8 py-5 max-sm:pl-14 border-2 border-dashed border-gray-400 hover:bg-gray-100 rounded-xl ${
                                preview ? 'flex-col gap-5' : ''
                            }`}
                        >
                            <input
                                {...getInputProps()}
                                type="file"
                                name="photo"
                                onChange={(e) => {
                                    if (
                                        e.target.files &&
                                        e.target.files.length > 0
                                    ) {
                                        const file = e.target.files[0];
                                        setProduct((prevData) => ({
                                            ...prevData,
                                            photo: file,
                                        }));

                                        // Buat preview gambar
                                        const previewURL =
                                            URL.createObjectURL(file);
                                        setPreview(previewURL);
                                        setFileName(file.name);
                                    }
                                }}
                            />
                            <LuPackageOpen
                                size={20}
                                className="relative top-0 -left-3"
                            />
                            {isDragActive && !preview ? (
                                <p className="text-gray-600 ">
                                    Drop the file heree..
                                </p>
                            ) : !isDragActive && !preview ? (
                                <p className="text-gray-600">
                                    Drag & drop file here, or click to select
                                </p>
                            ) : preview ? (
                                <img
                                    src={preview}
                                    alt="Preview"
                                    className="w-40 h-40 object-cover rounded-lg shadow-md mx-auto"
                                />
                            ) : (
                                <></>
                            )}
                            {preview ? (
                                <p className="text-sm text-teal-700 font-medium">
                                    {fileName}
                                </p>
                            ) : (
                                <></>
                            )}
                            {error && (
                                <p className="text-red-500 text-sm mt-2">
                                    {error}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
                <div className="mb-3 pt-2">
                    <Button
                        type="button"
                        label="Submit"
                        icon="pi pi-plus"
                        className="p-button-success"
                        onClick={handleSubmit}
                        style={{
                            backgroundColor: 'var(--teal-700)',
                            border: 'none',
                            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)',
                        }}
                        rounded
                    />
                </div>
            </div>
        </div>
    );
};

export default AddProduct;
