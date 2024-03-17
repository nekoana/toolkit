import { MdRipple } from "@/wrapper/ripple";
import styles from "./card.module.css";
import clsx from "clsx";

interface FilledCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const FilledCard = ({ children, className, ...rest }: FilledCardProps) => (
  <div
    {...rest}
    className={clsx("h-32 w-48", styles["filled-card"], className)}
  >
    <MdRipple className="w-full h-full" />
    {children}
  </div>
);

export default FilledCard;
