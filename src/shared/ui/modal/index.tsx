import "./styles.scss";
import { createPortal } from "react-dom";
import clsx from "clsx";
import { SvgButton } from "../svg-button";
import CrossIcon from "../../../assets/images/cross.svg";
import { ReactNode } from "react";
import { ModalStore } from "../modal-store";
import { observer } from "mobx-react";

type PropsType = {
   title: string;
   children: ReactNode;
   className?: string;
   modalStore: ModalStore;
};

export const Modal = observer(({ title, children, modalStore, className }: PropsType) => {
   return createPortal(
      <div className={clsx("modal", className, modalStore.isOpened && "opened")} onClick={modalStore.stopPropagationInModal}>
         <SvgButton className="modal-close" icon={CrossIcon} onClick={modalStore.close} />
         <h2 className="modal__title">{title}</h2>

         {children}
      </div>,
      document.getElementById("root") as HTMLElement
   );
});
