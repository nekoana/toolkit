import Link from "next/link";
import { useSelectedLayoutSegments } from "next/navigation";
import clsx from "clsx";
import Image from "next/image";

export default function Breadcrumbs({
  className,
}: {
  className?: string | undefined;
}) {
  const segments = useSelectedLayoutSegments();

  return (
    <nav className={clsx("ml-2", "flex", "flex-row", className)}>
      <ol className="list-none inline-flex">
        <li className="rounded flex items-center relative px-6 py-0.5">
          {/*<MdRipple/>*/}
          <Link href="/">
            <Image src="/home.svg" alt="home" width={16} height={16} />
          </Link>
        </li>
        {segments.map((segment, index) => {
          const path = `/${segments.slice(0, index + 1).join("/")}`;

          return (
            <>
              <Image
                src="/back.svg"
                alt="back"
                width={16}
                height={16}
                className="mx-1"
              />
              <li
                key={path}
                className="rounded flex items-center relative px-2 py-0.5"
              >
                {/*<MdRipple/>*/}
                <Link href={path}>{segment}</Link>
              </li>
            </>
          );
        })}
      </ol>
    </nav>
  );
}
