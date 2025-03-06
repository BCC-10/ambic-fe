import React, { useState } from "react";
import { Button } from "primereact/button";
import Input from "../../../../Componets/Elements/Input/input";
import { useNavigate } from "react-router-dom";
import useProducts from "../../../../Componets/Hooks/useProduct";

const AddProduct: React.FC = () => {
    const navigate = useNavigate();
    const [product, setProduct] = useState({
        id: 3,
        name: "",
        initialPrice: "",
        finalPrice: "",
        stock: "",
        time: "",
        description: ""
    });

    const { addProduct, products } = useProducts();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        
        setProduct((prev) => ({
            ...prev,
            [name]: value, // Menyimpan value sebagai string agar tidak ada error binding
        }));
    };

    const maxId = products.length > 0 ? Math.max(...products.map((p) => p.id)) : 0;

    const handleSubmit = () => {
        const newProduct = {
            ...product,
            id: maxId + 1,
            initialPrice: Number(product.initialPrice) || 0,
            finalPrice: Number(product.finalPrice) || 0,
            stock: Number(product.stock) || 0,
            time: String(product.time) || "",
            description: String(product.description) || ""
        };

        addProduct(newProduct);
        navigate("/mitra/product");
    };

    return (
        <div className="card p-4 h-[90%] flex items-center justify-center flex-col ">
            <h2 className="text-3xl font-semibold mb-4 text-center font-Poppins">Tambah Produk</h2>
            <div className="p-fluid">
                <div className="mb-3">
                    <Input type="text" name="name" content="Nama Produk" value={product.name as keyof typeof product} onChange={handleInputChange}  color="text-teal-700/85"/>
                </div>
                <div className="mb-3">
                    <Input type="number" name="initialPrice"content="Harga Awal" value={product.initialPrice} onChange={handleInputChange}  color="text-teal-700/85"/>
                </div>
                <div className="mb-3">
                    <Input type="number" name= "finalPrice" content="Harga Akhir" value={product.finalPrice} onChange={handleInputChange}  color="text-teal-700/85"/>
                </div>
                <div className="mb-3">
                    <Input type="number" name="stock" content="Stok" value={product.stock} onChange={handleInputChange} color="text-teal-700/85" />
                </div>
                <div className="mb-3">
                    <Input type="text" name="time" content="Waktu Pengambilan" value={product.time} onChange={handleInputChange} color="text-teal-700/85" />
                </div>
                <div className="mb-3">
                    <Input type="text" name="description" content="Deskripsi Produk" value={product.description} onChange={handleInputChange} color="text-teal-700/85" />
                </div>
                <div className="mb-3 pt-2">
                    <Button type="button" label="Submit" icon="pi pi-plus" className="p-button-success" onClick={handleSubmit} style={{backgroundColor: 'var(--teal-700)', border:'none', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)'}} rounded/>
                </div>
            </div>
        </div>
    );
};

export default AddProduct;