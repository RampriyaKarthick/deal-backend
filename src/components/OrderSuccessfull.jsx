import React from 'react';
import Confetti from 'react-confetti';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard } from '@fortawesome/free-solid-svg-icons';

function OrderSuccessfull() {
  const config = {
    numberOfPieces: 100,
    recycle: false,
    colors: ['#FFC0CB', '#FFD700', '#7FFFD4', '#FFA07A', '#FF69B4'],
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#ffffffea]">
    <div className="text-center">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">Thank You for Your Purchase!</h1>
      <p className="text-lg text-gray-800 mb-2">Your order will be delivered within 24 hours.</p>
      <p className="text-lg text-gray-800 mb-2">Please have the payment amount ready upon delivery.</p>
      <p className="text-lg text-gray-800 mb-2">We also accept credit cards for payment.</p>
      <p className="text-lg text-gray-800 mb-8">
          <FontAwesomeIcon icon={faCreditCard} className="mr-2" />
          Your favorite e-payment option is coming soon!
        </p>
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
