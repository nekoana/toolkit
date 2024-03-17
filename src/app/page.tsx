"use client";

import router from "@/lib/router";
import Menus from "@/components/menus";
import { MdFilledButton } from "@/wrapper/filled-button";
import { MdRipple } from "@/wrapper/ripple";
import FilledCard from "@/components/card";

export default function Home() {
  return (
    <main className="container mx-auto p-4 overflow-y-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-9 justify-items-center gap-y-3">
      <Menus router={router} />
    </main>
  );
}
