import type { AppProps } from 'next/app'

import 'bootstrap/dist/css/bootstrap.css'
import "./css/style.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps}/>
      <ToastContainer/>
    </>
    )
}
