import React, { useMemo } from 'react';
import { ProductProps } from './Products';
import useCartStore from '@/cart/useCartStore';
import { ShoppingCart } from 'lucide-react';

interface AddToCartButtonProps {
    product: ProductProps;
    addToCart: (id: ProductProps) => void;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ product, addToCart }) => {
    // Check if the product is already in the cart

    const { items } = useCartStore()
    const isInCart = useMemo(() => items.some(item => item.id === product.id), [items, product]);

    return (
        <button
            onClick={() => !isInCart && addToCart(product)}
            disabled={isInCart}
            className={`${isInCart
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-white hover:bg-gray-200'
                } border border-orange-500 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-600 flex items-center gap-2 transition-colors duration-200`}
        >
            <ShoppingCart size={18} />
            <span>{isInCart ? 'Added to Cart' : 'Add to Cart'}</span>
        </button>
    );
};

export default AddToCartButton;
