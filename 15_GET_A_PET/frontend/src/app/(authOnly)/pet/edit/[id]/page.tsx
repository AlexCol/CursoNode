'use client';

import React, { use, useEffect, useState } from 'react';
import styles from '../../add/AddPet.module.css';
import { Pet } from '@/interfaces/Pets';

import api from '@/utils/api';
import PetForm from '@/components/form/PetForm';
import useFlashMessage from '@/hooks/useFlashMessage';
import { useParams, useRouter } from 'next/navigation';

function EditPet() {
  const [pet, setPet] = useState<Pet>({} as Pet);
  const { id } = useParams();
  const { setFlashMessage } = useFlashMessage();
  const router = useRouter();

  useEffect(() => {
    async function fetchPet() {
      const response = await api.get(`/pets/${id}`);
      const data = await response.data;
      setPet(data);
    }
    fetchPet();
  }, [id]);

  async function updatePet(pet: Pet) {
    let msgType = 'success';
    let msgText = 'Pet atualizado com sucesso';

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
      await api.put(`/pets/${id}`, formData);
      router.push('/pet/my-pets');
    } catch (error) {
      msgType = 'error';
      msgText = `Erro ao atualizar pet: ${error}`
    };
    setFlashMessage(msgText, msgType);
  }

  return (
    <section className={styles['addpet_header']}>
      <div>
        <h1>Editando o Pet: '{pet.name}'</h1>
        <p>Depois da edição os dados serão atualizados no sistema.</p>
        {pet.name && <PetForm
          handleSubmit={updatePet}
          btnText='Atualizar Pet'
          petData={pet}
        />
        }
      </div>
    </section>
  )
}

export default EditPet
