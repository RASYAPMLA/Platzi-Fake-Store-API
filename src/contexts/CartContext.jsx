import { createContext, useState } from "react";

export const CartContext = createContext();

export default function CartProvider({ children }) {
    const [cart, setCart] = useState([]);

    function updateCart(Product, qty) {
        // cek apakah produk yang aka di tambahkan sudah ada di data cart/sblm
        let checkProduct = cart.find((item) => item.id == Product.id);
        // jika product sudah ada di cart, update qty +1
        if (checkProduct) {
            setCart((prev) => {
                return prev.map((item) => {
                    if (item.id == Product.id) {
                        return { ...item, qty: item.qty + 1 } // keluarkan nilai produk yang sudah ada update qty nyua
                    } else { // jika yang lagi di akses loop bukan product yg di magsud nilai sebelumnya tidak di ubah
                        return item;
                    }
                });
            })
        } else {
            // jika produk yang akan di tambahkan blm ada di kerangjang tambah produk baru
            let newProduct = {
                id: Product.id,
                title: Product.title,
                images: Product.images,
                price: Product.price,
                qty: qty // qty ambul dari parameter func
            }
            setCart([...cart, newProduct]); //keluarkan array sblmnya [...], tambahkan product baru
        }

    }

    function addQty(productId) {
        setCart((prev) => {
            return prev.map((item) => {
                if (item.id == productId) {
                    return { ...item, qty: item.qty + 1 }
                } else {
                    return item;
                }
            });
        })
    }
    function minQty(productId) {
        setCart((prev) => {
            return prev.map((item) => {
                if (item.id == productId && item.qty > 1) {
                    return { ...item, qty: item.qty - 1 }
                } else { return item }
            })
        })
    }
    function deleteProduct(productId) {
        setCart((prev) => prev.filter((item) => item.id != productId));
    }
    function deleteAll() {
        setCart([]);
    }
    return (
        <CartContext.Provider value={{ cart, updateCart, addQty, minQty,deleteProduct,deleteAll }}>
            {children}
        </CartContext.Provider>
    )
}