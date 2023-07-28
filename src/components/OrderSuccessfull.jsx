import React from 'react';
import { useContext } from "react";
import Confetti from 'react-confetti';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from "../context/auth.context";
import { Link } from 'react-router-dom';


function OrderSuccessfull() {
  const {user} =useContext(AuthContext);
  const userName = user.name;
  const config = {
    numberOfPieces: 100,
    recycle: false,
    colors: ['#FFC0CB', '#FFD700', '#7FFFD4', '#FFA07A', '#FF69B4'],
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#ffffffea]">
    <div className="text-center">
    <h1 className="text-4xl font-bold text-gray-600 mb-4">Hi {userName}! Your order has been placed</h1>
      <h1 className="text-4xl font-bold text-blue-600 mb-4">Thank You for Your Purchase!</h1>
      <p className="text-lg text-gray-800 mb-2">Your order will be delivered within 24 hours.</p>
      <p className="text-lg text-gray-800 mb-2">Please have the payment amount ready upon delivery.</p>
      <p className="text-lg text-gray-800 mb-2">We also accept credit cards for payment.</p>
      <p className="text-lg text-green-400 mb-8">
          <FontAwesomeIcon icon={faCreditCard} className="mr-2" />
          We're expanding our payment options soon!
        </p>
        <Link to="/" className="text-lg text-blue-500 underline">
          Go to your profile
        </Link>
    </div>
      <Confetti {...config} />
      <img
        src="/Deal (2).png" 
        alt="Thank You"
        className="w-40 h-40 object-contain"
      />
    </div>
  );
}

export default OrderSuccessfull;
