import React from 'react';
import { XCircle, AlertCircle } from 'lucide-react';

interface OrderFailedModalProps {
    isOpen: boolean;
    onClose: () => void;
    errorMessage?: string;
}

const OrderFailedModal = ({ isOpen, onClose, errorMessage = 'Something went wrong while processing your order.' }: OrderFailedModalProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
                {/* Error Animation Container */}
                <div className="p-8 text-center">
                    <div className="flex justify-center mb-4">
                        <div className="relative">
                            {/* Background Circle */}
                            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
                                <XCircle className="w-12 h-12 text-red-500 animate-pulse" />
                            </div>
                        </div>
                    </div>

                    {/* Error Message */}
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        Order Failed
                    </h2>
                    <p className="text-gray-600 mb-6">
                        {errorMessage}
                    </p>

                    {/* Error Details */}
                    <div className="bg-red-50 rounded-lg p-4 mb-6">
                        <div className="flex items-center justify-center gap-2 text-red-600">
                            <AlertCircle className="w-5 h-5" />
                            <span className="font-medium">Transaction Failed</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-2">
                            Please try again or contact support if the problem persists
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-3">
                        <button
                            onClick={onClose}
                            className="w-full bg-red-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-red-600 transition-colors"
                        >
                            Try Again
                        </button>
                        <button
                            onClick={onClose}
                            className="w-full bg-white text-gray-700 py-3 px-4 rounded-lg font-medium border border-gray-300 hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderFailedModal;