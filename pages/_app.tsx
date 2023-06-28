import { Inter, Montserrat } from 'next/font/google';
import Head from 'next/head';
import './style.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
});


export default function App({ Component, pageProps }: any) {
  return (
    <>
      <Head>
        <title>地铁时刻表</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <main className={`${inter.variable} ${montserrat.variable}`}>
        <Component {...pageProps} />
      </main>
    </>
  )
}