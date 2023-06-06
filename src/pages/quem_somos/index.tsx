import Header from "@/components/header";
import React from "react";
import styles from './styles.module.css';
import Footer from "@/components/Footer/inex";

const Quem_somos: React.FC = () => {
  return (

    <div>
        <Header />
        <div className={styles.content}>
            <br /><br />
            
            <h1>Quem somos</h1>
            
      Somos uma equipe dedicada de especialistas em café, apaixonados por
      fornecer uma experiência única aos amantes dessa bebida em todo o Brasil.
      Nossa sede está localizada na região do Caparaó, conhecida por sua
      produção de café de altíssima qualidade, e a partir daqui embarcamos em
      uma jornada para levar esses cafés especiais até a sua xícara. 
      <br /><br /> 
     <h2>O que nos  diferencia: </h2>
      <br />
      <h3>Café de altíssima qualidade: </h3>
      Trabalhamos em estreita
      colaboração com produtores locais, selecionando apenas os grãos mais finos
      e saborosos. Nosso compromisso com a qualidade garante que você desfrute
      de uma xícara excepcional, com sabores distintos e aromas envolventes.
      <br /><br />
      <h3>Entrega em todo o Brasil: </h3>
      Não importa onde você esteja no Brasil, nossa
      equipe está pronta para enviar seu café diretamente para o seu endereço.
      Utilizamos serviços de entrega confiáveis ​​e rápidos para garantir que
      seu pacote chegue em perfeitas condições, independentemente da sua
      localização.
      <br /><br />
      <h3>Assinatura mensal com frete incluso:</h3>
      Oferecemos um serviço de
      assinatura mensal para que você possa receber regularmente nossos cafés
      selecionados na comodidade da sua casa. Além disso, nos responsabilizamos
      por todos os custos de frete e entrega, para que você não precise se
      preocupar com taxas adicionais. Tudo o que você precisa fazer é aproveitar
      o café fresco e delicioso. 
      <br /><br />
      <h3>Compromisso com a excelência:</h3>
       Nossa busca pela
      excelência nos leva a explorar diferentes origens e perfis de torra,
      garantindo que cada café enviado seja uma experiência única. Estamos
      sempre em busca de novas descobertas para levar até você o melhor que o
      mundo do café tem a oferecer. Junte-se a nós nessa jornada pelo mundo do
      café de altíssima qualidade. Não importa onde você esteja no Brasil,
      teremos o prazer de levar até você o sabor e a paixão que tornam o café
      uma das bebidas mais amadas do mundo.
    </div>
    <Footer />
    </div>
  );
};

export default Quem_somos;
