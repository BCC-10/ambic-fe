import React, { useState, useEffect } from 'react';
import { IoArrowBack } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { LuLocateFixed } from "react-icons/lu";
import { FaBookBookmark } from "react-icons/fa6";
import SearchLocate from "./SeacrhLocate"

interface ModalProps {
    open: boolean;
    onClose: () => void;
    children?: React.ReactNode;
}

const ModalLocate: React.FC<ModalProps> = ({ open, onClose }) => {
    const [showModal, setShowModal] = useState(open);
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        if (open) {
            setShowModal(true);
            setTimeout(() => setAnimate(true), 10);
        } else {
            setAnimate(false);
            setTimeout(() => setShowModal(false), 300);
        }
    }, [open]);

    if (!showModal) return null;

    return (
        // Backdrop
        <div 
            className={`fixed inset-0 z-100 flex justify-center items-center bg-black/20 transition-opacity duration-300 ${animate ? "opacity-100" : "opacity-0"}`}
            onClick={onClose}
        >
            {/* Modal */}
            <div
                className={`bg-teal-900 w-110 h-110 p-5 rounded-xl drop-shadow-xl transform transition-transform duration-300 ease-in flex flex-col items-start justify-center gap-3 bg-blend-multiply ${animate ? "scale-100 opacity-100" : "scale-105 opacity-0"}`}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Tombol Close */}
                <div className='flex items-start justify-start px-2'>
                    <IoArrowBack className='text-white cursor-pointer' size={30} onClick={onClose} />
                </div>

                {/* Isi Modal */}
                <div className='w-full h-auto p-5 flex items-center justify-center flex-col gap-7'>
                    <div className='w-full h-15 '>
                        <SearchLocate/>
                    </div>
                    <div className='w-full h-15 rounded-2xl bg-white/85 p-6 flex items-center justify-between transition-transform duration-300 hover:scale-105'>
                        <h4 className='text-xl font-Poppins font-semibold'>Alamat Tersimpan</h4>
                        <FaBookBookmark />
                    </div>
                    <div className='w-full h-15 rounded-2xl bg-white/85 p-6 flex items-center justify-between transition-transform duration-300 hover:scale-105'>
                        <h4 className='text-xl font-Poppins font-semibold'>Lokasi saat ini</h4>
                        <LuLocateFixed />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalLocate;
