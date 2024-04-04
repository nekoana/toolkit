"use client";
import clsx from "clsx";
import Breadcrumbs from "@/app/breadcrumbs";

const Header = ({ className }: { className?: String | undefined }) => {
  return (
    <div
      data-tauri-drag-region
      className={clsx(
        "p-4",
        "top-0",
        "z-50",
        "flex",
        "flex-row",
        "w-full",
        "h-12",
        "items-center",
        className,
      )}
    >
      <Breadcrumbs className="h-10 " />
    </div>
  );
};

export default Header;
