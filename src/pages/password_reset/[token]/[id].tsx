import Header from '@/components/header';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import {toast, ToastContainer} from "react-toastify"

 import style from './style.module.css';
import api from '@/components/api';

const Token: React.FC = () => {

    const router = useRouter();
    var { token, id } = router.query;
    const [password, setPassword] = useState("")
    const [passwordConfirmation, setPassowordConfirmation] = useState('')
    
    useEffect(() => {
        console.log(token, id)

        if (token && id){

      
      api.post("/verify_token",{token,id}).then((response) => {

      }).catch((err) => {
        toast.error(err.response.data.message)
        setTimeout(() => {
          window.location.href = "/send_email"
        }, 3000);
      })
  }


    },[token, id])

    function changePassword(){
      console.log(password, passwordConfirmation)
      if (!(password == passwordConfirmation)){
         return toast.error("as senhas não coencidem")
      }
      else if (password == '' || passwordConfirmation == ''){

        return toast.error("preencha todos os campos")
      }
      else {

    
  
      api.post("/change_password", {token,id, password}).then((response) => {
        toast.success(response.data)
        setTimeout(() => {
          window.location.href = "/login"
        }, 3000);
      }).catch((err) => {
        toast.error(err.response.data.message)
      })
    }
   }



  return (
  <div>
    <ToastContainer />

    <Header />
<br /><br /><br /><br />
    <div className={style.content}>
    <label className={style.label}  htmlFor="">Nova senha</label>
    <input className={style.input} onChange={(e)=>{setPassword(e.target.value)}} type="text" />
    <label className={style.label}  htmlFor="">confirmação da senha</label>
    <input className={style.input} onChange={(e)=>{setPassowordConfirmation(e.target.value)}} type="text" />
    <button className={style.button} onClick={changePassword}>Alterar</button>
</div>

  </div>
    );
}

export default Token;