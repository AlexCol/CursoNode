'use client';

import styles from '../Pets.module.css';
import { Pet } from '@/interfaces/Pets';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import useFlashMessage from '@/hooks/useFlashMessage';
import api from '@/utils/api';
import RoundedImage from '@/components/layout/RoundedImage';

function MyPets() {
  const [pets, setPets] = useState<Pet[]>([]);
  const { setFlashMessage } = useFlashMessage();

  useEffect(() => {
    async function fetchPets() {
      try {
        const response = await api.get('/pets/mypets'); //lembrete: sem necessidade de mandar o token, pois ele é enviado automaticamente no header (cadastrado no useAuth)
        const data = await response.data;
        setPets(data);
      } catch (error) {
        if (error instanceof Error) {
          setFlashMessage(error.message, 'error');
        }
        setFlashMessage(`Erro ao buscar pets: ${error}`, 'error');
      }
    }
    fetchPets();
  }, []);

  async function removePet(id: string) {
    let msgType = 'success';
    let msg = 'Pet excluído com sucesso!';
    try {
      await api.delete(`/pets/${id}`);
      const updatedPets = pets.filter((pet) => pet._id !== id);
      setPets(updatedPets);
    } catch (error) {
      msgType = 'error';
      const errorMsg = error instanceof Error ? error.message : error;
      msg = `Erro ao excluir pet: ${errorMsg}.`;
    }
    setFlashMessage(msg, msgType);
  }

  async function concludeAdoption(petId: string) {
    let msgType = 'success';
    let msgText = 'Adoção concluída com sucesso!';
    try {
      await api.patch(`/pets/concludeadoption/${petId}`);
      const updatedPets = pets.map((pet) => {
        if (pet._id === petId) {
          pet.available = false;
        }
        return pet;
      });
      setPets(updatedPets);
    } catch (error) {
      msgType = 'error';
      const errorMsg = error instanceof Error ? error.message : error;
      msgText = `Erro ao concluir adoção: ${errorMsg}`;
    }
    setFlashMessage(msgText, msgType);
  }

  return (
    <section>
      <div className={styles.petslist_header}>
        <h1>MyPets</h1>
        <Link href="/pet/add">Cadastrar novo Pet</Link>
      </div>
      <div className={styles.petslist_container}>
        {pets.length > 0 && (
          pets.map((pet) => {
            return (
              <div key={pet._id} className={styles.petlist_row}>
                <RoundedImage
                  src={pet.images ? `${process.env.NEXT_PUBLIC_API}/images/pets/${pet.images[0]}` : `${process.env.NEXT_PUBLIC_API}/images/no-image.jpg`}
                  alt={pet.name}
                  width='px75'
                />
                <span className='bold'>{pet.name}</span>
                <div className={styles.actions}>
                  {pet.available ? (
                    <>
                      {pet.adopter &&
                        <button
                          className={styles.conclude_btn}
                          onClick={async () => await concludeAdoption(pet._id)}
                        >Concluir adoção</button>
                      }
                      <Link
                        href={`/pet/edit/${pet._id}`}
                      >Editar</Link>
                      <button
                        className={styles.btnExcluir}
                        onClick={async () => await removePet(pet._id)}
                      >Excluir</button>
                    </>
                  ) : (
                    <p>Pet já adotado!</p>
                  )}
                </div>
              </div>
            )
          })
        )}
        {pets.length === 0 && <p>Não há Pets cadastrados</p>}
      </div>
    </section>
  )
}

export default MyPets
