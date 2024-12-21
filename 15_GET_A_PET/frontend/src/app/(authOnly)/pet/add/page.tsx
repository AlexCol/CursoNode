import React from 'react'
import styles from './AddPet.module.css';
import PetForm from '@/components/form/PetForm';

function AddPet() {
  return (
    <section className={styles['addpet_header']}>
      <div>
        <h1>Cadastre um Pet</h1>
        <p>Depois ele ficará disponível para adoção</p>
        <PetForm btnText='Cadastrar Pet' />
      </div>
    </section>
  )
}

export default AddPet
