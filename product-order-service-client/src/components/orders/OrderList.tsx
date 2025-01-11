'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Calendar, MapPin, DollarSign, ShoppingCart, Check, X, User } from 'lucide-react';
import { Order } from '@/types/Orders';
import Image from 'next/image';
import Cookies from "js-cookie"
import Login from '../login/Login';
interface OrderListProps {
    initialOrders: Order[];
    total: number;
    initialPage: number;
}

export function OrderList({ initialOrders, total, initialPage }: OrderListProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const isLoggedIn = !!Cookies.get('authToken');

    const updatePage = (page: number) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', page.toString());
        router.push(`?${params.toString()}`);
    };


    if (!isLoggedIn) {
        return <Login />
    }

    return (
        <div className="w-full mx-auto p-4 sm:p-6 lg:p-8 mt-6">
            <div className="flex items-center mb-8 bg-orange-500 text-white p-4 rounded-lg">
                <ShoppingCart className="w-6 h-6 sm:w-8 sm:h-8 mr-3" />
                <h1 className="text-xl sm:text-3xl font-bold">Your Orders ({total})</h1>
            </div>

            <div className="overflow-x-auto bg-white rounded-xl shadow-lg border border-orange-100">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs text-white uppercase bg-orange-500">
                        <tr>
                            <th className="px-4 py-3">Order ID</th>
                            <th className="px-4 py-3">Date</th>
                            <th className="px-4 py-3">Name</th>
                            <th className="px-4 py-3">Address</th>

                            <th className="px-4 py-3">Items</th>
                            <th className="px-4 py-3">Total</th>
                            <th className="px-4 py-3">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {initialOrders && initialOrders.map((order) => (
                            <tr key={order.id} className="border-b border-orange-100 hover:bg-orange-50">
                                <td className="px-4 py-3 font-medium">#{order.id}</td>
                                <td className="px-4 py-3">
                                    <div className="flex items-center">
                                        <Calendar className="w-4 h-4 mr-2 text-orange-500" />
                                        {new Date(order.createdAt).toLocaleDateString()}
                                    </div>
                                </td>

                                <td className="px-4 py-3">
                                    <div className="flex items-center">
                                        <User className="w-4 h-4 mr-2 text-orange-500" />
                                        {order.fullName}
                                    </div>
                                </td>
                                <td className="px-4 py-3">
                                    <div className="flex items-center">
                                        <MapPin className="w-4 h-4 mr-2 text-orange-500" />
                                        {order.address}
                                    </div>
                                </td>
                                <td className="px-4 py-3">
                                    <div className="flex flex-col space-y-1">
                                        {order.items.map((item) => (
                                            <div key={item.id} className="flex items-center">
                                                <div className="relative w-8 h-8 mr-2 rounded overflow-hidden">
                                                    <Image
                                                        src={item.product.image}
                                                        alt={item.product.name}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                                <span className="font-medium">{item.product.name}</span>
                                                <span className="ml-2 text-gray-500">x{item.quantity}</span>
                                            </div>
                                        ))}
                                    </div>
                                </td>
                                <td className="px-4 py-3">
                                    <div className="flex items-center font-bold text-orange-600">
                                        <DollarSign className="w-4 h-4 mr-1" />
                                        {order.totalPrice}
                                    </div>
                                </td>
                                <td className="px-4 py-3">
                                    {order.status === 'active' ? (
                                        <span className="px-2 py-1 text-xs font-semibold text-green-800 bg-green-100 rounded-full flex items-center w-min">
                                            <Check className="w-3 h-3 mr-1" />
                                            Active
                                        </span>
                                    ) : (
                                        <span className="px-2 py-1 text-xs font-semibold text-red-800 bg-red-100 rounded-full flex items-center w-min">
                                            <X className="w-3 h-3 mr-1" />
                                            Deleted
                                        </span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-center mt-8 gap-2">
                {Array.from({ length: Math.ceil(total / 10) }, (_, i) => (
                    <button
                        key={i + 1}
                        onClick={() => updatePage(i + 1)}
                        className={`px-4 sm:px-6 py-2 rounded-full font-medium transition-colors ${initialPage === i + 1
                            ? 'bg-orange-500 text-white'
                            : 'bg-white text-orange-500 hover:bg-orange-100'
                            }`}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>
        </div>
    );
}

