import React, { useEffect, useState } from "react";

import styles from "./styles.module.css";
import Header from "@/components/header";
import { useRouter } from "next/router";
import api from "@/components/api";
import { MenuSharp, SettingsSharp } from "@mui/icons-material";
import { cpf } from 'cpf-cnpj-validator';
import validator from 'validator';
import Footer from "@/components/Footer/inex";

const Checkout = () => {
  const [signature, setSignature] = useState([]) as any;
  const [isAnual, setIsAnual] = useState(false) as any
  const [isGraos, setIsGraos] = useState(false) as any
  const [user, setUser] = useState([]) as any
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [cpfText, setCpfText] = useState('')
  const [phone, setPhone] = useState('')
  const [street, setStreet] = useState('')
  const [city, setCity] = useState('')
  const [country, setContry] = useState('')
  const [number, setNumber] = useState('')
  const [neighborhood, setNeighborhood] = useState('')
  const [phoneValid, setphoneValid] = useState(false)
  const [cpfValid, setcpfValid] = useState(false)




  const router = useRouter();
  var { id } = router.query;

  useEffect(() => {
    if (id) {
      api.get("/signature/" + id).then((response) => {
        setSignature(response.data);
      });
    }

api.get('user').then((response) => {
    setUser(response.data)
    setName(response.data.name)
    setEmail(response.data.email)

    if(cpf.isValid(response.data.cpf)){
        setCpfText(response.data.cpf)
        setcpfValid(true)

    }

    if(validator.isMobilePhone(response.data.phone, "pt-BR")){
        setPhone(response.data.phone)
        setphoneValid(true)

    }

    setStreet(user?.addresses?.[0]?.street)
    setNumber(user?.addresses?.[0]?.number)
    setCity(user?.addresses?.[0]?.city)
    setNeighborhood(user?.addresses?.[0]?.neighborhood)

}).catch((err: any) => {
    console.log(err.response)
    if (err.response.status == 401) {
        window.location.href = "/login"
    }
})


  }, [id]);

useEffect(() => {
if (typeof window) {
    setIsAnual(localStorage.getItem("isAnual"))
    setIsGraos(localStorage.getItem("isGraos"))
}
},[])


function checkout(){
api.post("/signature/checkout",{
    name: name,
    email: email,
    cpf: cpfText,
    phone: phone,
    street,
    city,
    neighborhood, 
    number,
    isAnual,
    isGraos,
    signature

}).then((response) => {
    console.log(response)
    window.location.href = response.data
})
}



  return (
    <div className={styles.container_page}>
      <Header />

    <div className={styles.container}>
      <div className={styles.ordem}>
        <div className={styles.ordem_title}>
          <h4>Sua ordem</h4>
          <br />
          <hr  />
        </div>
        <div className={styles.ordem_data}>
        <div>
          <p>Assinatura: {signature.title}</p>
          <p>Valor: R$ {signature.price?.toFixed(2).replace('.', ',')}</p>
        </div>
        <div>
          <p>Tipo {isGraos == 'false' ? 'Moido' :  "Grãos"}</p>
          <p>Período: {isAnual == 'false' ? 'Mensal' : "Anual" } </p>
        </div>
        </div>
      </div>

      <div className={styles.form}>

        <label className={styles.label}  htmlFor="">Nome</label>
        <input className={styles.input} onChange={(e) => setName(e.target.value)} value={name} type="text" />
        <label className={styles.label} htmlFor="">Email</label>
        <input className={styles.input} onChange={(e) => setEmail(e.target.value)} value={email} type="text" />
        <div>
        <label className={styles.label} htmlFor="">CPF</label>
        <input className={styles.input} onChange={(e) => {setCpfText(e.target.value); cpf.isValid(e.target.value)? setcpfValid(true) :setcpfValid(false)}} 
        value={cpfText} type="text" /></div>
        <label className={styles.label} htmlFor="">Telefone</label>
        <input className={styles.input} onChange={(e) => {
          setPhone(e.target.value);validator.isMobilePhone(e.target.value, "pt-BR")? setphoneValid(true) :setphoneValid(false)}} value={phone} type="text" />
        <div>
        <label className={styles.label} htmlFor="">Endereço</label>
        <input className={styles.input} onChange={(e) => setStreet(e.target.value)} value={street}  type="text" /></div>
        <label className={styles.label} htmlFor="">Número</label>
        <input className={styles.input} onChange={(e) => setNumber(e.target.value)} value={number} type="text" />
        <div>
        <label className={styles.label} htmlFor="">Cidade</label>
        <input className={styles.input} onChange={(e) => setCity(e.target.value)} value={city} type="text" /></div>
        <label className={styles.label} htmlFor="">Bairro</label>
        <input className={styles.input} onChange={(e) => setNeighborhood(e.target.value)} value={neighborhood} type="text" />
     
     <ul className={styles.validation}>
        <li className={styles.validation_item} style={{color: cpfValid ? 'green' : 'red'}}>{cpfValid ? '' : 'cpf inválido'}</li>
        <li className={styles.validation_item} style={{color: phoneValid ? 'green' : 'red'}}>{phoneValid ? '' : 'Telefone inválido'}</li>
        <li className={styles.validation_item} 
        style={{color: street?.length > 0 && city.length > 0 && number.length > 0 && neighborhood.length > 0 ? 'green' : 'red'}}>
            {street?.length > 0 && city.length > 0 && number.length > 0 && neighborhood.length > 0 ? '' : 'preencha todos os campos'  }</li>
     </ul>
    
    <button className={styles.finish} 
    style={{opacity: cpfValid && phoneValid && street?.length > 0 && city.length > 0 && number.length > 0 && neighborhood.length > 0 ? 1 : 0.2}}
    onClick={checkout}
    >Finalizar pedido</button>
    <button className={styles.cancel}>Cancelar</button>
  </div>  </div>
  <br /><br />
  <Footer />
   </div>
  );
};

export default Checkout;
