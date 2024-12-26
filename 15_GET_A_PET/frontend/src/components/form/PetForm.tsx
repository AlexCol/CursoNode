'use client';

import { Pet } from '@/interfaces/Pets'
import styles from './Form.module.css'
import React, { FormEvent, useState } from 'react'
import Input from './Input';
import Select from './Select';

interface PetFormProps {
  handleSubmit: (pet: Pet) => void;
  petData: Pet;
  btnText?: string;
}

function PetForm({ handleSubmit, petData, btnText }: PetFormProps) {
  const [pet, setPet] = useState<Pet>(petData || {} as Pet);
  const [preview, setPreview] = useState<File[]>([]);
  const colors = ['Branco', 'Preto', 'Cinza', 'Marrom', 'Laranja', 'Mesclado'];

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files) return;
    setPreview(Array.from(files));
    setPet({ ...pet, images: Array.from(files) });
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setPet({ ...pet, [name]: value });
  }

  function handleColor(e: React.ChangeEvent<HTMLSelectElement>) {
    const choosedColor = e.target.options[e.target.selectedIndex].text;
    setPet({ ...pet, color: choosedColor });
  }

  async function submitForm(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await handleSubmit(pet);
  }

  return (
    <form onSubmit={submitForm} className={styles.form_container}>
      <div className={styles.preview_pet_images}>
        {preview.length > 0 ?
          Array.from(preview).map((image, index) => (
            <img
              src={URL.createObjectURL(image)}
              alt={pet.name}
              key={`${pet.name}+${index}`}
            />
          ))
          :
          petData.images &&
          Array.from(petData.images).map((image, index) => (
            <img
              key={index}
              src={`${process.env.NEXT_PUBLIC_API}/images/pets/${image}`}
              alt='Imagem do Pet'
            />
          ))
        }
      </div>
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
        value={pet.name}
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
