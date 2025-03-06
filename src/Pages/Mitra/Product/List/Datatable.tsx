import React, {useState} from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import useProducts from "../../../../Componets/Hooks/useProduct";
import { Dialog } from "primereact/dialog";
import Input from "../../../../Componets/Elements/Input/input"
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";


interface Produk {
    id: number;
    name: string;
    initialPrice : number;
    finalPrice: number;
    stock: number;
    time: string;
    description: string;
}

const Datatable = ({className} : {className?:string}) => {
    const navigate = useNavigate();
    const {products, deleteProduct, editProduct } = useProducts();

    // State untuk Dialog Edit
    const [visible, setVisible] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Produk | null>(null);

    // State untuk Dialog Detail
    const [visibleDetail, setVisibleDetail] = useState(false)
    const [detailProduct, setDetailProduct] = useState<Produk | null>(null)

    const openDetailDialog = (product: Produk) => {
        setDetailProduct(product);
        setVisibleDetail(true);
    };

    // functtion edit Product
    const openEditDialog = (product : Produk) => {
        setSelectedProduct({
            ...product,
            initialPrice: product.initialPrice ?? 0,
            finalPrice: product.finalPrice ?? 0,
            stock: product.stock ?? 0,
            time: product.time || '',
            description: product.description || ''
        });
        setVisible(true);
    }

    const handleSave = () => {
        if (selectedProduct) {
            editProduct(selectedProduct);
            setVisible(false);
        }
    }

    const actionBodyTemplate = (rowData: Produk) => {
        return (
            <div className="flex gap-2">
                <Button
                onClick={() => {
                openEditDialog(rowData)
                }}
                icon = "pi pi-pencil"
                />
                <Button
                onClick={() => deleteProduct(rowData.id)} 
                icon = "pi pi-trash"
                severity="danger"
                />
                <Button
                onClick={() => openDetailDialog(rowData)}
                icon="pi pi-eye"
                severity="info"
            />
            </div>
        )
    }

    return (
        <div className={className}>
            <div className="flex justify-between mb-4 my-5 mx-5">
                <h2 className="text-xl font-Poppins font-semibold">Daftar Produk</h2>
                <Button
                label="Tambah Produk"
                onClick={() => navigate(`/mitra/product/add`)} 
                icon = "pi pi-plus"
                className="bg-teal-700/85 "
                style={{ 
                    backgroundColor: 'var(--teal-700)', 
                    border: 'none',
                    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)'
                }}
                rounded
                />
            </div>
            <div>
            <DataTable value={products} tableStyle={{ minWidth: '100%' }} scrollable scrollHeight="flex">
                <Column field="id" header="No"/>
                <Column field="name" header="Nama Produk"/>
                <Column field="initialPrice" header="Harga Awal" body={(data) => `Rp ${data.initialPrice}`}/>
                <Column field="finalPrice" header="Harga Akhir" body={(data) => `Rp ${data.finalPrice}`}/>
                <Column field="stock" header="Stok"/>
                <Column body={actionBodyTemplate} header="Aksi"/>
            </DataTable>
            </div>
            <Dialog 
                header="Edit Produk" 
                visible={visible} 
                style={{ width: '30vw' }} 
                onHide={() => setVisible(false)}
                headerClassName="text-center text-3xl font-semibold font-Poppins"
                footer={
                    <div>
                        <Button label="Batal" icon="pi pi-times" onClick={() => setVisible(false)} className="p-button-text"/>
                        <Button label="Simpan" icon="pi pi-check" onClick={handleSave} className="p-button-success"/>
                    </div>
                }
            >
                {selectedProduct && (
                    <div className="flex flex-col gap-3 ">
                        <div className="flex flex-col ">
                            <Input
                                type="text"
                                name="name"
                                content="Nama Produk"
                                value={selectedProduct?.name || ""}
                                onChange={(e) =>
                                    setSelectedProduct((prev) => prev ? { ...prev, name: e.target.value } : null)
                                }
                                color="text-teal-700/85"
                                className="w-100"
                            />
                        </div>
                        <div className="flex flex-col">
                            <Input
                                type="text"
                                name="initialPrice"
                                content="Harga Awal"
                                value={selectedProduct?.initialPrice ?? 0 }
                                onChange={(e) =>
                                    setSelectedProduct((prev) =>
                                        prev ? { ...prev, initialPrice: parseFloat(e.target.value) || 0 } : null
                                    )
                                }
                                color="text-teal-700/85"
                                className="w-100"
                            />
                        </div>
                        <div className="flex flex-col">
                            <Input 
                                type="text" 
                                name="finalPrice" 
                                content="Harga Akhir"
                                value={selectedProduct?.finalPrice ?? 0}
                                onChange={(e) =>
                                    setSelectedProduct((prev) =>
                                        prev ? { ...prev, finalPrice: parseFloat(e.target.value) || 0 } : null
                                    )
                                }
                                color="text-teal-700/85"
                                className="w-100"
                            />
                        </div>
                        <div className="flex flex-col">
                            <Input 
                                type="text" 
                                name="stock" 
                                content="Stock"
                                value={selectedProduct?.stock ?? 0} 
                                onChange={(e) =>
                                    setSelectedProduct((prev) =>
                                        prev ? { ...prev, stock: parseFloat(e.target.value) || 0 } : null
                                    )
                                }
                                color="text-teal-700/85"
                                className="w-100"
                            />
                        </div>
                        <div className="flex flex-col">
                            <Input 
                                type="text" 
                                name="time" 
                                content="Waktu Pengambilan"
                                value={selectedProduct?.time || ""} 
                                onChange={(e) =>
                                    setSelectedProduct((prev) => prev ? { ...prev, time: e.target.value } : null)
                                }
                                color="text-teal-700/85"
                                className="w-100"
                            />
                        </div>
                        <div className="flex flex-col">
                            <Input 
                                type="text" 
                                name="description" 
                                content="Waktu Pengambilan"
                                value={selectedProduct?.description || ""} 
                                onChange={(e) =>
                                    setSelectedProduct((prev) => prev ? { ...prev, description: e.target.value } : null)
                                }
                                color="text-teal-700/85"
                                className="w-100"
                            />
                        </div>
                    </div>
                )}
            </Dialog>
            <Dialog 
            header="Detail Barang" 
            visible={visibleDetail} 
            style={{ width: '30vw' }} 
            onHide={() => setVisibleDetail(false)}
            headerClassName="text-center text-3xl font-semibold font-Poppins"
            >
                {detailProduct && (
                <div className="flex flex-col gap-5 items-center justify-center ">
                    <div className="flex flex-col items-start ">
                        <strong className="font-Poppins text-lg text-teal-700/85">Nama Produk: </strong>
                        <div className="w-100 rounded-xl bg-gray-200 px-4 py-3">
                            <h3 className="font-Poppins text-lg font-semibold">{detailProduct.name}</h3>
                        </div>
                    </div>
                    <div className="flex flex-col items-start ">
                        <strong className="font-Poppins text-lg text-teal-700/85">Harga Awal: </strong>
                        <div className="w-100 rounded-xl bg-gray-200 px-4 py-3">
                            <h3 className="font-Poppins text-lg font-semibold">{detailProduct.initialPrice}</h3>
                        </div>
                    </div>
                    <div className="flex flex-col items-start ">
                        <strong className="font-Poppins text-lg text-teal-700/85">Harga Akhir: </strong>
                        <div className="w-100 rounded-xl bg-gray-200 px-4 py-3">
                            <h3 className="font-Poppins text-lg font-semibold">{detailProduct.finalPrice}</h3>
                        </div>
                    </div>
                    <div className="flex flex-col items-start ">
                        <strong className="font-Poppins text-lg text-teal-700/85">Stok: </strong>
                        <div className="w-100 rounded-xl bg-gray-200 px-4 py-3">
                            <h3 className="font-Poppins text-lg font-semibold">{detailProduct.stock}</h3>
                        </div>
                    </div>
                    <div className="flex flex-col items-start ">
                        <strong className="font-Poppins text-lg text-teal-700/85">Waktu Pengambilan: </strong>
                        <div className="w-100 rounded-xl bg-gray-200 px-4 py-3">
                            <h3 className="font-Poppins text-lg font-semibold">{detailProduct.time}</h3>
                        </div>
                    </div>
                    <div className="flex flex-col items-start ">
                        <strong className="font-Poppins text-lg text-teal-700/85">Deskripsi Barang: </strong>
                        <div className="w-100 rounded-xl bg-gray-200 px-4 py-3">
                            <h3 className="font-Poppins text-lg font-semibold">{detailProduct.description}</h3>
                        </div>
                    </div>
                    
                </div>
            )}
        </Dialog>
        </div>
    )
}

export default Datatable
