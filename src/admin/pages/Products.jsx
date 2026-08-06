import { useEffect, useMemo, useState } from "react";
import Sidebar from "../components/Sidebar";
import SearchBar from "../components/SearchBar";
import ProductTable from "../components/ProductTable";
import Pagination from "../components/Pagination";
import ProductModal from "../components/ProductModal";

import {
    getProducts,
    deleteProduct,
} from "../services/productService";

import "../styles/products.css";

function Products() {
    console.count("Products Render");
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");

    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 8;

    const [showModal, setShowModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        try {
            setLoading(true);

            const data = await getProducts();

            setProducts(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error(err);
            alert("Unable to load products.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this product?")) return;

        try {
            await deleteProduct(id);
            await loadProducts();
        } catch (err) {
            console.error(err);
            alert("Unable to delete product.");
        }
    };

    const BASE_URL = import.meta.env.VITE_API_URL.replace(
        "/api",
        ""
    );

    const getImage = (image) => {
        if (!image) return "/placeholder.png";

        if (image.startsWith("http")) {
            return image;
        }

        if (image.startsWith("/uploads")) {
            return `${BASE_URL}${image}`;
        }

        return image;
    };

    const categories = useMemo(() => {
        return [
            "All",
            ...new Set(products.map((p) => p.category)),
        ];
    }, [products]);

    const filteredProducts = useMemo(() => {
        return products.filter((product) => {
            const matchSearch =
                product.name
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                product.category
                    .toLowerCase()
                    .includes(search.toLowerCase());

            const matchCategory =
                category === "All" ||
                product.category === category;

            return matchSearch && matchCategory;
        });
    }, [products, search, category]);

    useEffect(() => {
        setCurrentPage(1);
    }, [search, category]);

    const totalPages = Math.ceil(
        filteredProducts.length / productsPerPage
    );

    const currentProducts = useMemo(() => {
        const start =
            (currentPage - 1) * productsPerPage;

        return filteredProducts.slice(
            start,
            start + productsPerPage
        );
    }, [filteredProducts, currentPage]);

    // ============================
    // PART 2 STARTS FROM HERE
    // ============================

    return (
        <div className="products-page">
            <Sidebar />

            <div className="products-content">
                <h1>📦 Products</h1>

                <SearchBar
                    search={search}
                    setSearch={setSearch}
                    category={category}
                    setCategory={setCategory}
                    categories={categories}
                    onAddProduct={() => {
                        setEditingProduct(null);
                        setShowModal(true);
                    }}
                />

                {loading ? (
                    <h2>Loading Products...</h2>
                ) : (
                    <>
                        <ProductTable
                            products={currentProducts}
                            getImage={getImage}
                            onEdit={(product) => {
                                setEditingProduct(product);
                                setShowModal(true);
                            }}
                            onDelete={handleDelete}
                        />

                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            setCurrentPage={setCurrentPage}
                        />
                    </>
                )}

                <ProductModal
                    open={showModal}
                    onClose={() => {
                        setShowModal(false);
                        setEditingProduct(null);
                    }}
                    editingProduct={editingProduct}
                    onSuccess={() => {
                        setShowModal(false);
                        setEditingProduct(null);
                        loadProducts();
                    }}
                />
            </div>
        </div>
    );
}

export default Products;