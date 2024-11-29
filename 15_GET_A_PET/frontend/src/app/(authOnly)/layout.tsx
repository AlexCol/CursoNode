import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import React from "react";

export default function LayoutAuthOnly({
  children,
}: Readonly<{ children: React.ReactNode; }>) {
  return (
    <>
      <NavBar />
      {children}
      <h5>LayoutAuthOnly -- Adicionar validação se não estiver logado, jogar para a tela de login</h5>
      <Footer />
    </>
  );
}
