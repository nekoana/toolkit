"use client";
import clsx from "clsx";
import Breadcrumbs from "@/app/breadcrumbs";
import Image from "next/image";
import { MdIconButton } from "@/wrapper/icon-button";
import { MdIcon } from "@/wrapper/icon";
import { getCurrent } from "@tauri-apps/api/window";

const Header = ({ className }: { className?: String | undefined }) => {
  const handleMinimize = async () => {
    const win = getCurrent();

    await win.minimize();
  };

  const handleFullScreen = async () => {
    const win = getCurrent();

    const ifFullScreen = await win.isFullscreen();
    await win.setFullscreen(!ifFullScreen);
  };

  const handleClose = async () => {
    const win = getCurrent();

    await win.close();
  };

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
      <Breadcrumbs className="h-10" />

      <div className="h-10 flex flex-row ml-auto place-content-around">
        <MdIconButton onClick={handleMinimize}>
          <MdIcon>
            <Image src="/collapse.svg" width={16} height={16} alt="collapse" />
          </MdIcon>
        </MdIconButton>
        <MdIconButton onClick={handleFullScreen}>
          <MdIcon>
            <Image src="/maximize.svg" width={16} height={16} alt="maximize" />
          </MdIcon>
        </MdIconButton>
        <MdIconButton onClick={handleClose}>
          <MdIcon>
            <Image src="/close.svg" width={16} height={16} alt="close" />
          </MdIcon>
        </MdIconButton>
      </div>
    </div>
  );
};

export default Header;
