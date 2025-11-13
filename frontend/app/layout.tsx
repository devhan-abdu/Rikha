import 'react-toastify/dist/ReactToastify.css';
import "./globals.css";

import type { Metadata } from "next";
import { Cinzel } from 'next/font/google'
import { StoreProvider } from '@/redux/storeProvider'
import { ToastContainer } from 'react-toastify';
import ReactQueryProvider from '@/lib/query/ReactQueryProvider';
import { UserProvider } from '@/components/provider/UserProvider';
import { CartProvider } from '@/components/provider/CartProvider';


const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['600'],
  variable: '--font-cinzel'
})



export const metadata: Metadata = {
  title: "Rikha",
  description: "E-commerce website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased  flex min-h-screen flex-col  ${cinzel.variable} `}
      >
        <StoreProvider>
          <ReactQueryProvider>
            <ToastContainer position="bottom-right" theme="dark" />
            <UserProvider>
              <CartProvider>
                {children}
              </CartProvider>
            </UserProvider>
          </ReactQueryProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
