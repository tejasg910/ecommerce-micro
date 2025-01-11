import React from 'react';
import { CheckCircle, ShoppingBag } from 'lucide-react';
import { OrderSuccessModalProps } from '@/types/Orders';



const OrderSuccessModal = ({ isOpen, onClose, orderAmount }: OrderSuccessModalProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
                {/* Success Animation Container */}
                <div className="p-8 text-center">
                    <div className="flex justify-center mb-4">
                        <div className="relative">
                            {/* Background Circle */}
                            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center animate-pulse">
                                <CheckCircle className="w-12 h-12 text-green-500 animate-bounce" />
                            </div>
                        </div>
                    </div>

                    {/* Success Message */}
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        Order Placed Successfully!
                    </h2>
                    <p className="text-gray-600 mb-6">
                        Thank you for your purchase for this product
                    </p>

                    {/* Order Details */}
                    <div className="bg-gray-50 rounded-lg p-4 mb-6">
                        <div className="flex items-center justify-center gap-2 text-green-600">
                            <ShoppingBag className="w-5 h-5" />
                            <span className="font-medium">Order Confirmed</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-2">
                            You will receive an email confirmation shortly
                        </p>
                    </div>

                    {/* Continue Shopping Button */}
                    <button
                        onClick={onClose}
                        className="w-full bg-green-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-600 transition-colors"
                    >
                        Continue Shopping
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OrderSuccessModal;