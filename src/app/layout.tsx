import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/nextjs";
import LandingPage from "./landingPage";
import Header from "./components/Header";
import Footer from "./components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Snap Learn",
  description: "A platform to learn and grow.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${inter.className} bg-gradient-to-b from-gray-200 to-white dark:from-black dark:to-gray-900 text-gray-900 dark:text-white`}
        >
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">


              <SignedOut>
                <LandingPage />
              </SignedOut>


              <SignedIn>
                {children}
              </SignedIn>
              
            </main>
            <Footer />
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
