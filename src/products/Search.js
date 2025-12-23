import NavBar from "../shared/NavBar";
import Footer from "../shared/Footer";
import { useEffect, useState } from "react";
import axios from "axios";
import Product from "./Product";


function Search(){
    
    let searchKeyword = "";
    let queryParams = new URLSearchParams(window.location.search);
    //console.log(queryParams)
    searchKeyword = queryParams.get('keyword')
    console.log(searchKeyword)

    const [products, setProducts] = useState([]);

    useEffect( () => {

        const getProductsData = async () => {
            //const apiResponse = await axios.get('https://dummyjson.com/products/search?q='+searchKeyword);
            const apiResponse = await axios.get('https://dummyjson.com/products/search?q=iphone');
            setProducts(apiResponse.data.products);
        }

        getProductsData();

    },[])

    return(
        <div>
            <NavBar/>
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="col-lg-6 col-md-8 col-sm-10">
                        {
                            products.map( (product,i) => (
                                <Product data={product} key={i}/>
                            ))
                        }
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Search;