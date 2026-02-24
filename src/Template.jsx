import { Outlet } from "react-router-dom";
import NavbarComponent from "./components/NavbarComponent";

export default function Template() {
    return (
        <>
            <NavbarComponent />
            {/*sama kaya @yield di laravel, menyediakan wadah konten di namis yang akan berubah ubah tiap halaman  */}
            <Outlet />
        </>
    )
}