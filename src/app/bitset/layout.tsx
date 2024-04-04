import React from "react";

export default function BitsetLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <h1>Bitset</h1>
      {children}
    </>
  );
}
