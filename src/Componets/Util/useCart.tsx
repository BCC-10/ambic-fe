import {useState, useEffect, useMemo} from 'react'

export interface cartItem {
    id: string
    name: string
    price: number
    quantity: number
    image : string 
    checked: boolean,
}

export const useCart = () => {
    const [cart, setCart] = useState<cartItem[]>(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    })

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    },[cart])

const addToCart = (product : cartItem) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((item) => item.id === product.id);
            if (existingItem) {
                return prevCart.map((item) =>
                    item.id === product.id? {...item, quantity: item.quantity + product.quantity} : item
                );
            }
            return [...prevCart, {...product, quantity: 1}];
        })
    }

    const updateQuantity = (id: string, quantity: number) => {
        setCart((prevCart) =>
            prevCart.map((item) =>
            item.id === id ? { ...item, quantity: Math.max(quantity, 1) } : item
            )
        );
    };

    const removeItem = (id: string ) => {
        setCart(prevCart => prevCart.filter(item => item.id!== id));
    }

    const totalPrice = cart.reduce((total,item ) => total + item.price * item.quantity, 0); 
    
    const toggleChecked = (id: string) => {
        setCart((prevCart) => {
            const newCart = prevCart.map((item) =>
                item.id === id ? { ...item, checked: !item.checked } : item
            );
            localStorage.setItem('cart', JSON.stringify(newCart)); // Simpan ke localStorage
            return newCart;
        });
    };


    const checkedTotalPrice = useMemo(() => {
        return cart.reduce((total, item) => {
            return item.checked ? total + item.price * item.quantity : total;
        }, 0);
    }, [cart]);

    const toggleAllChecked = (checked: boolean) => {
        setCart((prevCart) =>
            prevCart.map((item) => ({ ...item, checked }))
        );
    };
    

    return {cart, addToCart, updateQuantity, removeItem, totalPrice, toggleChecked, checkedTotalPrice, toggleAllChecked}
}