import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import Header from "@/components/header";
import { useRouter } from "next/router";
import api from "@/components/api";
import { MenuSharp, SettingsSharp } from "@mui/icons-material";
import { cpf } from "cpf-cnpj-validator";
import validator from "validator";
import Footer from "@/components/Footer/index";

const Checkout = () => {
  const [signature, setSignature] = useState([]) as any;
  const [isAnual, setIsAnual] = useState(false) as any;
  const [isGraos, setIsGraos] = useState(false) as any;
  const [user, setUser] = useState([]) as any;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cpfText, setCpfText] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [country, setContry] = useState("");
  const [cep, setCep] = useState("");
  //const [state, setState] = useState("");
  const [number, setNumber] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [phoneValid, setphoneValid] = useState(false);
  const [cpfValid, setcpfValid] = useState(false);
  const [frete, setFrete] = useState([]) as any;
  const [freteValue, setFreteValue] = useState([]) as any;
  const [state, setState] = useState("");

  const router = useRouter();
  var { id } = router.query;

  useEffect(() => {
    if (id) {
      api.get("/signature/" + id).then((response) => {
        setSignature(response.data);
      });
    }

    api
      .get("user")
      .then((response) => {
        setUser(response.data);
        setName(response.data.name);
        setEmail(response.data.email);

        if (cpf.isValid(response.data.cpf)) {
          setCpfText(response.data.cpf);
          setcpfValid(true);
        }

        if (validator.isMobilePhone(response.data.phone, "pt-BR")) {
          setPhone(response.data.phone);
          setphoneValid(true);
        }

        setStreet(response.data?.addresses?.[0]?.street);
        setNumber(response.data?.addresses?.[0]?.number);
        setCity(response.data?.addresses?.[0]?.city);
        setNeighborhood(response.data?.addresses?.[0]?.neighborhood);
        setCep(response.data?.addresses?.[0].zipCode);
        setState(response.data?.addresses?.[0].state);
      })
      .catch((err: any) => {
        console.log(err.response);
        if (err?.response?.status == 401) {
          window.location.href = "/login";
        }
      });
  }, [id]);

  useEffect(() => {
    if (typeof window) {
      setIsAnual(localStorage.getItem("isAnual"));
      setIsGraos(localStorage.getItem("isGraos"));
    }
  }, []);

  function checkout() {
    api
      .post("/signature/checkout", {
        name: name,
        email: email,
        cpf: cpfText,
        phone: phone,
        street,
        city,
        neighborhood,
        number,
        isAnual,
        cep,
        freteValue,
        isGraos,
        signature,
        state,
      })
      .then((response) => {
        console.log(response);
        window.location.href = response.data;
      });
  }

  useEffect(() => {
    if (cep.length == 8) {
      api
        .post("/signature/frete", { cep, value: signature.price?.toFixed(2) })
        .then((response) => {
          console.log(response?.data);
          setFrete(response?.data);
        });
    }
  }, [cep]);

  function getCheckout() {
    api.post("/signature/chck").then((response) => {
      console.log(response);
    });
  }

  return (
    <div className={styles.container_page}>
      <Header />

      <div
        className={
          "w-5/5 flex flex-col m-auto justify-between mx-10 mt-4 md:flex-row"
        }
      >
        <div className={styles.ordem}>
          <div className={styles.ordem_title}>
            <h4>Sua ordem</h4>
            <br />
            <hr />
          </div>
          <div className={styles.ordem_data}>
            <div>
              <p>Assinatura: {signature.title}</p>
              <p>Valor: R$ {signature.price?.toFixed(2).replace(".", ",")}</p>
            </div>
            <div>
              <p>Tipo {isGraos == "false" ? "Moido" : "Grãos"}</p>
              <p>Período: {isAnual == "false" ? "Mensal" : "Anual"} </p>
            </div>
          </div>
          Frete:{" "}
          {frete.length > 0
            ? frete?.map((item: any) => {
                if (item.error) {
                } else {
                  return (
                    <div
                      key={item.di}
                      className="border border-gray-200 p-2 rounded-md mt-2"
                    >
                      <input
                        type="radio"
                        name="frete"
                        onChange={() => {
                          setFreteValue(item);
                        }}
                        className="mr-2"
                        id={item.id}
                      />
                      <label htmlFor={item.id}>
                        {item.name}: R${" "}
                        {item?.price < 1
                          ? "Frete Gratis"
                          : item?.price?.replace(".", ",")}
                        <br /> Prazo: até {item?.delivery_range?.max} dias úteis
                        <br />
                      </label>
                    </div>
                  );
                }
              })
            : "preencha o cep"}
          <p className="mt-2">
            Total:{" "}
            {isAnual == "true"
              ? ((signature.price * 1 + ((freteValue?.price * 1) | 0)) * 12)
                  .toFixed(2)
                  .replace(".", ",")
              : (signature.price * 1 + ((freteValue?.price * 1) | 0))
                  .toFixed(2)
                  .replace(".", ",")}
          </p>
        </div>
        <div
          className={
            "bg-white block  pl-4 flex-wrap w-5/5 md:w-3/5 rounded-md  md:flex"
          }
        >
          <div className="block md:flex   w-full justify-between px-4 ">
            <span className="flex flex-col mt-4 w-5/5 md:w2/4 ">
              <label className={"ml-2 text-gray-500 font-bold"} htmlFor="">
                Nome
              </label>

              <input
                className={
                  "w-4/5 rounded-none border-gray-300 border-0 outline-none border-b-2 focus-visible:border-0 "
                }
                style={{ outline: "none " }}
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
              />
            </span>
            <span className="flex flex-col mt-4 w-5/5 md:w-2/4 ">
              <label className={"ml-2 text-gray-500 font-bold"} htmlFor="">
                Email
              </label>
              <input
                className={
                  "w-4/5 rounded-none border-gray-300 border-0 outline-none border-b-2 focus-visible:border-0"
                }
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="text"
              />
            </span>
          </div>

          <div className="block md:flex   w-full justify-between px-4 pt-2">
            <span className="flex flex-col w-4/5 md:w-1/5">
              <label className={"ml-2 mt-2 text-gray-500 font-bold"} htmlFor="">
                CPF
              </label>
              <input
                className={
                  `rounded-none ${cpfValid ?"border-gray-300 focus-visible:border-0" : "border-red-600 focus-visible:border-red-600"} border-0 outline-none border-b-2  `
                }
                onChange={(e) => {
                  setCpfText(e.target.value);
                  cpf.isValid(e.target.value)
                    ? setcpfValid(true)
                    : setcpfValid(false);
                }}
                value={cpfText}
                type="text"
              />
            </span>
            <span className="flex flex-col w-4/5 md:w-1/5 md:ml-4">
              <label className={"ml-2 mt-2 text-gray-500 font-bold"} htmlFor="">
                Telefone
              </label>
              <input
                className={
                  `rounded-none ${phoneValid ?"border-gray-300 focus-visible:border-0" : "border-red-600 focus-visible:border-red-600"} border-0 outline-none border-b-2 `
                }
                onChange={(e) => {
                  setPhone(e.target.value);
                  validator.isMobilePhone(e.target.value, "pt-BR")
                    ? setphoneValid(true)
                    : setphoneValid(false);
                }}
                value={phone}
                type="text"
              />
            </span>

            <span className="flex flex-col w-4/5 md:w-2/4 md:ml-4 ">
              <label className={"ml-2 mt-2 text-gray-500 font-bold"} htmlFor="">
                Endereço
              </label>
              <input
                className={
                  "rounded-none border-gray-300 w-4/5 border-0 outline-none border-b-2 focus-visible:border-0"
                }
                onChange={(e) => setStreet(e.target.value)}
                value={street}
                type="text"
              />
            </span>
          </div>

          <div className="block md:flex   w-full justify-between px-4">
            <span className="flex flex-col w-4/5 md:w-1/5 md:ml-2">
              <label className={"ml-2 mt-2 text-gray-500 font-bold"} htmlFor="">
                Número
              </label>
              <input
                className={
                  " rounded-none border-gray-300 w-5/5 border-0 outline-none border-b-2 focus-visible:border-0"
                }
                onChange={(e) => setNumber(e.target.value)}
                value={number}
                type="text"
              />
            </span>

            <span className="flex flex-col w-4/5 md:w-2/5 md:ml-4">
              <label className={"ml-2 mt-2 text-gray-500 font-bold"} htmlFor="">
                Cidade
              </label>
              <input
                className={
                  "rounded-none border-gray-300 border-0 outline-none border-b-2 focus-visible:border-0"
                }
                onChange={(e) => setCity(e.target.value)}
                value={city}
                type="text"
              />
            </span>

            <span className="flex flex-col w-4/5 md:w-2/5 md:ml-4">
              <label className={"ml-2 mt-2 text-gray-500 font-bold"} htmlFor="">
                Estado
              </label>
              <input
                className={
                  "rounded-none border-gray-300 border-0 outline-none border-b-2 focus-visible:border-0"
                }
                onChange={(e) => setState(e.target.value)}
                value={state}
                type="text"
              />
            </span>
          </div>

          <div className="block md:flex   w-full justify-between px-4 pt-2">
            <span className="flex flex-col w-4/5 md:w-2/5 ">
              <label className={"ml-2 mt-2 text-gray-500 font-bold"} htmlFor="">
                Bairro
              </label>
              <input
                className={
                  " rounded-none border-gray-300 border-0 outline-none border-b-2 focus-visible:border-0"
                }
                onChange={(e) => setNeighborhood(e.target.value)}
                value={neighborhood}
                type="text"
              />
            </span>
            <span className="flex flex-col w-4/5 md:w-2/5 ml-2 ">
              <label className={"ml-2 mt-2 text-gray-500 font-bold"} htmlFor="">
                CEP
              </label>
              <input
                className={
                  " rounded-none border-gray-300 border-0 outline-none border-b-2 focus-visible:border-0"
                }
                onChange={(e) => setCep(e.target.value.replace("-", "").trim())}
                value={cep}
                type="text"
              />
            </span>
          </div>
<div className="w-full">
          <ul className={`${styles.validation} ${cpfValid &&
              phoneValid &&
              street?.length > 0 &&
              city?.length > 0 &&
              number?.length > 0 &&
              neighborhood?.length > 0 &&
              cep.length > 7 &&
              state?.length > 0 &&
              freteValue.price > 0 ? "hidden" : ""} `}>
            <li
              className={styles.validation_item}
              style={{ color: cpfValid ? "green" : "red" }}
            >
               <div className="flex w-full">
              
              {cpfValid ? "" : 
              <>
              <svg viewBox="0 0 24 24" className="w-6" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 17V11" stroke="#ff0000" stroke-width="1.5" stroke-linecap="round"></path> <circle cx="1" cy="1" r="1" transform="matrix(1 0 0 -1 11 9)" fill="#ff0000"></circle> <path d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7" stroke="#ff0000" stroke-width="1.5" stroke-linecap="round"></path> </g></svg>
              &nbsp;cpf inválido </>}
              </div>
            </li>
            <li
              className={styles.validation_item}
              style={{
                color: cep.length > 7 && freteValue > 0 ? "green" : "red",
              }}
            >
               <div className="flex w-full">
             
              {cep.length > 7 && freteValue?.price > 0
                ? ""
                : <>
                <svg viewBox="0 0 24 24" className="w-6" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 17V11" stroke="#ff0000" stroke-width="1.5" stroke-linecap="round"></path> <circle cx="1" cy="1" r="1" transform="matrix(1 0 0 -1 11 9)" fill="#ff0000"></circle> <path d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7" stroke="#ff0000" stroke-width="1.5" stroke-linecap="round"></path> </g></svg>
                &nbsp;digite o cep e selecione seu frete</>}
                </div>
            </li>
            <li
              className={styles.validation_item}
              style={{ color: phoneValid ? "green" : "red" }}
            ><div className="flex w-full">
            
           
              {phoneValid ? "" : <>
              <svg viewBox="0 0 24 24" className="w-6" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 17V11" stroke="#ff0000" stroke-width="1.5" stroke-linecap="round"></path> <circle cx="1" cy="1" r="1" transform="matrix(1 0 0 -1 11 9)" fill="#ff0000"></circle> <path d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7" stroke="#ff0000" stroke-width="1.5" stroke-linecap="round"></path> </g></svg>
              &nbsp;{'Telefone inválido'}</>}
              </div>
            </li>
            <li
              className={styles.validation_item}
              style={{
                color:
                  street?.length > 0 &&
                  city?.length > 0 &&
                  number?.length > 0 &&
                  state?.length > 0 &&
                  neighborhood?.length > 0
                    ? "green"
                    : "red",
              }}
            >
              <div className="flex w-full">
              
             {street?.length > 0 &&
              city?.length > 0 &&
              number?.length > 0 &&
              state?.length > 0 &&
              neighborhood?.length > 0
                ? ""
                : <><svg viewBox="0 0 24 24" className="w-6" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 17V11" stroke="#ff0000" stroke-width="1.5" stroke-linecap="round"></path> <circle cx="1" cy="1" r="1" transform="matrix(1 0 0 -1 11 9)" fill="#ff0000"></circle> <path d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7" stroke="#ff0000" stroke-width="1.5" stroke-linecap="round"></path> </g></svg>
                &nbsp;{"preencha todos os campos"}</>} </div>
            </li>
          </ul>
<div className="flex w-4/5  items-center my-2 justify-between">
          <button
            className={
              "align-middle items-center flex justify-center text-center h-12 bg-amber-950 w-2/5 rounded-md font-bold text-white   ml-2"
            }
            style={{
              opacity:
                cpfValid &&
                phoneValid &&
                street?.length > 0 &&
                city?.length > 0 &&
                number?.length > 0 &&
                neighborhood?.length > 0 &&
                cep.length > 7 &&
                freteValue.price > 0
                  ? 1
                  : 0.2,
            }}
            onClick={() => {
              cpfValid &&
              phoneValid &&
              street?.length > 0 &&
              city?.length > 0 &&
              number?.length > 0 &&
              neighborhood?.length > 0 &&
              cep.length > 7 &&
              freteValue.price > 0
                ? checkout()
                : "";
            }}
            disabled={
              cpfValid &&
              phoneValid &&
              street?.length > 0 &&
              city?.length > 0 &&
              number?.length > 0 &&
              neighborhood?.length > 0 &&
              cep.length > 7 &&
              state?.length > 0 &&
              freteValue.price > 0
                ? false
                : true
            }
          >
            Finalizar pedido
          </button>
          <button
            className={
              "align-middle items-center border flex justify-center text-center h-12 bg-white-950 w-2/5 rounded-md font-bold text-amber-950"
            }
          >
            Cancelar
          </button></div></div>
        </div>{" "}
      </div>
      <br />
      <br />
      <Footer />
    </div>
  );
};

export default Checkout;
