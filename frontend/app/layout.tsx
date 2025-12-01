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



export const metadata = {
  metadataBase: new URL("https://rikha.store"),

  title: {
    default: "Rikha – Premium Apple Products in Ethiopia",
    template: "%s | Rikha",
  },

  description:
    "Rikha is a premium ecommerce website offering authentic Apple products. Explore iPhones, MacBooks, AirPods, and more. Fast delivery and professional service.",

  keywords: [
    "Apple Ethiopia",
    "Buy iPhone Ethiopia",
    "Rikha",
    "Apple reseller Ethiopia",
    "MacBook Ethiopia",
    "AirPods Ethiopia",
    "Ecommerce Ethiopia",
  ],

  openGraph: {
    title: "Rikha – Premium Apple Products in Ethiopia",
    description:
      "Authentic Apple devices with warranty. Explore our ecommerce store and personal portfolio projects.",
    url: "https://rikha.store",
    siteName: "Rikha",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Rikha Apple Store",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Rikha – Premium Apple Products",
    description:
      "Ecommerce website offering the latest Apple products with fast delivery.",
    images: ["/images/og-image.jpg"],
  },


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
            <ToastContainer position="bottom-right" theme="light" />
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
