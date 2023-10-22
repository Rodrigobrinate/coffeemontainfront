import { useEffect, useState } from "react";
import api from "../api";
import { toast } from "react-toastify";
import Modal from "../Modal";
import Link from "next/link";
import ModalCreateSignature from "@/components/ModalCreateSignature";

export default function Table() {
  const [signatures, setSignatures] = useState([]) as any;
  const [modal, setModal] = useState(false) as any;
  const [state, setState] = useState(false);
  const [isAnual, setIsAnual] = useState(true) as any
  const [name, setName] = useState('') as any
  const [price, setPrice] = useState() as any
  const [isMoido, setIsMoido] = useState(true) as any
  const [status, setStatus] = useState() as any
  const [id, setId] = useState() as any

  const [modalCreateSignature, setModalCreateSignature] = useState() as any;

  useEffect(() => {
    api
      .get("/order")
      .then((response) => {
        setSignatures(response.data);
      })
      .catch((err) => {
        if(err.response.status == 401 || err.response.status == 403){
          //window.location.href = "/login"
        }


        toast.error("erro ao carregar assinaturas");
        
      });
  }, []);

  function updateSignature(id: number, value: any) {
    api.patch("/signature/update/" + id, { value });
  }

  useEffect(() => {
    if (!state) {
      setModalCreateSignature();
    } else {
      teste();
    }
  }, [state]);

  function teste() {
    
    setModalCreateSignature(true);
  }



 function updateStatus(status: string, id: number){

   
         
    api.put("/order/update", {
        status, id
    }).then((reponse) => {
        toast.success("assinatura cirada com sucesso")
        window.location.reload()
    })
    
   
 }




  return (
    <div className="max-w-screen-xl w-3/4 mt-14 mr-4 float-right px-4 md:px-8"> 
      {modalCreateSignature
      ? <div className="fixed inset-0 z-10 overflow-y-auto">
      <div
        className="fixed inset-0 w-full h-full bg-black opacity-40"
        onClick={() => setState(false)}
      ></div>
      <div className="flex items-center min-h-screen px-4 py-8">
        <div className="relative w-full max-w-lg mx-auto bg-white rounded-md shadow-lg">
          <div className="flex items-center justify-between p-4 border-b">
            <h4 className="text-lg font-medium text-gray-800">
              Criar assinatura
            </h4>
            <button
              className="p-2 text-gray-400 rounded-md hover:bg-gray-100"
              onClick={() => setState(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 mx-auto"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <div className="space-y-2 p-4 mt-3 text-[15.5px] leading-relaxed text-gray-500">
            {/* input nome da assinatura */}
            <div>
              <label htmlFor="name" className="block py-3 text-gray-500">
                Nome
              </label>
              <div className="flex items-center p-2 border border-gray-300 rounded-md">
                <input
                  type="text"
                  placeholder="Premium"
                  onChange={(e) => {
                      
                      setName(e.target.value)
                  }}
                  id="name"
                  className="w-full p-1 ml-3 text-gray-500 outline-none  border-none bg-transparent "
                />
              </div>
            </div>
            {/* input preço da assinatura */}
            <div>
              <label htmlFor="price" className="block py-3 text-gray-500">
                Preço
              </label>
              <div className="flex items-center p-2 border border-gray-300 rounded-md">
                <input
                  type="number"
                  placeholder="59,90"
                  id="price"
                  onChange={(e) => {
                      setPrice(e.target.value)
                  }}
                  className="w-full p-1 ml-3 text-gray-500 outline-none  border-none bg-transparent "
                />
              </div>
            </div>
            {/* input email */}
            <div>
              <label htmlFor="email" className="block py-3 text-gray-500">
               Recorrência
              </label>
              <div className="flex items-center p-2 border border-gray-300 rounded-md">
               
                <select name="" onChange={(e: any) => {setIsAnual(e.target.value)}} className="w-full p-1 ml-3 text-gray-500 outline-none  border-none bg-transparent " id="">
                  <option value="true">Anual</option>
                  <option value="false">Mensal</option>
                </select>
              </div>
              <div className="flex mt-2 items-center p-2 border border-gray-300 rounded-md">
               
               <select name="" onChange={(e: any) => {setIsMoido(e.target.value)}} className="w-full p-1 ml-3 text-gray-500 outline-none  border-none bg-transparent " id="">
                 <option value="true">Moido</option>
                 <option value="false">Grãos</option>
               </select>
             </div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 mt-5 border-t">
            <button
              className="px-6 py-2 text-white bg-indigo-600 rounded-md outline-none ring-offset-2 ring-indigo-600 focus:ring-2"
            
            >
              Accept
            </button>
            <button
              className="px-6 py-2 text-gray-800 border rounded-md outline-none ring-offset-2 ring-indigo-600 focus:ring-2"
              onClick={() => setState(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div> : <></>
      
      }





     
      <div className="mt-12 relative  overflow-auto w-10/12 h-5/6 mx-auto">
        <table className="w-full table-auto text-left text-xs border ">
          <thead className="text-gray-600 font-medium border-b ">
            <tr>
              <th className="py-3 pr-6 px-4">name</th>
              <th className="py-3 pr-6 ">status</th>
              <th className="py-3 pr-6 ">Grãos</th>
              <th className="py-3 pr-6 ">Anual</th>
              <th className="py-3 pr-6 ">Preço</th>
              <th className="py-3 pr-6 ">Cliente</th>
              
              <th className="py-3 pr-6 ">Endereço</th>
              <th className="py-3 pr-6 ">Data</th>

            </tr>
          </thead>
          {modal}
          <tbody className="text-gray-800 divide-y ">
            {signatures.map((item: any, idx: any) => (
              <tr key={idx} className={`
                ${item.status == "aguradando pagamento" ? "bg-red-200": ""}
                ${item.status == "active" || item.status == "aguardando entrega" ? "bg-green-200": ""}
                
                `}>
                <td className="pr-6 py-4 whitespace-nowrap px-4">
                  {item.signature.title}
                </td>
                <td className="pr-6 py-4 whitespace-nowrap text-xs">
                <select name="" onChange={(e: any) => {updateStatus(e.target.value, item.id)}} className="w-full p-1 ml-3 text-xs text-gray-500 outline-none  border-none bg-transparent " id="">
                  <option value={item.status} >{item.status}</option>
                  <option value="Enviado">Enviado</option>
                  <option value="Cancelado">Cancelado</option>
                </select>
                </td>

                <td className="pr-6 py-4 whitespace-nowrap">
                   {item.isGraos == "true" ?  "Sim" : "Não"}
                </td>
                <td className="pr-6 py-4 whitespace-nowrap">
                   {item.isAnual == "true" ?  "Sim" : "Não"}
                </td>
                <td className="pr-6 py-4 whitespace-nowrap">
                   R$ {item.signature.price.toFixed(2).replace(".", ",")}
                </td>
                <td className="pr-6 py-4 whitespace-nowrap">
                   {item.user.name}
                   <br />
                   {item.user.phone}
                </td>
               
                <td className="pr-6 py-4 ">
                  {item.user.addresses[0].state}&nbsp;
                  {item.user.addresses[0].city}&nbsp;
                  {item.user.addresses[0].street}&nbsp;
                  {item.user.addresses[0].number}&nbsp;
                  {item.user.addresses[0].neighborhood}&nbsp;
                  {item.user.addresses[0].zipCode}&nbsp;
                </td>
                 <td className="pr-6 py-4 whitespace-nowrap">
                   {new Date(item.createdAt).toLocaleDateString("pt-BR")}
                   <br />
                   {new Date(item.createdAt).toLocaleTimeString("pt-BR")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
