import { MdRipple } from "@/wrapper/ripple";
import styles from "./card.module.css";
import clsx from "clsx";
import React from "react";

interface FilledCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  disabled?: boolean | undefined;
}

const FilledCard = ({
  children,
  className,
  disabled,
  ...rest
}: FilledCardProps) => (
  <div
    {...rest}
    className={clsx(
      "h-32 w-48",
      styles["filled-card"],
      disabled && "opacity-50",
      className,
    )}
  >
    {!disabled && <MdRipple className="w-full h-full" />}
    {children}
  </div>
);

export default FilledCard;
