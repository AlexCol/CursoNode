import React from "react";

export default function LayoutAuthOnly({
  children,
}: Readonly<{ children: React.ReactNode; }>) {
  return (
    <>
      <h5>LayoutAuthOnly -- Adicionar validação se não estiver logado, jogar para a tela de login</h5>
      {children}
    </>
  );
}
