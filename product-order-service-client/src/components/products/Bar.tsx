import React, { useState } from 'react';
import Modal from '../common/Modal';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Cookies from "js-cookie"
type FormValues = {
    name: string;
    description: string;
    price: number;
    image: string;
    stock: number,
};


type BarProps = {
    fetchProducts: () => void;
}

const Bar: React.FC<BarProps> = ({ fetchProducts }) => {

    const isLoggedIn = Cookies.get("authToken")
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();

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
            const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER}/api/products/create`, formData,
                {
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
        <div className="bg-orange-400 text-white p-4 flex justify-between items-center">
            <h1 className="text-xl font-bold">Products</h1>
            {isLoggedIn && <button
                onClick={handleAddProductClick}
                className="bg-white text-orange-400 hover:bg-gray-200 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-600"
            >
                Add Product
            </button>}

            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                <h2 className="text-xl font-bold mb-4">Add Product</h2>
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
    );
};

export default Bar;
