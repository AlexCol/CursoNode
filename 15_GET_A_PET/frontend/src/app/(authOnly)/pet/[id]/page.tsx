'use client';

import React, { useContext, useEffect, useState } from 'react'
import syles from './PetDetails.module.css';
import { useParams } from 'next/navigation';
import { Pet } from '@/interfaces/Pets';
import useFlashMessage from '@/hooks/useFlashMessage';
import api from '@/utils/api';
import { UserContext } from '@/contexts/user/userContext';

function PetDetails() {
  const { id } = useParams();
  const { authenticated } = useContext(UserContext);
  const [pet, setPet] = useState<Pet>({} as Pet);
  const { setFlashMessage } = useFlashMessage();

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const response = await api.get(`/pets/${id}`);
        setPet(response.data);
      } catch (error) {
        setFlashMessage(`Erro ao carregar Pet: ${error}`, 'error');
      }
    }

    fetchPet();
  }, [id]);

  return (
    <>
      {pet.name && (
        <section>
          <div>
            <h1>Conhecendo o Pet: {pet.name}</h1>
            <p>Se tiver interesse, marque uma visita para conhecê-lo.</p>
          </div>
          <div>
            {pet.images?.map((image, index) => (
              <img
                key={index}
                src={`${process.env.NEXT_PUBLIC_API}/images/pets/${image}`}
                alt='Imagem do Pet'
              />
            ))}
          </div>
          <p>
            <span className='bold'>Peso: </span> {pet.weight} Kg
          </p>
          <p>
            <span className='bold'>Idade: </span> {pet.age} anos
          </p>

          {authenticated ? (
            <button className={syles['btn-adopt']}>Adotar</button>
          ) : (
            <p>Para adotar, faça login</p>
          )}
        </section>
      )}
    </>
  )
}

export default PetDetails
