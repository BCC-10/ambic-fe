import React, { useState, useRef } from "react";
import { Button } from "primereact/button";
import Input from "../../../../Componets/Elements/Input/input";
import { useNavigate } from "react-router-dom";
import useProducts from "../../../../Componets/Util/useProduct";

const AddProduct: React.FC = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: "",
    initial_price: "",
    final_price: "",
    stock: "",
    pickup_time: "",
    description: "",
  });

  const { addProduct, products } = useProducts();
  const lastId = useRef(0)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setProduct((prev) => ({
      ...prev,
        [name]: ["initial_price", "final_price", "stock"].includes(name) ? Number(value) || 0 : value,
    }));
  };

  const maxId =
  products.length > 0 
  ? Math.max(...products.map((p) => p.id).filter((id): id is number => id !== undefined)) 
  : 0;
  lastId.current = maxId;

  const handleSubmit = () => {
    const newProduct = {
      ...product,
      id: Number(maxId + 1),
      initial_price: Number(product.initial_price) || 0,
      final_price: Number(product.final_price) || 0,
      stock: Number(product.stock) || 0,
      pickup_time: String(product.pickup_time) || "",
      description: String(product.description) || "",
    };

    addProduct(newProduct);
    navigate("/mitra/product");
  };

  return (
    <div className="card p-4 h-[90%] flex items-center justify-center flex-col ">
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
          />
        </div>
        <div className="mb-3">
          <Input
            type="number"
            name="initial_price"
            content="Harga Awal"
            value={product.initial_price as keyof typeof product}
            onChange={handleInputChange}
            color="text-teal-700/85"
          />
        </div>
        <div className="mb-3">
          <Input
            type="number"
            name="final_price"
            content="Harga Akhir"
            value={product.final_price}
            onChange={handleInputChange}
            color="text-teal-700/85"
          />
        </div>
        <div className="mb-3">
          <Input
            type="number"
            name="stock"
            content="Stok"
            value={product.stock}
            onChange={handleInputChange}
            color="text-teal-700/85"
          />
        </div>
        <div className="mb-3">
          <Input
            type="text"
            name="pickup_time"
            content="Waktu Pengambilan"
            value={product.pickup_time}
            onChange={handleInputChange}
            color="text-teal-700/85"
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
          />
        </div>
        <div className="mb-3 pt-2">
          <Button
            type="button"
            label="Submit"
            icon="pi pi-plus"
            className="p-button-success"
            onClick={handleSubmit}
            style={{
              backgroundColor: "var(--teal-700)",
              border: "none",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
            }}
            rounded
          />
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
