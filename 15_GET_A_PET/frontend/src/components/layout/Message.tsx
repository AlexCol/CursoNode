'use client';

import React, { useState } from 'react';
import styles from './Message.module.css';

function Message() {
  const [type, setType] = useState<string>('');
  return <div className={`${styles.message} ${styles[type]}`}>Mensagem</div>;
}

export default Message;
