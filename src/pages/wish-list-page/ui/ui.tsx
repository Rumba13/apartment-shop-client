import './styles.scss';
import {Header} from "../../../widgets/header";
import {useTypedTranslation} from "../../../app/i18n/use-typed-translation";
import React, {useState} from "react";
import {Select} from "antd";

export function WishListPage() {
    const {t} = useTypedTranslation();
    const [a,setA] = useState<number>(0);

    return <div className="wish-list-page">
        <Header/>
        <h2 className="wish-list-page__title">{t("Featured")}</h2>

        <Select
            defaultValue="lucy"
            style={{ width: 120 }}
            options={[
                { value: 'jack', label: 'Jack' },
                { value: 'lucy', label: 'Lucy' },
                { value: 'Yiminghe', label: 'yiminghe' },
            ]}
        />
    </div>
}
