import "./styles.scss";
import React from "react";
import { Breadcrumb } from "antd";
import { BreadcrumbType } from "../../api/types/breadcrumb-type";

type PropsType = {
   items: BreadcrumbType[];
   className?: string;
};

export function Breadcrumbs({ items, className }: PropsType) {
   return (
      <Breadcrumb className={className} separator=">">
         {items.map(crumb => (
            <Breadcrumb.Item href={crumb.href || undefined}>{crumb.item}</Breadcrumb.Item>
         ))}
      </Breadcrumb>
   );
}
