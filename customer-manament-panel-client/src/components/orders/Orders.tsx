import axios from 'axios'
import React from 'react'
import { cookies } from 'next/headers'
import { Order } from '@/types/orders'
import Image from 'next/image'
import { Package, Calendar, DollarSign, ShoppingCart } from 'lucide-react'
import ViewOrderButton from './ViewOrderButton'

const getOrders = async () => {
    try {



        const cookieStore = await cookies();

        const token = cookieStore.get('authToken')!;



        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_SERVER}/orders/user`, {
            headers: {
                'Authorization': `Bearer ${token.value!}`,
                'Content-Type': 'application/json'
            }
        });

        if (data) {
            return { success: true, data }
        }
        else {
            return { success: false, error: "Error while fetching data" }
        }

    } catch (error) {

        console.log(error)
        return { success: false, error: "Error while fetching data" }
    }
}
const Orders = async () => {


    let data: Order[] = []
    const result = await getOrders();

    if (result.success) {
        data = result.data;
    }

    console.log(data, "this is data")

    return (


        <div className="min-h-screen bg-background text-foreground p-4 sm:p-6 md:p-8">
            <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-orangeFlavour-dark">Your Orders</h1>
            {data && data.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {data.map((order) => (
                        <div key={order.id} className="bg-white rounded-lg shadow-md p-4 sm:p-6 border-l-4 border-orange-500">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                                <div>
                                    <h2 className="text-xl font-semibold text-orange-600">{order.customerName}</h2>
                                    <p className="text-sm text-gray-600">{order.customerEmail}</p>
                                </div>
                                <div className="flex items-center text-orange-400 mt-2 sm:mt-0">
                                    <Calendar className="mr-2" size={16} />
                                    <span className="text-sm">{new Date(order.createdAt).toLocaleDateString()}</span>
                                </div>
                            </div>
                            <div className="border-t border-gray-200 pt-4">
                                <h3 className="text-md font-semibold mb-2 flex items-center">
                                    <ShoppingCart className="mr-2 text-orange-500" size={16} />
                                    Order Items
                                </h3>
                                {order.items.slice(0, 2).map((item) => (
                                    <div key={item.id} className="flex items-center justify-between py-2">
                                        <div className="flex items-center">
                                            <div className="w-12 h-12 relative mr-3">
                                                <Image
                                                    src={item.productImage}
                                                    alt={item.productName}
                                                    layout="fill"
                                                    objectFit="cover"
                                                    className="rounded"
                                                />
                                            </div>
                                            <div>
                                                <h4 className="font-medium text-sm">{item.productName}</h4>
                                                <p className="text-xs text-gray-600">Quantity: {item.quantity}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center text-orange-600">
                                            <DollarSign className="mr-1" size={14} />
                                            <span className="font-semibold text-sm">{item.price}</span>
                                        </div>
                                    </div>
                                ))}
                                {order.items.length > 2 && (
                                    <p className="text-sm text-gray-600 mt-2">
                                        {order.items.length - 2} more item(s)...
                                    </p>
                                )}
                            </div>
                            <div className="mt-4 flex justify-between items-center">
                                <div className="bg-orange-100 text-orange-600 py-1 px-3 rounded-full flex items-center">
                                    <Package className="mr-1" size={14} />
                                    <span className="font-semibold text-xs">Order #{order.id}</span>
                                </div>
                                <ViewOrderButton order={order} />
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <h2 className="text-xl sm:text-3xl text-center font-bold mt-6 text-gray-500">
                    No orders placed yet
                </h2>
            )}
        </div>
    )
}

export default Orders