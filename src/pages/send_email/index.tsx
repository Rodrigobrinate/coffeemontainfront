import api from '@/components/api';
import Header from '@/components/header';
import React, { useState } from 'react';

// import { Container } from './styles';

const Send_email = () => {
    const [email, setEmail] = useState('')
    const [info, setInfo] = useState("")

 function send(){


    api.post("email_verify",{
        email
    }).then((reponse) => {
        setInfo("email enviado com sucesso, verifique sua caixa de email")
    })

 }

  return (
    <div>
        <Header />
        <label htmlFor="" style={{fontWeight: "bold", width: "80%",textAlign: "center",display:"block",  margin: "0 auto"}}>Digite seu E-mail</label>
        <br />
        <input 
        onChange={(e)=> {
            setEmail(e.target.value)
        }}
        style={{width: "80%", padding: "20px", display: "block", margin: "0 auto"}} type="text" />
        <br />
        <button 
        onClick={send}
        style={{
            width: "10%", 
            padding: "20px",
            display: "block", 
            margin: "0 auto", 
            borderRadius: "10px", 
            background: "#93522E", 
            border: "none", 
            color: "#fff", 
            fontWeight: "bold"
            }}>Enviar</button>
    </div>
  );
}

export default Send_email;