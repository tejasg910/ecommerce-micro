import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import Modal from '../common/Modal';
import { ProductProps } from './Products';
import axios from 'axios';
import { Edit } from 'lucide-react';
import Cookies from "js-cookie"
type FormValues = {
    name: string;
    description: string;
    price: number;
    image: string;
    stock: number,
};
const EditProduct = ({ fetchProducts, product }: { fetchProducts: () => void, product: ProductProps }) => {


    const [isModalOpen, setIsModalOpen] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
        defaultValues: {

            name: product.name,
            description: product.description,
            price: Number(product.price),
            stock: product.stock,
            image: product.image

        }
    });

    const handleAddProductClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const onSubmit = async (data: FormValues) => {
        try {
            // Ensure price and stock are numbers
            const formData = {
                ...data,
                price: Number(data.price),
                stock: Number(data.stock),
            };
            const authToken = Cookies.get("authToken")

            const response = await axios.patch(`${process.env.NEXT_PUBLIC_SERVER}/api/products/${product.id}`, formData, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            });
            console.log('Product added successfully:', response.data);

            fetchProducts()
            setIsModalOpen(false);
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };
    return (
        <div>

            <button
                onClick={handleAddProductClick}
                type="submit"
                className="bg-orange-400 hover:bg-orange-500  text-white px-4 py-2 rounded-md  flex items-center gap-2 transition-colors duration-200"
            >
                <Edit size={18} />
                <span>Edit</span>
            </button>
            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                <h2 className="text-xl font-bold mb-4">Edit Product</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                        <label className="block text-gray-700 text-sm font-medium">Name</label>
                        <input
                            type="text"
                            {...register('name', { required: 'Name is required' })}
                            className="mt-1 p-2 text-gray-700 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
                        />
                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                    </div>

                    <div className="mb-3">
                        <label className="block text-gray-700 text-sm font-medium">Description</label>
                        <textarea
                            {...register('description', { required: 'Description is required' })}
                            className="mt-1 p-2 text-gray-700 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
                        />
                        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
                    </div>

                    <div className="mb-3">
                        <label className="block text-gray-700 text-sm font-medium">Price</label>
                        <input
                            type="text"
                            {...register('price', {
                                required: 'Price is required',
                                pattern: {
                                    value: /^[0-9]+$/,
                                    message: 'Only numbers are allowed'
                                }
                            })}
                            className="mt-1 p-2 text-gray-700 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
                        />
                        {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>}
                    </div>


                    <div className="mb-3">
                        <label className="block text-gray-700 text-sm font-medium">Stock</label>
                        <input

                            type="text"
                            {...register('stock', {
                                required: 'Stock is required',
                                pattern: {
                                    value: /^[0-9]+$/,
                                    message: 'Only numbers are allowed'
                                }
                            })}
                            className="mt-1 p-2 text-gray-700 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
                        />
                        {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>}
                    </div>

                    <div className="mb-3">
                        <label className="block text-gray-700 text-sm font-medium">Image URL</label>
                        <input

                            type="text"
                            {...register('image', { required: 'Image URL is required' })}
                            className="mt-1 p-2 text-gray-700 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
                        />
                        {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>}
                    </div>

                    <button type="submit" className="bg-orange-400 text-white px-4 py-2 rounded-md">
                        Save
                    </button>


                    <button onClick={handleCloseModal} className="bg-red-400 ml-4 text-white px-4 py-2 rounded-md">
                        Cancel
                    </button>
                </form>
            </Modal>
        </div>
    )
}

export default EditProduct