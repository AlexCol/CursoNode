import React from 'react';
import styles from './Select.module.css';

interface SelectProps {
  label: string;
  name: string;
  options: string[];
  handleOnChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  value: string;
}

function Select({ label, name, options, handleOnChange, value }: SelectProps) {
  return (
    <div className={styles.form_control}>
      <label htmlFor={name}>{label}</label>
      <select name={name} id={name} onChange={handleOnChange} value={value || ''}>
        <option value=''>Selecione...</option>
        {options.map(option => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </div>
  )
}

export default Select
