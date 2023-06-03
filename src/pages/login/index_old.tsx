import React, { useEffect, useState } from "react";
//import { Container } from "./styles";
import styles from "./styles.module.css";
import api from "@/components/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import anime from "animejs/lib/anime.es.js";

const Login = (props: {route: string}) => {
  const {route} = props
  const [emailLogin, setEmailLogin] = useState("");
  const [passLogin, setPassLogin] = useState("");
  const [name, setName] = useState("");
  const [emailRegister, setEmailRegister] = useState("");
  const [passRegister, setPassRegister] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordl, setShowPasswordl] = useState(false);
  const [passwordlIsValid, setPasswordlIsValid] = useState({"data":false, "message":"preencha toodos os campos"})
  const [passwordrIsValid, setPasswordrIsValid] = useState({"data":false, "message":"preencha toodos os campos"})
  const [emailIsValid, setemailIsValid] = useState({"data":false, "message":"preencha toodos os campos"})
  
  function login() {
    api
      .post("/auth/login", {
        email: emailLogin,
        password: passLogin,
      })
      .then((response) => {
        console.log(response);
        localStorage.setItem("token", response.data.access_token);
        window.location.href = route;
      })
      .catch((err) => {
        toast.error(
          err.response?.data.message ||
            "ocorreu um erro tente novametne mais tarde "
        );
        console.log(err.response.data);
      });
  }

  function register() {
    let term = document.getElementById("term") as any;

    if (term.checked) {
      api
        .post("/register", {
          name: name,
          email: emailRegister,
          password: passRegister,
        })
        .then((response) => {
          console.log(response);
          toast.success("registro relizado com sucesso!!");
          test()
          setEmailLogin(emailRegister)
        })
        .catch((err) => {
          //console.log(err.response.data)
          toast.error(
            err.response?.data.message ||
              "ocorreu um erro tente novametne mais tarde "
          );
        });
    } else {
      toast.error("vocẽ deve aceitar nossos termos para se cadastrar ");
    }
  }

  function test() {
    let register = document.getElementsByClassName("register") as any;
    let login = document.getElementsByClassName("login") as any;
    //let banner = document.getElementById("banner") as any;

    
    
    if (isLogin == true) {
      setIsLogin(false);

      register[0].style.display = "block";
      login[0].style.display = "none";

      anime({
        targets: ".banner",
        translateX: window.innerWidth * 0.305,
        duration: 3000,
      });
      anime({
        targets: ".register",
        translateX: -window.innerWidth * 0.305,
        duration: 3000,
      });
      anime({
        targets: ".login",
        translateX: -window.innerWidth * 0.305,
        duration: 3000,
      });
    } else {
      setIsLogin(true);
      register[0].style.display = "none";
      login[0].style.display = "block";

      anime({
        targets: ".banner",
        translateX: -0,
        duration: 3000,
      });
      anime({
        targets: ".login",
        translateX: 0,
        duration: 3000,
      });
      anime({
        targets: ".register",
        translateX: 0,
        duration: 3000,
      });
    }
  }

  function testMobile() {
    let register = document.getElementsByClassName("register") as any;
    let login = document.getElementsByClassName("login") as any;
    if (isLogin == true) {
      setIsLogin(false);

      anime({
        targets: ".login",
        rotateY: {
          value: "+=360",
          duration: 1000,
        },
        easing: "easeInOutSine",
        autoplay: true,
      });

      setTimeout(() => {
        register[0].style.display = "block";
        login[0].style.display = "none";
      }, 900);
    } else {
      setIsLogin(true);

      anime({
        targets: ".register",
        rotateY: {
          value: "+=360",
          duration: 1000,
        },
        easing: "easeInOutSine",
        autoplay: true,
      });

      setTimeout(() => {
        register[0].style.display = "none";
        login[0].style.display = "block";
      }, 900);
    }
  }

  useEffect(() => {}, []);

  return (
    <div className={styles.container_main}>
      <ToastContainer />
      <style jsx global>{`
      body {
        margin: 0px;
        padding: 0px;
      }
    `}</style>
      <div className={styles.container}>
        <div className={` ${styles.banner} banner` } id="banner">
          <h1 className={styles.banner_h1} style={{}}> <strong> Experimente</strong> o café das <strong> montanhas</strong> do caparaó</h1>
         <img className={styles.banner_img} width={'100px'} src="coffee-login.png" alt="" />
         
          <p>
            {" "}
            {isLogin == true ? "ainda não possui conta?" : "já possui conta?"}
          </p>
          <button className={styles.banner_button} onClick={test} style={{ background: "#fff", color: "black" }}>
            {" "}
            {isLogin == true ? "Registrar-se" : "Entrar"}
          </button>
        </div>

        <div className={` ${styles.register} register` }>
          <h4 className={styles.title}>Cadastrar-se</h4>

          <input
          className={styles.input}
            type={"text"}
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            placeholder={"Digite seu nome"}
          />

          <input
          className={styles.input}
            type={"text"}
            value={emailRegister}
            onChange={(e) => {
              setEmailRegister(e.target.value);
            }}
            placeholder={"Digite seu email"}
          />

          <input
          className={styles.input}
          id="passwordri"
            type={showPassword ? "text" : "password"}
            
            onChange={(e) => {
              setPassRegister(e.target.value);
             
            }}
            placeholder={"Digite sua senha"}
          />
          <label htmlFor="" id="passwordr"></label>
          <input
          className={styles.input}
          id="confrim-password"
            type={showPassword ? "text" : "password"}
            onChange={(e) => {
             
              
            }}
            placeholder={"Confirme sua senha"}
          />
          <label htmlFor="" id="passwordr2"></label>
          <br />
          <span className={styles.showPassord}>
            <input
             className={styles.showPassord_input}
              type="checkbox"
              onChange={(e) => {
                setShowPassword(!showPassword);
              }}
              name=""
              id="showPassword"
            />
            
            <label htmlFor="showPassword">Mostar senha</label>
          </span>

          <span className={styles.showPassord}>
            <input
            className={styles.showPassord_input}
              type="checkbox"
              onChange={(e) => {
                
              }}
              name=""
              id="term"
            />
            <label htmlFor="term">
              Eu concordo com
              <a className={styles.a} style={{ display: "inline" }} href="/termos">
                {" "}
                este{" "}
              </a>
              termo de Condição
            </label>
          </span>
          <br />
          <button className={styles.button} onClick={register} style={{ border: "none" }}>
            Registrar
          </button>
          <button
            className={styles.mobile}
            onClick={testMobile}
            style={{ border: "none" }}
          >
            já possui cadastro?
          </button>
        </div>

        <div className={` ${styles.login} login` }>
          <h4 className={styles.title}>Entrar</h4>
          <input
          className={styles.input}
            type={"text"}
            value={emailLogin}
            onChange={(e) => {
              setEmailLogin(e.target.value);
            }}
            placeholder={"Digite seu email"}
          />
          <input
          className={styles.input}
            type={showPasswordl ? "text" : "password"}
            id="lpassoword"
            value={passLogin}
            onChange={(e) => {
              setPassLogin(e.target.value);
             let label =  document.getElementById("passwordl") as any
              
            }}
            onKeyDown={(e) => {
              if (e.code == "Enter") {
                login();
              }
            }}
            placeholder={"Digite sua senha"}
          />
          
          <br />

          <span className={styles.showPassord} >
            <input
              type="checkbox"
              className={styles.showPassord_input}
              onChange={(e) => {
                setShowPasswordl(!showPasswordl);
              }}
              name=""
              id="showPassword"
            />
            <label htmlFor="showPassword">Mostar senha</label>
          </span>
          <br />
          <button className={styles.button} onClick={login} style={{ border: "none" }}>
            Login
          </button>
          <a className={styles.a} href="">Esqueceu a senha?</a>
          <button
            className={styles.mobile}
            onClick={testMobile}
            style={{ border: "none" }}
          >
            ainda não possui cadastro?
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
