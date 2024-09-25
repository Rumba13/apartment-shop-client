import "./styles.scss";
import React from "react";
import clsx from "clsx";
import {useTypedTranslation} from "../../../../app/i18n/use-typed-translation";

type Props = {
}

export function ShowContactsButton({}: Props) {
    const {t} = useTypedTranslation()

    return <div className={clsx("show-contacts-button")}>
        <span className="show-contacts-button__title">{t("Show Contacts")}</span>
    </div>
}