import { React, useState, useContext, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { server } from "../server";
import { AuthContext } from "../context/auth.context";
import ProfileNavBar from "./ProfileNavBar";

function ShoppingCart() {
  const { user } = useContext(AuthContext);
  const [cart, setCart] = useState([]);
  const [reload, setReload] = useState(false);
  const navigate = useNavigate();
  const userId = user._id;

  //   const fetchProducts = async () => {
  //     try {
  //       const response = await axios.get(`${server}/product/allproducts`);
  //       // setProducts(response.data.productsFromDb);
  //       console.log("this is the all products", response.data);
  //       console.log("products",response.data.productsFromDb)
  //       setProducts(response.data.productsFromDb);

  //     } catch (error) {
  //       console.error("Error fetching products:", error);
  //     }
  //   };

  const fetchUserAndCart = async () => {
    try {
      // const currentUserEmail = user.email;
      const response = await axios.get(`${server}/user/getuser/${user._id}`);
      console.log("cart", response.data.foundUser.shoppingCart);
      setCart(response.data.foundUser.shoppingCart);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  const findTotal = () => {
    let sum = 0;

    cart.map((item) => {
      sum = sum + item.price * item.amount;
    });
    return Math.round(sum) ;
  };

  useEffect(() => {
    fetchUserAndCart();
    
  }, [reload]);

  const removeItem = (productId) => {
    return async function () {
      setReload(!reload);
      try {
        await axios.delete(`${server}/cart/${userId}/cart/${productId}`);
        setReload(!reload);
      } catch (error) {
        console.log("error while trying to delete item from cart", error);
      }
    };
  };
  const confirmCart = async () => {
    try {
      // Create the order
      const cartToDb = cart.map(({ _id, price, amount, name, seller }) => ({
        _id,
        price,
        amount,
        name,
        seller,
      }));
  
      await axios.post(`${server}/cart/${user._id}/shoppingcart`, cartToDb);
  
      // Clear the cart in the frontend after the order is created
      setCart([]);
  
      // Navigate to the shipping info page after the order is created
      navigate("/shipping-info");
    } catch (error) {
      console.log("error while sending cart to db", error);
    }
  };

  return (
    <div>
      <ProfileNavBar />
      <div className="fixed top-1 left-1 w-full bg-[#ffffffea] h-screen">
        <div className="h-full w-full mt-[60px] overflow-y-scroll bg-white flex flex-col shadow-sm">
          {cart.map((cartItem) => (
            <div className="w-[1200px] h-[50px] flex bg-[#ededed] mt-5 ml-5 rounded-md shadow items-center border-sm justify-between">
              <div className="flex justify-between align-baseline items-center w-[1100px]">
                <img
                  src={
                    cartItem.images
                      ? cartItem.images[0]
                      : "https://erp.netbizde.com/cdn/static/products/default.jpg"
                  }
                  alt={cartItem.name}
                  className=" flex h-[48px] rounded-sm ml-2 mr-2 "
                ></img>
                <h2 className="w-[300px] font-[600] font-Roboto text-[#333]">
                  {cartItem.name}
                </h2>
                <h3>{cartItem.price}$</h3>
                <h3>Quantity:{cartItem.amount}</h3>
                <h3>{cartItem.price * cartItem.amount}$</h3>
                <button
                  onClick={removeItem(cartItem._id)}
                  className=" bg-[#f59191] m-1  px-4 py-2 rounded-lg text-white hover:bg-[#f59191] "
                >
                  Remove item
                </button>
              </div>
            </div>
          ))}

          {cart.length > 0 && (
  <div className="flex justify-end items-center">
    <h1 className="mt-3 text-xl font-semibold">Total price {findTotal()} $</h1>
    <div className="ml-4">
      <button
        onClick={confirmCart}
        className="w-[290px] px-4 py-2 mt-5 bg-blue-500 text-white rounded-lg text-center"
      >
        Confirm and continue to shipping
      </button>
    </div>
  </div>
)}
        </div>
      </div>
    </div>
  );
}

export default ShoppingCart;
