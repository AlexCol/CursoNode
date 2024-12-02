import Footer from "@/components/layout/Footer";
import NavBar from "@/components/layout/NavBar";
import React from "react";

export default function LayoutAuthOnly({
  children,
}: Readonly<{ children: React.ReactNode; }>) {
  return (
    <>
      {children}
      <h5>LayoutAuthOnly -- Adicionar validação se não estiver logado, jogar para a tela de login</h5>
    </>
  );
}
