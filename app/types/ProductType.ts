export type Product = {
    id: number;
    title: string;
    price: number | null;
    description: string | null;
    category: string;
    image: string;
    rating: { rate: number; count: number; }
  }