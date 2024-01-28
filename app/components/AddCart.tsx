"use client";

import { useCartStore } from "../store";
import { Product } from "../types/ProductType";

export default function AddToCart({ product }: { product: Product }) {

    const { addProduct } = useCartStore();

    return (
        <button onClick={() => addProduct(product)} className="rounded-md bg-teal-600 text-white px-3.5 py-2.5 text-sm text-center z-10">Adicionar ao carrinho</button>
    )
}