import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { navData } from "@/constants";





export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <FloatingNav navItems={navData}/>
      <main>
        {children}
      </main>
      <Footer />
    </>
  );
}
