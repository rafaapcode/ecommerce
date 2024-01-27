import { Product } from "./types/ProductType";

async function getProducts(): Promise<Product[]> {
  const products = await fetch('https://fakestoreapi.com/products');

  if (!products.ok) {
    throw new Error('Falha ao buscar os dados.')
  }

  return products.json();
}

export default async function Home() {
  const products: Product[] = await getProducts();
  return (
    <div className="max-w-7xl mx-auto pt-8 px-8 xl:px-0">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 xl:gap-6">
        {products.map(product => (
          <div key={product.id}>
            {product.title}
          </div>
        ))}
      </div>
    </div>
  );
}


// {
//   id: 1,
//   title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
//   price: 109.95,
//   description: 'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',
//   category: "men's clothing",
//   image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
//   rating: { rate: 3.9, count: 120 }
// },