import React, { useCallback, useEffect, useState } from 'react';

import styles from './styles.module.css'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin,  } from '@react-oauth/google';
import Link from 'next/link';
import axios from 'axios';
import api from '@/components/api';
import {toast, ToastContainer } from 'react-toastify';



const responseFacebook = (response: any) => {
  console.log(response);
  // Aqui você pode realizar as ações necessárias com os dados do usuário autenticado
};



const Login= () => {
  const [provider, setProvider] = useState('');
  const [profile, setProfile] = useState<any>();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false);


  useEffect(() => {
console.log(document.referrer)


  },[])
 

  const responseMessage = (response: any) => {
    console.log(response);
    localStorage.setItem('token', response.credential);
   // 

   api.post(`/login_google`, {
                        token: response.credential
                    }).then((res) => {
                      console.log(res.data.token.access_token);
                      localStorage.setItem('token', res.data.token.access_token);
                      if (document.referrer){
                        window.location.href = document.referrer
                      }else {
                        window.location.href = '/home';
                      }
                      
                  })

};

const handleSubmit = (e: any) => {
  if (email == '' || password == '') {
    toast.error('Preencha todos os campos!');
    return;
  }
  if (password.length < 6) {
    toast.error('A senha deve ter no mínimo 6 caracteres!');
    return;
  }

  //e.preventDefault();
  api.post(`/login`, {
    email: email,
    password: password,
}).then((res) => {
  console.log(res.data.access_token);
  localStorage.setItem('token', res.data.access_token);
  window.location.href = '/profile';
}).catch((err) => {
  console.log(err);
  //toast.error(err.response.data.message);
})

}



  return (
<div className={styles.container}>
<ToastContainer />
    <img src="/logo_main.png" alt="logo coffee montain" width={60}/>

<div className={styles.content}>
    <div className={styles.form}>
    <h1 className={styles.center}>Entrar</h1>

    <label className={styles.label} htmlFor="">Email</label>
    <input className={styles.input} onChange={(e) => {setEmail(e.target.value)}} type="text" />
    <label className={styles.label} htmlFor="">Senha</label>
    <input className={styles.input} onChange={(e) => {setPassword(e.target.value)}} type={showPassword ? "text" :  "password"} />
    <span style={{justifyContent: "space-between", display: "flex"}}>
      <span>
    <input className={styles.input_show_pass} onChange={()=> {setShowPassword(!showPassword)}} type="checkbox" name="" id="showpass" />
    <label className={styles.label_show_pass} htmlFor="showpass">Mostar senha</label></span>
    <Link href={"send_email"} style={{color: "blue", textDecoration: "underline"}}>esqueceu a senha ?</Link>
    </span>
    <button className={styles.submit} onClick={handleSubmit}>Entrar</button>
    <br />
    <GoogleLogin onSuccess={responseMessage} />
    <p className={`${styles.center} ${styles.footer}`}>Não possui conta? 
    <Link className={styles.link} href="/register">Registrar-se</Link></p>


    
    </div>
    <img className={styles.banner} src="/banner_login.png" alt="" />
</div>
</div>
  );
}

export default Login;