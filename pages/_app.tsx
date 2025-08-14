import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import '../styles/globals.css';
// TODO: Fix font loading in production environment
// import { Inter } from 'next/font/google';

const SITE_URL = 'https://suggestlyg4plus.io';
// const inter = Inter({ subsets: ['latin'], display: 'swap' });

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const canonical = `${SITE_URL}${router.asPath === '/' ? '' : router.asPath}`;

  return (
    <>
      <Head>
        <link rel="canonical" href={canonical} />
        <meta name="theme-color" content="#0B2348" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet" />
      </Head>
      <div>
        <Component {...pageProps} />
      </div>
    </>
  );
}


