import { createContext } from "react";
import { useEffect, useState } from "react";


//tidak ada html jadi tanpa default
export const AuthContext = createContext();
// ada tag jadi make default
export default function AuthProvider({ children }) {
    const [isLogin, setIsLogin] = useState(localStorage.getItem("access_token"));
    //ketika membuka navbar cek token klo ada simpan di state
    function checkLogin() {
        if (localStorage.getItem("access_token")) {
            setIsLogin(localStorage.getItem("access_token"));
        }
    }
    function logout() {
        //hapus tple di local storage
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        //kosongkan data agar btn logout hilang
        setIsLogin(null);
    }

    //daftarkan data/func yang akan di gunakan di file lain
    return (
        //value : nama nama data/func yang akan dibuat global di bilikan untuk akses file lain
        <AuthContext.Provider value={{isLogin,checkLogin,logout}}>
            {children}
        </AuthContext.Provider>
    )
}