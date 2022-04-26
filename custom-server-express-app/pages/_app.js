import '../styles/globals.css'
import Header from "../Components/Header";

import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

export default function MyApp({Component, pageProps}) {
    return (
        <>
            <ToastContainer limit={3}/>
            <Header/>
            <Component {...pageProps} />
        </>
    )
}
