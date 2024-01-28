import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "./types/ProductType";

type CartState = {
    cart: Product[];
    addProduct: (product: Product) => void;
    // removeProduct: (productId: string) => void;
    isOpen: boolean;
    toggleCart: () => void;
}

export const useCartStore = create<CartState>()(
    persist((set) => ({
        cart: [],
        addProduct: (product: Product) => set((state) => {
            const productExist = state.cart.find((p) => p.id === product.id);
            if (productExist) {
                const updatedCart = state.cart.map((p) => {
                    if (p.id === product.id) {
                        return { ...p, quantity: p.quantity ? p.quantity++ : 1 }
                    }
                    return p;
                })

                return { cart: updatedCart }
            } else {
                return { cart: [...state.cart, { ...product, quantity: 1 }] }
            }
        }),
        isOpen: false,
        toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
    }), { name: 'cart-storage' })
);