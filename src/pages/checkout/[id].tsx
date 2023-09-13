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
  const [state, setState] = useState("");
  const [number, setNumber] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [phoneValid, setphoneValid] = useState(false);
  const [cpfValid, setcpfValid] = useState(false);
  const [frete, setFrete] = useState([]) as any;
  const [freteValue, setFreteValue] = useState([]) as any

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
      <button onClick={getCheckout}> teste</button>
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
          Frete: {frete.length > 0 ? 
          frete?.map((item:any) => {
            if (item.error){

            }else{
              return (
              <div key={item.di} className="border border-gray-200 p-2 rounded-md mt-2">
            <input type="radio" name="frete" onChange={() => {
              setFreteValue(item)
            }} className="mr-2" id={item.id} />
            <label htmlFor={item.id}>
              {item.name}: R$ {item?.price?.replace(".", ",")}
              <br /> Prazo: até {item?.delivery_range?.max} dias úteis
              <br />
            </label>
          </div>
            )
            }
            
          })
          : "preencha o cep"}
          

         <p className="mt-2">Total: {(signature.price*1 + (freteValue?.price*1 | 0)).toFixed(2).replace(".", ",")}</p>
        </div>
        <div
          className={
            "bg-white block  pl-4 flex-wrap w-5/5 md:w-3/5 rounded-md  md:flex"
          }
        >
          <span className="flex flex-col mt-4 w-5/5 md:w2/4">
            <label className={"ml-2 text-gray-500 font-bold"} htmlFor="">
              Nome
            </label>

            <input
              className={"w-4/5 rounded-md border-gray-300"}
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
            />
          </span>
          <span className="flex flex-col mt-4 w-5/5 md:w-2/4">
            <label className={"ml-2 text-gray-500 font-bold"} htmlFor="">
              Email
            </label>
            <input
              className={"w-4/5 rounded-md border-gray-300"}
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="text"
            />
          </span>

          <span className="flex flex-col w-4/5 md:w-1/5">
            <label className={"ml-2 mt-2 text-gray-500 font-bold"} htmlFor="">
              CPF
            </label>
            <input
              className={"rounded-md border-gray-300 "}
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
              className={"rounded-md border-gray-300"}
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
              className={"rounded-md border-gray-300 w-5/5"}
              onChange={(e) => setStreet(e.target.value)}
              value={street}
              type="text"
            />
          </span>

          <span className="flex flex-col w-4/5 md:w-1/5 md:ml-2">
            <label className={"ml-2 mt-2 text-gray-500 font-bold"} htmlFor="">
              Número
            </label>
            <input
              className={" rounded-md border-gray-300 w-5/5"}
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
              className={"rounded-md border-gray-300"}
              onChange={(e) => setCity(e.target.value)}
              value={city}
              type="text"
            />
          </span>

          <span className="flex flex-col w-4/5 md:w-2/5 ">
            <label className={"ml-2 mt-2 text-gray-500 font-bold"} htmlFor="">
              Bairro
            </label>
            <input
              className={" rounded-md border-gray-300"}
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
              className={" rounded-md border-gray-300"}
              onChange={(e) => setCep(e.target.value.replace("-", "").trim())}
              value={cep}
              type="text"
            />
          </span>

          <ul className={styles.validation}>
            <li
              className={styles.validation_item}
              style={{ color: cpfValid ? "green" : "red" }}
            >
              {cpfValid ? "" : "cpf inválido"}
            </li>
            <li
              className={styles.validation_item}
              style={{color: cep.length > 7 && freteValue > 0 ? "green" : "red" }}
            >
              {cep.length > 7 && freteValue > 0 ? "" : "digite o cep e selecione seu frete"}
            </li>
            <li
              className={styles.validation_item}
              style={{ color: phoneValid ? "green" : "red" }}
            >
              
              {phoneValid ? "" : "Telefone inválido"}
            </li>
            <li
              className={styles.validation_item}
              style={{
                color:
                  street?.length > 0 &&
                  city?.length > 0 &&
                  number?.length > 0 &&
                  neighborhood?.length > 0
                    ? "green"
                    : "red",
              }}
            >
              {street?.length > 0 &&
              city?.length > 0 &&
              number?.length > 0 &&
              neighborhood?.length > 0
                ? ""
                : "preencha todos os campos"}
            </li>
          </ul>

          <button
            className={
              "align-middle items-center flex justify-center text-center h-12 bg-amber-950 w-2/5 rounded-md font-bold text-white  mt-8 ml-2"
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
                freteValue > 0
                  ? 1
                  : 0.2,
            }}
            onClick={() => {cpfValid && phoneValid && street?.length > 0 && city?.length > 0 && number?.length > 0 && neighborhood?.length > 0 && cep.length > 7 && freteValue > 0 ? checkout() : ""}}
            disabled={ cpfValid && phoneValid && street?.length > 0 && city?.length > 0 && number?.length > 0 && neighborhood?.length > 0 && cep.length > 7 && freteValue > 0 ? false : true}
          >
            Finalizar pedido
          </button>
          <button
            className={
              "align-middle items-center flex justify-center text-center h-12 bg-white-950 w-2/5 rounded-md font-bold text-amber-950"
            }
          >
            Cancelar
          </button>
        </div>{" "}
      </div>
      <br />
      <br />
      <Footer />
    </div>
  );
};

export default Checkout;
