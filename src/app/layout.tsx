import { Inter } from 'next/font/google'
import Providers from './providers'
import './style.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'aiplayer.me',
  description: 'Play with AI and create unlimited possibilities',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const getAnalyticsTag = () => {
    return {
      __html: `
      var _hmt = _hmt || [];
      (function() {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?7d409c0c61ffc9d0efba786610a3d99d";
        var s = document.getElementsByTagName("script")[0]; 
        s.parentNode.insertBefore(hm, s);
      })();
      `
    }
  }

  return (
    <html>
      <head>
        <link rel="icon" type="image/svg+xml" href="/aiplayer.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&display=swap"
          rel="stylesheet"
        />
        <script dangerouslySetInnerHTML={getAnalyticsTag()}/>
      </head>
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
