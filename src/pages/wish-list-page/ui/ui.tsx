import './styles.scss';
import {Header} from "../../../widgets/header";
import {useTypedTranslation} from "../../../app/i18n/use-typed-translation";
import {FieldNumber} from "../../../shared/ui/field-number";
import {Form, Formik} from "formik";
import {SnackBar} from "../../../shared/ui/snack-bar/ui";
import {snackBarStore} from "../../../shared/ui/snack-bar/snack-bar-store";

type ValuesType = {
    guestsCount: number
}

export function WishListPage() {
    const {t} = useTypedTranslation();

    return <div className="wish-list-page">
        <Header/>
        <h2 className="wish-list-page__title">{t("Featured")}</h2>

        <Formik<ValuesType> initialValues={{guestsCount: 0}} onSubmit={(values) => {
            snackBarStore.showSnackBar("Gay")
        }}>{({}) =>
            <Form className="form">
                <FieldNumber min={0} max={10} label={t("Guests")} name={"guestsCount"}/>
                <button className="submit-button" type={"submit"}>Отправить</button>
            </Form>
        }
        </Formik>

    </div>
}
