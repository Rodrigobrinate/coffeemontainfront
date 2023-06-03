import React, { useState } from 'react';
import styles from './styles.module.css'
import Link from 'next/link';
import { GoogleLogin,  } from '@react-oauth/google';
import api from '@/components/api';
import {toast, ToastContainer } from 'react-toastify';

const Register = () => {




const [provider, setProvider] = useState('');
const [profile, setProfile] = useState<any>();
const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [password_confirmation, setPassword_confirmation] = useState('');
const [showPassword, setShowPassword] = useState(false);


const handleSubmit = (e: any) => {
  if (name == '' || email == '' || password == '' || password_confirmation == '') {
    toast.error('Preencha todos os campos!');
    return;
  }
  if (password != password_confirmation) {
    toast.error('As senhas não coincidem!');
    return;
  }
  if (password.length < 6) {
    toast.error('A senha deve ter no mínimo 6 caracteres!');
    return;
  }

  e.preventDefault();
  api.post(`/register`, {
    name: name,
    email: email,
    password: password,
}).then((res) => {
  console.log(res.data);
  localStorage.setItem('token', res.data.token.access_token);
  toast.success('Cadastro realizado com sucesso!');
  window.location.href = '/home';
}).catch((err) => {
  console.log(err);
  toast.error(err.response.data.message);
})
}


const responseMessage = (response: any) => {
    console.log(response);
    localStorage.setItem('token', response.credential);
   // 

   api.post(`/login_google`, {
                        token: response.credential
                    }).then((res) => {
                      console.log(res.data.token.access_token);
                      localStorage.setItem('token', res.data.token.access_token);
                      window.location.href = '/profile';
                  })

};
const errorMessage = (error: any) => {
    console.log(error);
};
  
  return (
    
<div className={styles.container}>
  <ToastContainer />
    <img src="/logo_main.png" alt="logo coffee montain" width={60}/>

<div className={styles.content}>
  <div style={{width: "100%", display: "flex", flexDirection: "column",  textAlign: "center"}}>
    <div className={styles.form} >
    <h1 className={styles.center}>Registrar-se</h1>
    <label className={styles.label} htmlFor="">Nome</label>
    <input className={styles.input} onChange={(e) => {setName(e.target.value)}}  type="text" />
    <label className={styles.label} htmlFor="">Email</label>

    <input className={styles.input} onChange={(e) => {setEmail(e.target.value)}} type="text" />
    <label className={styles.label}  htmlFor="">Senha</label>
    <input className={styles.input} onChange={(e) => {setPassword(e.target.value)}}  type={showPassword ? "text" :  "password"} />
    <label className={styles.label} htmlFor="">confirma sua senha</label>
    <input className={styles.input} onChange={(e) => {setPassword_confirmation(e.target.value)}}  type={showPassword ? "text" :  "password"} />
    <span>
    <input className={styles.input_show_pass} type="checkbox" onChange={()=> {setShowPassword(!showPassword)}} name="" id="showpass" />
    <label className={styles.label_show_pass} htmlFor="showpass">Mostar senha</label>
    </span>
    <button className={styles.submit} onClick={handleSubmit}>Registrar-se</button>
    </div>
    <br />
    <div style={{width: "60%"}}>
    <GoogleLogin onSuccess={responseMessage}   />
    <p className={`${styles.center} ${styles.footer}`}>Não possui conta? 
    <Link className={styles.link} href="/login">Entrar</Link></p></div>
</div>

    
    
    <img className={styles.banner} src="/banner_login.png" alt="" />
</div>

</div>
  );
}

export default Register;