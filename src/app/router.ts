import { Router } from "@/app/menus";

const router: Router[] = [
  {
    title: "Bitset",
    icon: "/bitset.svg",
    path: "/bitset",
  },
  {
    title: "Bytes Analysis",
    icon: "/bytes-analysis.svg",
    path: "/bytes-analysis",
  },
  {
    title: "Static File Server",
    icon: "/static-file-server.svg",
    path: "/static-file-server",
  },
];

export default router;
