import "./styles.scss"
import {ButtonHTMLAttributes, DetailedHTMLProps} from "react";

type PropsType = {
    children: React.ReactNode,
} & DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

export function ButtonCool({children, ...props}: PropsType) {
    return <button className="button-cool" type="button" {...props}>{children}</button>
}