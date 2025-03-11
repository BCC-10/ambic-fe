import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Rating } from "primereact/rating";
import Kucing from "../../../../assets/ICons/Order/Ellipse 3.png"

const ReviewTable: React.FC = () => {
    // Data review
    const [reviews] = useState([
        {
            id: 1,
            name: "Vibroos",
            code: "dejb6457",
            rating: 5,
            comment: "Inisiatif yang sangat bagus! Produknya masih banyak konsumsi dan rasanya enak. Semoga lebih banyak orang sadar akan pentingnya mengurangi food waste.",
            photo: Kucing,
        },
        {
            id: 2,
            name: "Sabieeyes",
            code: "evna937q9",
            rating: 4,
            comment: "Makanannya enak dan bermanfaat! Akan lebih baik kalau ada variasi lebih banyak.",
            photo: "https://via.placeholder.com/50",
        },
        {
            id: 3,
            name: "Prasvi",
            code: "vsrwj8796",
            rating: 3,
            comment: "Makanannya enak dan bermanfaat! Akan lebih baik kalau ada variasi lebih banyak.",
            photo: "https://via.placeholder.com/50",
        },
    ]);

    // State untuk modal
    const [selectedReview, setSelectedReview] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Fungsi untuk membuka modal
    const handleOpenModal = (review: any) => {
        setSelectedReview(review);
        setIsModalOpen(true);
    };

    // Fungsi untuk menutup modal
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedReview(null);
    };

    return (
        <div className="p-5 w-full">
            <h2 className="text-xl font-bold mb-4 text-center">Penilaian</h2>

            {/* TABEL PENILAIAN */}
            <DataTable value={reviews}  responsiveLayout="scroll">
                <Column field="id" header="No" style={{ width: "5%" }} />
                <Column
                    header="Nama"
                    body={(rowData) => (
                        <div className="flex items-center gap-2">
                            <span>{rowData.name}</span>
                        </div>
                    )}
                />
                <Column 
                    header="Kode Pembeli"
                    body={(rowData) => (
                        <div className="flex items-center gap-2">
                            <span>{rowData.code}</span>
                        </div>
                    )}
                />
                <Column
                    header="Rating"
                    body={(rowData) => <Rating value={rowData.rating} readOnly cancel={false} />}
                />
                <Column
                    header="Aksi"
                    body={(rowData) => (
                        <Button label="Selengkapnya"  className="p-button-sm p-button-info"
                            onClick={() => handleOpenModal(rowData)} style={{backgroundColor: 'var(--teal-700)'}} rounded
                        />
                    )}
                />
            </DataTable>

            {/* MODAL DETAIL PENILAIAN */}
            <Dialog visible={isModalOpen} onHide={handleCloseModal} header="Detail Penilaian" modal dismissableMask={true} className="rounded-xl" >
                {selectedReview && (
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-4 justify-start p-2">
                                <img src={selectedReview.photo} alt="Profile" className="w-12 h-12 rounded-full" />
                            <div className="flex items-start gap-1 flex-col justify-center">
                                <p className="font-semibold">{selectedReview.name}</p>
                                <Rating value={selectedReview.rating} readOnly cancel={false} className="custom-rating !text-yellow-500"/>
                            </div>
                        </div>
                        <p className="italic">"{selectedReview.comment}"</p>
                    </div>
                )}
            </Dialog>
        </div>
    );
};

export default ReviewTable;