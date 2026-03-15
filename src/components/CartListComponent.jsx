import CardCategoryComponent from "./CardCategoryComponent";
import CardProductComponent from "./CardProductComponent";
import { useState } from "react";
import ModalCart from "./ModalCart";


export default function CardListComponent({ data, type, children }) {
    const [openModal, setOpenModal] = useState(false);
    const [Product,setProduct] = useState({});

    function handleClose() {
        setOpenModal(false);
    }
    function handleOpen(item){
        //menyimpan item dari cardproduct ke state biar bisa di kirim ke props component modal
        setProduct(item);
        setOpenModal(true);
    }
    //pembungkus card sejajar 4 ke samping
    return (
        <div className="block mx-auto w-4xl">
            {children}
            <div className="grid grid-cols-4 gap-4 my-15">
                {
                    data.map((item, index) => type == "category" ? (
                        <CardCategoryComponent item={item} key={index} handleClose={handleClose} />
                    ) : (
                        <CardProductComponent item={item} key={index} handleOpen={handleOpen}/>
                    ))
                }
            </div>
            <ModalCart openModal={openModal} handleClose={handleClose} item={Product}/>
        </div>
    )
}