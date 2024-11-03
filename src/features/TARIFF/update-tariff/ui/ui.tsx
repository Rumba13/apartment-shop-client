import './styles.scss';
import {Form, Formik} from "formik";
import {FieldNumber} from "../../../../shared/ui/field-number";
import {CreateTariffDto} from "../../../../shared/api/types/create-tariff.dto";
import {currencyStore, SelectCurrencyDropdown} from "../../../select-currency";
import {useTypedTranslation} from "../../../../app/i18n/use-typed-translation";
import {Field} from "../../../../shared/ui/field/ui";
import {tariffService} from "../../../../shared/api/tariff-service";
import {UUID} from "../../../../shared/api/types/uuid";
import useLocalStorageState from "use-local-storage-state";
import {snackBarStore} from "../../../../shared/ui/snack-bar/snack-bar-store";
import {Tariff} from "../../../../shared/api/types/tariff";
import {useNavigate} from "react-router-dom";
import {AxiosError} from "axios";
import {updateTariffModalStore} from "../../../../widgets/update-tariff-modal";
import {tariffsListStore} from "../../../../widgets/tariffs-list/model/tariffs-list-store";
import {tariffDetailsStore} from "../../../../entities/tariff-details/model/tariff-details-store";
import {observer} from "mobx-react";
import {useEffect} from "react";

function onSubmit(values: CreateTariffDto, tariffId: UUID, accessToken: UUID, onSuccess: (tariff: Tariff) => void, onFail: (err: AxiosError) => void) {
    tariffService.updateTariff(values, tariffId, accessToken)
        .then(onSuccess).catch(onFail)
}

type PropsType = {
    tariff: Tariff,
}

export const UpdateTariffForm = observer(({tariff}: PropsType) => {
    const {t} = useTypedTranslation()
    const [accessToken] = useLocalStorageState<string>("ACCESS-TOKEN", {defaultValue: ""});
    const navigate = useNavigate()

    useEffect(() => {

    }, [tariff]);

    function onSuccess(newTariff: Tariff) {
        snackBarStore.showSnackBar("Тариф успешно обновлён!")
        updateTariffModalStore.setIsOpened(false);
        navigate("/tariffs/" + tariff.id, {replace: true})

        tariffsListStore.loadTariffs()

        tariffDetailsStore.loadTariffDetails(tariff.id)
    }

    function onFail(err: AxiosError, setFieldError: (field: string, message: string) => void) {
        if (err.status === 409) {
            setFieldError("title", "Такой тариф уже существует")
        } else {
            snackBarStore.showSnackBar("Неизвестная ошибка")
        }
    }

    return <Formik initialValues={tariff}
                   onSubmit={(values, {setFieldError, resetForm}) => {
                       onSubmit(values, tariff.id, accessToken, () => {
                           onSuccess(values);
                       }, (err) => onFail(err, setFieldError));
                   }}
    >
        {({}) =>
            <Form className="update-tariff-form">
                <div className="wrapper">
                    <Field name="title"
                           label={t("Title")}/>
                    <SelectCurrencyDropdown/>
                </div>
                <FieldNumber name="mondayPrice"
                             label={t("Price in monday")}
                             min={0}/>
                <FieldNumber name="tuesdayPrice"
                             label={t("Price in tuesday")}
                             min={0}/>
                <FieldNumber name="wednesdayPrice"
                             label={t("Price in wednesday")}
                             min={0}/>
                <FieldNumber name="thursdayPrice"
                             label={t("Price in thursday")}
                             min={0}/>
                <FieldNumber name="fridayPrice"
                             label={t("Price in friday")}
                             min={0}/>
                <FieldNumber name="saturdayPrice"
                             label={t("Price in saturday")}
                             min={0}/>
                <FieldNumber name="sundayPrice"
                             label={t("Price in sunday")}
                             min={0}/>
                <button className="submit-button"
                        type="submit">Обновить
                </button>
            </Form>}</Formik>
})
