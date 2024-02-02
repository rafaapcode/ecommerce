import ProductCard from "./components/Product";
import { fetchProducts } from "./actions";
import { Product } from "./types/ProductType";

export default async function Home() {
  const { formatedProducts, has_more }: { formatedProducts: Product[], has_more: any } = await fetchProducts({});
  return (
    <div className="max-w-7xl mx-auto pt-8 px-8 xl:px-0">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 xl:gap-6">
        {
          formatedProducts.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))
        }
      </div>
    </div>
  );
}