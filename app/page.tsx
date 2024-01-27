import ProductCard from "./components/Product";
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
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}