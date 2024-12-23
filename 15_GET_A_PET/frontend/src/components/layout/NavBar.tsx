'use client';

import React, { useContext } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import styles from './Navbar.module.css';
import Logo from '../../assets/img/logo.png';
import { UserContext } from '@/contexts/user/userContext';

function Navbar() {
  const { authenticated, logout } = useContext(UserContext);

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar_logo}>
        <Image src={Logo} alt="Get A Pet" width={50} height={50} />
        <h2>Get A Pet</h2>
      </div>
      <ul>
        <li>
          <Link href="/">Adotar</Link>
        </li>
        {authenticated ? (
          <>
            <li>
              <Link href="/pet/my-adoptions">Minhas Adoções</Link>
            </li>
            <li>
              <Link href="/pet/my-pets">Meus Pets</Link>
            </li>
            <li>
              <Link href="/user/profile">Meu Perfil</Link>
            </li>
            <li onClick={logout}>Sair</li>
          </>
        ) : (
          <>
            <li>
              <Link href="/auth/login">Entrar</Link>
            </li>
            <li>
              <Link href="/auth/register">Registrar</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
