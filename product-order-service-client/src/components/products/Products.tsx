"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Bar from './Bar';
import AddToCartButton from './AddToCart';
import useCartStore from '@/cart/useCartStore';
import Image from 'next/image';
import Modal from '../common/Modal';
import { useForm } from 'react-hook-form';
import EditProduct from './EditProduct';
import DeleteProduct from './DeleteProduct';
export interface ProductProps {
    id: string,
    name: string,
    image: string,
    description: string,
    price: string,
    stock?: number
}





const Product: React.FC = () => {
    const [products, setProducts] = useState<ProductProps[]>([]);
    const { addItem } = useCartStore()


    const fetchProducts = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER}/api/products/get`);
            setProducts(response.data);
        } catch (error) {
            console.error('Failed to fetch products:', error);
        }
    };
    useEffect(() => {
        // Fetch products from API


        fetchProducts();
    }, []);

    // Handle Add to Cart
    const addToCart = (product: ProductProps) => {
        const cart = JSON.parse(localStorage.getItem('commerse-cart') || '[]');
        cart.push({ ...product, quantity: 1 });
        // localStorage.setItem('commerse-cart', JSON.stringify(cart));

        const productData = {


            id: product.id,
            name: product.name,
            price: Number(product.price),
            quantity: 1,
            image: product.image
        }
        addItem(productData)

    };


    if (products.length === 0) {
        return <div className="container mx-auto p-4">

            <Bar fetchProducts={fetchProducts} />

            <h2 className='text-center mt-6 text-xl font-semibold'>No product found</h2>
        </div>
    }

    return (
        <div className="container mx-auto p-4">

            <Bar fetchProducts={fetchProducts} />
            <div className="grid grid-cols-3 gap-4 mt-2">
                {products.map(product => (
                    <div key={product.id} className="border  rounded-lg shadow-lg p-4">

                        <img src={product.image || '/default-product.jpg'} alt={product.name} className="w-full h-48 object-cover mb-4 rounded-md" />
                        <h2 className="text-2xl font-semibold">{product.name.toUpperCase()}</h2>
                        <p className="text-gray-600 mt-2">{product.description}</p>
                        <div className='md:flex-row flex-col flex justify-between mt-2'>


                            <p className="text-gray-800 mt-2">${product.price}</p>
                            <div className="flex flex-wrap items-center gap-2">

                                <DeleteProduct
                                    fetchProducts={fetchProducts}
                                    product={product}
                                />
                                <EditProduct
                                    fetchProducts={fetchProducts}
                                    product={product}
                                />

                                <div className="flex-grow">
                                    <AddToCartButton
                                        addToCart={addToCart}
                                        product={product}
                                    />
                                </div>

                            </div>
                        </div>

                    </div>
                ))}
            </div>


        </div>
    );
};

export default Product;
