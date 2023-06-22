import { useEffect, useState } from "react"
import api from "../api"
import {  toast } from 'react-toastify';
import Modal from "../Modal" ;
import Link from "next/link";

export default function Table()  {
    const [signatures, setSignatures] = useState([]) as any
    const [modal, setModal] = useState() as any


    useEffect(() => {
        api.get("/signature").then((response) => {
            setSignatures(response.data)
          }).catch((err) => {
            toast.error("erro ao carregar assinaturas")
          })
    },[])


    function updateSignature(id: number, value: any){

        api.patch("/signature/update/"+id,{value})
    }




    return (
        <div className="max-w-screen-xl w-3/4 mt-14 mr-4 float-right px-4 md:px-8">
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
                    <Link
                        href="javascript:void(0)"
                        className="inline-block px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm"
                    >
                        Add product
                    </Link>
                </div>
            </div>
            <div className="mt-12 relative h-max overflow-auto">
                <table className="w-full table-auto text-sm text-left">
                    <thead className="text-gray-600 font-medium border-b">
                        <tr>
                            <th className="py-3 pr-6">name</th>
                            <th className="py-3 pr-6">Features</th>
                            <th className="py-3 pr-6">status</th>
                            <th className="py-3 pr-6">Descrição</th>
                            <th className="py-3 pr-6">price</th>
                            <th className="py-3 pr-6"></th>
                        </tr>
                    </thead>
                    {modal}
                    <tbody className="text-gray-600 divide-y">
                        {
                            signatures.map((item:any, idx: any) => (
                                <tr key={idx}>
                                    <td className="pr-6 py-4 whitespace-nowrap">
                                      <input  type="text" value={item.title} 
                                      className="rounded-md border-gray-300 bg-gray-50"
                                       onChange={(e) => {setSignatures((preventSignatures: any) => {
                                        const updateSignatures = [...preventSignatures];
                                        updateSignatures[idx] = { ...updateSignatures[idx], title: e.target.value };
                                        return updateSignatures;
                                      }); updateSignature(item.id, {...item, title: e.target.value, })}}
                                      /></td>
                                    <td className="pr-6 py-4 whitespace-nowrap">{item.fatures.length}</td>
                                    <td className="pr-6 py-4 whitespace-nowrap">
                                        <span className={`px-3 py-2 rounded-full font-semibold text-xs ${item.status == "Active" ? "text-green-600 bg-green-50" : "text-blue-600 bg-blue-50"}`}>
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="pr-6 py-4 whitespace-nowrap"><input  type="text" value={item.description} 
                                    className="rounded-md border-gray-300 bg-gray-50"
                                       onChange={(e) => {setSignatures((preventSignatures: any) => {
                                        const updateSignatures = [...preventSignatures];
                                        updateSignatures[idx] = { ...updateSignatures[idx], description: e.target.value };
                                        return updateSignatures;
                                      });updateSignature(item.id, {...item, description: e.target.value, })}}
                                      /></td>
                                    <td className="pr-6 py-4 whitespace-nowrap"><input  type="number" value={item.price} 
                                    className="rounded-md border-gray-300 bg-gray-50"
                                       onChange={(e) => {setSignatures((preventSignatures: any) => {
                                        const updateSignatures = [...preventSignatures];
                                        updateSignatures[idx] = { ...updateSignatures[idx], price: e.target.value };
                                        return updateSignatures;
                                      });updateSignature(item.id, {...item, price: e.target.value, })}}
                                      /></td>
                                    <td className="text-right whitespace-nowrap">
                                        <Link  href={'/admin/dashboard/signature/'+item.id} className="py-1.5 px-3 text-gray-600 hover:text-gray-500 duration-150 hover:bg-gray-50 border rounded-lg">
                                            Manage
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}