import React, { useState } from 'react';
import api from '../api';

// import { Container } from './styles';

const Price = (props: {item: any, idx: any}) => {
    const [isAnual, setIsAnual] = useState(true);
  const [isGraos, setIsGraos] = useState(false);

    const {item, idx} = props

    function checkout(){
    localStorage.setItem("isAnual", isAnual.toString())
    localStorage.setItem("isGraos", isGraos.toString())


    window.location.href = "/checkout/"+item.id

    }




  return (
    <div key={idx} className='relative flex-1 flex items-stretch flex-col p-8 rounded-xl border-2'>
    <div>
        <span className='text-amber-900 font-medium'>
            {item?.title}
        </span>
        <div className='mt-4 text-gray-800 text-3xl font-semibold'>
            R${item?.price.toFixed(2).replace(".",",")} <span className="text-xl text-gray-600 font-normal">/mês</span>
        </div>
        
        <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" onChange={(e:any) => {setIsGraos(!isGraos);e.target.checked = isGraos}}  className="sr-only peer" id="moido" />
             <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">{isGraos ? "Grãos": "Moido"}</span>
            </label>
    <br />
            <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" onChange={(e:any) => {setIsAnual(!isAnual);e.target.checked = isAnual}}  className="sr-only peer" id="moido" />
             <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">{isAnual ? "Anual": "Mensal"}</span>
            </label>


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