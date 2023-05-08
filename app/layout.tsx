import { Inter, Montserrat } from 'next/font/google'
import './style.css'

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

export const metadata = {
  title: 'aiplayer.me',
  description: 'Play with AI and create unlimited possibilities',
}

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

export default function RootLayout({ children }: {
  children: React.ReactNode
}) {
  return (
    <html>
      <head>
        <link rel="icon" type="image/svg+xml" href="/aiplayer.svg" />
        <script dangerouslySetInnerHTML={getAnalyticsTag()} />
      </head>
      <body className={`${inter.variable} ${montserrat.variable}`}>
        {children}
      </body>
    </html>
  )
}
