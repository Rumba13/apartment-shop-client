import "./styles.scss"
import {ButtonHTMLAttributes, DetailedHTMLProps} from "react";
import clsx from "clsx";

type PropsType = {
    children: React.ReactNode,
} & DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

export function ButtonCool({children,className, ...props}: PropsType) {
    return <button className={clsx("button-cool",className)} type="button" {...props}>{children}</button>
}