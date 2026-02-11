import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DevCanvas - AI Component Builder | Screenshot to Code",
  description: "Transform any UI screenshot into production-ready React, Vue, or HTML components instantly with AI",
  keywords: ["AI", "code generation", "React", "Vue", "component builder", "screenshot to code"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
