import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import '../styles/globals.css';

const SITE_URL = 'https://suggestlyg4plus.io';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const canonical = `${SITE_URL}${router.asPath === '/' ? '' : router.asPath}`;

  return (
    <>
      <Head>
        <link rel="canonical" href={canonical} />
        <meta name="theme-color" content="#0B2348" />
      </Head>
      <div>
        <Component {...pageProps} />
      </div>
    </>
  );
}


