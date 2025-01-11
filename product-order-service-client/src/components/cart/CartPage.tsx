"use client"
import useCartStore from '@/cart/useCartStore';
import axios from 'axios';
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { FaPlus, FaMinus, FaTrash } from 'react-icons/fa';
import OrderSuccessModal from './OrderSucess';
import OrderFailedModal from './OrderFailed';
import Image from 'next/image';



interface CustomerDetails {
    name: string;
    email: string;
    address: string;
    password: string
}

const CartPage: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { updateQuantity, removeItem, clearCart, totalItems, isHydrated, totalPrice, items } = useCartStore();

    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showErrorModal, setShowErorrModal] = useState(false);

    const { register, handleSubmit, reset } = useForm<CustomerDetails>();

    const placeOrder: SubmitHandler<CustomerDetails> = async data => {
        try {


            const productItems = items.map((item) => {
                return {
                    productId: item.id,
                    quantity: item.quantity,
                    price: item.price,

                }
            })


            const userData = {
                fullName: data.name,
                password: data.password,
                email: data.email,
            }
            const formdata = {
                userData,
                userEmail: data.email,
                totalPrice: totalPrice,
                address: data.address,
                fullName: data.name,
                items: [...productItems]
            };
            const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER}/api/orders`, formdata);

            if (response.status == 201) {
                setIsModalOpen(false); // Close checkout modal
                setShowSuccessModal(true); // Show success modal
                reset();
                clearCart()

            } else {
                setShowErorrModal(true)
                setIsModalOpen(false); // Close checkout modal
            }
        } catch (error) {

            setShowErorrModal(true)
            setIsModalOpen(false); // Close checkout modal
            console.error('Error placing order:', error);
        }
    };

    if (!isHydrated) {
        return (
            <div className="flex justify-center items-center mt-44">
                <h2 className="text-2xl font-semibold">Loading...</h2>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Cart Items */}
                    <div className="lg:w-2/3">
                        {items.map(item => (
                            <div
                                key={item.id}
                                className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-white shadow-sm border border-gray-200 p-6 mb-4 rounded-lg transition-shadow hover:shadow-md"
                            >
                                {/* Product Image */}
                                <div className="w-24 h-24 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden">
                                    <img
                                        src={item.image || "/api/placeholder/96/96"}
                                        alt={item.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                {/* Product Details */}
                                <div className="flex-grow">
                                    <h3 className="text-2xl font-semibold text-gray-900">{item.name.toUpperCase()}</h3>
                                    <p className="text-lg font-medium text-gray-900 mt-1">${item.price}</p>

                                    {/* Quantity Controls */}
                                    <div className="flex items-center mt-4">
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full hover:border-orange-500 hover:text-orange-500 transition-colors"
                                        >
                                            <FaMinus size={12} />
                                        </button>
                                        <span className="mx-4 min-w-[2rem] text-center">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full hover:border-orange-500 hover:text-orange-500 transition-colors"
                                        >
                                            <FaPlus size={12} />
                                        </button>
                                    </div>
                                </div>

                                {/* Remove Button */}
                                <button
                                    onClick={() => removeItem(item.id)}
                                    className="text-gray-400 hover:text-red-500 transition-colors"
                                    title="Remove item"
                                >
                                    <FaTrash size={18} />
                                </button>
                            </div>
                        ))}

                        {items.length === 0 && (
                            <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-8 text-center">
                                <p className="text-gray-500 text-lg">Your cart is empty</p>
                            </div>
                        )}
                    </div>

                    {/* Order Summary */}
                    <div className="lg:w-1/3">
                        <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-6 sticky top-8">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Items ({totalItems})</span>
                                    <span className="text-gray-900">${totalPrice.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Shipping</span>
                                    <span className="text-gray-900">Free</span>
                                </div>
                                <div className="border-t pt-4">
                                    <div className="flex justify-between">
                                        <span className="text-lg font-semibold">Total</span>
                                        <span className="text-lg font-semibold">${totalPrice.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="w-full bg-orange-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={items.length === 0}
                            >
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Checkout Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] flex flex-col">
                        <div className="p-6 flex-grow overflow-y-auto">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-gray-900">Checkout Details</h2>
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="text-gray-400 hover:text-gray-500"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            {/* Confirmation Message */}
                            <div className="bg-orange-50 border border-orange-100 rounded-lg p-4 mb-6">
                                <p className="text-center text-gray-800">
                                    You&rsquo;re about to place an order for{' '}
                                    <span className="font-bold text-orange-600">${totalPrice.toFixed(2)}</span>
                                </p>
                            </div>

                            {/* Checkout Form */}
                            <form onSubmit={handleSubmit(placeOrder)} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                                    <input
                                        {...register('name', { required: true })}
                                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-shadow"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                                    <input
                                        {...register('email', { required: true })}
                                        type="email"
                                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-shadow"
                                        placeholder="john@example.com"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Passoword</label>
                                    <input
                                        {...register('password', { required: true })}
                                        type="password"
                                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-shadow"
                                        placeholder="Enter password"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Shipping Address</label>
                                    <textarea
                                        {...register('address', { required: true })}
                                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-shadow"
                                        rows={3}
                                        placeholder="Enter your complete shipping address"
                                    ></textarea>
                                </div>
                            </form>
                        </div>

                        {/* Fixed Footer */}
                        <div className="p-6 border-t border-gray-200">
                            <div className="flex gap-4 justify-end">
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSubmit(placeOrder)}
                                    className="px-6 py-3 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors flex items-center gap-2"
                                >
                                    <span>Proceed to Pay</span>
                                    <span className="font-bold">${totalPrice.toFixed(2)}</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}


            <OrderSuccessModal
                isOpen={showSuccessModal}
                onClose={() => setShowSuccessModal(false)}
                orderAmount={totalPrice}
            />

            <OrderFailedModal
                isOpen={showErrorModal}
                onClose={() => setShowErorrModal(false)}
                errorMessage='Failed to place order'

            />
        </div>
    );
};

export default CartPage;