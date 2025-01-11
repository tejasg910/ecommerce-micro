import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import Modal from '../common/Modal';
import { ProductProps } from './Products';
import axios from 'axios';
import Cookies from "js-cookie"
import { Trash2 } from 'lucide-react';
type FormValues = {
    name: string;
    description: string;
    price: number;
    image: string;
    stock: number,
};
const DeleteProduct = ({ fetchProducts, product }: { fetchProducts: () => void, product: ProductProps }) => {


    const [isModalOpen, setIsModalOpen] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();

    const handleAddProductClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const onDelete = async () => {
        try {

            const authToken = Cookies.get("authToken")

            const response = await axios.delete(`${process.env.NEXT_PUBLIC_SERVER}/api/products/${product.id}`, {
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
                className="bg-orange-400 hover:bg-orange-500 text-white px-4 py-2 rounded-md  flex items-center gap-2 transition-colors duration-200"
            >
                <Trash2 size={18} />
                <span>Delete</span>
            </button>
            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                <h2 className="text-xl font-bold mb-4">Edit Product</h2>
                <h4 className='text-lg'>Are you sure to delete this product?</h4>
                <div className='flex justify-end mt-6'>


                    <button onClick={handleCloseModal} className="bg-orange-400 text-white px-4 py-2 rounded-md">
                        Cancel
                    </button>


                    <button onClick={onDelete} className="bg-red-400 ml-4 text-white px-4 py-2 rounded-md">
                        Delete
                    </button>

                </div>

            </Modal>
        </div>
    )
}

export default DeleteProduct