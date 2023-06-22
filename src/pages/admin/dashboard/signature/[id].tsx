import api from '@/components/api';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Table from '@/components/TableFeatures';
import Sidebar from '@/components/Sidebar';
// import { Container } from './styles';

const Signature: React.FC = () => {
    const [signature, setSignature] = useState([]) as any

    const router = useRouter()
    const { id } = router.query

    useEffect(() => {
        if (id){
        api.get("/signature/"+id).then((response) => {
            setSignature(response.data)
        })
    
    }
    },[id])



  return (
    <div>
    <Sidebar />
    {signature && signature?.id ? <Table signature={signature} features={signature?.fatures} id={signature?.id}/> : ""}

    </div>
  );
}

export default Signature;