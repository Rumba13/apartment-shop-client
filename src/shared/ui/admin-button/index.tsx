import "./styles.scss";
import clsx from "clsx";
import {MouseEventHandler} from "react";

type PropsType = {
    title:string,
    className?:string,
    onClick?:MouseEventHandler<HTMLButtonElement>,
}

export function AdminButton({title,className,onClick}:PropsType) {
    return <button className={clsx("admin-button",className)} onClick={onClick}>{title}</button>
}