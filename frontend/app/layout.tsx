import 'react-toastify/dist/ReactToastify.css';

import type { Metadata } from "next";
import "./globals.css";
import {Inter ,Cinzel , Poppins} from 'next/font/google'
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { StoreProvider } from '@/redux/storeProvider'
import { ToastContainer } from 'react-toastify';


const inter = Inter({ subsets: ['latin'],variable:'--font-inter' });
const cinzel = Cinzel({
  subsets:['latin'],
  weight:['700'],
  variable:'--font-cinzel'
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
    <html lang="en" >
      <body
        className={`${inter.variable} ${cinzel.variable} antialiased dark:bg-forground flex min-h-screen flex-col`}
      >
        <StoreProvider>
        <ToastContainer position="top-right" />
        <Header/>
        {children}
        </StoreProvider>
        <Footer/>
      </body>
    </html>
  );
}
