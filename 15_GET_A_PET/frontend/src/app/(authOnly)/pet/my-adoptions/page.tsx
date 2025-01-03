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

  function getOwnerData(ownerId: string): User {
    const ownerData = owners.find((owner: User) => {
      console.log('owner._id', owner._id);
      console.log('ownerId', ownerId);
      return owner._id === ownerId
    });
    return ownerData || { name: 'Não encontrado', phone: 'Não encontrado' } as User;
  }

  useEffect(() => {
    async function FecthAdoptions() {
      let searchedPets: Pet[] = [];
      try {
        const response = await api.get(`/pets/myadoptions`); //lembrete: já tem um Bearer token no header (anexado no useAuth)
        searchedPets = response.data;
        setPets(searchedPets);
      } catch (error) {
        useFlashMessage().setFlashMessage(`Erro ao carregar Adoções: ${error}`, 'error');
        setPets([]);
      }
    }
    FecthAdoptions();
  }, []);

  useEffect(() => {
    async function FetchOwners() {
      const uniqueValuesOfOwners = Array.from(new Set(pets.map((pet) => pet.user)));
      uniqueValuesOfOwners.map(async (ownerId) => {
        const response = await api.get(`/users/${ownerId}`);
        const user: User = response.data.user;
        setOwners((owners) => {
          if (owners.find((owner) => owner._id === user._id)) {
            return owners;
          }
          return [...owners, user];
        });
      });
    }
    if (pets)
      FetchOwners();
  }, [pets]);

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
              <div className={styles.contacts}>
                <p>
                  <span className="bold">Ligue para:</span> {getOwnerData(pet.user)?.phone}
                </p>
                <p>
                  <span className="bold">Fale com:</span> {getOwnerData(pet.user)?.name}
                </p>
              </div>
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
