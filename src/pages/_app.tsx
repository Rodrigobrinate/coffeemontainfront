import { AppProps } from "next/app";
import "../app/globals.css";
import Head from "next/head";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import AOS from "aos";
import { Analytics } from "@vercel/analytics/react";

import "aos/dist/aos.css";
//import { Analytics } from '@mui/icons-material';

export default function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    AOS.init({
      easing: "ease-out-cubic",
      once: true,
      duration: 1500,
      offset: 320,
    });
  }, []);

  return (
    <>
      <Head>
        <link rel="icon" href="/logo_main.png" />
        <meta
          name="keywords"
          content="
       Clube de Assinatura de Café Especial
       Café Especial de Origem
       Café Gourmet de Qualidade
       Assinatura Mensal de Café Especial
       Grãos de Café Premium
       Torra Artesanal de Café Especial
       Notas de Sabor Exclusivas
       Entrega de Café Especial
       Seleção Exclusiva de Cafés
       Experiência Sensorial do Café Especial
       "
        />
        <meta name="robots" content="index, follow" />

        {/* Meta tags para redes sociais (Open Graph) */}
        <meta property="og:title" content="coffee mountain caparaó" />
        <meta
          property="og:description"
          content="Clube de Assinatura de Café Especial - Descubra uma experiência sensorial única com nosso clube de assinatura de café especial. Delicie-se com grãos cuidadosamente selecionados e torrados artesanalmente, provenientes das melhores origens do mundo. Desfrute de notas de sabor exclusivas e mergulhe na riqueza aromática de cada xícara. Assine mensalmente e receba em sua casa uma seleção premium de cafés gourmet. Experimente a paixão pelo café especial em cada gole."
        />
        <meta property="og:image" content="/logo_main.png" />
        <meta property="og:url" content="rodrigobrinate.online" />
        <meta property="og:type" content="website" />

        {/* Meta tags para redes sociais (Twitter Card) */}
        <meta name="twitter:title" content="coffee mountain caparaó" />
        <meta
          name="twitter:description"
          content="Clube de Assinatura de Café Especial - Descubra uma experiência sensorial única com nosso clube de assinatura de café especial. Delicie-se com grãos cuidadosamente selecionados e torrados artesanalmente, provenientes das melhores origens do mundo. Desfrute de notas de sabor exclusivas e mergulhe na riqueza aromática de cada xícara. Assine mensalmente e receba em sua casa uma seleção premium de cafés gourmet. Experimente a paixão pelo café especial em cada gole."
        />
        <meta name="twitter:image" content="/logo_main.png" />
        <meta
          name="twitter:card"
          content="portifólio Rodrigo Brinate Protazio"
        />
        <meta name="pinterest-rich-pin" content="true" />
        <meta itemProp="name" content="Título da página" />
        <meta itemProp="description" content="Clube de Assinatura de Café Especial - Descubra uma experiência sensorial única com nosso clube de assinatura de café especial. Delicie-se com grãos cuidadosamente selecionados e torrados artesanalmente, provenientes das melhores origens do mundo. Desfrute de notas de sabor exclusivas e mergulhe na riqueza aromática de cada xícara. Assine mensalmente e receba em sua casa uma seleção premium de cafés gourmet. Experimente a paixão pelo café especial em cada gole." />
        <meta itemProp="image" content="/logo_main.png" />
        <title>Coffee Montain Caparaó</title>
      </Head>
      <GoogleOAuthProvider clientId="303518279487-uve5mmrp656v3p2nh3v5l5qbtt66207e.apps.googleusercontent.com">
        <Component {...pageProps} />
        <Analytics />
      </GoogleOAuthProvider>
    </>
  );
}
