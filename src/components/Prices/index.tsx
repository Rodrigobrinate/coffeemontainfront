import { useState } from "react";
import Price from "../Price";


    

    const plans = [
        {
            name: "Basic plan",
            price: 12,
            features: [
                "Curabitur faucibus",
                "massa ut pretium maximus",
                "Sed posuere nisi",
                "Pellentesque eu nibh et neque",
                "Suspendisse a leo",
                "Praesent quis venenatis ipsum",
                "Duis non diam vel tortor",

            ],
        },
        {
            name: "Startup",
            price: 35,
            features: [
                "Curabitur faucibus",
                "massa ut pretium maximus",
                "Sed posuere nisi",
                "Pellentesque eu nibh et neque",
                "Suspendisse a leo",
                "Praesent quis venenatis ipsum",
                "Duis non diam vel tortor",
            ],
        },
        {
            name: "Enterprise",
            price: 60,
            features: [
                "Curabitur faucibus",
                "massa ut pretium maximus",
                "Sed posuere nisi",
                "Pellentesque eu nibh et neque",
                "Suspendisse a leo",
                "Praesent quis venenatis ipsum",
                "Duis non diam vel tortor",
            ],
        },
    ];



export default  function Prices(props: {signatures: any}) {

   const {signatures} = props


    return (
        <section className='py-14'>
            <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
                <div className='relative max-w-xl mx-auto sm:text-center'>
                    <h3 className='text-gray-800 text-3xl font-semibold sm:text-4xl'>
                        Planos
                    </h3>
                    <div className='mt-3 max-w-xl'>
                        <p>
                           encontre o plano que irá lhe atender 
                        </p>
                    </div>
                </div>
                <div className='mt-16 space-y-6 justify-center gap-6 sm:grid sm:grid-cols-2 sm:space-y-0 lg:grid-cols-3'>
                    {
                        signatures?.map((item: any, idx: any) => {
                            console.log(plans)
                            
                            return(
                            
                           <Price item={item} idx={idx} />
                        )
                            })
                    }
                </div>
            </div>
        </section>
    );
};