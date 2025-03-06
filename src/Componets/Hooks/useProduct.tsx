import React, {useState, useEffect} from "react"

interface product {
    id: number;
    name: string;
    initialPrice: number;
    finalPrice:number;
    stock:number;
    time:string;
    description:string;
}

const useProducts = () => {
    const [products, setProducts] = useState<product[]>(() => {
        try {
            const storeProducts = localStorage.getItem('products');
            return storeProducts ? JSON.parse(storeProducts) : [
                { id: 1, name: 'Tiramisu', initialPrice: 12000, finalPrice: 6000, stock: 5 , time: '12:00 - 15:00'},
                { id: 2, name: 'CocoLoco', initialPrice: 14000, finalPrice: 7000, stock: 4, time: '12:00 - 15:00' },
                { id: 3, name: 'Copa Banana', initialPrice: 17000, finalPrice: 8000, stock: 3, time: '12:00 - 15:00' },
            ];
        } catch (error) {
            console.error("Error parsing products from localStorage:", error);
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem('products', JSON.stringify(products));
    }, [products]);

    const addProduct = (product: product) => {
        const maxId = products.length > 0 ? Math.max(...products.map((p) => p.id)) : 0
        const newProduct = { ...product, id: maxId + 1 }; 
        setProducts([...products, newProduct]);
    };

    const deleteProduct = (id: number) => {
        setProducts(products.filter(p => p.id!== id));
    }

    const editProduct = (updateProduct: product) => {
        setProducts((prevProducts) =>
            prevProducts.map((p) => (p.id === updateProduct.id ? updateProduct : p))
        );
    }
    return {products, addProduct, deleteProduct, editProduct}
}

export default useProducts