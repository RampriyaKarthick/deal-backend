import React , {useState, useContext}from "react";
import ProfileNavBar from "./ProfileNavBar";
import { Link , useNavigate} from 'react-router-dom';
import FetchUser from "./FetchUser";
import axios from "axios";
import { server } from "../server";
import OrderSuccessfull from "./OrderSuccessfull";


function ShippingInfo() {
  
  
const user = FetchUser();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [postcode, setPostcode] = useState("");
  const [phonenumber, setPhonenumber] = useState("")
  const [orderSuccessful, setOrderSuccessful] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e)=>{
    e.preventDefault();
    try {
      const shippingInfo = {
        name:name, 
        address:address,
        country:country,
        city:city,
        phoneNo:phonenumber,
        postalCode: postcode,

      }
      console.log("shipping info from frontend", shippingInfo)
      const userId = user._id
      const sendShippingInfo = await axios.put(`${server}/cart/${userId}/shippinginfo`,shippingInfo )
      .then (navigate("/order-successful"));
      setOrderSuccessful(true);
      setName("")
      setAddress("")
      setCity("")
      setCountry("")
      setPostcode("")
      setPhonenumber("")
    
      

    } catch (error) {
      console.log("error while updating shipping info on frontend", error)
      
    }


  }

  return (
    <div>
      <ProfileNavBar />
      <div className="flex justify-center items-center h-screen bg-[#ffffffea]">
        <div className="w-full max-w-md bg-white p-4 shadow-sm">
        <div className="flex justify-center">
        <h1 className="text-2xl font-semibold mb-10">Shipping info</h1>
        </div>
        <div className="mx-auto max-w-lg">
          
            <form onSubmit={handleSubmit} className="mb-4">
            <div className="w-[300px]">
              <label className="block w-[300px] text-sm font-medium text-gray-700">
                Name of recipient
              </label>

              <div className="mt-1">
                <input
                  type="text"
                  name="name"
                  autoComplete="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="apperance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
            <div className="w-[400px]">
              <label className="block w-[400px] text-sm font-medium text-gray-700">
                Street address
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="address"
                  autoComplete="address"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="apperance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
            <div className="w-[300px]">
              <label className="block w-[300px] text-sm font-medium text-gray-700">
                City
              </label>

              <div className="mt-1">
                <input
                  type="text"
                  name="city"
                  autoComplete="city"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="apperance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
            <div className="w-[400px]">
              <label className="block w-[300px] text-sm font-medium text-gray-700">
                Country
              </label>

              <div className="mt-1">
                <input
                  type="text"
                  name="country"
                  autoComplete="country"
                  required
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="apperance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div> 

            <div className="w-[300px]">
              <label className="block w-[300px] text-sm font-medium text-gray-700">
                Post Code
              </label>

              <div className="mt-1">
                <input
                  type="text"
                  name="postcode"
                  autoComplete="postcode"
                  required
                  value={postcode}
                  onChange={(e) => setPostcode(e.target.value)}
                  className="apperance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="w-[300px]">
              <label className="block w-[300px] text-sm font-medium text-gray-700">
                Phone Number
              </label>

              <div className="mt-1">
                <input
                  type="text"
                  name="phonenumber"
                  autoComplete="phonenumber"
                  required
                  value={phonenumber}
                  onChange={(e) => setPhonenumber(e.target.value)}
                  className="apperance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
            <div className="flex justify-center">
            <button
                type="submit"
                className="group relative w-[100px] h-[40px] flex justify-center rounded-md bg-blue-600 hover:bg-blue-700 py-2 px-4 border border-transparent font-medium text-sm mt-5"
              >
                Submit
              </button>
              </div>
              </div>

            </form>
            {orderSuccessful && (
            <Link to="/order-successful">
              <OrderSuccessfull />
            </Link>
          )}
          </div>
          </div>
      </div>
  
    </div>
  );
}

export default ShippingInfo;
