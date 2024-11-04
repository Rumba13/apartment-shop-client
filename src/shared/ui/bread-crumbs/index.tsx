import "./styles.scss";
import React from "react";
import {Breadcrumb} from "antd";

type PropsType = {
    items: string[]
}

export function Breadcrumbs({items}: PropsType) {
    return <Breadcrumb separator=">">
        {items.map(crumb =>  <Breadcrumb.Item>{crumb}</Breadcrumb.Item>)}
    </Breadcrumb>
}