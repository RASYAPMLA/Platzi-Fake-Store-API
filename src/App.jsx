import { useState, useEffect } from "react";
import NavbarComponent from "./components/NavbarComponent";
import { BannerComponent } from "./components/BannerComponent";
import CardListComponent from "./components/CartListComponent";
import { Button } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { get } from "flowbite-react/helpers/get";
import { Spinner } from "flowbite-react";

export default function App() {
  const [categoryProducts, setCategoryProduct] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (location.state?.successPayment) {
      setShowModal(true);
      window.history.replaceState({}, document.title);
    }
  }, [location]);

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
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        >
          <div className="relative w-400px max-w-full rounded-lg bg-white p-8 shadow-xl">
            <button
              onClick={() => setShowModal(false)}
              className="absolute left-4 top-4 text-gray-400 hover:text-gray-900"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
            <div className="mt-2 text-center">
              <svg className="mx-auto mb-4 h-16 w-16 text-[#84cc16]" viewBox="0 0 24 24" fill="currentColor">
                <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
              </svg>
              <h3 className="text-base font-normal text-gray-500">
                Pembelian Produk telah Dilakukan!
              </h3>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 