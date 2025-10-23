import 'react-toastify/dist/ReactToastify.css';
import "./globals.css";

import type { Metadata } from "next";
import {Inter ,Cinzel , Poppins} from 'next/font/google'
import { StoreProvider } from '@/redux/storeProvider'
import { ToastContainer } from 'react-toastify';
import ReactQueryProvider from '@/lib/query/ReactQueryProvider';


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
    <html lang="en">
      <body
        className="antialiased dark:bg-foreground flex min-h-screen flex-col font-cinzel"
      >
        <StoreProvider>
          <ReactQueryProvider>
            <ToastContainer position="bottom-right" theme="dark" />
            {children}
          </ReactQueryProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
