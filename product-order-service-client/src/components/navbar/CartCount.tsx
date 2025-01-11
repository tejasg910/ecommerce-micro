"use client"
import useCartStore from '@/cart/useCartStore';
import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';

const CartCount = () => {
    const { totalItems } = useCartStore()
    // Sync cart items from localStorage on load and whenever localStorage changes

    console.log(totalItems, "this is total items")

    return (
        <div className="relative">
            <a href="/cart" className="text-gray-700 hover:text-orange-500">
                <FaShoppingCart size={24} />
            </a>
            {totalItems > 0 && (
                <span className="absolute top-0 right-0 -mt-2 -mr-2 bg-orange-500 text-white text-xs font-bold rounded-full px-2 py-1">
                    {totalItems}
                </span>
            )}
        </div>
    );
};

export default CartCount;
