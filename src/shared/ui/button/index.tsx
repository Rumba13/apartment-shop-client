import "./styles.scss";
import { SvgIcon } from "../svg-icon";
import { MouseEventHandler } from "react";
import clsx from "clsx";

type PropsType = {
   className?: string;
   icon: string;
   onClick?: MouseEventHandler<HTMLButtonElement>;
   title: string;
};

export function Button({ className, icon, onClick, title }: PropsType) {
   return (
      <button className={clsx("button", className)} onClick={onClick}>
         <SvgIcon className="button__icon" icon={icon} />
         {title !== "" && <span className="button__title">{title}</span>}
      </button>
   );
}
