import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Bitset",
  description: "Bitset",
};

export default function BitsetLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <h1>Bitset</h1>
      {children}
    </>
  );
}
