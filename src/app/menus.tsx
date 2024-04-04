import Link from "next/link";
import Image from "next/image";
import FilledCard from "../components/card";
import router from "./router";
import clsx from "clsx"; // 导入router

export type Router = {
  title: string;
  path: string;
  icon: string;
};

function Menu({
  menu,
  className,
}: {
  menu: Router;
  className?: String | undefined;
}) {
  return (
    <FilledCard className={clsx("w-36", "h-24", "p-2", className)}>
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

export default function Menus({
  menuClassName,
}: {
  menuClassName?: String | undefined;
}) {
  return (
    <>
      {
        router.map((route: Router) => (
          <Menu key={route.path} menu={route} className={menuClassName} />
        )) // 使用router和Menu
      }
    </>
  );
}
