import './styles.scss';
import {Header} from "../../../widgets/header";
import {useTypedTranslation} from "../../../app/i18n/use-typed-translation";
import {FieldNumber} from "../../../shared/ui/field-number";
import {Form, Formik} from "formik";
import {snackBarStore} from "../../../shared/ui/snack-bar/snack-bar-store";
import {Button} from "../../../shared/ui/button";
import BinIcon from "../../../assets/images/bin.svg"
import {confirmModalStore} from "../../../shared/ui/confirm-modal/confirm-modal-store";
import {ConfirmModalOptions} from "../../../shared/api/types/confirm-modal-options";
import {useState} from "react";
import {InputNumber} from "../../../shared/ui/input-number";

type ValuesType = {
    guestsCount: number
}

export function WishListPage() {
    const {t} = useTypedTranslation();
    const [a,setA] = useState<number>(0);
    const modalOptions:ConfirmModalOptions = {
        description: "Забанить влада?",
        confirmButtonText:"ЗАБАНИТЬ ЧУДИЩЕ"
    }

    return <div className="wish-list-page">
        <Header/>
        <h2 className="wish-list-page__title">{t("Featured")}</h2>

        <Formik<ValuesType> initialValues={{guestsCount: 0}}
                            onSubmit={(values) => {
                                snackBarStore.showSnackBar("Gay")
                            }}
        >{({}) =>
            <Form className="form">
                <FieldNumber min={0}
                             max={10}
                             label={t("Guests")}
                             name={"guestsCount"}
                />
                <button className="submit-button"
                        type={"submit"}
                >Отправить
                </button>
            </Form>
        }

        </Formik>
        <Button icon={BinIcon}
                onClick={() => {}}
                title={"Some feat"}
        />
    <InputNumber value={a} min={0} max={10} onChange={(v) => setA(v)}/>
    </div>
}
