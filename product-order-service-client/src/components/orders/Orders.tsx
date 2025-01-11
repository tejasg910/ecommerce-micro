// app/orders/page.tsx

import { OrderList } from "./OrderList";

async function getOrders(page: number = 1, limit: number = 10) {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER}/api/orders?page=${page}&limit=${limit}`
            
        );
        return res.json();
    } catch (error) {
        console.error(error);
        return { items: [], total: 0 };
    }
}

export default async function OrdersPage({
    searchParams,
}: {
    searchParams: { page?: string | undefined };
}) {
    const page = Number(searchParams?.page) || 1;
    const { items: orders, total } = await getOrders(page);
    console.log(orders, "this isdata")
    return <OrderList initialOrders={orders} total={total} initialPage={page} />;
}