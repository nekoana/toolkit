"use client";

import Menus from "@/app/menus";

export default function Home() {
  return (
    <main className="container mx-auto p-4 overflow-y-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-9 justify-items-center gap-y-3">
      <Menus />
    </main>
  );
}
