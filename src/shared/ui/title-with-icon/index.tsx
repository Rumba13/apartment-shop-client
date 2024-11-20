import "./styles.scss";
import React, { MouseEventHandler } from "react";
import { SvgIcon } from "../svg-icon";
import clsx from "clsx";

type Props = {
   children: React.ReactNode;
   icon: string;
   className?: string;
   withLi?: boolean;
   onClick?: MouseEventHandler<HTMLElement>;
};

export function TitleWithIcon({ icon, className, children, withLi = false, onClick }: Props) {
   if (withLi) {
      return (
         <li className={clsx("title-with-icon", className)} onClick={onClick}>
            <SvgIcon icon={icon} asImage />
            <span className="title-with-icon__title">{children}</span>
         </li>
      );
   }

   return (
      <div className={clsx("title-with-icon", className)} onClick={onClick}>
         <SvgIcon icon={icon} asImage />
         <span className="title-with-icon__title">{children}</span>
      </div>
   );
}
