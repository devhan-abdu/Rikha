import 'react-toastify/dist/ReactToastify.css';
import "./globals.css";

import type { Metadata } from "next";
import {Inter ,Cinzel , Poppins} from 'next/font/google'
import { StoreProvider } from '@/redux/storeProvider'
import { ToastContainer } from 'react-toastify';
import ReactQueryProvider from '@/lib/query/ReactQueryProvider';
import { UserProvider } from '@/components/provider/UserProvider';


const cinzel = Cinzel({
  subsets:['latin'],
  weight:['600'],
  variable:'--font-cinzel'
})



export const metadata: Metadata = {
  title: "Rikha",
  description: "E-commerce website",
};

export default async function RootLayout({
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
            <UserProvider>{children}</UserProvider>
          </ReactQueryProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
