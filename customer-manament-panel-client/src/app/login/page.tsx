'use client';

import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useState } from 'react';
import Link from 'next/link';

type LoginFormInputs = {
    email: string;
    password: string;
};

const LoginPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();
    const router = useRouter();
    const [error, setError] = useState("")
    const onSubmit = async (data: LoginFormInputs) => {
        // Simulated API call

        try {

            setError("")
            const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER}/auth/login`, { email: data.email, password: data.password })

            Cookies.set('authToken', response.data?.accessToken, { expires: 7 });
            router.push('/');
        } catch {
            setError("Invalid credentials")
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white shadow-md rounded px-8 py-6 w-96 space-y-4"
            >
                <h2 className="text-2xl font-bold text-orangeFlavour mb-4">Login</h2>
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
                    Login
                </button>

                <p className='text-sm'>New user? <Link href="/register" className='text-blue-500'>
                    Register here</Link></p>
                <p className='text-red-500 text-sm'>{error} </p>
            </form>


        </div>
    );
};

export default LoginPage;
