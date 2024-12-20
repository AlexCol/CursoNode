export interface Pet {
  _id: string;
  name: string;
  age: number;
  weight: number;
  color: string;
  image?: string[];
  available: boolean;
  user: string;
  adopter?: string;
}
