import "./styles.scss";
import {createPortal} from "react-dom";
import clsx from "clsx";
import {SvgButton} from "../svg-button";
import CrossIcon from "../../../assets/images/cross.svg";
import {MouseEventHandler, ReactNode} from "react";

type PropsType = {
    title: string,
    isOpened:boolean,
    stopPropagation:MouseEventHandler,
    onCrossClick:MouseEventHandler,
    children:ReactNode,
}

export function Modal({title,isOpened,stopPropagation,onCrossClick,children}: PropsType) {
    return createPortal(<div className={clsx("modal", isOpened && "opened")}
                             onClick={stopPropagation}>
        <SvgButton className="tariff-modal-close"
                   icon={CrossIcon}
                   onClick={onCrossClick}/>

        <h2 className="tariff-modal__title">{title}</h2>

        {children}
    </div>, document.getElementById("root") as HTMLElement)
}