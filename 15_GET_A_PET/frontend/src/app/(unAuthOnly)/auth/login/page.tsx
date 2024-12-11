'use client';

import { UserContext } from "@/context/userContext";
import { ChangeEvent, FormEvent, useContext, useState } from "react";
import styles from '../../../../components/form/Form.module.css';
import Input from "@/components/form/Input";
import Link from "next/link";

export default function Login() {
  const [user, setUser] = useState({ email: '', password: '' });
  const { login } = useContext(UserContext);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    login(user);
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  return (
    <section className={styles.form_container}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <Input
          text="E-mail"
          type="email"
          name="email"
          placeholder="Digite o e-mail"
          handleOnChange={handleChange}
        />
        <Input
          text="Senha"
          type="password"
          name="password"
          placeholder="Digite a senha"
          handleOnChange={handleChange}
        />
        <input type="submit" value="Entrar" />
      </form>
      <p>
        Não tem conta? <Link href="/auth/register">Clique aqui.</Link>
      </p>
    </section>
  )
}
