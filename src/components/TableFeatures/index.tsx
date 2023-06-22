import { useEffect, useState } from "react"
import api from "../api"
import {  toast } from 'react-toastify';
import Modal from "../Modal" ;
import Link from "next/link";

type Feature = {
    id: number
    name: string
    type: string
    subscriptionId: number
}

export default function Table(props: {features: Feature[], id: number, signature: any})  {
    const [signatures, setSignatures] = useState([]) as any
   
    const [modal, setModal] = useState() as any
    //const {features} = props
    const [features, setFeatures] = useState([]) as any

console.log(features, props)
    useEffect(() => {
       
if (props.features && props.id){
                setFeatures(props.features)
            }
            
          
    },[])


    useEffect(() => {

        if (features && props.id) {
        api.patch("/signature/"+props.id, {features}).then((response) => {
            console.log(response)
        })
}
    },[features])


    function createFeature(){
        setFeatures([...features, {name: "", type: 'Bom', subscriptionId: props.id}])
    }

    function deleteFeature(idx: number){
        setFeatures((prevFeatures:any) => {
            const updatedFeatures = [...prevFeatures];
            updatedFeatures.splice(idx, 1);
            return updatedFeatures;
          });
        
    }


    return (
        <div className="max-w-screen-xl w-3/4 mt-14 mr-4 float-right px-4 md:px-8">
            <div className="items-start justify-between md:flex">
                <div className="max-w-lg">
                    <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
                      {props.signature.title}
                    </h3>
                    <p className="text-gray-600 mt-2">
                        {props.signature.description}
                    </p>
                    
                </div>
                <div className="mt-3 md:mt-0">
                    <Link
                        onClick={createFeature}
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
                            <th className="py-3 pr-6"></th>
                            <th className="py-3 pr-6"></th>
                        </tr>
                    </thead>
                    {modal}
                    <tbody className="text-gray-600 divide-y">
                        {
                            features?.map((item: Feature, idx: any) => (
                                <tr key={idx}>
                                    <td className="pr-6 py-4 whitespace-nowrap">
                                        <input type="text" value={item.name}
                                        className="rounded-md border-gray-300 bg-gray-50"
                                     onChange={(e) => {setFeatures((prevFeatures: any) => {
                                        const updatedFeatures = [...prevFeatures];
                                        updatedFeatures[idx] = { ...updatedFeatures[idx], name: e.target.value };
                                        return updatedFeatures;
                                      });}} /></td>
                                    <td className="pr-6 py-4 whitespace-nowrap">
                                        <input type="text" value={item.type}
                                        className="rounded-md border-gray-300 bg-gray-50"
                                     onChange={(e) => {setFeatures((prevFeatures: any) => {
                                        const updatedFeatures = [...prevFeatures];
                                        updatedFeatures[idx] = { ...updatedFeatures[idx], type: e.target.value };
                                        return updatedFeatures;
                                      });}} /></td>
                                    <td className="pr-6 py-4 whitespace-nowrap">
                                        
                                    </td>
                                    
                                    <td className="text-right whitespace-nowrap">
                                        <button
                                        onClick={()=> {deleteFeature(idx)}}
                                         className="py-1.5 px-3 border-red-500 text-red-600 hover:text-gray-500 duration-150 hover:bg-gray-50 border rounded-lg">
                                            Delete
                                        </button>
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