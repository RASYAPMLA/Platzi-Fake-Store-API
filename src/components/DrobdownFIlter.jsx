import { Dropdown, DropdownItem } from "flowbite-react";

export default function DropdownFilter({onClickAction}) {
    return (
        <Dropdown label="urutkan " dismissOnClick={false} color="alternative">
            <DropdownItem onClick={() => onClickAction('harga-murah')}>Harga termurah</DropdownItem>
            <DropdownItem onClick={() => onClickAction('harga-mahal')}>Harga Termahal</DropdownItem>
            <DropdownItem onClick={() => onClickAction('alvabet-turun')}>alvabet menurun</DropdownItem>
            <DropdownItem onClick={() => onClickAction('alvabet-naik')}>alvabet menaik</DropdownItem>
        </Dropdown>
    )
} 