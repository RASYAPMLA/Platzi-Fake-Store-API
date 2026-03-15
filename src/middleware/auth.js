import { redirect } from "react-router-dom";

export function auth() {
    const token = localStorage.getItem("access_token");
    // jikka tidak ada token di browser ini kembalikan ke login
    if (!token) {
        //perpindahan halaman :
        /// 1 navigate : di event (onClick, dsb)
        // 2 redirect : di func biasa ada returnya
        return redirect("/login");
    }
    //jika ada token di browser ini boleh masuk ke halaman yg di minta
    return null;
}