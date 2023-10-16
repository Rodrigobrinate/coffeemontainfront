import Header from "@/components/header";
import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { Star, StarOutline, TurnLeft } from "@mui/icons-material";
import { Truculenta } from "@next/font/google";
import Price from "@/components/Price";
import api from "@/components/api";
import Prices from "@/components/Prices";
import Footer from "@/components/Footer";
import Faq from "@/components/Faq";

// import { Container } from './styles';

const New = () => {
  const [signatures, setSignatures] = useState([]) as any;
  useEffect(() => {
    api
      .get("/signature")
      .then((response) => {
        setSignatures(response.data);
        console.log(response.data);
      })
      .catch((err) => {
        //toast.error("erro ao carregar assinaturas")
      });
  }, []);


  const av = [
    {
      name: "Rodrigo B. Protazio", 
      img: "people.png", 
      description: "Lorem Ipsum is simply dummy text of the printing and typesettin industry. Lorem Ipsum has been the industry's standard dummy textever since the 1500s, when an unknown printer took a galley oftype and scrambled it to make a type specimen book."
    },
    {
      name: "Rodrigo B. Protazio", 
      img: "people.png", 
      description: "Lorem Ipsum is simply dummy text of the printing and typesettin industry. Lorem Ipsum has been the industry's standard dummy textever since the 1500s, when an unknown printer took a galley oftype and scrambled it to make a type specimen book."
    },
    {
      name: "Rodrigo B. Protazio", 
      img: "people.png", 
      description: "Lorem Ipsum is simply dummy text of the printing and typesettin industry. Lorem Ipsum has been the industry's standard dummy textever since the 1500s, when an unknown printer took a galley oftype and scrambled it to make a type specimen book."
    }
  ]


  return (
    <div>

      
      <Header />

      <Carousel
        showThumbs={false}
        showArrows={false}
        verticalSwipe="natural"
        showStatus={false}
        infiniteLoop={true}
        animationHandler={"slide"}
        useKeyboardArrows={true}
        transitionTime={1000}
        interval={3000}
        autoPlay={true}
        swipeable={true}
        className="w-4/5 mx-auto"
      >
        <div>
          <img src="./banner2.png" />
        </div>
        <div>
          <img src="./banner3.png" />
        </div>
        <div>
          <img src="./banner2.png" />
        </div>
      </Carousel>

      <div className="w-2/5 mx-auto mt-8 text-red-950">
        <h1 className="text-center text-3xl font-bold">Como funciona?</h1>
        <p className="mt-2 text-xl text-justify">
          você escolhe seu plano, e nossa equipe de especialista irão selecionar
          os melhores cafés para lhe atender, dessa forma você receberá seu
          pacote de café especial todo mes em seu endereço, sem preucpação
        </p>
      </div>

      <div className="mt-20 text-red-950">
        <h1 className="text-center text-3xl font-bold">Nossos planos</h1>
        <Prices signatures={signatures} />
      </div>

      <div>
        <h1 className="text-center mb-2 text-2xl">Avaliações</h1>

        <ul className="w-4/5 mx-auto block md:flex justify-between">

          {av.map((item) => {
            return (
              <li className="px-2 py-2 mt-4  md:w-1/3  border ml-2 rounded-md">
            <span className="flex items-center px-4">
              <img
                className="w-16 h-16 rounded-full inline"
                src={item.img}
                alt=""
              />
              <h2 className="ml-2 font-bold">{item.name}</h2>{" "}
            </span>
            <Star color="warning" />
            <Star color="warning" />
            <Star color="warning" />
            <Star color="warning" />
            <Star color="warning" />
              &nbsp; 5.0
            <p className="text-gray-600">
              {item.description}
            </p>
          </li>
            )
})}
          
        </ul>
      </div>


      <Faq />

      <Footer />
    </div>
  );
};

export default New;
