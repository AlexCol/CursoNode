import { ReactNode } from "react";
import "./index.css";
import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import Container from "@/components/layout/Container";

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode; }>) {
  return ( //aqui é que se configura o html do layout, somente aqui que se pode mexer no html
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Get a Pet</title>
      </head>
      <body className={`app`}>
        <NavBar />
        <Container>
          {children}
        </Container>
        <Footer />
      </body>
    </html>
  );
}

//adicionar ao 'body' para colocar a imagem de fundo vinda do public
//style={{ backgroundImage: `url(${'./altbg.png'})`, backgroundSize: 'cover' }} //pra buscar imagem da pasta public