'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Home() {
  const router = useRouter();
  const [counter, setCounter] = useState(0);

  const navigateToAbout = () => {
    router.push('/about');
  };

  return (
    <div className="Home">
      <h1>Pagina inicial</h1>
      <button onClick={() => setCounter((prevCounter) => prevCounter + 1)}>
        {counter}
      </button>
      <button onClick={navigateToAbout}>About</button>
    </div>
  );
}
