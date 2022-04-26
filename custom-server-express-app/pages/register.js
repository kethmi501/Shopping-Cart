import React, {useEffect, useState} from 'react';
import {toast} from "react-toastify";
import {useRouter} from "next/router";
import axios from "axios";

const Register = () => {

    const router = useRouter();

    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');


    const registerUser = () => {
        if (password !== rePassword) {
            toast.error('Passwords do not match');
            return;
        }
        if (userName.length < 3) {
            toast.error('Username must be at least 3 characters long');
            return;
        }
        if (password.length < 6) {
            toast.error('Password must be at least 6 characters long');
            return;
        }
        if (!email.includes('@')) {
            toast.error('Email must be valid');
            return;
        }
        if (userName.toString().trim() === '' || email.toString().trim() === '' || password.toString() === '' || rePassword.toString() === '') {
            toast.error('All fields must be filled');
            return;
        }


        axios.post('/api/register', {
            name: userName,
            email,
            password
        }).then(async res => {
            if (res.data.success) {
                toast.success('User registered successfully');
                toast.info('Please use your email and password to login');
                await router.push('/login');
            } else {
                toast.error(res.data.message);
            }
        }).catch(err => {
            // toast.error('Something went wrong');
            console.log(err);
        });
    }


    return (
        <div
            className={`bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 scrollbar-hide h-screen relative bottom-8`}>
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md pt-20">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <p className={`text-2xl font-semibold pb-2 text-indigo-600`}>Register</p>
                    <form className="space-y-6" action="#" method="POST">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Username
                            </label>
                            <div className="mt-1">
                                <input
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                    id="name"
                                    name="name"
                                    type="name"
                                    autoComplete="name"
                                    required
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email address
                            </label>
                            <div className="mt-1">
                                <input
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <div className="mt-1">
                                <input
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="re-password" className="block text-sm font-medium text-gray-700">
                                Re-enter Password
                            </label>
                            <div className="mt-1">
                                <input
                                    value={rePassword}
                                    onChange={(e) => setRePassword(e.target.value)}
                                    id="re-password"
                                    name="re-password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                        </div>


                        <div>
                            <button
                                onClick={registerUser}
                                type="button"
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Register
                            </button>
                        </div>

                    </form>

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"/>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">Have a account ?</span>
                            </div>
                        </div>
                    </div>

                    <div className={`mt-4`}>
                        <button
                            onClick={async () => {
                                await router.push('/login');
                            }}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-full justify-center"
                        >
                            Go to Login
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Register;
