"use client"

import { Order } from '@/types/orders'
import { Eye } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

const ViewOrderButton = ({ order }: { order: Order }) => {

    const router = useRouter()
    return (
        <button
            onClick={() => router.push(`/${order.id}`)}
            className="flex items-center bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded-md text-sm transition-colors duration-200"
        >
            <Eye className="mr-2" size={16} />
            View Details
        </button>
    )
}

export default ViewOrderButton