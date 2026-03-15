import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Spinner } from "flowbite-react";
import CardCategoryComponent from "../components/CardCategoryComponent";
import CardListComponent from "../components/CartListComponent";
import SearchComp from "../components/SearchComponent";
import DropdownFilter from "../components/DrobdownFIlter";
import PaginationComp from "../components/PaginationComponent";

export default function ProductsCategory() {
    const { categoryId } = useParams();
    const [Products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTitle, setSearchTitle] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const onPageChange = (page) => {
        setCurrentPage(page)
        setLoading(true);
        getProducts();
    };


    function processSearch(event) {
        setSearchTitle(event.target.value);
        setLoading(true);    
        let url = "";
        if (searchTitle != "") {
            url = "https://api.escuelajs.co/api/v1/products/?categoryId=" + categoryId + "&title=" + searchTitle;
        } else {
            url = "https://api.escuelajs.co/api/v1/products/?categoryId=" + categoryId + "&limit=8" + "&offset=" + currentPage
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

    async function getProducts(url = "https://api.escuelajs.co/api/v1/products/?categoryId=" + categoryId + "&limit=8" + "&offset=" + currentPage) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`response status: ${response.status}`)
            }

            const result = await response.json();
            setProducts(result);
            setLoading(false);
        } catch (error) {
            console.log(error.massage);
        }
    }

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <div className="block mx-auto w-4xl">
            <h1 className="text-4xl font-bold">Produk kategori {Products[0]?.category.name}</h1>
            <div className="flex gap-2">
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
                ) : (<CardListComponent data={Products} type="product" />)
            }
            {
            searchTitle == "" ?
                (<div className="my-5">
                    <PaginationComp currentPage={currentPage} onPageChange={onPageChange} />
                </div> ) : ""}
        </div>
    )
}