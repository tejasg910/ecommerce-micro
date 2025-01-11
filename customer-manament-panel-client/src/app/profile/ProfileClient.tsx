'use client'

import { useState, useEffect } from 'react';
import { User } from '../../types/user';
import ProfileUpdate from '@/components/profile/ProfileUpdate';
import axios from 'axios';
import Cookie from "js-cookie"
import { useRouter } from 'next/navigation';



export default function ProfileClient() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const getUserData = async () => {
            try {
                setLoading(true);
                const token = Cookie.get("authToken");
                if (!token) {
                    throw new Error("No auth token found");
                }
                const { data } = await axios.get<User>(`${process.env.NEXT_PUBLIC_SERVER}/auth/profile`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (data) {
                    setUser(data);
                } else {
                    throw new Error("User data not found");
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
                setError("Failed to load user data. Please try again later.");
                // Redirect to 404 page if user is not found
                if (axios.isAxiosError(error) && error.response?.status === 404) {
                    router.push('/404');
                }
            } finally {
                setLoading(false);
            }
        }
        getUserData();

    }, []);



    const handleUpdate = async (updatedUser: Partial<Omit<User, 'id' | 'email' | 'createdAt' | 'updatedAt'>>) => {
        try {
            setLoading(true);
            const token = Cookie.get("authToken");
            if (!token || !user) {
                throw new Error("No auth token or user data found");
            }
            const { data } = await axios.put<User>(
                `${process.env.NEXT_PUBLIC_SERVER}/auth/profile`,
                updatedUser,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setUser(prevUser => {
                if (prevUser) {
                    return {
                        ...prevUser,
                        ...data,
                        updatedAt: new Date().toISOString()
                    };
                }
                return data;
            });
        } catch (error) {
            console.error('Error updating user:', error);
            setError("Failed to update user data. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="min-h-screen bg-gray-100 flex items-center justify-center">Loading...</div>;
    }

    if (error) {
        return <div className="min-h-screen bg-gray-100 flex items-center justify-center text-red-500">{error}</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 py-12">
            {user ? (
                <ProfileUpdate user={user} onUpdate={handleUpdate} />
            ) : (
                <div className="text-center">User not found. Please log in again.</div>
            )}
        </div>
    );
}

