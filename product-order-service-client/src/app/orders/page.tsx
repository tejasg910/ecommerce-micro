import Orders from '@/components/orders/Orders'
import React from 'react'
interface PageProps {
    searchParams: Promise<{
        page?: string;
    }>
}

const Page = async ({ searchParams }: PageProps) => {
    // Await the searchParams
    const params = await searchParams;

    return (
        <div>
            <Orders searchParams={params} />
        </div>
    )
}

export default Page