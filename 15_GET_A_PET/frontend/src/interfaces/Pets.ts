export interface Pet {
  _id: string;
  name: string;
  age: number;
  weight: number;
  color: string;
  images?: File[];
  available: boolean;
  user: string;
  adopter?: string;
}
