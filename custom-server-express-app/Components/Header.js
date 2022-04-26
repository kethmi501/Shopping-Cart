import React, {useEffect, useState} from 'react';
import Link from "next/link";
import {ShoppingCartIcon} from '@heroicons/react/solid'
import {useRouter} from "next/router";


const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const navigation = [
        {name: 'Home', href: '/'},
        {name: 'Products', href: '/products'},
    ]

    const router = useRouter();

    useEffect(() => {
        if (localStorage && JSON.parse(localStorage.getItem('user'))) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, [router.pathname]);


    return (
        <header className="bg-indigo-600">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
                <div
                    className="w-full py-6 flex items-center justify-between border-b border-indigo-500 lg:border-none">
                    <div className="flex items-center">
                        <Link href={"/"}><a>
                            <span className="sr-only">Lelli Production</span>
                            <img
                                className="h-10 w-auto"
                                src="https://firebasestorage.googleapis.com/v0/b/shopping-cart-1-ab2ea.appspot.com/o/Facebook%20Post%20940x788%20px.png?alt=media&token=dec35dd7-6d95-4dc8-a9b4-9ba0f59f1cbb"
                                alt=""
                            />
                        </a></Link>
                        <div className="hidden ml-10 space-x-8 lg:block">
                            <Link href={'/'}>
                                <a className="text-base font-medium text-white hover:text-indigo-50">
                                    Home
                                </a>
                            </Link>
                            {isLoggedIn && <Link href={'/products'}>
                                <a className="text-base font-medium text-white hover:text-indigo-50">
                                    Products
                                </a>
                            </Link>}
                        </div>
                    </div>
                    {!isLoggedIn ? <>
                        <div className="ml-10 space-x-4">
                            <Link href={'/register'}><a
                                className="inline-block bg-indigo-500 py-2 px-4 border border-transparent rounded-md text-base font-medium text-white hover:bg-opacity-75"
                            >
                                Register
                            </a></Link>
                            <Link href={'/login'}><a
                                className="inline-block bg-white py-2 px-4 border border-transparent rounded-md text-base font-medium text-indigo-600 hover:bg-indigo-50"
                            >
                                Login
                            </a></Link>
                        </div>
                    </> : <>
                        <div className="ml-10 space-x-4">
                            <button
                                onClick={async () => {
                                    await router.push('/shoppingCart')
                                }}
                                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-indigo-500 hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                <ShoppingCartIcon className="-ml-1 mr-3 h-5 w-5" aria-hidden="true"/>
                                Shopping Cart
                            </button>
                            <Link
                                href={'/logout'}><a
                                className="inline-block bg-white py-2 px-4 border border-transparent rounded-md text-base font-medium text-indigo-600 hover:bg-indigo-50 relative bottom-1"
                            >
                                Logout
                            </a></Link>
                        </div>
                    </>
                    }

                </div>
                <div className="py-4 flex flex-wrap justify-center space-x-6 lg:hidden">
                    {navigation.map((link) => (
                        <a key={link.name} href={link.href}
                           className="text-base font-medium text-white hover:text-indigo-50">
                            {link.name}
                        </a>
                    ))}
                </div>
            </nav>
        </header>
    );
};

export default Header;
