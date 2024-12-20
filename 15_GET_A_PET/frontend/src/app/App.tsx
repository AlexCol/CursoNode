'use client';

import { UserContext } from "@/contexts/user/userContext";
import Container from "../components/layout/Container";
import Footer from "../components/layout/Footer";
import Message from "../components/layout/Message";
import NavBar from "../components/layout/NavBar";
import { ReactNode, useContext } from "react";

export default function App({
  children,
}: Readonly<{ children: ReactNode }>) {
  const { loading } = useContext(UserContext);

  if (loading) {
    return <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        fontSize: "1.5rem",
      }}
    > Carregando...</div>
  }

  return (
    <>
      <NavBar />
      <Message />
      <Container>{children}</Container>
      <Footer />
    </>
  );
}
