import type { Metadata } from "next";
import React from "react";
import "./index.css";
import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode; }>) {
  return ( //aqui é que se configura o html do layout, somente aqui que se pode mexer no html
    <html lang="en">
      <body className={`app`}>
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}

//adicionar ao 'body' para colocar a imagem de fundo vinda do public
//style={{ backgroundImage: `url(${'./altbg.png'})`, backgroundSize: 'cover' }} //pra buscar imagem da pasta public