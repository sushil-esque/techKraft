export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

export interface Property {
  id: number;
  title: string;
  description: string;
  price: number;
  location: string;
  isFavorite?: boolean;
}
