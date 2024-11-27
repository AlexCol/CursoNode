"use client";
import { useParams } from "next/navigation";

export default function Buscandoid() {
  console.log("renderizou Buscandoid");
  const { id } = useParams();
  return (
    <div className="Buscandoid">
      "Hello, page buscando id! - " {id}
    </div>
  );
}
