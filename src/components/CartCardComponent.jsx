import { Card } from "flowbite-react";
import { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import { Button, ButtonGroup } from "flowbite-react";
import { IoTrash } from "react-icons/io5";
import { Link } from "react-router-dom";



export default function CartCardComponent() {
    const { cart, addQty, minQty, deleteAll, deleteProduct } = useContext(CartContext)
    return (
        <Card className="block mx-auto my-25 w-4xl">
            <div className="mb-4 flex items-center justify-between">
                <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">keranjang</h5>
                <div onClick={() => deleteAll()} className="text-sm font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                    Hapus semua
                </div>
            </div>
            <div className="flow-root">
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                    {
                        cart.map((item, index) => (
                            <li className="py-3 sm:py-4">
                                <div className="flex items-center space-x-4">
                                    <div className="shrink-0">
                                        <img
                                            alt="Neil image"
                                            height="50"
                                            src={item.images ? item.images[0] : ''}
                                            width="50"
                                        />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="truncate text-sm font-medium text-gray-900 dark:text-white">{item.title}</p>
                                        <p className="truncate text-sm text-gray-500 dark:text-gray-400">x{item.qty}</p>
                                    </div>
                                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">${item.price}</div>
                                </div>
                                <div className="flex justify-end">
                                    <ButtonGroup>
                                        <Button color="blue" onClick={() => minQty(item.id)}>-</Button>
                                        <Button color="alternative">{item.qty}</Button>
                                        <Button color="blue" onClick={() => addQty(item.id)}>+</Button>
                                    </ButtonGroup>
                                    <IoTrash className="ms-3 text-3xl text-red-500" onClick={() => deleteProduct(item.id)} />
                                </div>
                            </li>
                        ))
                    }
                    {cart.length > 0 && (
                        <div className="flex justify-end py-5 border-t mt-4">
                            <Link to="/checkout">
                                <Button color="green">Checkout</Button>
                            </Link>
                        </div>
                    )}
                </ul>
            </div>
        </Card>
    );
}