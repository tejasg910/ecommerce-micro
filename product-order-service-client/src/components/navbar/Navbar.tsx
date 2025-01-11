import React from 'react';
import LoginButton from './LoginButton';
import CartCount from './CartCount';
import Link from 'next/link';



const Navbar = () => {
    return (
        <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
            {/* Logo Section */}
            <div className="text-2xl font-bold text-orange-500">
                <Link href="/">ShopEasy</Link>
            </div>

            {/* Right Section: Login Button and Cart */}
            <div className="flex items-center space-x-6">
                <Link href="/orders">Orders</Link>

                <LoginButton />

                {/* Cart Icon */}


                <CartCount />



            </div>
        </nav>
    );
};

export default Navbar;
