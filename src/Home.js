import { useEffect, useState } from "react";
import axios from "axios";
import Footer from "./shared/Footer";
import NavBar from "./shared/NavBar";
import { toast,ToastContainer } from "react-toastify";

function Home() {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get("https://dummyjson.com/products");
                setProducts(res.data.products);
            } catch (err) {
                console.log(err);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="container-fluid">
            <NavBar/>

            <div className="container mt-4">
                <div className="row">
                    {
                        products.map((product) => (
                            <div className="col-md-3 mb-4" key={product.id}>
                                <div className="card h-100 shadow-sm">

                                    <img 
                                        src={product.thumbnail} 
                                        className="card-img-top p-3" 
                                        style={{ height: "200px", objectFit: "contain" }} 
                                        alt={product.title} 
                                    />

                                    <div className="card-body d-flex flex-column">
                                        <h6 className="card-title">
                                            {product.title.substring(0, 40)}...
                                        </h6>

                                        <p className="text-success fw-bold mt-auto">
                                            ₹ {product.price}
                                        </p>

                                        <button className="btn btn-warning mt-2" onClick={()=>toast.error("Please Login to add items to cart")}>
                                            Add to Cart
                                        </button>
                                    </div>

                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            <ToastContainer position="top-center"/>
            <Footer/>
        </div>
    );
}

export default Home;