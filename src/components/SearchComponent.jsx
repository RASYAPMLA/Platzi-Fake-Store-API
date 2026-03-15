import { TextInput } from "flowbite-react";
import { IoMdSearch } from "react-icons/io";

export default function SearchComp({onKeyUpAction}) {
    return (
        <div className="w-4xl">
            <TextInput id="name" type="text" icon={IoMdSearch} placeholder="cari nama produk.." onKeyUp={onKeyUpAction}></TextInput>
        </div>
    )
}