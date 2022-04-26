import React, {useEffect, useState} from 'react';
import {useRouter} from "next/router";
import axios from "axios";
import Link from "next/link";


const Products = () => {
    const [sellerObjArray, setSellerObjArray] = useState([]);

    const router = useRouter();

    useEffect(() => {
        fetchSellerProducts();
    }, []);

    const fetchSellerProducts = () => {
        axios.get('/api/list-seller-products', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => {
            setSellerObjArray(res.data.products);
        }).catch(err => {
            console.log(err);
        })

    }


    const deleteProduct = (id) => {
        axios.delete('/api/delete-product/', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            data: {
                _id: id
            }
        }).then(res => {
            fetchSellerProducts()
        }).catch(err => {
            console.log(err);
        })
    }

    return (
        <div className="px-4 sm:px-10 lg:px-96">
            <br/>
            <br/>
            <br/>
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">

                    
                    <h1 className="text-xl font-semibold text-gray-900">Products</h1>
                    <p className="mt-2 text-sm text-gray-700">
                        A list of all the products that you have added to your store.
                    </p>
                </div>
                <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                    <button
                        onClick={async () => {
                            await router.push('/product/add')
                        }}
                        type="button"
                        className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                    >
                        Add Product
                    </button>
                </div>
            </div>
            <div className="mt-8 flex flex-col">
                <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-300">
                                <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col"
                                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                        Name
                                    </th>
                                    <th scope="col"
                                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Price
                                    </th>
                                    <th scope="col"
                                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Status
                                    </th>
                                    <th scope="col"
                                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Category
                                    </th>
                                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                        <span className="sr-only">Edit</span>
                                    </th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                {sellerObjArray.map((singleProduct) => (
                                    <tr key={singleProduct._id}>
                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                                            <div className="flex items-center">
                                                <div className="h-10 w-10 flex-shrink-0">
                                                    <img className="h-10 w-10 rounded-md"
                                                         src={singleProduct.picture.url}
                                                         alt=""/>
                                                </div>
                                                <div className="ml-4">
                                                    <div
                                                        className="font-medium text-gray-900">{singleProduct.name}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                            <div className="text-gray-900">{singleProduct.price}</div>
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                            {singleProduct.stock > 0 ? <>
                                                <span
                                                    className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                                                    In Stock
                                                </span>
                                            </> : <>
                                                <span
                                                    className="inline-flex rounded-full bg-red-100 px-2 text-xs font-semibold leading-5 text-red-800">
                                                    Out of Stock
                                                </span>
                                            </>}


                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{singleProduct.category}</td>
                                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                            <Link href={`/product/edit/${singleProduct._id}`}><a href="#"
                                                     className="text-indigo-600 hover:text-indigo-900 cursor-pointer">
                                                Edit<span className="sr-only">, {singleProduct.name}</span>
                                            </a></Link>
                                            &nbsp;&nbsp;&nbsp;&nbsp;
                                            <a
                                                onClick={() => {
                                                    deleteProduct(singleProduct._id)
                                                }}
                                                className="text-indigo-600 hover:text-indigo-900 cursor-pointer">
                                                Delete
                                                <span className="sr-only">, {singleProduct.name}</span>
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Products;
