import { AppProps } from 'next/app';
import '../app/globals.css';
import Head from 'next/head';
import { GoogleOAuthProvider } from '@react-oauth/google';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import AOS from "aos";

import "aos/dist/aos.css";

export default function MyApp({ Component, pageProps }: AppProps) {

  useEffect(() => {
    AOS.init({
      easing: "ease-out-cubic",
      once: true,
      duration: 1500,
      offset: 320,
    });

  },[])


  return (
  <>
  <Head>
  <link rel="icon" href="/logo.png" />
  </Head>
  <GoogleOAuthProvider clientId="303518279487-uve5mmrp656v3p2nh3v5l5qbtt66207e.apps.googleusercontent.com">
  <Component {...pageProps} />
 
  </GoogleOAuthProvider></>)
}
