import { useContext } from "react";
import { Card, Button } from "flowbite-react";
import { CartContext } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";

export default function CardCheckoutComponent() {
    const { cart, deleteAll } = useContext(CartContext);
    const navigate = useNavigate();
    
    const totalProduk = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
    const admin = cart.length > 0 ? 0.11 : 0;
    const totalBayar = totalProduk + admin;

    return (
        <Card className="mx-auto my-10 w-full max-w-4xl">
            <h5 className="text-xl font-bold mb-4">Checkout</h5>
            <ul className="divide-y divide-gray-200">
                {cart.map((item) => (
                    <li key={item.id} className="py-3 flex justify-between items-center">
                        <div className="flex gap-4">
                            <img src={item.images?.[0] || ''} alt={item.title} className="w-12 h-12 object-cover rounded" />
                            <div>
                                <p className="font-medium text-gray-900">{item.title}</p>
                                <p className="text-sm text-gray-500">x{item.qty}</p>
                            </div>
                        </div>
                        <p className="font-semibold text-gray-900">${item.price * item.qty}</p>
                    </li>
                ))}
            </ul>
            <div className="mt-6 border-t pt-4 space-y-2 text-sm text-gray-600">
                <h6 className="font-bold mb-2 text-gray-700 text-base">Detail Pembayaran</h6>
                <div className="flex justify-between">
                    <span>Total Harga Produk</span>
                    <span>${totalProduk}</span>
                </div>
                <div className="flex justify-between">
                    <span>Admin</span>
                    <span>${admin}</span>
                </div>
                <div className="flex justify-between font-bold text-lg mt-2 border-t pt-2 text-gray-900">
                    <span>Total Harga Bayar</span>
                    <span className="text-cyan-600">${totalBayar}</span>
                </div>
            </div>
            <Button
                color="blue"
                className="mt-6 w-full"
                onClick={() => {
                    deleteAll();
                    navigate("/", { state: { successPayment: true } });
                }}
            >
                Selesaikan Pembayaran
            </Button>
        </Card>
    );
}