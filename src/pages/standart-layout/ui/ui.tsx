import './styles.scss';
import clsx from "clsx";
import {Header} from "../../../widgets/header";
import {Aside} from "../../../widgets/aside";
import React from "react";

type PropsType = {
    className?: string,
    children: React.ReactNode,
    noAside?:boolean
}

export function StandartLayout({className, children,noAside = false}: PropsType) {
    return (
        <div className={clsx("standart-layout", className)}>
            <Header/>
            <div className="standart-layout-wrapper">
                {!noAside &&<Aside/>}
                <div className="content">{children}</div>
            </div>
        </div>
    )
}
