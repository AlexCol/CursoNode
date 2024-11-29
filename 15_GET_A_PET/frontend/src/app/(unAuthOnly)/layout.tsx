//"use client";

import React from "react";

export default function LayoutUnAuthOnly({
  children,
}: Readonly<{ children: React.ReactNode; }>) {
  // const router = useRouter();
  // const autorizado = false;

  // if (!autorizado) {
  //   router.push("/");
  //   return;
  // }

  return (
    <>
      <h5>LayoutUnAuthOnly -- Adicionar validação se estiver logado, jogar para a tela principal</h5>
      {children}
    </>
  );
}
