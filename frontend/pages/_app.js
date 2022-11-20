import "../styles/globals.css";
import Head from "next/head";
import Image from 'next/image';
import Nav_baar from "../components/layouts/Nav_baar";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Chat-App</title>
        <link rel="shortcut icon" href="/images/special/icon.png" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Nav_baar/>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
