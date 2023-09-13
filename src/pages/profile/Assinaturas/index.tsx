import Tabs from '@/components/Tabs';
import api from '@/components/api';
import Header from '@/components/header';
import signature from '@/pages/admin/dashboard/signature/[id]';
import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';

// import { Container } from './styles';

const Assinaturas: React.FC = () => {
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

  function pay(id: number){
    api.post("signature/orders/pay", {id}).then((response) => {
        window.location.href =  response.data
    }
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
            
            <div className="mt-2 relative h-max overflow-auto">
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
                                        <button onClick={()=> {window.location.href = "https://billing.stripe.com/p/login/4gw29HaQs5I98QE6oo"}} className="py-1.5 px-3 text-gray-600 hover:text-gray-500 duration-150 hover:bg-gray-50 border rounded-lg">
                                            Gerenciar
                                        </button>: ""}
                                        {item.status == "aguardando pagamento" ?
                                        <button onClick={()=> {pay(item.id)}}  className="py-1.5 px-3 text-gray-600 hover:text-gray-500 duration-150 hover:bg-gray-50 border rounded-lg">
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

export default Assinaturas;