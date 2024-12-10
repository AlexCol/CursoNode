'use client';

import React, { useEffect, useState } from 'react';
import styles from './Message.module.css';
import bus from '@/utils/bus';

function Message() {
  const [visible, setVisible] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [type, setType] = useState<string>('');

  useEffect(() => {
    bus.addListener('myMessage', (data: { message: string; type: string }) => {
      setVisible(true);
      setMessage(data.message);
      setType(data.type);

      setTimeout(() => {
        setVisible(false);
      }, 5000);
    });
  }, [bus]);

  return (
    visible && (
      <div className={`${styles.message} ${styles[type]}`}>{message}</div>
    )
  );
}

export default Message;
