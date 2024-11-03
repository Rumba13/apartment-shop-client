import "./styles.scss";
import clsx from "clsx";
import {snackBarStore} from "./snack-bar-store";
import {observer} from "mobx-react";
import {SvgIcon} from "../svg-icon";
import MarkIcon from "../../../assets/images/check.svg"
type PropsType = {}

export const SnackBar = observer(({}: PropsType) => {

    if (!snackBarStore.isOpened) return <></>

    return <div className={clsx("snack-bar", snackBarStore.isAnimatingOpening ? "opening" : "closing")}
                onAnimationEnd={(e) => snackBarStore.setIsOpened(e.nativeEvent.animationName === "opening")}>
        <SvgIcon className="snack-bar__icon" icon={snackBarStore.icon} style={snackBarStore.style}/>
        <span className="snack-bar__title">{snackBarStore.title}</span>
    </div>
});