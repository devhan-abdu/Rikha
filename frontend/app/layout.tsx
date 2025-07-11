import type { Metadata } from "next";
import "./globals.css";
import {Inter ,Cinzel , Poppins} from 'next/font/google'
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { StoreProvider } from '@/redux/storeProvider'


const inter = Inter({ subsets: ['latin'],variable:'--font-inter' });
const cinzel = Cinzel({
  subsets:['latin'],
  weight:['700'],
  variable:'--font-cinzel'
})
const poppins = Poppins({
  subsets:['latin'],
  weight:['700'],
  variable:'--font-poppins'
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
        className={`${inter.variable} ${cinzel.variable} antialiased dark:bg-forground`}
      >
        <StoreProvider>
        <Header/>
        {children}
        </StoreProvider>
        <Footer/>
      </body>
    </html>
  );
}
