"use client";
import { useParams } from "next/navigation";

export default function PaginaId() {
  console.log("renderizou Pagina ID");
  const { id } = useParams();
  return (
    <div className="Pagina ID">
      "Hello, page id! - " {id}
    </div>
  );
}
