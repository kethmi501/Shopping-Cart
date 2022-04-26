import React, {useState} from 'react';
import {useRouter} from "next/router";
import {toast} from "react-toastify";
import axios from "axios";

const Login = () => {

    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const login = (e) => {
        e.preventDefault();

        if (!email || !password) {
            toast.error('Please enter your email and password');
            return;
        }

        axios.post('/api/login', {
            email,
            password
        }).then(async res => {
            if (res.data.error) {
                toast.error(res.data.error);
                return;
            }

            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));


            await router.push('/');
        }).catch(err => {
            toast.error('Something went wrong , Please Check your credentials');
        });
    }


    return (
        <div className={`bg-gradient-to-l from-green-300 via-blue-500 to-purple-600 h-screen relative bottom-8`}>
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md pt-20">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <p className={`text-2xl font-semibold pb-2 text-indigo-600`}>Login</p>
                    <form className="space-y-6" onSubmit={login}>
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

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                    Remember me
                                </label>
                            </div>

                           
                        </div>

                        <div>
                            <button
                                onClick={login}
                                type="button"
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>
                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"/>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">Don't have a account ?</span>
                            </div>
                        </div>
                    </div>

                    <div className={`mt-4`}>
                        <button
                            onClick={async () => {
                                await router.push('/register');
                            }}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-full justify-center"
                        >
                            Go to Register
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
