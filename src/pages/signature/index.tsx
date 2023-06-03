import React, { useEffect } from 'react';
import Header from '@/components/header/index';

 //import { Container } from './styles';
 import styles from './styles.module.css'
import api from '@/components/api';
import { toast } from 'react-toastify';
import { colors } from '@mui/material';
import { features } from 'process';

const Signature = () => {
    const [signatures, setSignatures] = React.useState([]) as any


    useEffect(() => {

        api.get("/signature").then((response) => {
            setSignatures(response.data)
          }).catch((err) => {
            //toast.error("erro ao carregar assinaturas")
          })

    }, [])



    function checkout(signature: any) {



        api.post("/signature/order", {
            lookup_key: signature.priceId,
            signatureId: signature.id,
            

        }).then((response) => {
            console.log(response.data)
            window.location.href = response.data
            }).catch((err) => { 
            //toast.error("erro ao carregar assinaturas")
            })
        }

  return (
  
    <div className={styles.container}>
        <Header />




<img className={styles.banner} src="/banner.png" alt="" />

<h3 className={styles.howWork}>Como funciona?</h3>

<div className={styles.steps}>
<div className={styles.step}>
    <div className={styles.circle}>1</div>
    <p>Escolha o café que mais combina com você e receba em casa.</p>
</div>
<div className={styles.step}>
    <div className={styles.circle}>2</div>
    <p>Escolha o café que mais combina com você e receba em casa.</p>
</div>
<div className={styles.step}>
    <div className={styles.circle}>3</div>
    <p>Escolha o café que mais combina com você e receba em casa.</p>
</div>
<div className={styles.step}>
    <div className={styles.circle}>4</div>
    <p>Escolha o café que mais combina com você e receba em casa.</p>
</div>
</div>


<h1 className={styles.frase}>Conheça nossos planos</h1>


<div className={styles.plans}>

{signatures?.map((signature: any) => {
    return (
    


<div key={signature.id} className={styles.plan} style={{border: "1px solid "+signature.color}}>

<h1 className={styles.h1} style={{color: signature.color}}>{signature.title}</h1>
<p className={styles.price}>R$ {signature.price.toFixed(2).replace('.',",")}</p>
<p className={styles.price_discount}>R$ {signature.price.toFixed(2).replace('.',",")}</p>

<ul>
    {signature?.fatures.map((fature: any) => {
        return (
            <li key={fature.id} ><img src={fature.type == "Bom" ? "/Done.png" : "Close.png"} width={'20px'} alt="" />{fature.name}</li>
        )
    })
    }
    
</ul>

<button className={styles.button} onClick={() => {checkout(signature) }} >Assinar</button>
</div>
)})}


</div>



    </div>

    );
}

export default Signature;