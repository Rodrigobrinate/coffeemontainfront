import { useRef, useState } from "react";

const FaqsCard = (props: any) => {
  const answerElRef = useRef() as any;
  const [state, setState] = useState(false);
  const [answerH, setAnswerH] = useState("0px");
  const { faqsList, idx } = props;

  const handleOpenAnswer = () => {
    const answerElH = answerElRef.current.childNodes[0].offsetHeight;
    setState(!state);
    setAnswerH(`${answerElH + 20}px`);
  };

  return (
    <div
      className="space-y-3 mt-5 overflow-hidden border-b"
      key={idx}
      onClick={handleOpenAnswer}
    >
      <h4 className="cursor-pointer pb-5 flex items-center justify-between text-lg text-gray-700 font-medium">
        {faqsList.q}
        {state ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-500 ml-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M20 12H4"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-500 ml-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
        )}
      </h4>
      <div
        ref={answerElRef}
        className="duration-300"
        style={state ? { height: answerH } : { height: "0px" }}
      >
        <div>
          <p className="text-gray-500">{faqsList.a}</p>
        </div>
      </div>
    </div>
  );
};

export default function Faq() {
  const faqsList = [
    {
      q: "Como funciona a assinatura de café?",
      a: "Com nossa assinatura de café, o processo é simples. Basta escolher a assinatura que melhor se adequa às suas preferências, realizar o pagamento e, a partir daí, todos os meses enviaremos um pacote de café fresco diretamente para o seu endereço. Não se preocupe em reordenar ou ficar sem café, pois cuidaremos disso para você!",
    },
    {
      q: "Posso personalizar minha assinatura de café?",
      a: "Com nossas assinaturas mensais, você tem total flexibilidade. Se em algum momento você precisar pausar temporariamente sua assinatura, basta nos informar e faremos a pausa de acordo com as suas necessidades. No entanto, as assinaturas anuais têm um período de contrato definido, e o cancelamento só é permitido após esse período. Estamos aqui para garantir que você tenha a melhor experiência possível com nossa assinatura de café.",
    },
    {
      q: "Como é feita a entrega dos cafés assinados?",
      a: "Para garantir que seu café chegue em perfeitas condições, utilizamos serviços de envio confiáveis. Dependendo da sua localização, podemos enviar seu pacote de café através dos Correios ou de uma transportadora especializada em entregas rápidas e seguras. Assim que seu pacote for enviado, forneceremos um código de rastreamento para que você possa acompanhar o progresso da entrega.",
    },
    {
      q: "Posso pausar ou cancelar minha assinatura de café a qualquer momento?",
      a: "Definitivamente! Acreditamos que cada apreciador de café tem suas próprias preferências. Por isso, oferecemos a opção de personalizar sua assinatura de café de acordo com suas necessidades. Você pode escolher entre grãos inteiros ou café moído, para que seu café chegue do jeito que você gosta. Queremos que você desfrute de uma experiência de café sob medida.",
    },
  ];

  return (
    <section className="leading-relaxed max-w-screen-xl mt-12 mx-auto px-4 md:px-8">
      <div className="space-y-3 text-center">
        <h1 className="text-3xl text-gray-800 font-semibold">
          perguntas frequentes
        </h1>
        <p className="text-gray-600 max-w-lg mx-auto text-lg">
          Respondeu a todas as perguntas frequentes, ainda confuso? Sinta-se
          livre para nos contatar.
        </p>
      </div>
      <div className="mt-14 max-w-2xl mx-auto">
        {faqsList.map((item, idx) => (
          <FaqsCard key={idx} idx={idx} faqsList={item} />
        ))}
      </div>
    </section>
  );
}
