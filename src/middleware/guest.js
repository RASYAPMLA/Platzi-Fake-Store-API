import { redirect } from "react-router-dom";

export function guest() {
    const token = localStorage.getItem("access_token");
    //kalau udah ada token gak bisa login lagi
    if (token) {
        return redirect("/cart");
    }
    return null;
}