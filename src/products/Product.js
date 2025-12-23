
function Product({data}){

    

    return(
        <div className="card card-product mb-4" >
            <div className="row">
                <div className="col-4">
                    <a href={"/product/"+data.id}  >
                        <img src={data.thumbnail} className="image-fluid rounded-start amazon-pointer" alt="product-image" />
                    </a>
                </div>
                <div className="col-8">
                    <div className="card-body ">
                        <a href={"/product/"+data.id}  >
                            <div className="card-title amazon-pointer" > {data.title} </div>
                        </a>
                        <div className="card-title"> <i className="bi bi-currency-rupee"></i> {data.price} </div>
                        <div > <i className="bi bi-star-fill"></i> {data.rating} </div>
                        <div className="mt-3 mb-3">
                            <button className="btn btn-warning rounded-3">Add to cart</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Product;