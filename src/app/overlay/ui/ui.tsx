import "./styles.scss";
import { observer } from "mobx-react";
import { overlayStore } from "../model/model";
import clsx from "clsx";
import { createPortal } from "react-dom";

export const Overlay = observer(() => {
   return createPortal(<div className={clsx("overlay", overlayStore.isOverlayOpened && "opened", overlayStore.isAnimating && "animating")} onTransitionEnd={overlayStore.onAnimationEnd}></div>, document.body);
});
