import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { server } from "../../server";
import { AiFillHeart, AiOutlineShoppingCart } from "react-icons/ai";
import { AuthContext } from "../../context/auth.context.jsx";

function SingleWishlistItem({ data }) {
  const [products, setProducts] = useState([]);
  const [singleItem, setSingeleItem] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${server}/product/allproducts`);
      // setProducts(response.data.productsFromDb);
      console.log("this is the product list", response.data);
      response.data.productsFromDb.map((product) =>
        product._id === data ? setSingeleItem(product) : null
      );
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const removeFromWishlist = () => {
    const userId = user._id;
    const productId = data;
    
    axios
      .delete(`${server}/wishlist/${userId}/removeWishlist/${productId}`)

      .catch(function (error) {
        console.log("error while trying to post wishlist", error);
      });
  };

  return (
    <>
      <div className="w-[1200px] h-[50px] flex bg-[#ededed] mt-5 ml-5 rounded-md shadow items-center border-sm justify-between">
        <div className="flex justify-between align-baseline items-center w-[1100px]">
          <img
            src={
              singleItem.images
                ? singleItem.images[0]
                : "https://erp.netbizde.com/cdn/static/products/default.jpg"
            }
            alt={singleItem.name}
            className=" flex h-[48px] rounded-sm ml-2 mr-2 "
          ></img>
          <h2 className="w-[300px] font-[600] font-Roboto text-[#333]">
            {singleItem.name}
          </h2>
          <h4 className="ml-5 ">
            {singleItem &&
            singleItem.description &&
            singleItem.description.length > 30
              ? singleItem.description.slice(0, 30) + "..."
              : singleItem.description}
          </h4>
          <h6>{singleItem.price + "$"}</h6>

          <div className="flex align-baseline items-center">
            <div className="flex">
              <AiFillHeart
                size={20}
                color="red"
                title="Remove from Wishlist"
                onClick={removeFromWishlist}
                className="ml-5 mr-5 cursor-pointer"
              />
            </div>

            <div className=" w-[150px] bg-black my-3 mt-6 h-11 flex items-center justify-center align-baseline rounded-[4px]">
              <span className="text-white absolute flex items-center justify-center align-center  ">
                Add to cart <AiOutlineShoppingCart className="ml-l " />
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SingleWishlistItem;
