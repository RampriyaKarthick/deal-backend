import  {React, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { server } from "../../server";
import { AiFillHeart, AiOutlineEye, AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";
import ProductDetailsCard from "./ProductDetailsCard.jsx";
import Ratings from "./Ratings";
import axios from "axios"
import { AuthContext } from "../../context/auth.context";

function ProductCard({ product }) {
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);
  
  const { user, setUser } = useContext(AuthContext);


  const productName = product.name;
 
  return (
    <>
      <div className=" w-[260px] h-[370px] bg-white rounded-lg shadow-sm p-3 m-3 relative cursor-pointer">
        <div className="flex justify-end"></div>

        <Link to={`/product/${productName}`}>
          <img
            // src={product.images[0].image}
            //src={`${server}${product.images && product.images[0]}`}
            src="https://www.leparisien.fr/resizer/fGXimQvLycC2XjTOb9nran3rDcU=/1248x782/filters:focal(1184x745:1194x755)/cloudfront-eu-central-1.images.arcpublishing.com/leparisien/NJE5TPKX7NDY3AL7MWIJJEXZOA.jpg"
            alt={productName}
            className="w-[220px] h-[170px] object-contain"
          />
        </Link>
        <Link to="/">
          <h5 className="pt-3 text-[15px] text-blue-400 pb-3">
            {product.seller}{" "}
          </h5>
        </Link>
        <Link to={`/product/${productName}`}>
          <h4 className="'text-[25px] font-[600] font-Roboto text-[#333]">
            {productName.length > 40
              ? productName.slice(0, 40) + "..."
              : productName}
          </h4>
          <div className="flex"> <Ratings num={product.ratings} /> </div>
          <div className="py2 flex items-center justify-between">
            <div className="flex">
              <h5 className="px-1 font-bold text-[18px] text-[#333] font-Roboto">
                {product.price} $
              </h5>
            </div>
            <span className="font-[400] text-[17px] text-[#68d284]">
              {product.sold==null ? "0 sold yet" : `${product.sold}, sold`}
                
              
              

            </span>
          </div>
          </Link>

          {/* Side Option */}
          <div>
            {click ? (
              <AiFillHeart
                size={22}
                className="cursor-pointer absolute right-1 top-5"
                onClick={() => setClick(!click)}
                color={click ? "red" : "black"}
                title="Remove from wishlist"
              />
            ) : (
              <AiOutlineHeart
                size={22}
                className="cursor-pointer absolute right-1 top-5"
                onClick={() => setClick(!click)}
                color={click ? "red" : "black"}
                title="Add to wishlist"
              />
            )}
            <AiOutlineEye
                size={22}
                className="cursor-pointer absolute right-1 top-14"
                onClick={() => setOpen(!open)}
                color="black"
                title="Quick View"
              />
              <AiOutlineShoppingCart
                size={25}
                className="cursor-pointer absolute right-1 top-24"
                onClick={() => setOpen(!open)}
                color="#444"
                title="Add to cart"
              />
              {
                open ? (
                <ProductDetailsCard setOpen={setOpen} product={product} />
                ) : null
              }
          </div>
        
      </div>
    </>
  );
}

export default ProductCard;
