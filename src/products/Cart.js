/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from "react";
import Footer from "../shared/Footer";
import NavBar from "../shared/NavBar";
import axios from "axios";
//import { userLoggedInId } from "../utils/utils";
import { toast, ToastContainer } from "react-toastify";
import { getJwtToken, getLoggedInUserEmail, getLoggedInUserName, userLoggedInId } from "../utils/utils";

function Cart(){

    const [cartData, setCartData] = useState([]);
    const [cartAmount, setCartAmount] = useState(0);


    useEffect( ()=>{

        const getCartData = async ()=>{

            try {
                let userId = 6 //userLoggedInId();
                let apiResponse = await axios.get(`https://dummyjson.com/carts/user/${userId}`);
                setCartData([...apiResponse.data.carts]);
            } catch (ex) {
                toast.error(ex.message);
            }
        }

        getCartData();

    },[]);

    const updateProductData = async(apiData) =>{
        try {
            let apiResponse = await axios.put("https://dummyjson.com/carts/1",apiData);
        } catch (ex) {
            toast.error(ex.message);
        }
    }

    const decreaseQuantity = (product,j,cart,i) =>{
        let newQuantity = product.quantity - 1;
        if(newQuantity>0){
            let tempCartData = [...cartData];
            tempCartData[i]['products'][j]['quantity'] = newQuantity;
            setCartData(tempCartData);

            let apiData = {
                merge: true, // this will include existing products in the cart
                products: [
                    {
                        id: product.id,
                        quantity: newQuantity
                    }
                ]
            }
            
            updateProductData(apiData);
        }

        
    }

    const increaseQuantity = (product,j,cart,i) =>{
        let newQuantity = product.quantity + 1;
        let tempCartData = [...cartData];
        tempCartData[i]['products'][j]['quantity'] = newQuantity;
        setCartData(tempCartData);

        let apiData = {
            merge: true, // this will include existing products in the cart
            products: [
                {
                    id: product.id,
                    quantity: newQuantity
                }
            ]
        }
        
        updateProductData(apiData);
    }

    const calculateQuantityandPrice = (products) =>{
        let totalQuantity = 0;
        let totalPrice = 0;

        products.forEach((product) =>{
            let tempPrice = product.quantity*product.price;
            totalPrice = tempPrice + totalPrice;
            totalQuantity = product.quantity + totalQuantity;

        });


        return `( ${totalQuantity} items ) : ${totalPrice.toFixed(2)}`;
    }

    useEffect(() => {
        let total = 0;

        cartData.forEach(cart => {
            cart.products.forEach(product => {
                total += product.quantity * product.price;
            });
        });

        setCartAmount(Number(total.toFixed(2)));
    }, [cartData]);

    useEffect(()=>{

        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;

        document.body.appendChild(script);
        return ()=>{
            document.body.removeChild(script);
        }

    },[])

    const handlePayments = async()=>{

        let order_id = "";
        let amount = cartAmount*100;

        let createOrderApiData = {
            userId: userLoggedInId(), token:getJwtToken().replace("Bearer ",""), amount:amount
        };

        try {
            let apiResponse = await axios.post("https://api.softwareschool.co/payments/create-order", createOrderApiData);
            order_id = apiResponse.data.data.order.id;
        } catch (err) {
            if (!err.response) {
                // Network / Gateway / CORS / Timeout
                toast.error("Unable to reach server. Please try again later.");
            }
            else if (err.response.status === 502) {
                toast.error("Server is temporarily unavailable. Try again later.");
            }
            else {
                toast.error(err.response.data?.message || "Something went wrong");
            }
        }

        

        var options = {
            "key": "rzp_test_8gNHxGVGlM9lZR", // Enter the Key ID generated from the Dashboard
            "amount": amount, // Amount is in currency subunits. 
            "currency": "INR",
            "name": "Amazon test website",
            "description": "Test Transaction",
            "order_id": order_id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "handler": async function (response){

                let orderSuccessApiData = {
                    userId: userLoggedInId(), token:getJwtToken().replace("Bearer ",""), 
                    razorpay_payment_id: response.razorpay_payment_id, order_id: response.razorpay_order_id, razorpay_signature: response.razorpay_signature
                }

                try {
                    let apiResponse = await axios.post("https://api.softwareschool.co/payments/order-success", orderSuccessApiData);
                    alert("Payment Success.")
                } catch (err) {
                    toast.error(err.message);
                }
                console.log(response.razorpay_payment_id);
                console.log(response.razorpay_order_id);
                console.log(response.razorpay_signature)
            },
            "prefill": {
                "name": getLoggedInUserName(),
                "email": getLoggedInUserEmail(),
                "contact": "9347909276"
            }
        };
        var rzp1 = new window.Razorpay(options);
        rzp1.on('payment.failed', async function (response){

                let orderFailedApiData = {
                    userId: userLoggedInId(), token:getJwtToken().replace("Bearer ",""), 
                    paymentId: response.error.metadata.payment_id, order_id: response.error.metadata.order_id,
                    error: response.error
                }

                try {
                    let apiResponse = await axios.post("https://api.softwareschool.co/payments/order-failed", orderFailedApiData);
                    alert("Payment Failed.")
                } catch (err) {
                    toast.error(err.message);
                }

                console.log(response.error.code);
                console.log(response.error.description);
                console.log(response.error.source);
                console.log(response.error.step);
                console.log(response.error.reason);
                console.log(response.error.metadata.order_id);
                console.log(response.error.metadata.payment_id);
        });

        rzp1.open();
        
    }



    return(
        <div className="container-fluid">
            <NavBar/>
            <div className="container">
                <div className="row">
                    <div className="col-8">
                        {
                            cartData.map( (cart,i) => (
                                <div className="card mb-3 shadow" key={i} >
                                    <div className="card-body">
                                        {
                                            cart.products.map((product,j)=>(
                                                <div className=" card border-0 border-bottom mb-3 pb-3" key={j}>
                                                    <div className="row">
                                                        <div className="col-2">
                                                            <img src={product.thumbnail} className="img-fluid" alt="img" />
                                                        </div>
                                                        <div className="col-8">
                                                            <div className="card-body">
                                                                <h5 >{product.title}</h5>
                                                                <button className="btn btn-light" onClick={e=> decreaseQuantity(product,j,cart,i)}><strong>-</strong></button>
                                                                <span> {product.quantity} </span>
                                                                <button className="btn btn-light me-4" onClick={e=> increaseQuantity(product,j,cart,i)}><strong>+</strong></button>
                                                                <a href="#" className="card-link text-decoration-none">Delete</a>
                                                                <a href="#" className="card-link text-decoration-none">Save for later</a>
                                                            </div>
                                                        </div>
                                                        <div className="col-2 text-end">
                                                            <span className="badge text-bg-danger">LimitedTime Deal</span>
                                                            <strong><i className="bi bi-currency-rupee"></i> {product.price}</strong>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                    <div className="text-end p-3">
                                        <strong>
                                            Subtotal {calculateQuantityandPrice(cart.products)}
                                        </strong>    
                                    </div>
                                </div>
                            ))
                        }
                        
                    </div>
                    <div className="col-4">
                        <div className="card shadow">
                            {
                                cartData.length>0 &&
                                <div className="card-body">
                                    <p>
                                        <strong>Subtotal {calculateQuantityandPrice(cartData[0].products)}</strong>
                                    </p>
                                    <div className="d-grid">
                                        <button className="btn btn-warning rounded-5" onClick={e => handlePayments()}>Buy Now</button>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer/>
            <Footer/>
        </div>
    )
}

export default Cart;