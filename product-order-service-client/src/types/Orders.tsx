import { ProductProps } from "@/components/products/Products";

export interface OrderSuccessModalProps {
    isOpen: boolean;
    onClose: () => void;
    orderAmount: number;
}


export interface OrderItem {
    id: number;
    productId: number;
    quantity: number;
    price: string;
    createdAt?: string;
    updatedAt?: string;
    product: ProductProps
}

export interface Order {
    id: number;
    userEmail: string;
    fullName: string;
    totalPrice: string;
    address: string;
    createdAt: string;
    updatedAt: string;
    status: string;
    items: OrderItem[];
}

export interface PaginatedOrders {
    items: Order[];
    total: number;
    page: number;
    totalPages: number;
}