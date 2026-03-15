import { useEffect, useState } from "react";
import { Spinner, Card, Button } from "flowbite-react";
import SearchComp from "../components/SearchComponent";
import DropdownFilter from "../components/DrobdownFIlter";
import PaginationComp from "../components/PaginationComponent";

export default function Products() {
    const [Products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTitle, setSearchTitle] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const onPageChange = (page) => {
        setCurrentPage(page);
        setLoading(true);
        getProducts();
    };


    function processSearch(event) {
        setSearchTitle(event.target.value);
        setLoading(true);
        let url = "";
        if (searchTitle != "") {
            url = "https://api.escuelajs.co/api/v1/products/?title=" + searchTitle;
        } else {
            url = "https://api.escuelajs.co/api/v1/products/?limit=12"
                + "&offset=" + currentPage;
        }
        getProducts(url);
    }

    function processSort(type) {
        let sortedProducts = [...Products];

        if (type === 'harga-murah') {
            sortedProducts.sort((a, b) => a.price - b.price);
        } else if (type === 'harga-mahal') {
            sortedProducts.sort((a, b) => b.price - a.price);
        } else if (type === 'alvabet-turun') {
            sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
        } else if (type === 'alvabet-naik') {
            sortedProducts.sort((a, b) => b.title.localeCompare(a.title));
        }

        setProducts(sortedProducts);
    }

    async function getProducts(
        url = "https://api.escuelajs.co/api/v1/products/?limit=4" + "&offset=" + currentPage) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Gagal mengambil data products");
            }
            const result = await response.json();
            setProducts(result);
            setLoading(false);
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <div className="px-10 py-10">
            <h1 className="text-4xl font-bold mb-8 text-center">
                Daftar lengkap Produk
            </h1>
            <div className="flex justify-between mb-6">
                <SearchComp onKeyUpAction={processSearch} />
                <DropdownFilter onClickAction={processSort} />
            </div>
            {
                loading ? (
                    <div className="flex justify-center">
                        <Spinner aria-label="Default status example" />
                        <br />
                        sedang mengambil data
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {Products.map((item) => (
                            <Card
                                key={item.id}
                                imgAlt={item.title}
                                imgSrc={item.images[0]}
                                className="hover:scale-105 transition duration-300">
                                <h5 className="text-lg font-semibold">{item.title}</h5>
                                <p className="text-cyan-600 font-bold">${item.price}</p>
                                <Button >Details</Button>
                            </Card>
                        ))}
                    </div>
                )
            }
            {
                searchTitle == "" ?
                    (
                        <div className="my-6">
                            <PaginationComp
                                currentPage={currentPage}
                                onPageChange={onPageChange}
                            />
                        </div>
                    ) : ""
            }
        </div>
    );
}