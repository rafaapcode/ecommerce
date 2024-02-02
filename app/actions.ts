'use server';

import Stripe from "@/app/lib/stripe";

export async function fetchProducts({ lastProductId }: { lastProductId?: string | undefined }) {
  const params = lastProductId ? { starting_after: lastProductId, limit: 12 } : { limit: 12 };
  const { data: products, has_more } = await Stripe.products.list(params);
  const allProducts = products.map(async (product) => {
    const price = await Stripe.prices.list({
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

  return { formatedProducts, has_more };
}