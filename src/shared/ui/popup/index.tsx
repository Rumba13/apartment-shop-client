import "./styles.scss";
import { observer } from "mobx-react";
import { PopupStore } from "../../model/popup-store";
import React from "react";
import clsx from "clsx";

type PropsType = {
   popupStore: PopupStore;
} & React.HTMLProps<HTMLDivElement>;

export const Popup = observer(({ popupStore, children, className }: PropsType) => {
   return (
      <div className={clsx("popup", className, popupStore.isOpened && "open")} onClick={popupStore.stopPropagationInPopup}>
         {children}
      </div>
   );
});
