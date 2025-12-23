import { useEffect, useState } from "react";
import Footer from "../shared/Footer";
import NavBar from "../shared/NavBar";
import AddAddress from "./AddAddress";
import { addressAddApi, addressDeleteApi, addressViewApi } from "../services/addressService";
import { userLoggedInId } from "../utils/utils";
import SingleAddress from "./SingleAddress";



function Addresses(){

    const [showAddress, setShowaddress] = useState(false);
    const [addressData, setAddressData] = useState([]);

    useEffect( () => {

        const getAddresses = async() =>{
            try {
                const apiResponse = await addressViewApi({userId:userLoggedInId()})
                setAddressData(apiResponse.data.data);
            } catch (error) {
                console.error("Error fetching addresses:", error);
                alert("Failed to load addresses. Please try again later.");
            }
            
        }

        getAddresses();
        
    },[]);

    const handleAddAddress = async (newAddress) => {
        try {
            const apiResponse = await addressAddApi({ ...newAddress, userId: userLoggedInId() });
            setAddressData(prev => [...prev, apiResponse.data.data]); 
            setShowaddress(false);
        } catch (error) {
            console.error("Add address failed:", error);
        }
    };
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this address?")) return;
        try {
            await addressDeleteApi({ id }); 
            setAddressData(prev => prev.filter(addr => addr.id !== id)); 
        } catch (error) {
            console.error("Delete failed:", error);
        }
    };

    return(
        <div className="container-fluid">

            <NavBar />
            <div className="container my-3">
                <div className="row">
                    <div className="col-3"></div>
                    <div className="col-6">
                        <button className="btn btn-secondary" onClick={e => setShowaddress(true)}>Add new Address</button>
                        {
                            showAddress === true && <AddAddress onAdd={handleAddAddress}/>
                        }
                    </div>
                    <div className="col-3"></div>
                </div>
                <div className="row">
                    {
                        addressData.map( (address,i) =>(
                            <SingleAddress address={address} onDelete={handleDelete} key={i}/>
                        ))
                    }
                </div>
            </div>
            <Footer/>

        </div>
    )
}

export default Addresses;