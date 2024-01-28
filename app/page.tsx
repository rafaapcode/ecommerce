import Stripe from "stripe";
import ProductCard from "./components/Product";
import { Product } from "./types/ProductType";

async function getProducts(): Promise<Product[]> {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  const products = await stripe.products.list();
  const allProducts = products.data.map(async (product) => {
    const price = await stripe.prices.list({
      product: product.id
    })

    return {
      id: product.id,
      price: price.data[0].unit_amount,
      name: product.name,
      image: product.images[0],
      description: product.description,
      currency: price.data[0].currency,
    }
  })
  const formatedProducts = await Promise.all(allProducts);

  return formatedProducts;
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