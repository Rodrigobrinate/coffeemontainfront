import Header from "@/components/header";
import React from "react";

 import styles from './styles.module.css';
import Footer from "@/components/Footer/index";

const Como_funciona: React.FC = () => {
  return (
    <>
    <Header />
    <div className={styles.content}>
      <br /><br />
      <h2>Bem-vindo ao Coffee montain Caparaó de café! </h2>
      <br />
      Aqui, oferecemos umaexperiência única para os amantes de café, onde você pode desfrutar de uma
      seleção cuidadosamente escolhida de cafés especiais entregues diretamente
      na sua porta todos os meses. Nosso processo é simples e conveniente,
      permitindo que você aproveite o melhor café sem se preocupar com frete ou
      outros custos adicionais. 
      <br /><br />
      <h3>Como funciona:</h3> 
      <br />
      <h4>Assinatura mensal: </h4>

      Nós oferecemos
      diferentes opções de assinaturas mensais, cada uma adaptada aos gostos e
      preferências individuais de nossos clientes. Você pode escolher a
      assinatura que melhor se encaixa no seu perfil de café, seja café em grãos
      ou moído, torra clara ou escura, ou até mesmo misturas exclusivas.
      <br /><br />
      <h4>Pagamento: </h4>

      Uma vez que você escolha sua assinatura mensal, o pagamento é
      feito de forma fácil e segura. Você paga um valor fixo mensal, que inclui
      não apenas o café selecionado, mas também todos os custos de frete e
      entrega. Não há surpresas adicionais ou taxas escondidas. Seleção de café:
      Nossa equipe especializada em café trabalha duro para selecionar e torrar
      os melhores grãos de café de origens ao redor do mundo. Cada mês, você
      receberá uma variedade diferente de café, garantindo que você tenha sempre
      uma experiência diversificada e emocionante. Nossos cafés são frescos e de
      alta qualidade, garantindo um sabor excepcional em cada xícara. Entrega no
      <br /><br />
      <h4>seu endereço:</h4>

       Assim que você se tornar um assinante, cuidaremos de todas
      as etapas de envio e entrega. Nossos pacotes são preparados com cuidado e
      enviados diretamente para o seu endereço. Você não precisa se preocupar em
      acompanhar o rastreamento ou pagar por frete separadamente. Nós cuidamos
      de tudo para que você possa relaxar e esperar ansiosamente pela chegada do
      seu café. 
      <br /><br />
      <h4>Flexibilidade e cancelamento:</h4>
       Entendemos que as preferências e
      necessidades podem mudar com o tempo. Portanto, oferecemos flexibilidade
      aos nossos assinantes. Você pode pausar, modificar ou cancelar a
      assinatura a qualquer momento, sem qualquer complicação. Queremos que você
      esteja totalmente satisfeito com nossa oferta e serviço. No nosso site de
      assinaturas de café, simplificamos o processo de receber café excepcional
      na sua casa. Com uma seleção diversificada, frete e custos inclusos, e
      flexibilidade para personalizar sua assinatura, estamos aqui para tornar
      sua jornada de café memorável e conveniente. Junte-se a nós e desfrute de
      uma experiência única de café!
      </div>

<Footer />

    </>
  );
};

export default Como_funciona;
