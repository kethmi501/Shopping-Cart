import React, {useEffect, useState} from 'react';
import Link from "next/link";
import axios from "axios";
import {toast} from "react-toastify";


const ShoppingCart = () => {

    const [cartProductIdArray, setCartProductIdArray] = useState([]);

    useEffect(() => {
        fetchCart();
    }, []);

    const fetchCart = () => {
        axios.get('/api/fetch-cart', {
            headers: {
                'authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => {
            let counts = {};
            for (let i = 0; i < res.data.productArray.length; i++) {
                counts[res.data.productArray[i]] = 1 + (counts[res.data.productArray[i]] || 0);
            }
            let productIdArray = [];
            for (const countsKey in counts) {
                productIdArray.push({
                    id: countsKey,
                    count: counts[countsKey]
                })
            }
            axios.all(productIdArray.map(product =>
                axios.get(`/api/fetch-product/`, {
                    headers: {
                        'authorization': 'Bearer ' + localStorage.getItem('token')
                    },
                    params: {
                        productId: product.id
                    }
                })))
                .then(axios.spread((...responses) => {
                    let cartObjects = [];
                    for (let i = 0; i < responses.length; i++) {
                        if (responses[i].data.product) {
                            cartObjects.push({
                                productData: responses[i].data.product,
                                count: productIdArray[i].count
                            });
                        }
                    }
                    return cartObjects;
                }))
                .then(cartObjects => {
                    setCartProductIdArray(cartObjects);
                })
        }).then(() => {

        }).catch(err => {
            console.log(err);
        })
    }

    const removeOneItemFromCart = (id) => {
        axios.delete('/api/delete-from-cart', {
            headers: {
                'authorization': 'Bearer ' + localStorage.getItem('token')
            },
            data: {
                productId: id
            }
        }).then(res => {
            toast.success('Item removed from cart');

        }).then(() => {
            fetchCart();
        }).catch(err => {
            console.log(err);
        })
    }

    return (
        <main>
            <div className="max-w-2xl mx-auto py-16 px-4 sm:py-10 sm:px-6 lg:px-0">
                <h1 className="text-3xl font-extrabold text-center tracking-tight text-gray-900 sm:text-4xl">
                    Shopping Cart
                </h1>

                <form className="mt-12">
                    <section aria-labelledby="cart-heading">
                        <h2 id="cart-heading" className="sr-only">
                            Items in your shopping cart
                        </h2>

                        <ul role="list" className="border-t border-b border-gray-200 divide-y divide-gray-200">
                            {cartProductIdArray.map((product) => (
                                <>
                                    {product.productData ? <>
                                        <li key={product.productData._id} className="flex py-6">
                                            <div className="flex-shrink-0">
                                                <img
                                                    src={product.productData.picture.url}
                                                    alt={product.productData.picture.name}
                                                    className="w-24 h-24 rounded-md object-center object-cover sm:w-32 sm:h-32"
                                                />
                                            </div>

                                            <div className="ml-4 flex-1 flex flex-col sm:ml-6">
                                                <div>
                                                    <div className="flex justify-between">
                                                        <h4 className="text-sm">
                                                            <a href={product.href}
                                                               className="font-medium text-gray-700 hover:text-gray-800">
                                                                {product.productData.name}
                                                            </a>
                                                        </h4>
                                                        <p className="ml-4 text-sm font-medium text-gray-900">${parseInt(product.productData.price) * product.count}.00</p>
                                                    </div>
                                                    <p className="mt-1 text-sm text-gray-500">{product.productData.category}</p>
                                                    <p className="mt-1 text-sm text-gray-500">x {product.count}</p>
                                                </div>

                                                <div className="mt-4 flex-1 flex items-end justify-between">
                                                    <p className="flex items-center text-sm text-gray-700 space-x-2">
                                                        {/*<span>{`Product added ${new Date(new Date() -  new Date(product.productData.createdAt)).getHours()} Hours ago`}</span>*/}
                                                    </p>
                                                    <div className="ml-4">
                                                        <button
                                                            onClick={() => {
                                                                removeOneItemFromCart(product.productData._id)
                                                            }}
                                                            type="button"
                                                            className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                                                            <span>Remove</span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>

                                    </> : <>
                                        Product was not found
                                    </>}
                                </>
                            ))}
                        </ul>
                    </section>

                    {/* Order summary */}
                    <section aria-labelledby="summary-heading" className="mt-10">
                        <h2 id="summary-heading" className="sr-only">
                            Order summary
                        </h2>

                        <div>
                            <dl className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <dt className="text-base font-medium text-gray-900">Subtotal</dt>
                                    {cartProductIdArray.length > 0 ? (
                                        <dd className="text-base font-medium text-gray-900">
                                            ${cartProductIdArray.reduce((acc, current) => {
                                            return (
                                                acc +
                                                cartProductIdArray.find(product => product.productData._id === current.productData._id).productData.price *
                                                cartProductIdArray.find(product => product.productData._id === current.productData._id).count
                                            )
                                        }, 0)}.00
                                        </dd>
                                    ) : (
                                        <dd className="text-base font-medium text-gray-900">$0.00</dd>
                                    )}

                                </div>
                            </dl>
                            <p className="mt-1 text-sm text-gray-500">Shipping and taxes will be calculated at
                                checkout.</p>
                        </div>

                        <div className="mt-10">
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    toast.success("Order placed successfully");
                                }}
                                type="submit"
                                className="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
                            >
                                Checkout
                            </button>
                        </div>

                        <div className="mt-6 text-sm text-center text-gray-500">
                            <p>
                                or{' '}
                                <Link href={'/'}>
                                    <a href="/"
                                       className="text-indigo-600 font-medium hover:text-indigo-500">
                                        Continue Shopping<span aria-hidden="true"> &rarr;</span>
                                    </a>
                                </Link>
                            </p>
                        </div>
                    </section>
                </form>
            </div>
        </main>
    );
};

export default ShoppingCart;
