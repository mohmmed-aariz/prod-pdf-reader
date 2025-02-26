import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { inter } from "./ui/fonts";
import { Providers } from "@/lib/providers";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';


export const metadata: Metadata = {
  title: "High Profile",
  description: "High Profile: The E-Magazine for students",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Providers>
          <body
            // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            className={`${inter.className} antialiased`}
          >
            {children}
          </body>
      </Providers>
    </html>
  );
}
