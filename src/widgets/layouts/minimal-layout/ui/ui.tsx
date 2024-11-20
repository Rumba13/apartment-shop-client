import "./styles.scss";
import clsx from "clsx";
import React from "react";
import { Header } from "../../../header";

type PropsType = {
   className?: string;
   children: React.ReactNode;
};

export function MinimalLayout({ className, children }: PropsType) {
   return (
      <div className={clsx("minimal-layout", className)}>
         <Header noSearch />
         <div className="minimal-layout-wrapper">
            <div className="content">{children}</div>
         </div>
      </div>
   );
}
