import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Products from "../pages/Products";
import Template from "../Template";
import User from "../pages/User";
import ProductsCategory from "../pages/ProductsCategory"

//membuat variable menampung route pake export untuk di gunakan di file lain 
//mendaftarkan routing

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Template />,
        children:[
            {
                path: "/",//url path
                element: <App />//tampilan
            },
            {
                path: "/products",
                element: <Products />
            },
            {   
                path:"categories/:categoryId",
                element: <ProductsCategory/>
            },
            {
                path:"/user",
                element:<User/>
            }
        ]
    },
]);