'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { Order } from '@/types/orders'
import { Calendar, DollarSign, ShoppingCart, Package, Trash2 } from 'lucide-react'

interface OrderDetailsProps {
  order: Order
}

export default function OrderDetails({ order }: OrderDetailsProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const router = useRouter()

  const handleDeleteOrder = async () => {
    setIsDeleting(true)
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_SERVER}/orders/${order.id}`, {
        headers: {
          'Authorization': `Bearer ${document.cookie.replace(/(?:(?:^|.*;\s*)authToken\s*\=\s*([^;]*).*$)|^.*$/, "$1")}`,
          'Content-Type': 'application/json'
        }
      })
    //   router.push('/orders')
      router.refresh()
    } catch (error) {
      console.error('Error deleting order:', error)
      // Handle error (e.g., show an error message to the user)
    } finally {
      setIsDeleting(false)
      setIsDeleteDialogOpen(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-orange-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-orange-600">{order.customerName}</h2>
          <p className="text-sm text-gray-600">{order.customerEmail}</p>
        </div>
        <div className="flex items-center text-orange-400 mt-2 sm:mt-0">
          <Calendar className="mr-2" size={18} />
          <span className="text-sm">{new Date(order.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <ShoppingCart className="mr-2 text-orange-500" size={20} />
          Order Items
        </h3>
        <div className="space-y-4">
          {order.items.map((item) => (
            <div key={item.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
              <div className="flex items-center">
                <div className="w-16 h-16 relative mr-4">
                  <Image
                    src={item.productImage}
                    alt={item.productName}
                    layout="fill"
                    objectFit="cover"
                    className="rounded"
                  />
                </div>
                <div>
                  <h4 className="font-medium">{item.productName}</h4>
                  <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                </div>
              </div>
              <div className="flex items-center text-orange-600">
                <DollarSign className="mr-1" size={16} />
                <span className="font-semibold">{item.price}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-6 flex justify-between items-center">
        <div className="bg-orange-100 text-orange-600 py-2 px-4 rounded-full flex items-center">
          <Package className="mr-2" size={18} />
          <span className="font-semibold">Order #{order.id}</span>
        </div>
        <button
          onClick={() => setIsDeleteDialogOpen(true)}
          className="flex items-center bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors duration-200"
        >
          <Trash2 className="mr-2" size={18} />
          Delete Order
        </button>
      </div>

      {isDeleteDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-4">Are you sure you want to delete this order?</h3>
            <p className="text-gray-600 mb-6">
              This action cannot be undone. This will permanently delete the order and remove the data from our servers.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsDeleteDialogOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteOrder}
                disabled={isDeleting}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-200 disabled:opacity-50"
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

