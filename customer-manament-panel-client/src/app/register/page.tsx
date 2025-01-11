'use client';

import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

type RegisterFormInputs = {
    email: string;
    password: string;
    fullName: string
};

const RegisterPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormInputs>();
    const [error, setError] = useState("")
    const router = useRouter()
    const onSubmit = async (formdata: RegisterFormInputs) => {
        // alert(`Registered with email: ${data.email}`);
        // Simulate registration API call

        try {



            await axios.post(`${process.env.NEXT_PUBLIC_SERVER}/auth/register`, formdata);

            router.push("/")

        } catch {

            setError('An unknown error occurred')

        }

    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white shadow-md rounded px-8 py-6 w-96 space-y-4"
            >
                <h2 className="text-2xl font-bold text-orangeFlavour mb-4">Register</h2>

                <div>
                    <input
                        type="text"
                        placeholder="Full name"
                        {...register('fullName', { required: 'fullName is required' })}
                        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orangeFlavour-light"
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                    )}
                </div>
                <div>
                    <input
                        type="email"
                        placeholder="Email"
                        {...register('email', { required: 'Email is required' })}
                        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orangeFlavour-light"
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                    )}
                </div>
                <div>
                    <input
                        type="password"
                        placeholder="Password"
                        {...register('password', { required: 'Password is required' })}
                        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orangeFlavour-light"
                    />
                    {errors.password && (
                        <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                    )}
                </div>
                <button
                    type="submit"
                    className="w-full bg-orangeFlavour text-white py-2 rounded hover:bg-orangeFlavour-dark"
                >
                    Register
                </button>

                <p className='text-sm'>Already registered? <Link href="/login" className='text-blue-500'>
                    Login here</Link></p>
                <p className='text-red-500 text-sm'>{error} </p>
            </form>
        </div>
    );
};

export default RegisterPage;
