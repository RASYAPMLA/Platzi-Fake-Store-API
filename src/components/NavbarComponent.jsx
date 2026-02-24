import {
    Avatar,
    Dropdown,
    DropdownDivider,
    DropdownHeader,
    DropdownItem,
    Navbar,
    NavbarBrand,
    NavbarCollapse,
    NavbarLink,
    NavbarToggle,
} from "flowbite-react";
import imgToko from "../assets/toko.png";
import { FcPaid } from "react-icons/fc";
import { Link } from "react-router-dom";

export default function NavbarComponent() {
    return (
        <Navbar fluid rounded>
            <NavbarBrand href="/">
                <img src={imgToko} className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Plazi Fake Store</span>
            </NavbarBrand>
            <div className="flex md:order-2">
                <FcPaid className="text-4xl me-3 mt-1" />
                <Dropdown
                    arrowIcon={false}
                    inline
                    label={
                        <Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />
                    }
                >
                    <DropdownHeader>
                        <span className="block text-sm">Bonnie Green</span>
                        <span className="block truncate text-sm font-medium">name@flowbite.com</span>
                    </DropdownHeader>
                    <DropdownItem as={Link} to="/">Dashboard</DropdownItem>
                    <DropdownItem as={Link} to="/User">Profile</DropdownItem>
                    <DropdownItem>Settings</DropdownItem>
                    <DropdownItem>Earnings</DropdownItem>
                    <DropdownDivider />
                    <DropdownItem>Sign out</DropdownItem>
                </Dropdown>
                <NavbarToggle />
            </div>
        </Navbar>
    );
}