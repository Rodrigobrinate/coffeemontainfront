import React, { useEffect, useState } from "react";
import Header from "@/components/header/index";

//import { Container } from './styles';
import styles from "../styles.module.css";
import api from "@/components/api";
import { toast } from "react-toastify";
import { colors } from "@mui/material";
import { features } from "process";
import Footer from "@/components/Footer/index";
import Price from "@/components/Prices/index"
import Faq from "@/components/Faq";

// You can also use <link> for styles
// ..


declare global {
    namespace JSX {
      interface IntrinsicElements {
        'stripe-pricing-table': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      }
    }
  }

const Signature = () => {
  const [signatures, setSignatures] = React.useState([]) as any;
  const [isAnual, setIsAnual] = useState(true);
  const [isGraos, setIsGraos] = useState(false);

  useEffect(() => {
    localStorage.setItem("isAnual", isAnual.toString())
    localStorage.setItem("isGraos", isGraos.toString())

  }, [isAnual, isGraos])

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
          <h2 className={styles.title+ ' text-3xl'}>
            Transformando a rotina em um momento de prazer
          </h2>
          <p className={styles.description+ "text-sm text-gray-400"}>
            levamos o café dos sonhos até a sua porta, tornando cada manhã uma
            experiência de comodidade e sabor.
          </p>
        </div>

        <div className={styles.section_1_first}>
          <div className={`${styles.center_img}`}>
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
              <h4 className="">Gurmet</h4>
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

    <div id="price">
      <Price  signatures={signatures} />

</div>
      <div className={styles.plans}>
      <script async src="https://js.stripe.com/v3/pricing-table.js"></script>
<stripe-pricing-table pricing-table-id="prctbl_1NXkunL32bQksmeRUwZAqoa8"
publishable-key="pk_live_51NKhGmL32bQksmeRpy39cg6vcL9S0kSWe9nxQ5jd1OzQx1A7Fc8bN9uqrNY5PGiz0W268w677dlQeFUx07MuyEY800tAXv27Rm">
</stripe-pricing-table>
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
        <div className={styles.section_text} >
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


<Faq />






      <Footer />
    </div>
  );
};

export default Signature;
