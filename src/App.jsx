import { useState, useEffect } from "react";
import NavbarComponent from "./components/NavbarComponent";
import { BannerComponent } from "./components/BannerComponent";
import CardListComponent from "./components/CartListComponent";
import { Button } from "flowbite-react";
import { Link } from "react-router-dom";
import { get } from "flowbite-react/helpers/get";
import { Spinner } from "flowbite-react";

export default function App() {
  const [categoryProducts, setCategoryProduct] = useState([]);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getDataCategory() {
    const url = "https://api.escuelajs.co/api/v1/categories";
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const result = await response.json();
      setCategoryProduct(result.slice(0, 4));
      setLoading(false)
    } catch (error) {
      console.error(error.message);
    }
  }

  async function getDataProduct() {
    const url = "https://api.escuelajs.co/api/v1/products";
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const result = await response.json();
      setProducts(result.slice(0, 4));
      setLoading(false)
    } catch (error) {
      console.error(error.message);
    }
  }
  useEffect(() => {
    getDataCategory();
    getDataProduct();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center">
        <Spinner aria-label="Default status example" />
        <br />
        sedang mengambil data
      </div>
    )
  }

  return (
    <div className="px-15">
      <BannerComponent />
      <CardListComponent data={categoryProducts} type={"category"} />
      <CardListComponent data={products} type={"product"}>
        <div className="flex justify-between my-10">
          <h1 className="font-bold text-2xl">Daftar Produk Populer</h1>
          <Link to="/products">
            <Button className="bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 text-white hover:bg-gradient-to-br focus:ring-cyan-300 dark:focus:ring-cyan-800">
              Selengkapnya</Button>
          </Link>
        </div>
      </CardListComponent>
    </div>
  )
}