import api from "@/utils/api";

export interface IUseAuth {
  register: (user: any) => void;
}

export default function useAuth(): IUseAuth {
  async function register(user: any) {
    try {
      const response = await api.post('/users/register', user);
      const data = response.data;
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  return { register };
}