import React , { useState } from 'react'
import CreateProduct from "./Product/CreateProduct"

import ProductCreated from './Product/ProductCreated';
import { useNavigate, Link } from 'react-router-dom';
import ProfileNavBar from './ProfileNavBar';
//import DOMPurify from 'dompurify';





function BecomeSeller() {
  const [showCreateProductForm, setShowCreateProductForm] = useState(false);
 
  const [showProductCreated, setShowProductCreated] = useState(false);
  const embedCode = '<iframe width="560" height="315" src="https://www.youtube.com/embed/zie_xSa2oRc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>';
  //const sanitizedHTML = DOMPurify.sanitize(embedCode, { DISABLE: ['iframe'] })

  const handleToggleProductCreated = () => {
    setShowProductCreated(!showProductCreated);
  };


  return (
    <div><ProfileNavBar/>
    
    <div className='mt-20 align-middle'>
   
    <div className="flex justify-center gap-4 mt-4">
    
    <Link to="/create-product" className="px-4 py-2 bg-blue-500 text-white rounded-lg">
        Sell Product
      </Link>
      
    
    </div>
  {showProductCreated && <ProductCreated />}
      
  </div>
  <div className="mt-6 text-center text-lg text-gray-800">
      Unlock the world of possibilities by creating your first product and dive into the exciting realm of product negotiation! 🚀
    </div>
    <div>
    <div className="mt-20 flex justify-center items-center">
    <div className="aspect-w-16 aspect-h-9">
      <div className="video-container" dangerouslySetInnerHTML={{ __html: embedCode}} />
    </div>
    </div>
    </div>
  </div>
  
  );
}

export default BecomeSeller