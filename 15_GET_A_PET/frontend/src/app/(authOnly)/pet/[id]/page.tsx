'use client';

import React, { useEffect, useState } from 'react'
import syles from './PetDetails.module.css';
import { useParams } from 'next/navigation';
import { Pet } from '@/interfaces/Pets';
import useFlashMessage from '@/hooks/useFlashMessage';
import api from '@/utils/api';

function PetDetails() {
  const { id } = useParams();
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
    <div>PetDetails: {id}</div>
  )
}

export default PetDetails
