import Link from "next/link";
import { useSelectedLayoutSegments } from "next/navigation";
import clsx from "clsx";
import Image from "next/image";
import React from "react";
import { MdIcon } from "@/wrapper/icon";
import { MdIconButton } from "@/wrapper/icon-button";

export default function Breadcrumbs({
  className,
}: {
  className?: string | undefined;
}) {
  const segments = useSelectedLayoutSegments();

  return (
    <nav className={clsx("ml-2", "flex", "flex-row", className)}>
      <ol className="list-none inline-flex">
        <li className="flex items-center">
          <Link href="/">
            <MdIconButton>
              <MdIcon>
                <Image src="/home.svg" alt="home" width={16} height={16} />
              </MdIcon>
            </MdIconButton>
          </Link>
        </li>
        {segments.map((segment, index) => {
          const path = `/${segments.slice(0, index + 1).join("/")}`;

          return (
            <React.Fragment key={index}>
              <Image
                src="/arrow-left.svg"
                alt="back"
                width={16}
                height={16}
                className="mx-1"
              />
              <li className="rounded flex items-center relative px-2 py-0.5">
                <Link href={path}>{segment}</Link>
              </li>
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
