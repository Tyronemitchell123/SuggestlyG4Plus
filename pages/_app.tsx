import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import '../styles/globals.css';
// import { Inter } from 'next/font/google'; // Commented out to avoid network dependency

const SITE_URL = 'https://suggestlyg4plus.io';
// const inter = Inter({ subsets: ['latin'], display: 'swap' }); // Commented out

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const canonical = `${SITE_URL}${router.asPath === '/' ? '' : router.asPath}`;

  return (
    <>
      <Head>
        <link rel="canonical" href={canonical} />
        <meta name="theme-color" content="#0B2348" />
      </Head>
      <div className="font-sans"> {/* Using Tailwind's font-sans instead of inter.className */}
        <Component {...pageProps} />
      </div>
    </>
  );
}


