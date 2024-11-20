import { SvgIcon } from "../../../../shared/ui/svg-icon";
import React from "react";

type PropsType = {
   icon: string;
   href: string;
} & React.HTMLAttributes<HTMLAnchorElement>;

export function ContactIcon({ icon, href, ...props }: PropsType) {
   return (
      <a className="show-contacts__telegram-icon" {...props} href={href}>
         <SvgIcon icon={icon} style={{ width: 16, height: 16 }} />
      </a>
   );
}
