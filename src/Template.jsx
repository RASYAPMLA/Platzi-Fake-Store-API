import { Outlet } from "react-router-dom";
import NavbarComponent from "./components/NavbarComponent";
import AuthProvider from "./contexts/AuthContext";
import CartProvider from "./contexts/CartContext";

export default function Template() {
    return (
        <>
            {/*menentukan dile mana aja yang boleh pake dari contextnya di mana ajah */}
            <AuthProvider>
                <CartProvider>
                    <NavbarComponent />
                    {/*sama kaya @yield di laravel, menyediakan wadah konten di namis yang akan berubah ubah tiap halaman  */}
                    <Outlet />
                </CartProvider>
            </AuthProvider>

        </>
    )
}