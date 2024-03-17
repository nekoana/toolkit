"use client";

import type { Metadata } from "next";
import { useSelectedLayoutSegments } from "next/navigation";
import { Inter } from "next/font/google";
import "./globals.css";
import React from "react";
import FilledCard from "@/components/card";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Toolkit",
//   description: "a set of tools",
//   icons: "/32x32.png",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const segments = useSelectedLayoutSegments();

  return (
    <html lang="en">
      <body className={inter.className}>
        <div
          data-tauri-drag-region
          className="p-4 top-0 z-50 flex flex-row w-full h-12 items-center"
        >
          <Link href="/">
            <FilledCard className="h-8 w-fit"> Toolkit</FilledCard>
          </Link>
          {segments.map((segment, index) => (
            <FilledCard className="h-8 w-fit" key={index}>
              {segment}
            </FilledCard>
          ))}
        </div>
        {children}
      </body>
    </html>
  );
}
