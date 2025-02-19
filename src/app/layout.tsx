import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Footer from '@/components/Footer'
import { NavBar } from "@/components/NavBar";
import { getUser } from "@/lib/dal";
import FlyonuiScript from "@/components/FlyonUILoader";
import { ThemeProvider } from "@/components/ThemeContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const currentUser = await getUser(); // only for cosmetics, do checks when dealing with data

  return (
    <html lang="en" data-theme={currentUser?.theme || 'corporate'}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <FlyonuiScript />

        <ThemeProvider defaultTheme={currentUser?.theme || ''}>
          <div className="flex flex-col h-screen">
            <NavBar isAdmin={!!currentUser?.isAdmin} isAuthed={!!currentUser} />
            <div className="flex-grow">
              {children}
            </div>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
