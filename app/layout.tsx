import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Suspense } from 'react';
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Toaster } from "sonner";
import "./globals.css";

// function ScrollToTop() {
//   const { pathname } = useLocation();
//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, [pathname]);
//   return null;
// }

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  "title": "The Lux Fashion",
  "description": "Premium curated fashion marketplace sourcing authentic global items with a focus on quality and authenticity.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body suppressHydrationWarning>
        <div className="min-h-screen bg-white flex flex-col font-sans">
        <AuthProvider>
          {/* <ScrollToTop />
          {/* <div className="min-h-screen bg-white flex flex-col font-sans"> */}
          <Suspense fallback={<div>Loading...</div>}>
            <Navbar />
          </Suspense>
          {/* </div> */}
          {children}
          <Footer />
          <Toaster position="bottom-right" richColors />
        </AuthProvider>
        </div>
      </body>
    </html>
  );
}
