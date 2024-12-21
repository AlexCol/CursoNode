'use client';

import { Pet } from '@/interfaces/Pets'
import styles from './Form.module.css'
import React, { FormEvent, useState } from 'react'
import Input from './Input';
import Select from './Select';

interface PetFormProps {
  handleSubmit?: (e: FormEvent<HTMLFormElement>) => void;
  petData?: Pet;
  btnText?: string;
}

function PetForm({ petData, btnText }: PetFormProps) {
  const [pet, setPet] = useState<Pet>(petData || {} as Pet);
  const [preview, setPreview] = useState<string[]>([]);
  const colors = ['Branco', 'Preto', 'Cinza', 'Marrom', 'Laranja', 'Mesclado'];

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
  }

  function handleColor(e: React.ChangeEvent<HTMLSelectElement>) {
  }

  return (
    <form className={styles.form_container}>
      <Input
        text='Imagens do Pet'
        type='file'
        name='images'
        handleOnChange={onFileChange}
        multiple={true}
      />
      <Input
        text='Nome do Pet'
        type='text'
        name='name'
        placeholder='Nome do Pet'
        value={pet.name || ''}
        handleOnChange={handleChange}
      />
      <Input
        text='Idade do Pet'
        type='number'
        name='age'
        placeholder='Idade do Pet'
        value={pet.age || ''}
        handleOnChange={handleChange}
      />
      <Input
        text='Peso do Pet'
        type='number'
        name='weight'
        placeholder='Peso do Pet'
        value={pet.weight || ''}
        handleOnChange={handleChange}
      />
      <Select
        name='color'
        label='Cor do Pet'
        handleOnChange={handleColor}
        options={colors}
        value={pet.color || ''}
      />
      <input type='submit' value={btnText || 'Cadastrar'} />
    </form>
  )
}

export default PetForm
