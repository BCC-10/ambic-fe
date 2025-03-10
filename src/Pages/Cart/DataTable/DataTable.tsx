import React, {useState} from "react";
import { useCart, cartItem } from "../../../Componets/Util/useCart";
import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Checkbox } from "primereact/checkbox";
import {useNavigate} from "react-router-dom"
import Swal from "sweetalert2";

interface Carts {
    isVisible: boolean
}

const Cart: React.FC<Carts> = ({isVisible}) => {
const { cart, updateQuantity, removeItem, toggleChecked, checkedTotalPrice, toggleAllChecked  } = useCart();

    const checkboxTemplate = (rowData: cartItem) => {
        return (
            <Checkbox
            checked={rowData.checked}
            onChange={() => toggleChecked(rowData.id)}
            />
        );
    };

// Kolom Gambar & Nama Produk
const productTemplate = (rowData: cartItem) => (
    <div className="flex align-items-center gap-2">
    <img src={rowData.image} alt={rowData.name} width="50" height="50" />
    <span>{rowData.name}</span>
    </div>
);

// Kolom Jumlah Produk
const quantityTemplate = (rowData: cartItem) => (
    <div className="flex align-items-center gap-2">
    <Button
        icon="pi pi-minus"
        className="p-button-rounded p-button-text"
        onClick={() => updateQuantity(rowData.id, rowData.quantity - 1)}
    />
    <InputNumber
        value={rowData.quantity}
        onValueChange={(e) => updateQuantity(rowData.id, e.value ?? rowData.quantity)}
        min={1}
        style={{width: '50%', }}
    />
    <Button
        icon="pi pi-plus"
        className="p-button-rounded p-button-text"
        onClick={() => updateQuantity(rowData.id, rowData.quantity + 1)}
    />
    </div>
);

// Kolom Total Harga
const totalTemplate = (rowData: cartItem) => `Rp ${new Intl.NumberFormat("id-ID").format(rowData.price * rowData.quantity)}`;

// Kolom Hapus Produk
const deleteTemplate = (rowData: cartItem) => (
    <Button label="Hapus" className="p-button-danger p-button-rounded p-button-sm" onClick={() => removeItem(rowData.id)} />
);

const Total = () => {
    return (
        <h3 className="font-Poppins text-teal-700/85 font-bold text-lg w-full "> Rp {new Intl.NumberFormat("id-ID").format(checkedTotalPrice)}</h3>
    ) 
}

const Checkout = () => {
    
    return (
        <button
        className="bg-teal-700/85 px-4 py-2 text-white rounded-full drop-shadow-xl transition-transform duration-200 hover:scale-95 cursor-pointer"
        onClick={() => {
            Swal.fire({
                title: "Checkout Berhasil!",
                text: "Pesanan kamu sedang diproses",
                icon: "success",
                draggable: false
            });
        }}
        >
        Checkout
    </button>
    )
}

const [selectAll, setSelectAll] = useState(false);

const handleSelectAll = () => {
    const newState = !selectAll;
    setSelectAll(newState);
    toggleAllChecked(newState);
};

const navigate = useNavigate()

return (
    <div className="flex flex-col gap-80 h-auto">
        <div className="flex flex-col justify-center gap-7 items-center w-full ">
        <DataTable value={cart} responsiveLayout="scroll" className="bg-white drop-shadow-xl" style={{width: "85rem"}}>
            <Column body={checkboxTemplate} style={{ width: "3rem" }} headerStyle={{backgroundColor: "var(--teal-700)", color: "white"}}/>
            <Column header="Produk" body={productTemplate} headerStyle={{backgroundColor: "var(--teal-700)", color: "white"}}/>
            <Column field="price" header="Harga" body={(rowData) => `Rp ${new Intl.NumberFormat("id-ID").format(rowData.price)}`} headerStyle={{backgroundColor: "var(--teal-700)", color: "white"}}/>
            <Column  header={<span style={{ color: "white", fontWeight: "bold", position: "relative", left:"200px" }}>Jumlah</span>} body={quantityTemplate} headerStyle={{backgroundColor: "var(--teal-700)", color: "white"}} className="custom-header" bodyStyle={{position:"relative", left: "50px"}}/>
            <Column header="Total" body={totalTemplate} headerStyle={{backgroundColor: "var(--teal-700)", color: "white"}}/>
            <Column header="Aksi" body={deleteTemplate} headerStyle={{backgroundColor: "var(--teal-700)", color: "white"}}/>
        </DataTable>
            {isVisible === true ? <button className=' top-50 bg-teal-700/85 right-150 px-4 py-2 text-white font-Poppins font-semibold text-lg rounded-full drop-shadow-lg transition-transform duration-200 hover:scale-95 cursor-pointer w-50' onClick={() => navigate("/order")}>Tambah Produk</button> : <></>}
        </div>
    
        <div className="flex items-center gap-2 flex-row justify-between h-25 px-10 bg-white drop-shadow-xl">
            <div className="flex gap-6">
                <Checkbox checked={selectAll} onChange={handleSelectAll} />
                <span>Pilih Semua ({cart.length})</span>
            </div>
            <div className="w-auto flex flex-row gap-5 items-center  ">
                <Total/>
                <Checkout/>
            </div>
        </div>
    </div>
    );
};

export default Cart;