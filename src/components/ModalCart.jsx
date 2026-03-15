import { Button, Modal, ModalBody, ModalFooter, ModalHeader, ButtonGroup } from "flowbite-react";
import {  useState , useContext } from "react";
import { CartContext } from "../contexts/CartContext";

export default function ModalCart({ openModal, handleClose, item }) {
    const[qty,setQyt] = useState (1);
    function updateQty(type) {
        if (type == "-") {
            //jika dikurang cek angka cmn boleh maksimal memtok di angka 1
            if ( qty > 1) {
                //jika lebih dari 1 qyt nya boleh kurang
                //prev : parameter setter state, untuk mengambil nilai sblmnya
                setQyt((prev) => prev-1);
            } 
        } else {
            setQyt((prev) =>prev+1);
        }
    }
    const {cart,updateCart} = useContext(CartContext);
    function handleAddCart(product,qty) {
        updateCart(product,qty);
        // cek nila chart
        // console.log(cart);
        handleClose();
    }
    return (
        <Modal dismissible show={openModal} onClose={handleClose}>
            <ModalHeader>Tambah Keranjang</ModalHeader>
            <ModalBody>
                <div className="space-y-6">
                    <div className="py-3 sm:py-4">
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
                                <p className="truncate text-sm text-gray-500 dark:text-gray-400">{item.description}</p>
                            </div>
                            <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">${item.price}</div>
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <ButtonGroup>
                            <Button color="blue" onClick={() => updateQty("-")}>-</Button>
                            <Button color="alternative">{qty}</Button>
                            <Button color="blue" onClick={() => updateQty("+")}>+</Button>
                        </ButtonGroup>
                    </div>
                </div>
            </ModalBody>
            <ModalFooter className="flex justify-end">
                <Button onClick={(handleClose)} color="white">Batal</Button>
                <Button color="blue" onClick={() => handleAddCart(item,qty)}>
                    Tambah
                </Button>
            </ModalFooter>
        </Modal>
    );
}