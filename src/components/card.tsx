import { MdRipple } from "@/wrapper/ripple";
import styles from "./card.module.css";
import clsx from "clsx";
import React from "react";
import { MdElevation } from "@/wrapper/elevation";
import { MdFilledCard } from "@/wrapper/labs/card";

interface FilledCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  disabled?: boolean | undefined;
}

const FilledCard = ({ children, className, disabled }: FilledCardProps) => (
  <MdFilledCard
    className={clsx(
      "h-32",
      "w-48",
      "relative",
      styles["filled-card"],
      disabled && "opacity-50",
      className,
    )}
  >
    {!disabled && <MdElevation />}
    {!disabled && <MdRipple />}
    {children}
  </MdFilledCard>
);

export default FilledCard;
