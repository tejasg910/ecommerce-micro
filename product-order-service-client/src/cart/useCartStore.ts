import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { CartItem, CartState } from '@/types/Cart';


// Define the store state and actions


const useCartStore = create<CartState>()(
    persist(
        (set) => ({
            items: [],
            totalItems: 0,
            totalPrice: 0,
            isHydrated: false, // Add this flag

            addItem: (product: CartItem) => {
                set((state) => {
                    const productPrice =
                        typeof product.price === 'string'
                            ? parseFloat(product.price)
                            : product.price;

                    const existingItem = state.items.find(
                        (item) => item.id === product.id
                    );

                    if (existingItem) {
                        const updatedItems = state.items.map((item) =>
                            item.id === product.id
                                ? { ...item, quantity: (item.quantity || 1) + 1 }
                                : item
                        );
                        return {
                            items: updatedItems,
                            totalItems: state.totalItems + 1,
                            totalPrice: state.totalPrice + productPrice,
                        };
                    }

                    return {
                        items: [
                            ...state.items,
                            { ...product, price: productPrice, quantity: 1 },
                        ],
                        totalItems: state.totalItems + 1,
                        totalPrice: state.totalPrice + productPrice,
                    };
                });
            },

            updateQuantity: (productId: string, newQuantity: number) => {
                set((state) => {
                    const item = state.items.find((item) => item.id === productId);
                    if (!item) return state;

                    const productPrice =
                        typeof item.price === 'string'
                            ? parseFloat(item.price)
                            : item.price;

                    // Ensure quantity does not go below 1
                    const updatedQuantity = Math.max(newQuantity, 1);

                    const quantityDifference = updatedQuantity - (item.quantity || 0);

                    const updatedItems =
                        updatedQuantity === 0
                            ? state.items.filter((item) => item.id !== productId)
                            : state.items.map((item) =>
                                item.id === productId
                                    ? { ...item, quantity: updatedQuantity }
                                    : item
                            );

                    return {
                        items: updatedItems,
                        totalItems: state.totalItems + quantityDifference,
                        totalPrice: state.totalPrice + productPrice * quantityDifference,
                    };
                });
            },


            removeItem: (productId: string) => {
                set((state) => {
                    const item = state.items.find((item) => item.id === productId);
                    console.log(item, productId, "this is udpated items")
                    if (!item) return state;

                    const itemPrice =
                        typeof item.price === 'string'
                            ? parseFloat(item.price)
                            : item.price;

                    const updatedItems = state.items.filter(
                        (item) => item.id !== productId
                    );
                    console.log(updatedItems, "this is udpated items")
                    return {
                        items: updatedItems,
                        totalItems: state.totalItems - (item.quantity || 0),
                        totalPrice:
                            state.totalPrice - itemPrice * (item.quantity || 0),
                    };
                });
            },

            clearCart: () => {
                set({ items: [], totalItems: 0, totalPrice: 0 });
            },

            setTotalItems: (total: number) => {
                set({ totalItems: total });
            },

            setItems: (products: CartItem[]) => {
                set({ items: products });
            },

            setTotalPrice: (price: number) => {
                set({ totalPrice: price });
            },
            setHydrated: () => set({ isHydrated: true }),
        }),
        {
            name: 'cart-storage',
            storage: createJSONStorage(() => localStorage),
            onRehydrateStorage: () => (state) => {
                state?.setHydrated(); // Mark store as hydrated after state is loaded
            },
        }
    )
);


export default useCartStore;
