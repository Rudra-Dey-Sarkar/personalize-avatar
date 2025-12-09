import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Cartoon Character Creator | Turn Photos Into Illustrated Characters",
  description:
    "Upload a photo and instantly Turn it into a personalized children's cartoon character using advanced AI illustration technology.",
  keywords: [
    "AI cartoon generator",
    "AI illustration",
    "children's book style",
    "photo to cartoon",
    "AI avatar",
    "Pixar style AI",
  ],
  authors: [{ name: "Rudra Dey Sarkar" }],
  robots: {
    index: true,
    follow: true,
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster richColors position="top-center" />
        {children}
      </body>
    </html>
  );
}
