import { useParams } from "react-router-dom";
import Footer from "../shared/Footer";
import NavBar from "../shared/NavBar";
import { useEffect, useState } from "react";
import axios from "axios";
import { SideBySideMagnifier } from "react-image-magnifiers";
import { toast, ToastContainer } from "react-toastify";
//import { userLoggedInId } from "../utils/utils";

function SingleProduct(){

    const {productId} = useParams();
    const [productData, setProductData] = useState(null);
    const [mainImage,setMainImage]  = useState();

    const [quantity, setQuantity] = useState(1);

    useEffect( () => {

        const getproductData = async () => {
            const apiResponse = await axios.get(`https://dummyjson.com/products/${productId}`);
            setProductData(apiResponse.data);
            setMainImage(apiResponse.data.images[0]);
        }

        getproductData();

    },[productId]);

    const handleAddToCart = async() => {
        if( quantity <= productData.stock){
            
            //let userId = userLoggedInId();
            let product = { id:productId, quantity:quantity };
            let products = [];
            products.push(product);
            try {
                let apiResponse = await axios.post("https://dummyjson.com/carts/add", {userId:4, products:products});
                toast.success(`${apiResponse.data.products[0].title} added to cart`,{position:"top-center"})
            } catch (ex) {
                toast.error(ex.message,{position:"top-center"})
            }
            
            
        }
        else{
            toast.error("we don't have enough stock to process your order");
        }
    }

    return(
        <div>
            <NavBar/>
            <div className="container">
                <div className="row mt-4">
                    <div className="col-4">
                        {
                            productData != null && 
                            <div className="row">
                                {
                                    productData.images.map( (image,i)=> (
                                        <div className="col-2" key={i}>
                                            <img src={image} className="img-thumbnail" onMouseOver={e => setMainImage(image)} alt="product-img"/>
                                        </div>
                                    ))
                                }
                            </div>
                        }

                        {
                            productData != null && 
                            //<img src={mainImage} className="img-fluid" alt="big-img"/>
                            <div className="my-3">
                                <SideBySideMagnifier
                                    imageSrc={mainImage}
                                    alwaysInPlace={false}
                                    fillAvailableSpace ={false}
                                    zoomPosition="right"
                                    zoomContainerBorder="1px solid #ccc"
                                    zoomContainerBoxShadow="0 4px 8px rgba(0,0,0,0.3)"
                                    style={{ width: "300px", maxWidth: "300px" }}
                                />
                            </div>

                            
                        }
                    </div>

                    <div className="col-4">
                        { productData != null && 
                            <div>
                                <h1>{productData.title}</h1>
                                <div className="fs-4"> <span className="fs-5">Rating : </span><i className="bi bi-star-fill text-warning"></i>  {productData?.rating}</div>
                                <div className="fs-3"><span className="fs-5">Price : </span><i className="bi bi-currency-rupee"></i>{productData?.price} <del className="fs-5">{productData?.price +500}</del></div>
                            </div>
                        }
                    </div>
                    <div className="col-3">
                        <div className="card">
                            <div className="card-body">
                                <h5>Add to cart</h5>
                                <select className="form-control mt-3" onChange={e => setQuantity(e.target.value)}>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>
                                <div className="d-grid my-3">
                                    <button className="btn btn-warning rounded-3" onClick={handleAddToCart} >Add to cart</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
            <Footer />
        </div>
    )
}

export default SingleProduct;