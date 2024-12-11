import api from '../utils/api';
import useFlashMessage from './useFlashMessage';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/dist/client/components/navigation';

export interface IUseAuth {
  authenticated: boolean;
  loading: boolean;
  login: ({ email, password }: { email: string, password: string }) => void;
  register: (user: any) => void;
  logout: () => void;
}

export default function useAuth(): IUseAuth {
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    async function CheckUser() {
      const token = sessionStorage.getItem('token');
      if (token) {
        try {
          api.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(token)}`;
          await api.get('/auth/checkuser');
          setAuthenticated(true);
        } catch (error) {
          setAuthenticated(false);
        }
      }
      setLoading(false);
    }
    CheckUser();
  }, []);

  async function login({ email, password }: { email: string, password: string }) {
    try {
      const response = await api.post('/auth/login', { email, password });
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
      useFlashMessage().setFlashMessage(`${errorMessage}`, 'error');
    }
  }

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

  function logout() {
    setAuthenticated(false);
    sessionStorage.removeItem('token');
    router.push('/');
  }

  ///funções que não fazem parte do retorno
  async function authUser(data: any) {
    setAuthenticated(true);
    sessionStorage.setItem('token', JSON.stringify(data.token));

    router.push('/');
  }

  return { authenticated, loading, login, register, logout };
}
