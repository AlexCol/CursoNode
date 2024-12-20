'use client';

import { Pet } from '@/interfaces/Pets';
import React, { useState } from 'react';
import Link from 'next/link';

function MyPets() {
  const [pets, setPets] = useState<Pet[]>([])
  return (
    <section>
      <div>
        <h1>MyPets</h1>
        <Link href="/pet/add">Cadastrar novo Pet</Link>
      </div>
      <div>
        {pets.length > 0 && <p>Meus Pets Cadastrados</p>}
        {pets.length === 0 && <p>Não há Pets cadastrados</p>}
      </div>
    </section>
  )
}

export default MyPets
