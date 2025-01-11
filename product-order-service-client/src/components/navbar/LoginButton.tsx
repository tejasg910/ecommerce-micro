"use client"
import Link from 'next/link'
import React from 'react'
import Cookies from 'js-cookie';
const LoginButton = () => {
    const isLoggedIn = !!Cookies.get('authToken');
    const token = Cookies.get('authToken');
    console.log(isLoggedIn, token, "this is is logged in")
    const handleLogout = () => {
        Cookies.remove('authToken');
        window.location.href = '/';
    };

    console.log(isLoggedIn, "This s lgout")
    return (
        <>

            <Link href="/">Home</Link>
            {isLoggedIn ? (
                <button onClick={handleLogout}>Logout</button>
            ) : (
                <Link href="/login">Login</Link>
            )} </>
    )
}

export default LoginButton