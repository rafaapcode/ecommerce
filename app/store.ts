import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "./types/ProductType";

type CartState = {
    cart: Product[];
    addProduct: (product: Product) => void;
    removeProduct: (product: Product) => void;
    isOpen: boolean;
    toggleCart: () => void;
    onCheckout: string;
    setCheckout: (checkout: string) => void;
}

export const useCartStore = create<CartState>()(
    persist((set) => ({
        cart: [],
        addProduct: (product: Product) => set((state) => {
            const productExist = state.cart.find((p) => p.id === product.id);
            if (productExist) {
                const updatedCart = state.cart.map((p) => {
                    if (p.id === product.id) {
                        return { ...p, quantity: p.quantity ? p.quantity += 1 : 1 }
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
        removeProduct: (product: Product) => set((state) => {
            const productExist = state.cart.find((p) => p.id === product.id);
            if (productExist && productExist.quantity! > 1) {
                const updatedCart = state.cart.map((p) => {
                    if (p.id === product.id) {
                        return { ...p, quantity: p.quantity! - 1 }
                    }

                    return p;
                })

                return { cart: updatedCart }
            } else {
                const filteredCart = state.cart.filter((p) => p.id !== product.id);
                return { cart: filteredCart }
            }
        }),
        onCheckout: 'cart',
        setCheckout: (checkout: string) => set((state) => ({ onCheckout: checkout })),
    }), { name: 'cart-storage' })
);