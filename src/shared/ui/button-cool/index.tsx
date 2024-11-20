import "./styles.scss";
import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import clsx from "clsx";

type PropsType = {
   children: React.ReactNode;
} & DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

export function ButtonCool({ children, ...props }: PropsType) {
   return (
      <button {...props} className={clsx("button-cool", props.className)} type="button">
         <span>{children}</span>
      </button>
   );
}
