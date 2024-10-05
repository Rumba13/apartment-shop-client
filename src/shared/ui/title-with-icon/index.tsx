import "./styles.scss";
import React from "react";
import {SvgIcon} from "../svg-icon";
import clsx from "clsx";

type Props = {
    children: React.ReactNode;
    icon: string,
    className?: string,
    withLi?: boolean,
}

export function TitleWithIcon({icon, className,children,withLi = false}: Props) {
    if(withLi) {
        return <li className={clsx("title-with-icon", className)}>
            <SvgIcon icon={icon} asImage/>
            <span className="title-with-icon__title">{children}</span>
        </li>
    }

    return <div className={clsx("title-with-icon", className)}>
        <SvgIcon icon={icon} asImage/>
        <span className="title-with-icon__title">{children}</span>
    </div>
}