import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "./navbar/navbar";
import Footer from "./footer";
import "./globals.css";
import SessionProvider from "./session_provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CLFeshes",
  description: "Trusted Tech Experts",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <Navbar />
          <main className="p-4 max-w-7xl m-auto min-w-[300px]">{children}</main>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
