import {useState, useEffect, useRef} from "react"
import axios from "axios";
import Swal from "sweetalert2";

interface product {
    id?: string | number,
    name: string;
    initial_price: number | undefined;
    final_price:number | undefined;
    stock:number | undefined;
    pickup_time:string;
    description:string;
    // partner_id:string;
    photo: File | undefined;
    // star: number;
    // count_rating: number;
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
        // partner_id: "",
        photo: undefined,
        // star: 3.5,
        // count_rating: 2,
    }]);
    const [newProduct, setNewProduct] = useState<product | null>(null);
    const lastId = useRef(0)
    const [loading, setLoading] = useState<boolean>(false);


    useEffect(() => {
        if(newProduct){
            addProduct(newProduct); 
            setNewProduct(null);
        }
    }, [newProduct]);

    const addProduct = async (product: product) => {
        try{
            Swal.fire({
                title: "Sedang Memproses...",
                text: "Mohon tunggu sebentar",
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });
            lastId.current++
            const productWithID = {...product, id: lastId.current};
            const response = await axios.post("https://ambic.live:443/api/v1/products/", productWithID,{
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`,
                }
            });
            setProducts((prevProducts) => [...prevProducts, newProduct, response.data]);
            Swal.close();
            if(response.data.status_code === 200) {
                Swal.fire({
                    title: "Sukses Edit Data",
                    text: " Silakan Refresh Tab!",
                    icon: "success",
                    draggable: false
                });
            }
        }catch(err){
            console.log(err);
        }

    };

    const fetchProducts = async () => {
        try{
            Swal.fire({
                title: "Sedang Memproses...",
                text: "Mohon tunggu sebentar",
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });
            const response = await axios.get("https://ambic.live:443/api/v1/partners/products", {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                }
            })
            setProducts(response.data.payload.products);
            const maxId = response.data.length > 0 ? Math.max(...response.data.payload.products.map((p) => p.id)) : 0
            Swal.close();
            lastId.current = maxId;
        }catch (err){
            console.log("Pesan Error fetching products: " + err.message);
        }
    }

    const deleteProduct = async (id: number | string) => {
        try{
            Swal.fire({
                title: "Sedang Memproses...",
                text: "Mohon tunggu sebentar",
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });
            await axios.delete(`https://ambic.live:443/api/v1/products/${id}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            }
        })
        setProducts((prevProducts) => prevProducts.filter(p => p.id!== id));
        Swal.close();
        }catch(err){
            console.log("Pesan Error: ", err)
        }
    }

    const editProduct = async (updateProduct: product) => {
        try{
            Swal.fire({
                title: "Sedang Memproses...",
                text: "Mohon tunggu sebentar",
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });
            const response = await axios.patch(`https://ambic.live:443/api/v1/products/${updateProduct.id}`, updateProduct, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`,
                }
            })
            setProducts((prevProducts) =>
                prevProducts.map((p) => (p.id === updateProduct.id ? response.data : p))
        );
        Swal.close();
        if(response.data.status_code === 200) {
            Swal.fire({
                title: "Sukses Edit Data",
                text: " Silakan Refresh Tab!",
                icon: "success",
                draggable: false
                });
            }
        } catch (err){
            console.log(err);
            if(err.response.data.status_code === 400){
                    Swal.fire({
                    title: "Date Pickup dimasukin Dulu yaa..",
                    text: "tanggalnya diisi dulu gih!",
                    icon: "warning" 
                });
            }
        }
    }
    return {products, addProduct, deleteProduct, editProduct, setNewProduct, fetchProducts}
}

export default useProducts