'use client';

import React, { useState } from 'react'
import styles from './AddPet.module.css';
import PetForm from '@/components/form/PetForm';
import { Pet } from '@/interfaces/Pets';
import useFlashMessage from '@/hooks/useFlashMessage';
import { useRouter } from 'next/dist/client/components/navigation';
import api from '@/utils/api';
import { AxiosError } from 'axios';

function AddPet() {
  const router = useRouter();
  //const [token] = useState<string>(() => sessionStorage.getItem('token') || '');
  const { setFlashMessage } = useFlashMessage();

  async function registerPet(pet: Pet) {
    let msgType = 'success';
    let msgText = 'Pet cadastrado com sucesso';

    const formData = new FormData();
    Object.keys(pet).forEach(key => {
      if (key === 'images') {
        pet.images!.forEach((image, index) => {
          formData.append('images', image);
        });
        return;
      }

      formData.append(key, pet[key as keyof Pet] as any);
    });

    try {
      await api.post('/pets', formData); //lembrete: sem necessidade de mandar o token, pois ele é enviado automaticamente no header (cadastrado no useAuth)
      router.push('/pet/my-pets');
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
    setFlashMessage(msgText, msgType);
  }

  return (
    <section className={styles['addpet_header']}>
      <div>
        <h1>Cadastre um Pet</h1>
        <p>Depois ele ficará disponível para adoção</p>
        <PetForm
          handleSubmit={registerPet}
          btnText='Cadastrar Pet'
          petData={{} as Pet}
        />
      </div>
    </section>
  )
}

export default AddPet
