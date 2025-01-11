"use client";
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type FormValues = {
    email: string;
    password: string;
};

const Login: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
    const router = useRouter();
    const [loginError, setLoginError] = useState<string | null>(null);

    const onSubmit = async (data: FormValues) => {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER}/api/auth/login`, data);
            console.log(response.data.data.token)
            if (response.status === 201) {
                Cookies.set('authToken', response.data.data.token);
                router.push('/');
            }
        } catch (error) {
            console.error('Login failed:', error);
            setLoginError('Invalid email or password. Please try again.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-medium">Email</label>
                        <input
                            type="email"
                            {...register('email', { required: 'Email is required' })}
                            className="mt-1 p-3 text-gray-700 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-medium">Password</label>
                        <input
                            type="password"
                            {...register('password', { required: 'Password is required' })}
                            className="mt-1 p-3 text-gray-700 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
                        />
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                    </div>
                    {loginError && <p className="text-red-500 text-sm mt-4">{loginError}</p>}
                    <button
                        type="submit"
                        className="w-full bg-orange-400 hover:bg-orange-500 text-white py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-600"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
