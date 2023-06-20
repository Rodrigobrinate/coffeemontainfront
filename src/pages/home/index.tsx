import React, { useEffect, useState } from "react";
import Header from "@/components/header/index";

//import { Container } from './styles';
import styles from "./styles.module.css";
import api from "@/components/api";
import { toast } from "react-toastify";
import { colors } from "@mui/material";
import { features } from "process";
import Footer from "@/components/Footer/index";

// You can also use <link> for styles
// ..

const Signature = () => {
  const [signatures, setSignatures] = React.useState([]) as any;
  const [isAnual, setIsAnual] = useState(true);
  const [isGraos, setIsGraos] = useState(false);

  useEffect(() => {
    localStorage.setItem("isAnual", isAnual.toString());
    localStorage.setItem("isGraos", isGraos.toString());
  }, [isAnual, isGraos]);

  useEffect(() => {
    api
      .get("/signature")
      .then((response) => {
        setSignatures(response.data);
      })
      .catch((err) => {
        //toast.error("erro ao carregar assinaturas")
      });
  }, []);

  function checkout(signature: any) {
    api
      .post("/signature/order", {
        lookup_key: signature.priceId,
        signatureId: signature.id,
      })
      .then((response) => {
        console.log(response.data);
        window.location.href = response.data;
      })
      .catch((err) => {
        //toast.error("erro ao carregar assinaturas")
      });
  }

  return (
    <div className={styles.container}>
      <Header />

      <div className={styles.section_1}>
        <div className={styles.section_1_first}>
          <h2 className={styles.title}>
            Transformando a rotina em um momento de prazer
          </h2>
      
          <p className={styles.description}>
            levamos o café dos sonhos até a sua porta, tornando cada manhã uma
            experiência de comodidade e sabor.
          </p>
        </div>

        <div className={styles.section_1_first}>
          <div className={styles.center_img}>
            <img src="background.png" width={"100%"} alt="" />
          </div>
        </div>

        <div className={styles.section_1_first}>
          <div className={styles.plan_info}>
            <img className={styles.plan_image} src="./Standard.png" alt="" />
            <div className={styles.info}>
              <h4>Standard</h4>
              <p className={styles.description}>
                Café de qualidade excepcional a um preço acessível. Desfrute de
                sabores envolventes e aromas marcantes com a conveniência de
                entrega em sua casa
              </p>
            </div>
          </div>
          <div className={styles.plan_info}>
            <img className={styles.plan_image} src="Gurmet.png" alt="" />
            <div className={styles.info}>
              <h4>Gurmet</h4>
              <p className={styles.description}>
                Uma combinação perfeita de qualidade e sabor. Grãos premium
                selecionados para uma experiência sofisticada e encorpada,
                entregue diretamente em sua porta.
              </p>
            </div>
          </div>
          <div className={styles.plan_info}>
            <img className={styles.plan_image} src="Premium.png" alt="" />
            <div className={styles.info}>
              <h4>Premium</h4>
              <p className={styles.description}>
                A escolha dos verdadeiros amantes de café. Grãos exclusivos,
                torra artesanal e o dobro da quantidade para garantir que você
                nunca fique sem. Uma experiência supremamente satisfatória,
                entregue com primor na sua residência.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div></div>

      <h1 className={styles.frase}>Conheça nossos planos</h1>

      <div className={styles.plans}>
        {signatures?.map((signature: any, i: number) => {
          return (
            <>
              <div key={signature.id} className={styles.plan} style={{}}>
                {" "}
                {i == 1 ? <div className={styles.best}>Mais escolido</div> : ""}
                <img
                  className={styles.img_plan}
                  src={signature.title + ".png"}
                  alt=""
                />
                <h1 className={styles.h1}>{signature.title}</h1>
                <ul className={styles.features}>
                  {signature?.fatures.map((fature: any) => {
                    return (
                      <li className={styles.feature} key={fature.id}>
                        {fature.name}
                      </li>
                    );
                  })}
                </ul>
                <div className={styles.switch}>
                  <input
                    type="checkbox"
                    hidden
                    name=""
                    id="anual"
                    onChange={() => {
                      setIsAnual(!isAnual);
                    }}
                  />
                  <div
                    className={styles.option}
                    
                    style={{
                      background: isAnual ? "#93522E" : "#fff",
                      color: !isAnual ? "#93522E" : "#fff",
                    }}
                  >
                    <label className={styles.switch_label}  htmlFor="anual">Anual</label>
                  </div>
                  <div
                    className={styles.option}
                    style={{
                      background: !isAnual ? "#93522E" : "#fff",
                      color: isAnual ? "#93522E" : "#fff",
                    }}
                  >
                    <label className={styles.switch_label} htmlFor="anual">Mensal</label>
                  </div>
                </div>
                <div className={styles.switch}>
                  <input
                    type="checkbox"
                    hidden
                    name=""
                    id="moido"
                    onChange={() => {
                      setIsGraos(!isGraos);
                    }}
                  />
                  <div
                    className={styles.option}
                    
                    style={{
                      background: isGraos ? "#93522E" : "#fff",
                      color: !isGraos ? "#93522E" : "#fff",
                    }}
                  >
                    <label className={styles.switch_label} htmlFor="moido">Grãos</label>
                  </div>
                  <div
                    className={styles.option}
                    style={{
                      background: !isGraos ? "#93522E" : "#fff",
                      color: isGraos ? "#93522E" : "#fff",
                    }}
                  >
                    <label className={styles.switch_label} htmlFor="moido">Moido</label>
                  </div>
                </div>
                <h1 className={styles.price_discount}>
                  R$ {signature.price.toFixed(2).replace(".", ",")}
                </h1>
                <button
                  className={styles.button}
                  onClick={() => {
                    window.location.href = "/checkout/" + signature.id;
                  }}
                >
                  Assinar
                </button>
              </div>
            </>
          );
        })}
      </div>

      <section className={styles.section} data-aos="fade-left">
        <img className={styles.section_image} src="xicara.png" alt="" />
        <div className={styles.section_text}>
          <h2 className={styles.section_title}>Café especial</h2>
          <p className={styles.section_description}>
            Desperte seus sentidos com nosso café especial de alta qualidade.
            Cada xícara é uma experiência única, com grãos selecionados e
            torrefação cuidadosa. Explore sabores sofisticados e aromas
            cativantes. Descubra um mundo de sensações inigualáveis.
          </p>
        </div>
      </section>

      <section className={styles.section} data-aos="fade-up">
        <div className={styles.section_text}>
          <h2 className={styles.section_title}>Sinta a energia</h2>

          <p className={styles.section_description}>
            Tomar uma xícara de café é uma experiência que envolve todos os
            sentidos. O aroma perfumado desperta instantaneamente nossas
            sensações, enquanto a primeira golada nos presenteia com uma
            explosão de sabores e texturas. É um momento de pausa e prazer, onde
            nos permitimos saborear cada gole e nos reconectar com o momento
            presente. O café nos revigora, nos energiza e nos prepara para
            enfrentar o dia com mais disposição. É um momento de conforto e
            deleite, uma pausa revigorante que nos convida a apreciar os
            pequenos prazeres da vida.
          </p>
        </div>
        <img className={styles.section_image} src="image_3.png" alt="" />
      </section>

      <section className={styles.section} data-aos="fade-left">
        <img className={styles.section_image} src="entrega.png" alt="" />
        <div className={styles.section_text}>
          <h2 className={styles.section_title}>Receba em sua casa</h2>
          <p className={styles.section_description}>
            Desfrute da comodidade de receber o melhor café em sua casa, sem
            precisar sair. Com o frete grátis em todo o Brasil, entregamos o
            café especial diretamente em suas mãos. Basta fazer seu pedido em
            nosso site e aguardar ansiosamente pelo aroma e sabor que vão
            encantar seu paladar. Nossa equipe se dedica a garantir uma entrega
            rápida e segura, para que você desfrute de momentos deliciosos sem
            preocupações. Aproveite a praticidade e o conforto de receber o café
            de alta qualidade que você merece, no conforto do seu lar. Faça
            parte dessa experiência e permita-se desfrutar do melhor café, sem
            sair de casa.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Signature;
