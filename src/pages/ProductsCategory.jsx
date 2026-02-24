import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Spinner } from "flowbite-react";

export default function ProductsCategory() {
    const { categoryId } = useParams();
    const [Products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    async function getProducts() {
        const url = "https://api.escuelajs.co/api/v1/products/?categoryId=" + categoryId;
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

    if (loading) {
        return (
            <div className="flex justify-center">
                <Spinner aria-label="Default status example" />
                <br />
                sedang mengambil data
            </div>
        )
    };

    return (
        <h1 className="text-4xl font-bold">Produk kategori {Products[0].category.name}</h1>
    )
}