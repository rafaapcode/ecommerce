import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "./types/ProductType";

type CartState = {
    cart: Product[];
    // addToCart: (product: Product) => void;
    // removeFromCart: (productId: string) => void;
    isOpen: boolean;
    toggleCart: () => void;
}

export const useCartStore = create<CartState>()(
    persist((set) => ({
        cart: [],
        isOpen: false,
        toggleCart: () => set((state) => ({ isOpen: !state.isOpen }))
    }), { name: 'cart-storage' })
);