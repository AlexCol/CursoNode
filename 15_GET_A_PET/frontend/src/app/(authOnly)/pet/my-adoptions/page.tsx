'use client';

import useFlashMessage from '@/hooks/useFlashMessage';
import { Pet } from '@/interfaces/Pets';
import api from '@/utils/api';
import React, { useEffect, useState } from 'react'
import styles from '../Pets.module.css';
import RoundedImage from '@/components/layout/RoundedImage';
import Link from 'next/link';
import { User } from '@/interfaces/User';

function MyAdoptions() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [owners, setOwners] = useState<User[]>([]);

  function getOwnerData(ownerId: string) {
    const ownerData = owners.find((owner) => owner._id === ownerId);
    return ownerData;
  }

  useEffect(() => {
    async function FecthAdoptions() {
      let searchedOwners: User[] = [];
      try {
        const response = await api.get(`/pets/myadoptions`); //lembrete: já tem um Bearer token no header (anexado no useAuth)
        setPets(response.data);
        console.log(response.data);

        const uniqueValuesOfOwners = Array.from(new Set(pets.map((pet) => pet.user)));
        uniqueValuesOfOwners.map(async (ownerId) => {
          const response = await api.get(`/users/${ownerId}`);
          owners.push(response.data);
        });
        setOwners(searchedOwners);
      } catch (error) {
        useFlashMessage().setFlashMessage(`Erro ao carregar Adoções: ${error}`, 'error');
        setPets([]);
      }
    }
    FecthAdoptions();
  }, []);

  return (
    <section>
      <div className={styles.petlist_header}>
        <h1>Minhas adoções</h1>
      </div>
      <div className={styles.petlist_container}>
        {pets.length > 0 ? (
          pets.map((pet) => (
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
                    <p>Adoção em processo!</p>
                  </>
                ) : (
                  <p>Parabens por concluir a adoção!</p>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>Ainda não há adoções de Pets.</p>
        )}
      </div>

    </section>
  )
}

export default MyAdoptions
