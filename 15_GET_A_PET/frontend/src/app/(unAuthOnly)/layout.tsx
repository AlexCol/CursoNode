import type { Metadata } from "next";
import { useRouter } from "next/dist/client/components/navigation";
import React from "react";

export default function LayoutUnAuthOnly({
  children,
}: Readonly<{ children: React.ReactNode; }>) {
  const router = useRouter();
  const autorizado = false;
  return (
    <>
      <h5>LayoutUnAuthOnly -- Adicionar validação se estiver logado, jogar para a tela principal</h5>
      {children}
    </>
  );
}
