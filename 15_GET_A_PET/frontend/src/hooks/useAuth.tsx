import api from '@/utils/api';
import useFlashMessage from './useFlashMessage';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/dist/client/components/navigation';

export interface IUseAuth {
  authenticated: boolean;
  register: (user: any) => void;
}

export default function useAuth(): IUseAuth {
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const router = useRouter();

  async function register(user: any) {
    let msgText = 'User registered successfully';
    let msgType = 'success';

    try {
      const response = await api.post('/users/register', user);
      const data = response.data;
      await authUser(data);
    } catch (error) {
      let errorMessage = error;
      if (error instanceof AxiosError) {
        if (error.response?.data.errors) {
          errorMessage = error.response?.data.errors[0];
        } else {
          errorMessage = error.response?.data.Error;
        }
      }
      msgText = `${errorMessage}`;
      msgType = 'error';
    }

    useFlashMessage().setFlashMessage(msgText, msgType);
  }

  async function authUser(data: any) {
    setAuthenticated(true);
    sessionStorage.setItem('token', JSON.stringify(data.token));

    router.push('/');
  }

  return { authenticated, register };
}
