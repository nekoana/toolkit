import Link from "next/link";
import Image from "next/image";
import FilledCard from "./card";

function Menu({ menu }: { menu: Menu }) {
  return (
    <FilledCard className="w-36 h-24 p-2">
      <Link
        href={menu.path}
        key={menu.path}
        className="w-full h-full text-center flex flex-col justify-center items-center"
      >
        <Image
          src={menu.icon}
          alt={menu.title}
          width={48}
          height={48}
          className="mx-auto"
        />
        <p> {menu.title} </p>
      </Link>
    </FilledCard>
  );
}

export default function Menus({ router }: { router: Menu[] }) {
  return (
    <>
      {router.map((route) => {
        return <Menu key={route.path} menu={route} />;
      })}
    </>
  );
}
