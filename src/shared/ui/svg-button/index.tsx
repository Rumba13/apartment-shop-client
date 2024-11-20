import "./styles.scss";
import { SvgIcon } from "../svg-icon";
import clsx from "clsx";
import { MouseEventHandler } from "react";

type PropsType = {
   className?: string;
   icon: any;
   asImage?: boolean;
   onClick?: MouseEventHandler<HTMLButtonElement>;
};

export function SvgButton({ icon, asImage = true, className, onClick }: PropsType) {
   return (
      <button className={clsx("svg-button", className)} onClick={onClick}>
         <SvgIcon icon={icon} asImage={asImage} />
      </button>
   );
}
