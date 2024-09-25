import "./styles.scss";
import React from "react";
import {SvgIcon} from "../../../../shared/ui/svg-icon";
import clsx from "clsx";

type Props = {
    children: React.ReactNode;
    icon: string,
    className?: string,
    href:string
}

export function LinkWithIcon({icon, className,children,href}: Props) {
    return <a className={clsx("link-with-icon", className)} href={href}>
        <SvgIcon icon={icon} asImage/>
        <span className="link-with-icon__title">{children}</span>
    </a>
}