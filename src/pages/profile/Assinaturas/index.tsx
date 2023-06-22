import Tabs from '@/components/Tabs';
import api from '@/components/api';
import Header from '@/components/header';
import signature from '@/pages/admin/dashboard/signature/[id]';
import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';

// import { Container } from './styles';

const assinaturas: React.FC = () => {
  const [orderSub, setOrdersSub] = useState([]) as any

  useEffect(() => {
    api.get("/signature/orders/findMany").then((response) => {

      setOrdersSub(response.data)
  }).catch((err) => {
      console.log(err)
  })
  },[])


  function cancel(id: number){
    api.post("/order/cancel", {id}).then((response) => {}
    ).catch((err) => {
      toast.error("não foi possível cancelar a assinatura, entre em contato com o suporte")
    })
  }


  return (
  <div>
    <Header />
    <Tabs />
    <ToastContainer />

    <div className="max-w-screen-xl mx-auto px-4 md:px-8">
            <div className="items-start justify-between md:flex">
                <div className="max-w-lg">
                    <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
                        All products
                    </h3>
                    <p className="text-gray-600 mt-2">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                    </p>
                </div>
                <div className="mt-3 md:mt-0">
                    <a
                        href="javascript:void(0)"
                        className="inline-block px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm"
                    >
                        Add product
                    </a>
                </div>
            </div>
            <div className="mt-12 relative h-max overflow-auto">
                <table className="w-full table-auto text-sm text-left">
                    <thead className="text-gray-600 font-medium border-b">
                        <tr>
                            <th className="py-3 pr-6">Nome</th>
                            <th className="py-3 pr-6">Data</th>
                            <th className="py-3 pr-6">status</th>
                            <th className="py-3 pr-6">Tipo</th>
                            <th className="py-3 pr-6">Valor</th>
                            
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 divide-y">
                        {
                            orderSub?.map((item: any, idx:any) => (
                                <tr key={idx}>
                                    <td className="pr-6 py-4 whitespace-nowrap">{item?.signature?.title}</td>
                                    <td className="pr-6 py-4 whitespace-nowrap">{new Date(item.createdAt).toLocaleDateString("pt-BR") +" "+ new Date(item.createdAt).toLocaleTimeString("pt-BR")}</td>
                                    <td className="pr-6 py-4 whitespace-nowrap">
                                        <span 
                                        className={`px-3 py-2 rounded-full font-semibold text-xs ${item.status == "ativo" ? "text-green-600 bg-green-50" : item.status == "canceled"? "text-red-600 bg-red-50" : item.status == "aguardando pagamento"? "text-yellow-400 bg-yellow-50" : "text-blue-600 bg-blue-50"}`}>
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="pr-6 py-4 whitespace-nowrap">
                                    <span 
                                        className={`px-3 py-2 rounded-full font-semibold text-xs text-blue-600 bg-blue-50`}>
                                          {item.isAnual ? "Anual" : "Mensal"}
                                        </span>
                                        <span 
                                        className={`px-3 py-2 rounded-full font-semibold text-xs text-green-600 bg-green-50`}>
                                          {item.isGraos ? "Grãos" : "Moido"}
                                        </span>
                                    </td>
                                    <td className="pr-6 py-4 whitespace-nowrap">R$ {item?.signature?.price.toFixed(2).replace(".", ",")}</td>
                                    <td className="text-right whitespace-nowrap">
                                      {item.status == "ativo" ||item.status == "active" || item.status == "aguardando entrega" ?
                                        <button onClick={()=> {cancel(item.id)}} className="py-1.5 px-3 text-gray-600 hover:text-gray-500 duration-150 hover:bg-gray-50 border rounded-lg">
                                            Cancelar
                                        </button>: ""}
                                        {item.status == "aguardando pagamento" ?
                                        <button onClick={()=> {cancel(item.id)}}  className="py-1.5 px-3 text-gray-600 hover:text-gray-500 duration-150 hover:bg-gray-50 border rounded-lg">
                                            Pagar
                                        </button>: ""}
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>


  </div>
    );
}

export default assinaturas;