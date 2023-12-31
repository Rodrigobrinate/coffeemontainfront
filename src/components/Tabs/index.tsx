import { useEffect, useState } from "react"

export default function Tabs()  {

    const tabItems = [
        {
            icon:
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122" />
                </svg>,
            name: "Assinaturas"
        },
        
       
    ]
    const [selectedItem, setSelectedItem] = useState(0)


    useEffect(() => {
        if (selectedItem == 0){
        //window.location.href = "/profile/assinaturas"
        }
    },[selectedItem])


    return (
        <div className="px-4 md:px-8">
            <ul role="tablist" className="max-w-screen-xl mx-auto border-b flex items-center gap-x-6 overflow-x-auto text-sm">
                {
                    tabItems.map((item, idx) => (
                        <li key={idx} className={`py-2 border-b-2 ${selectedItem == idx ? "border-indigo-600 text-indigo-600" : "border-white text-gray-500"}`}>
                            <button
                                role="tab"
                                aria-selected={selectedItem == idx ? true : false}
                                aria-controls={`tabpanel-${idx + 1}`}
                                className="flex items-center gap-x-2 py-2 px-2 rounded-lg duration-150 hover:text-indigo-600 hover:bg-gray-50 active:bg-gray-100 font-medium"
                                onClick={() => {setSelectedItem(idx); window.location.href = "/profile/"+item.name}}

                            >
                                {item.icon}
                                {item.name}
                            </button>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}