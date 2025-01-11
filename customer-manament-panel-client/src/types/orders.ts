export type OrderItem = {
    id: number;
    quantity: number;
    price: string;
    productName: string;
    productImage: string;
}

export type Order = {
    id: number;
    customerEmail: string;
    customerName: string;
    createdAt: string;
    updatedAt: string;
    items: OrderItem[];
}
