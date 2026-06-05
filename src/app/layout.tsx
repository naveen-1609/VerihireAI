import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "VeriHire AI — Secure, Verified Interviews for Modern Hiring Teams",
  description:
    "Verify candidate identity, detect suspicious interview behavior, identify AI-generated responses, and help interviewers evaluate answers with AI-powered confidence.",
  keywords: [
    "interview integrity",
    "candidate verification",
    "hiring fraud prevention",
    "AI-generated answer detection",
    "AI interview evaluation",
    "remote hiring",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full scroll-smooth`}>
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}
