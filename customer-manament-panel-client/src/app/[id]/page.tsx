import axios from 'axios'
import { Order } from '@/types/orders'
import OrderDetails from '@/components/orders/OrderDetails'
import { cookies } from 'next/headers'
const getOrder = async (id: string) => {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('authToken')

    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_SERVER}/orders/${id}`, {
      headers: {
        'Authorization': `Bearer ${token?.value}`,
        'Content-Type': 'application/json'
      }
    })

    if (data) {
      return { success: true, data }
    } else {
      return { success: false, error: "Error while fetching order" }
    }
  } catch (error) {
    console.error(error)
    return { success: false, error: "Error while fetching order" }
  }
}

export default async function OrderDetailsPage({ params }: { params: Promise<{ id: string }> }) {

  const { id } = await params;
  const result = await getOrder(id)
  const order: Order | null = result.success ? result.data : null

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-100 text-gray-900 p-4 sm:p-6 md:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-orange-600">Order Details</h1>
        <p className="text-xl text-center font-bold mt-6 text-gray-500">Order not found</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 p-4 sm:p-6 md:p-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-orange-600">Order Details</h1>
      <OrderDetails order={order} />
    </div>
  )
}

