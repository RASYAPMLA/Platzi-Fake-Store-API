import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Products from "../pages/Products";
import Template from "../Template";
import User from "../pages/User";
import ProductsCategory from "../pages/ProductsCategory"
import Login from "../pages/login";
import Cart from "../pages/Cart";
import { auth } from "../middleware/auth";
import { guest } from "../middleware/guest";
import Checkout from "../pages/Checkout";

//membuat variable menampung route pake export untuk di gunakan di file lain 
//mendaftarkan routing

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Template />,
        children: [
            {
                path: "/",//url path
                element: <App />//tampilan
            },
            {
                path: "/products",
                element: <Products />
            },
            {
                path: "categories/:categoryId",
                element: <ProductsCategory />
            },
            {
                path: "/login",
                //sebelum ke halaman login cek middleware guest                                    
                loader: guest,
                element: <Login />
            },
        ]
    },
    //kelompok path yang harus di akses setelah login
    {
        path: "/",
        element: <Template />,
        //panggil middleware sblm akses halaman
        loader: auth,
        children: [
            {
                path: "/cart",
                element: <Cart />
            },
            {
                path:"/checkout",
                element:<Checkout/>
            },
            {
                path:"/user",
                element:<User/>
            },
        ]
    }
]);