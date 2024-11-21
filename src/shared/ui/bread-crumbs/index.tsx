import "./styles.scss";
import React from "react";
import { Breadcrumb } from "antd";
import { BreadcrumbType } from "../../api/types/breadcrumb-type";
import ArrowIcon from "../../../assets/images/side-arrow.svg";
import { SvgIcon } from "../svg-icon";
import clsx from "clsx";

type PropsType = {
   items: BreadcrumbType[];
   className?: string;
};

export function Breadcrumbs({ items, className }: PropsType) {
   return (
      <Breadcrumb className={clsx("breadcrumbs", className)} separator={<SvgIcon icon={ArrowIcon} asImage />}>
         {items.map(crumb => (
            <Breadcrumb.Item href={crumb.href || undefined}>{crumb.item}</Breadcrumb.Item>
         ))}
      </Breadcrumb>
   );
}
