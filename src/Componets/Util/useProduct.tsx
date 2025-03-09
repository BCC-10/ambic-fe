import {useState, useEffect, useRef} from "react"
import axios from "axios";

interface product {
    id?: number;
    name: string;
    initial_price: number | undefined;
    final_price:number | undefined;
    stock:number | undefined;
    pickup_time:string;
    description:string;
}

const useProducts = () => {
    const [products, setProducts] = useState<product[]>([{
        name: "",
        initial_price: 0,
        final_price: 0,
        stock: 0,
        pickup_time: "",
        description: "",
    }]);
    const [newProduct, setNewProduct] = useState<product | null>(null);
    const lastId = useRef(0)


    useEffect(() => {
        if(newProduct){
            addProduct(newProduct); 
            setNewProduct(null);
        }
    }, [newProduct]);

    const addProduct = async (product: product) => {
        try{
            lastId.current++
            const productWithID = {...product, id: lastId.current};
            const response = await axios.post("https://ambic.live:443/api/v1/products/", productWithID,{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`,
                }
            });
            setProducts((prevProducts) => [...prevProducts, newProduct, response.data]);
        }catch(err){
            
        }

    };

    const fetchProducts = async () => {
        try{
            const response = await axios.get("https://ambic.live:443/api/v1/products/", {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`,
                }
            })
            setProducts(response.data);
            const maxId = response.data.length > 0 ? Math.max(...response.data.map((p) => p.id)) : 0
            lastId.current = maxId;
        }catch (err){
        }
    }

    const deleteProduct = async (id: number) => {
        try{
                await axios.delete(`https://ambic.live:443/api/v1/products/:${id}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`,
                }
            })
            setProducts((prevProducts) => prevProducts.filter(p => p.id!== id));
        }catch(err){

        }
    }

    const editProduct = async (updateProduct: product) => {
        try{
            const response = await axios.put(`https://ambic.live:443/api/v1/products/:id/${updateProduct.id}`, updateProduct, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`,
                }
            })
            setProducts((prevProducts) =>
                prevProducts.map((p) => (p.id === updateProduct.id ? response.data : p))
            );
        } catch (err){

        }
    }
    return {products, addProduct, deleteProduct, editProduct, setNewProduct, fetchProducts}
}

export default useProducts