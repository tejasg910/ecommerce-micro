export interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string
}


export interface CartState {
    items: CartItem[];
    totalItems: number;
    totalPrice: number;
    addItem: (product: CartItem) => void;
    updateQuantity: (productId: string, newQuantity: number) => void;
    removeItem: (productId: string) => void;
    clearCart: () => void;
    setTotalItems: (total: number) => void;
    setItems: (products: CartItem[]) => void;
    setTotalPrice: (price: number) => void;
    isHydrated: boolean,
    setHydrated: () => void;
}