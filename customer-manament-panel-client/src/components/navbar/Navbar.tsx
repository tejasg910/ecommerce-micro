'use client'

import Link from 'next/link'
import { useState } from 'react'
import { User, LogOut, Menu, X } from 'lucide-react'
import Cookies from "js-cookie"
import { useRouter } from 'next/navigation'
const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const router = useRouter()


    const handleLogout = () => {
        Cookies.remove('authToken')
        router.push('/login')
    }

    return (
        <nav className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex-shrink-0 flex items-center">
                        <Link href="/" className="text-2xl font-bold text-orangeFlavour">
                            YourLogo
                        </Link>
                    </div>

                    {/* Desktop menu */}
                    <div className="hidden sm:flex sm:items-center">
                        <Link
                            href="/profile"
                            className="text-gray-600 hover:text-orangeFlavour px-3 py-2 rounded-md text-sm font-medium flex items-center"
                        >
                            <User size={18} className="mr-1" />
                            Profile
                        </Link>
                        <button
                            className="text-gray-600 hover:text-orangeFlavour px-3 py-2 rounded-md text-sm font-medium flex items-center"
                            onClick={handleLogout}
                        >
                            <LogOut size={18} className="mr-1" />
                            Logout
                        </button>
                    </div>

                    {/* Mobile menu button */}
                    <div className="sm:hidden flex items-center">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-orangeFlavour hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orangeFlavour"
                        >
                            {isMenuOpen ? (
                                <X className="block h-6 w-6" aria-hidden="true" />
                            ) : (
                                <Menu className="block h-6 w-6" aria-hidden="true" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isMenuOpen && (
                <div className="sm:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        <Link
                            href="/profile"
                            className="text-gray-600 hover:text-orangeFlavour block px-3 py-2 rounded-md text-base font-medium"
                        >
                            Profile
                        </Link>
                        <button
                            className="text-gray-600 hover:text-orangeFlavour block w-full text-left px-3 py-2 rounded-md text-base font-medium"
                            onClick={() => {/* Add logout logic here */ }}
                        >
                            Logout
                        </button>
                    </div>
                </div>
            )}
        </nav>
    )
}

export default Navbar

