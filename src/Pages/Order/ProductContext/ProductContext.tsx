import React, { createContext, useContext } from "react";
import Image1 from "../../../assets/Background/OrderItem/Rectangle 76.png"
import Image2 from "../../../assets/Background/OrderItem/Rectangle 76 (1).png"
import Image3 from "../../../assets/Background/OrderItem/Rectangle 76 (2).png"
import Image4 from "../../../assets/Background/OrderItem/Rectangle 76 (3).png"

// Data dummy produk
export const dummyProduct = {
    "1": { id: "1", name: "Black Jack", price: 11000, image: Image1, quantity: 1, checked: false },
    "2": { id: "2", name: "Alcapone", price: 12000, image: Image2, quantity: 1, checked: false },
    "3": { id: "3", name: "Copa Banana", price: 8000, image: Image3, quantity: 1, checked: false },
    "4": { id: "4", name: "Pisang Keju", price: 8000, image: Image4, quantity: 1, checked: false }
};

// Buat Context
const ProductContext = createContext(dummyProduct);

// Custom hook agar lebih mudah digunakan
export const useProduct = () => useContext(ProductContext);

// Provider untuk membungkus aplikasi
export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return <ProductContext.Provider value={dummyProduct}>{children}</ProductContext.Provider>;
};