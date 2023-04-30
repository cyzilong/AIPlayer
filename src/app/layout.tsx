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
      </head>
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
