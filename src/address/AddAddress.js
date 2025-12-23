import axios from "axios";
import { useState } from "react";

function AddAddress({onAdd}){

    const [addressData, setAddressData] = useState({
        name :'', mobile :'', flat :'', city :'', state :'', country :'', pincode :'',latLong :''
    })

    const geolocationData = async (lat, long) =>{

        //AIzaSyAY1cLZkQ8z18FMknelsZKAUMoLhMBUXEA // softwareschool key
        //https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=AIzaSyAY1cLZkQ8z18FMknelsZKAUMoLhMBUXEA
        //AIzaSyBEkinaXOdOcIDC1s3bOPaqabAL0Sffk8k // own key
        //https://nominatim.openstreetmap.org/reverse?lat=22.262469386204028&lon=73.1337141987863&format=json //Alternative Api

        // const apiResponse = await axios.get(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${long}&format=json`);
        // let address = apiResponse.data.address;
        // let city =''; let state=''; let country =''; let pincode ='';
        // city = address.city || '';
        // state = address.state || '';
        // country = address.country || '';
        // pincode = address.postcode || '';



        let apiKey = 'AIzaSyAY1cLZkQ8z18FMknelsZKAUMoLhMBUXEA';
        let apiResponse = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${apiKey}`);
        let addressComponents = apiResponse.data.results[0].address_components
        let city =''; let state=''; let country =''; let pincode ='';

        city = addressComponents.find( component => component.types.includes("locality")).long_name;
        state = addressComponents.find( component => component.types.includes("administrative_area_level_1")).long_name;
        country = addressComponents.find( component => component.types.includes("country")).long_name;
        pincode = addressComponents.find( component => component.types.includes("postal_code")).long_name;

        // console.log(city);
        // console.log(state);
        // console.log(country);
        // console.log(pincode);

        setAddressData(prev => ({ ...prev, city:city, state:state, country:country, pincode:pincode}))
        //console.log(addressData);
    }

    const getUserLatLong = () => {
        if(navigator.geolocation){

            navigator.geolocation.getCurrentPosition(
                (position) =>{
                    // console.log(position)
                    // console.log(position.coords.latitude);
                    // console.log(position.coords.longitude);
                    setAddressData(prev =>({...prev,latLong: position.coords.latitude +","+position.coords.longitude}));
                    geolocationData(position.coords.latitude, position.coords.longitude);
                    console.log("AJAY",addressData);
                },
                () => {
                    alert("Permission denied..... Dude");
                }
            )



        }
    }

    return(
        <div className="card shadow-sm mt-3">
            <div className="card-body">
                <div>
                    <button className="btn btn-primary" onClick={e => getUserLatLong()}> <i className="bi bi-crosshair"></i> Use my location</button>
                </div>
                <div className="mt-2">
                    <label className="small text-black" htmlFor="name" >NAME</label>
                    <input type="text" className="form-control" id="name" value={addressData.name} onChange={e => setAddressData({...addressData, name:e.target.value})}></input>
                </div>
                <div className="mt-2">
                    <label className="small text-black" htmlFor="mobile" >MOBILE</label>
                    <input type="text" className="form-control" id="mobile" value={addressData.mobile} onChange={e => setAddressData({...addressData, mobile:e.target.value})}></input>
                </div>
                <div className="mt-2">
                    <label className="small text-black" htmlFor="door" >FLAT/BUILDING, DOOR NO</label>
                    <input type="text" className="form-control" id="door" value={addressData.flat} onChange={e => setAddressData({...addressData, flat:e.target.value})}></input>
                </div>
                <div className="mt-2">
                    <label className="small text-black" htmlFor="city" >CITY</label>
                    <input type="text" className="form-control" id="city" value={addressData.city} onChange={e => setAddressData({...addressData, city:e.target.value})}></input>
                </div>
                <div className="mt-2">
                    <label className="small text-black" htmlFor="state" >STATE</label>
                    <input type="text" className="form-control" id="state" value={addressData.state} onChange={e => setAddressData({...addressData, state:e.target.value})}></input>
                </div>
                <div className="mt-2">
                    <label className="small text-black" htmlFor="country" >COUNTRY</label>
                    <input type="text" className="form-control" id="country" value={addressData.country} onChange={e => setAddressData({...addressData, country:e.target.value})}></input>
                </div>
                <div className="mt-2">
                    <label className="small text-black" htmlFor="pincode" >PINCODE</label>
                    <input type="text" className="form-control" id="pincode" value={addressData.pincode} onChange={e => setAddressData({...addressData, pincode:e.target.value})}></input>
                </div>

                <div className="mt-3 text-end">
                    <button className="btn btn-success" onClick={e => onAdd(addressData)}>Add Address</button>
                </div>
            </div>
        </div>
    )
}
export default AddAddress;