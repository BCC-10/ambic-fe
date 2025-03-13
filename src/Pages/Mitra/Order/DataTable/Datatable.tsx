import React, {useEffect, useState, useRef} from 'react';
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import Input from "../../../../Componets/Elements/Input/input";
import { Dialog } from "primereact/dialog";
import axios from "axios";

interface Payment {
    id: string;
    order_id: string;
    custom_field1: string
    transaction_status: string;
    status_message: string;
    payment_type: string;
    fraud_status: string;
    transaction_time: string;
    settlement_time: string;
    reference_id: string;
}

interface Item {
    id: string;
    partner_id: string;
    name: string;
    description: string;
    initial_price: number;
    final_price: number;
    stock: number;
    pickup_time: string;
    end_pickup_time : string;
    photo: string;
}


interface Transaction {
    id: string;
    user_id: string;
    payment: Payment;
    invoice: string;
    total: number;
    status: string;
    note: string;
    datetime: string;
    items: Item[];
}

const TableTransaction = ({ className }: { className?: string }) => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
    const [visible, setVisible] = useState<boolean>(false);
    const [infoVisible, setInfoVisible] = useState<boolean>(false);
    const lastId = useRef(0)

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await axios.get('https://ambic.live:443/api/v1/partners/transactions', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}` ,
                    },
                });
                setTransactions(response.data.payload.transactions);
                const maxId = response.data.length > 0 ? Math.max(...response.data.payload.transactions.map((p) => p.id)) : 0
                lastId.current = maxId;
            } catch (err) {
                setError('Failed to fetch transactions.');
            } finally {
                setLoading(false);
            }
        };
        fetchTransactions();
    }, []);

    const openInfoDialog = (transaction: Transaction) => {
        setSelectedTransaction(transaction);
        setVisible(true);
    };
    const openDetailDialog = (transaction: Transaction) => {
        setSelectedTransaction(transaction);
        setInfoVisible(true);
    };
    

    const deleteTransaction = (id: string) => {
        // Implement delete functionality here
    };

    const actionBodyTemplate = (rowData: Transaction) => (
        <div className="flex gap-2">
            <Button onClick={() => openDetailDialog(rowData)} icon="pi pi-pencil" />
            <Button onClick={() => deleteTransaction(rowData.id)} icon="pi pi-trash" severity="danger" />
            <Button onClick={() => openInfoDialog(rowData)} icon="pi pi-eye" severity="info" />
        </div>
    );

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;


    const DetailItem = ({ label, value }: { label: string; value: string }) => (
        <div className="flex flex-col">
            <span className="text-blue-600 font-semibold">{label}</span>
            <span className="p-2 bg-white rounded-md border">{value}</span>
        </div>
    );

    return (
        <div className={className}>
            
            <DataTable value={transactions} tableStyle={{ minWidth: '100%' }} scrollable scrollHeight="flex">
                <Column field="id" header="No" />
                <Column field="invoice" header="Faktur" />
                <Column field="total" header="Total" body={(data) => `Rp ${data.total}`} />
                <Column field="status" header="Status" />
                <Column field="datetime" header="Tanggal" />
                <Column body={actionBodyTemplate} header="Aksi" />
            </DataTable>
            <Dialog header="Detail Transaksi" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)}>
                {selectedTransaction && (
                    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
                        <div className="grid gap-3">
                            <DetailItem label="Faktur" value={selectedTransaction.invoice} />
                            <DetailItem label="Metode Pembayaran" value={selectedTransaction.payment.payment_type} />
                            <DetailItem label="Status" value={selectedTransaction.status} />
                            <DetailItem label="Total" value={`Rp ${selectedTransaction.total.toLocaleString()}`} />
                            <DetailItem label="Waktu" value={new Date(selectedTransaction.datetime).toLocaleDateString("id-ID", {
                                weekday: "long",
                                day: "numeric",
                                month: "long",
                                year: "numeric"
                            })} />
                            <DetailItem label="Catatan" value={selectedTransaction.note || "-"} />
                        </div>
                    </div>
                )}
        </Dialog>
        <Dialog header="Daftar Produk" visible={infoVisible} style={{ width: '50vw' }} onHide={() => setInfoVisible(false)}>
                {selectedTransaction && (
                    <DataTable value={selectedTransaction.items} tableStyle={{ minWidth: '100%' }} scrollable scrollHeight="flex">
                        <Column field="id" header="No" body={(data, options) => options.rowIndex + 1} />
                        <Column field="name" header="Nama Barang" />
                        <Column field="final_price" header="Harga" body={(data) => `Rp ${data.final_price.toLocaleString()}`} />
                        <Column field="stock" header="Jumlah" />
                        <Column field="subtotal" header="Subtotal" body={(data) => `Rp ${(data.final_price * data.stock).toLocaleString()}`} />
                    </DataTable>
                )}
        </Dialog>
    </div>
)}
    export default TableTransaction;