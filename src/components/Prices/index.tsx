import { useEffect, useState } from "react";
import Price from "../Price";
import { isatty } from "tty";


    

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

    const [isAnual, setIsAnual] = useState(true);
    const [isGraos, setIsGraos] = useState(false);
    

   const {signatures} = props
const [signature2, setsignature2 ]= useState(signatures.filter((item: any) => item.isAnual == true))
   useEffect(() => {
    localStorage.setItem("isAnual", isAnual.toString())
    localStorage.setItem("isGraos", isGraos.toString())

    if (signatures){
    //console.log(signatures.filter((item: any) =>  item.isMoido == true))
    console.log(isAnual, isGraos,signatures.filter((item: any) => item.isAnual == true && item.isMoido == true))
    if (isAnual && isGraos){
        let sig = signatures.filter((item: any) => item.isAnual == true && item.isMoido == false)
        sig = sig.sort((a:any, b:any) => a.price - b.price)
        setsignature2(sig)
    } 
    else if (isAnual && !isGraos){
        setsignature2(signatures.filter((item: any) => item.isAnual == true && item.isMoido == true).sort((a:any, b:any) => a.price - b.price))
    }
    else if (!isAnual && isGraos){
        setsignature2(signatures.filter((item: any) => item.isAnual == false && item.isMoido == false).sort((a:any, b:any) => a.price - b.price))
    }
    else if (!isAnual && !isGraos){
        setsignature2(signatures.filter((item: any) => item.isAnual == false && item.isMoido == true).sort((a:any, b:any) => a.price - b.price))
    }}



   },[isAnual, isGraos, signatures])



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

<div className=" sm:w-4/5 md:w-2/5 h-24 mx-auto border border-gray-400 flex justify-around rounded-md">
    <button className={`p-2 w-1/2  sm:w-1/2 mx-2 h-4/5 my-auto rounded-md  ${isAnual ? "bg-amber-900 text-white" : "bg-gray-100 text-amber-900"} ` }
    onClick={()=> {
        setIsAnual(true)
        
    }}
>Anual</button>
    <button className={`p-2 w-1/2  sm:w-1/2 mx-2 h-4/5 my-auto rounded-md  ${!isAnual ? "bg-amber-900 text-white" : "bg-gray-100 text-amber-900"} ` }
     onClick={()=> {
        setIsAnual(false)

    }}
    >Mensal</button>
</div>
<div className="sm:w-4/5 mt-2 md:w-2/5 h-24 mx-auto border border-gray-400 flex justify-around rounded-md">
    <button className={`p-2  w-1/2  sm:w-1/2 mx-2 h-4/5 my-auto rounded-md  ${isGraos ? "bg-amber-900 text-white" : "bg-gray-100 text-amber-900"} `}
     onClick={()=> {
        setIsGraos(true)
    }}>Grãos</button>
    <button className={`p-2  w-1/2  sm:w-1/2 mx-2 h-4/5 my-auto rounded-md  ${!isGraos ? "bg-amber-900 text-white" : "bg-gray-100 text-amber-900"} ` }
     onClick={()=> {
        setIsGraos(false)
    }}>Moido</button>
</div>

                <div className='mt-16 space-y-6 justify-center gap-6 sm:grid sm:grid-cols-2 sm:space-y-0 lg:grid-cols-3'>
                    
                    {
                        signature2?.map((item: any, idx: any) => {
                            console.log(plans)
                            
                            return(
                            
                           <Price key={idx} item={item} idx={idx} />
                        )
                            })
                    }
                </div>
            </div>
        </section>
    );
};