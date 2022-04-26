import React, {useEffect, useRef, useState} from 'react';
import {toast} from "react-toastify";
import {firebaseApp} from "../../firebase";
import {getStorage, ref, uploadBytes, getDownloadURL, deleteObject} from "firebase/storage";
import axios from "axios";


const Add = () => {

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState({
        name: '',
        url: ''
    });
    const [category, setCategory] = useState('');
    const [stock, setStock] = useState('');

    useEffect(() => {
        // toast.error("You need to be logged in to add a product");
    }, []);

    const fileInputRef = useRef();

    const addPicture = (event) => {
        const file = event.target.files[0];
        const fileName = `${Date.now()}-${file.name}`;
        const storageRef = getStorage(firebaseApp);
        const fileRef = ref(storageRef, `images/${fileName}`);

        uploadBytes(fileRef, file).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                setImage({
                    name: `${fileName}`,
                    url: url
                });
                return url;
            });
        });
    }

    const removePicture = () => {
        const storageRef = getStorage(firebaseApp);
        const fileRef = ref(storageRef, `images/${image.name}`);

        deleteObject(fileRef).then(() => {
            setImage({
                name: '',
                url: ''
            });
        });
    }

    const addProduct = () => {
        if (name === '' || price === '' || category === '' || stock === '' || image.url === '') {
            toast.error("Please fill in all the fields");
        } else {
            axios.post('/api/add-product', {
                name,
                price,
                category,
                stock,
                image
            }, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }).then(() => {
                toast.success("Product added successfully");
                setName('');
                setPrice('');
                setCategory('');
                setStock('');
                setImage({
                    name: '',
                    url: ''
                });
            }).catch(() => {
                toast.error("Something went wrong");
            });
        }
    }


    return (
        <div>
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md ">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <p className={`text-2xl font-semibold pb-2 text-indigo-600`}>Add Product</p>
                    <form className="space-y-6" action="pages/product/addProduct#index.js" method="POST">
                        <div>
                            <label htmlFor="productName" className="block text-sm font-medium text-gray-700">
                                Product Name
                            </label>
                            <div className="mt-1">
                                <input
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    id="productName"
                                    name="productName"
                                    type="text"
                                    autoComplete="off"
                                    required
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="productName" className="block text-sm font-medium text-gray-700">
                                Product Price
                            </label>
                            <div className="mt-1">
                                <input
                                    value={price}
                                    onChange={(e) => {
                                        if (e.target.value === "") {
                                            setPrice("");
                                        } else if (!isNaN(parseInt(e.target.value))) {
                                            setPrice(parseInt(e.target.value));
                                        }
                                    }}
                                    id="productName"
                                    name="productName"
                                    type="text"
                                    autoComplete="off"
                                    required
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                        </div>

                        {image.url.toString().trim().length === 0 ? <>
                            <div>

                                <input
                                    accept={"image/*"}
                                    onChange={addPicture} multiple={false} ref={fileInputRef} type='file' hidden/>

                                <button
                                    onClick={() => fileInputRef.current.click()}
                                    type="button"
                                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-full justify-center"
                                >
                                    Add photo
                                </button>

                            </div>
                        </> : <>
                            <div>
                                <img
                                    className={`mx-auto my-auto w-40 h-40 object-cover object-center rounded-lg border-2 border-indigo-600 shadow-lg`}
                                    src={image.url}
                                    alt="cat"/>
                                <br/>
                                <button
                                    onClick={removePicture}
                                    type="button"
                                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 w-full justify-center"
                                >
                                    Remove photo
                                </button>
                            </div>
                        </>}


                        <div>
                            <label htmlFor="productName" className="block text-sm font-medium text-gray-700">
                                Product Category
                            </label>
                            <div className="mt-1">
                                <input
                                    value={category}
                                    onChange={(e) => {
                                        setCategory(e.target.value)
                                    }}
                                    id="productName"
                                    name="productName"
                                    type="text"
                                    autoComplete="off"
                                    required
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="productName" className="block text-sm font-medium text-gray-700">
                                Product Stock
                            </label>
                            <div className="mt-1">
                                <input
                                    value={stock}
                                    onChange={(e) => {
                                        if (e.target.value === "") {
                                            setStock("");
                                        } else if (!isNaN(parseInt(e.target.value))) {
                                            setStock(parseInt(e.target.value));
                                        }
                                    }}
                                    id="productName"
                                    name="productName"
                                    type="text"
                                    autoComplete="off"
                                    required
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                        </div>


                        <div>
                            <button
                                onClick={addProduct}
                                type="button"
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Add product
                            </button>
                        </div>
                    </form>
                    <div className="mt-6">
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Add;
