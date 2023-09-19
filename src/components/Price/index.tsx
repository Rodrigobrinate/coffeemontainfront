import React, { useState } from 'react';
import api from '../api';

// import { Container } from './styles';

const Price = (props: {item: any, idx: any}) => {
    const [isAnual, setIsAnual] = useState(true);
  const [isGraos, setIsGraos] = useState(false);
 
    const {item, idx} = props

    function checkout(){


    window.location.href = "/checkout/"+item.id

    }




  return (
    <div key={idx} className='relative flex-1 flex items-stretch flex-col p-8 rounded-xl border-2 ' style={{backgroundColor: "rgba(255, 255, 255, 0.8)"}}>
    <div>
        <span className='text-amber-900 font-medium'>
            {item?.title}
        </span>
        <img src={item.image} className='rounded-xl' alt="" />
        <div className='mt-4 text-gray-800 text-3xl font-semibold'>
            R$
            {
             item?.priceAnual ? item?.priceAnual?.toFixed(2).replace(".",",") :
            item?.price.toFixed(2).replace(".",",")} <span className="text-xl text-gray-600 font-normal">/mês</span>
        </div>
        
        

    </div>
    <ul className='py-8 space-y-3'>
        {
            item?.fatures?.map((featureItem:any, idx: any) => (
                <li key={idx} className='flex items-center gap-5'>
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-5 w-5 text-amber-900'
                        viewBox='0 0 20 20'
                        fill='currentColor'>
                        <path
                            fill-rule='evenodd'
                            d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                            clip-rule='evenodd'></path>
                    </svg>
                    {featureItem.name}
                </li>
            ))
        }
    </ul>
    <div className="flex-1 flex items-end">
        <button className='px-3 py-3 rounded-lg w-full font-semibold text-sm duration-150 text-white bg-amber-900 hover:bg-amber-800 active:bg-amber-700'
        onClick={checkout}
        >
            Assinar
        </button>
    </div>
</div>
  )
}

export default Price;