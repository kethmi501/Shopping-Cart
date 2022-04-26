import React, {useEffect} from 'react';
import {useRouter} from "next/router";

const Logout = () => {

    const router = useRouter();

    useEffect(async () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        await router.push('/login');
    }, []);

    return (
        <div>
            Please wait until we log you out
        </div>
    );
};

export default Logout;
