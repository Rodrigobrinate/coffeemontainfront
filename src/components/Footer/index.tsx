import Link from "next/link";

export default function Footer2() {
  const footerNavs = [
    {
      label: "Empresa",
      items: [
        {
          href: "/patterns",
          name: "Padrões",
        },
        {
          href: "https://medium.com/@coffeemountaincaparao",
          name: "Blog",
        },
        
      ],
    },
    {
      label: "Recursos",
      items: [
        {
          href: "/contato",
          name: "Contato",
        },
        {
          href: "/contato",
          name: "Suporte",
        },
        {
          href: "/about",
          name: "Quem somos",
        },
      ],
    },
    {
      label: "Sobre",
      items: [
        {
          href: "/privacity",
          name: "Termos",
        },
        
        {
          href: "/privacity",
          name: "Privacidade",
        },
        {
          href: "/about",
          name: "Sobre nós",
        },
      ],
    },
  ];

  return (
    <footer className="text-gray-500 bg-white px-4 py-5  mx-auto absolute w-full  md:px-8">
      <div className="gap-6 justify-between md:flex">
        <div className="flex-1">
          <div className="max-w-xs">
            <img src="/logo_main.png" alt="logo" className="w-16" />
            <p className="leading-relaxed mt-2 text-[15px]">
              Proporcionando o melhor café do Brasil diretamente em seu endereço
            </p>
          </div>
         
        </div>
        <div className="flex-1 mt-10 space-y-6 items-center justify-between sm:flex md:space-y-0 md:mt-0">
          {footerNavs.map((item, idx) => (
            <ul className="space-y-4" key={idx}>
              <h4 className="text-gray-800 font-medium">{item.label}</h4>
              {item.items.map((el, idx) => (
                <li key={idx}>
                  <Link
                    href={el.href}
                    className="hover:underline hover:text-indigo-600"
                  >
                    {el.name}
                  </Link>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
      <div className="mt-8 py-6 border-t items-center justify-between sm:flex">
        <div className="mt-4 sm:mt-0">
          &copy; 2022 Coffee Montain Caparaó Todos os direitos reservados.
        </div>
        <div className="mt-6 sm:mt-0">
          <ul className="flex items-center space-x-4">
           

            <li className="w-10 h-10 border rounded-full flex items-center justify-center">
              <Link href="https://instagram.com/coffeemountaincaparao">
                <img src="icons8-instagram-240.png" alt="" />
              </Link>
            </li>

            <li className="w-10 h-10 border rounded-full flex items-center justify-center">
              <Link href="mailto:coffeemountaincaparao@coffeemountaincaparao.com.br">
              <img width="48" height="48" src="https://img.icons8.com/color/48/email.png" alt="email"/>
              </Link>
            </li>
            <li className="w-10 h-10 border rounded-full flex items-center justify-center">
              <Link href="javascript:void(0)">
              <img width="48" height="48" src="https://img.icons8.com/color/48/whatsapp--v1.png" alt="whatsapp--v1"/>
              </Link>
            </li>
          
          </ul>
        </div>
      </div>
      <style jsx>{`
        .svg-icon path,
        .svg-icon polygon,
        .svg-icon rect {
          fill: currentColor;
        }
      `}</style>
    </footer>
  );
}
