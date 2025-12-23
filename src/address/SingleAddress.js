
function SingleAddress({address, onDelete }){

    return(
        <div className="col-12">
            <div className="card my-3">
                <div className="card-body">
                    <div>{address.flat},{address.city},{address.state},{address.country} - {address.pincode}</div>
                    <div>Name : {address.name}, Contact Number : {address.mobile}</div>
                </div>
                <div className="card-footer">
                    <button className="btn btn-primary me-4">Edit</button>
                    <button className="btn btn-danger" onClick={e => onDelete(address.id)}>Delete</button>
                </div>
            </div>
        </div>
    )
}

export default SingleAddress;