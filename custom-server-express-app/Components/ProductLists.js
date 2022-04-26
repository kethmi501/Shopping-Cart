import React, {useEffect, useState} from 'react';
import {toast} from "react-toastify";
import axios from "axios";
import SearchBar from "./SearchBar";


const ProductLists = () => {
    const [productObjArray, setProductObjArray] = useState([]);
    const [results, setResults] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');


    useEffect(() => {
        axios.get('/api/list-products')
            .then(res => {
                setProductObjArray(res.data.products);
                setResults(res.data.products);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    const addToCart = (id) => {
        axios.post('/api/add-to-cart', {
            productId: id
        }, {
            headers: {
                'authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => {
            toast.success("Product added to cart");
        }).catch(err => {
            console.log(err);
        })
    }

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    }

    useEffect(() => {
        if (searchTerm.trim().length > 0) {
            const results = productObjArray.filter(product => {
                return product.name.toLowerCase().includes(searchTerm.toLowerCase());
            });
            setResults(results);
        } else {
            setResults(productObjArray);
        }
    }, [searchTerm]);

    return (
        <div>
            <div className={`pt-10 px-96`}>
                <SearchBar
                    handleSearch={handleSearch}
                    searchTerm={searchTerm}
                />
            </div>
            <main
                className="max-w-2xl mx-auto py-24 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
                aria-labelledby="order-history-heading"
            >
                <div className="max-w-xl">
                    <h1 id="order-history-heading" className="text-3xl font-extrabold tracking-tight text-gray-900">
                        Products
                    </h1>
                    <p className="mt-2 text-sm text-gray-500">
                        Check the status of recent product,this is the lelli store i have all. :3
                    </p>
                </div>

                <div
                    className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
                    {results.map((product) => (
                        <div key={product._id}>
                            <div className="group relative">
                                <div
                                    className="aspect-w-1 aspect-h-1 bg-gray-200 rounded-md overflow-hidden group-hover:opacity-75">
                                    <img src={product.picture.url} alt={product.picture.name}
                                         className="object-center object-cover"/>
                                </div>
                                <h3 className="mt-4 text-sm text-gray-500">
                                    <a>
                                        <span className="absolute inset-0"/>
                                        {product.name}
                                    </a>
                                </h3>
                                <p className="mt-1 text-lg font-medium">
                                    {product.price} $
                                </p>
                            </div>
                            <button
                                // disabled={product.stock < 1}
                                onClick={() => {
                                    if (product.stock < 1) {
                                        toast.error("Product is out of stock")
                                        return;
                                    }
                                    addToCart(product._id)
                                    // toast.success("Product added")
                                    // alert('You clicked on the product: ' + product.productName)
                                }}
                                className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm text-white  w-full justify-center mt-4 ${product.stock > 0 ? 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500' : 'bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500'}`}>
                                {product.stock > 0 ? "Add to cart" : "Out of stock"}
                            </button>
                        </div>
                    ))}
                </div>
            </main>


        </div>
    );
};

export default ProductLists;
