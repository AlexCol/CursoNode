'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './Home.module.css';
import { Pet } from '@/interfaces/Pets';
import api from '@/utils/api';
import useFlashMessage from '@/hooks/useFlashMessage';
import Link from 'next/dist/client/link';

export default function Home() {
  const [pets, setPets] = useState<Pet[]>([]);
  const { setFlashMessage } = useFlashMessage();

  console.log(pets);

  useEffect(() => {
    async function FetchPets() {
      try {
        const response = await api.get('/pets');
        setPets(response.data);
      } catch (error) {
        setFlashMessage(`Erro ao buscar pets: ${error}`, 'error');
      }
    }
    FetchPets();
  }, []);

  return (
    <section>
      <div className={styles.pet_home_header}>
        <h1>Adote um Pet</h1>
        <p>Veja os detalhes de cada um e conheça o tutor deles</p>
      </div>
      <div className={styles.pet_container}>
        {pets.length > 0 &&
          pets.map((pet) => (
            <div className={styles.pet_card} key={pet._id}>
              <div
                style={{
                  backgroundImage: `url(${process.env.NEXT_PUBLIC_API}/images/pets/${pet.images![0]})`,
                }}
                className={styles.pet_card_image}
              ></div>
              <h3>{pet.name}</h3>
              <p>
                <span className="bold">Peso:</span> {pet.weight}kg
              </p>
              {pet.available ? (
                <Link href={`/pet/${pet._id}`}>Mais detalhes</Link>
              ) : (
                <p className={styles.adopted_text}>Adotado!</p>
              )}
            </div>
          ))}
        {pets.length === 0 && (
          <p>Não há pets cadastrados ou disponíveis para adoção no momento!</p>
        )}
      </div>
    </section>
  );
}
