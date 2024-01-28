import Link from "next/link";
import { formatPrice } from "../lib/utils";
import { Product } from "../types/ProductType";
import AddToCart from "./AddCart";
import ProductImage from "./ProductImage";

type ProductProps = {
    product: Product
}

export default function ProductCard({ product }: ProductProps) {
    return (
        <Link href={`/product/${product.id}`}>
            <div className="flex flex-col shadow-lg h-96 bg-slate-800 p-5 text-gray-300">
                <div className="relative max-h-72 flex-1">
                    <ProductImage product={product} fill />
                </div>
                <div className="flex justify-between font-bold my-3">
                    <p className="w-40 truncate">{product.name}</p>
                    <p className="text-md text-teal-300">{formatPrice(product.price)}</p>
                </div>
                <AddToCart product={product} />
            </div>
        </Link>
    )
}