import './styles.scss';
import {MinimalLayout} from "../../minimal-layout";
import React from "react";
import {SelectGuestModal, selectGuestModalStore} from "../../../widgets/select-guests-modal";

export function DevPage() {
    return (
        <MinimalLayout className={"dev-page"}>
            <button onClick={() => selectGuestModalStore.setIsOpened(true)}>SSSS</button>
        </MinimalLayout>
    )
}
