import { React, useState, useContext, useEffect } from "react";

import axios from "axios";
import { server } from "../../server";
import { AuthContext } from "../../context/auth.context";
import SingleWishlistItem from "./SingleWishlistItem.jsx";

function Wishlist() {
  const { user } = useContext(AuthContext);
  const [wishlist, setWishlist] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserAndWishlist();
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${server}/product/allproducts`);
      // setProducts(response.data.productsFromDb);
      console.log("this is the all products", response.data);
      setProducts(response.data.productsFromDb);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchUserAndWishlist = async () => {
    try {
      // const currentUserEmail = user.email;
      const response = await axios.get(`${server}/user/getuser/${user._id}`);
      setWishlist(response.data.foundUser.wishlist);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  return (
    <div className="fixed top-1 left-1 w-full bg-[#ffffffea] h-screen">
      <div className="h-full w-full mt-[60px] overflow-y-scroll bg-white flex flex-col shadow-sm">
    {loading ? ( // Check if the API call is still in progress
          <div className="flex justify-center items-center h-full">
            <p className="text-xl text-gray-500">Loading...</p>
          </div>
        ) : wishlist?.length === 0 ? (
          <div className="flex justify-center items-center h-full">
            <p className="text-xl text-gray-500">Your wishlist is empty :( </p>
          </div>
        ) : (
          products.map((product) =>
            wishlist?.includes(product._id) ? (
              <SingleWishlistItem product={product} key={product._id} />
            ) : null
          )
        )}
      </div>
    </div>
  );
}
export default Wishlist;
