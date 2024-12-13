'use client';

import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import styles from './profile.module.css'
import formStyles from '../../../../components/form/Form.module.css';
import Input from '@/components/form/Input';
import api from '@/utils/api';
import { AxiosError } from 'axios';
import useFlashMessage from '@/hooks/useFlashMessage';
import { useRouter } from 'next/dist/client/components/navigation';

/* hooks */

interface User {
  _id: string;
  name: string;
  email: string;
  password?: string;
  image?: string;
  phone: string;
}

function Profile() {
  const router = useRouter();
  const [preview, setPreview] = useState<File>();
  const [token] = useState(sessionStorage.getItem('token') || '');
  const [user, setUser] = useState<User>({
    _id: '',
    name: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    async function GetUser() {
      try {
        const responde = await api.get('/auth/checkuser', {
          // headers: { /* esse header não é necessário, pois é marcado como header padrão ao atualizar o auth, mas deixado aqui comentado para referencia */
          //   Authorization: `Bearer ${JSON.parse(token)}`
          // }
        });
        setUser(responde.data.currentUser);
      } catch (error) {
        const msgType = 'error';
        let msgText = 'Erro ao carregar usuário';
        if (error instanceof AxiosError) {
          if (error.response?.data.Error.message) {
            msgText = error.response?.data.Error.message;
          }
        }
        useFlashMessage().setFlashMessage(msgText, msgType);
        router.push('/');
      }
    }

    GetUser();
  }, [token]);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  function onFileChange(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;
    setPreview(e.target.files[0]);
    setUser({ ...user, [e.target.name]: e.target.files[0] });
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let msgType = 'success';
    let msgText = 'Usuário atualizado com sucesso';

    try {
      const formData = new FormData();

      Object.keys(user).forEach(key => {
        formData.append(key, user[key as keyof User] as any);
      });

      await api.put('/users', formData); //lembrete: sem necessidade de mandar o token, pois ele é enviado automaticamente no header
      router.push('/');
    } catch (error) {
      msgType = 'error';
      msgText = 'Erro ao atualizar usuário';
      if (error instanceof AxiosError) {
        if (error.response?.data.Error) {
          msgText = error.response?.data.Error;
        }
        if (error.response?.data.errors) {
          msgText = error.response?.data.errors[0];
        }
      }
    }
    useFlashMessage().setFlashMessage(msgText, msgType);
  }

  return (
    <section>
      <div className={styles.profile_header}>
        <h1>Perfil</h1>
        {(user.image || preview) && (
          <img
            src={preview
              ? URL.createObjectURL(preview)
              : `${process.env.NEXT_PUBLIC_API}/images/users/${user.image}`}
            alt={user.name}
          />
        )}
      </div>
      <form onSubmit={handleSubmit} className={formStyles.form_container}>
        <Input
          text="Imagem"
          type="file"
          name="image"
          handleOnChange={onFileChange}
        />
        <Input
          text="E-mail"
          type="email"
          name="email"
          placeholder="Digite o e-mail"
          handleOnChange={handleChange}
          value={user.email || ''}
        />
        <Input
          text="Nome"
          type="text"
          name="name"
          placeholder="Digite o nome"
          handleOnChange={handleChange}
          value={user.name || ''}
        />
        <Input
          text="Telefone"
          type="text"
          name="phone"
          placeholder="Digite o seu telefone"
          handleOnChange={handleChange}
          value={user.phone || ''}
        />
        <Input
          text="Senha"
          type="password"
          name="password"
          placeholder="Digite a sua senha"
          handleOnChange={handleChange}
        />
        <Input
          text="Confirmação de senha"
          type="password"
          name="confirmPassword"
          placeholder="Confirme a sua senha"
          handleOnChange={handleChange}
        />
        <input type="submit" value="Editar" />
      </form>
    </section>
  )
}

export default Profile
