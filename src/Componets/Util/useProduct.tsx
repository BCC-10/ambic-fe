import {useState, useEffect, useRef} from "react"
import axios from "axios";

interface product {
    id: string | number,
    name: string;
    initial_price: number | undefined;
    final_price:number | undefined;
    stock:number | undefined;
    pickup_time:string;
    description:string;
    partner_id:string;
    photo: File | undefined;
    star: number;
    count_rating: number;
}

const useProducts = () => {
    const [products, setProducts] = useState<product[]>([{
        id: "",
        name: "",
        initial_price: 0,
        final_price: 0,
        stock: 0,
        pickup_time: "",
        description: "",
        partner_id: "",
        photo: undefined,
        star: 3.5,
        count_rating: 2,
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
            console.log(err);
        }

    };

    const fetchProducts = async () => {
        try{
            const response = await axios.get("https://ambic.live:443/api/v1/partners/products", {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                }
            })
            setProducts(response.data.payload.products);
            const maxId = response.data.length > 0 ? Math.max(...response.data.payload.products.map((p) => p.id)) : 0
            lastId.current = maxId;
        }catch (err){
            console.log("Pesan Error fetching products: " + err.message);
        }
    }

    const deleteProduct = async (id: number | string) => {
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