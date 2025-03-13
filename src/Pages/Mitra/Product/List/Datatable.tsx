import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import useProducts from "../../../../Componets/Util/useProduct";
import { Dialog } from "primereact/dialog";
import Input from "../../../../Componets/Elements/Input/input";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

interface Produk {
  id:  string;
  name: string;
  initial_price: number;
  final_price: number;
  stock: number;
  pickup_time: string;
  description: string;
  partner_id:string;
  photo: File | undefined;
  star: number;
  count_rating: number;
}

const Datatable = ({ className }: { className?: string }) => {
  const navigate = useNavigate();
  const { products, deleteProduct, editProduct, fetchProducts } = useProducts();

  const [visible, setVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Produk | null>(null);
  const [visibleDetail, setVisibleDetail] = useState(false);
  const [detailProduct, setDetailProduct] = useState<Produk | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const openEditDialog = (product: Produk) => {
    setSelectedProduct({ ...product });
    setVisible(true);
  };

  const handleSave = () => {
    if (selectedProduct) {
      editProduct(selectedProduct);
      setVisible(false);
    }
  };

  const openDetailDialog = (product: Produk) => {
    setDetailProduct(product);
    setVisibleDetail(true);
  };

  const actionBodyTemplate = (rowData: Produk) => (
    <div className="flex gap-2">
      <Button onClick={() => openEditDialog(rowData)} icon="pi pi-pencil" />
      <Button onClick={() => deleteProduct(rowData.id)} icon="pi pi-trash" severity="danger" />
      <Button onClick={() => openDetailDialog(rowData)} icon="pi pi-eye" severity="info" />
    </div>
  );

  return (
    <div className={className}>
      <div className="flex justify-between mb-4 my-5 mx-5">
        <h2 className="text-xl font-Poppins font-semibold">Daftar Produk</h2>
        <Button label="Tambah Produk" onClick={() => navigate(`/mitra/product/add`)} icon="pi pi-plus" />
      </div>
      <DataTable value={products} tableStyle={{ minWidth: "100%" }} scrollable scrollHeight="flex">
        <Column header="No" body={(_, { rowIndex }) => rowIndex + 1}/>
        <Column field="name" header="Nama Produk" />
        <Column field="initial_price" header="Harga Awal" body={(data) => `Rp ${data.initial_price}`} />
        <Column field="final_price" header="Harga Akhir" body={(data) => `Rp ${data.final_price}`} />
        <Column field="stock" header="Stok" />
        <Column body={actionBodyTemplate} header="Aksi" />
      </DataTable>

      <Dialog header="Edit Produk" visible={visible} style={{ width: "16vw" }} onHide={() => setVisible(false)}>
        {selectedProduct && (
          <div className="flex flex-col gap-3 items-center justify-center ">
            <Input 
              type="text" 
              name="name" 
              content="Nama Produk" 
              value={selectedProduct.name} 
              onChange={(e) => setSelectedProduct((prev) => prev ? { ...prev, name: e.target.value } : null)} />
            <Input 
              type="number" 
              name="initial_price" 
              content="Harga Awal" 
              value={selectedProduct.initial_price} 
              onChange={(e) => setSelectedProduct((prev) => prev ? { ...prev, initial_price: Number(e.target.value) } : null)} />
            <Input 
              type="number" 
              name="final_price" 
              content="Harga Akhir" 
              value={selectedProduct.final_price} 
              onChange={(e) => setSelectedProduct((prev) => prev ? { ...prev, final_price: Number(e.target.value) } : null)} />
            <Input 
              type="number" 
              name="stock" 
              content="Stock" 
              value={selectedProduct.stock} 
              onChange={(e) => setSelectedProduct((prev) => prev ? { ...prev, stock: Number(e.target.value) } : null)} />
            <Input 
              type="text" 
              name="pickup_time" 
              content="Waktu Pengambilan"
              value={selectedProduct.pickup_time} 
              onChange={(e) => setSelectedProduct((prev) => prev ? { ...prev, pickup_time: e.target.value } : null)} />
            <Input type="text" name="description" content="Deskripsi" value={selectedProduct.description} 
              onChange={(e) => setSelectedProduct((prev) => prev ? { ...prev, description: e.target.value } : null)} />
            <Button label="Simpan" onClick={handleSave} className="p-button-success w-1/2" rounded/>
          </div>
        )}
      </Dialog>
    </div>
  );
};

export default Datatable;
