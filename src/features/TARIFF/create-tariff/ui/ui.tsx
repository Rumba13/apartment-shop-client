import "./styles.scss";
import { Form, Formik } from "formik";
import { FieldNumber } from "../../../../shared/ui/field-number";
import { CreateTariffDto } from "../../../../shared/api/types/create-tariff.dto";
import { currencyStore, SelectCurrencyDropdown } from "../../../select-currency";
import { Field } from "../../../../shared/ui/field/ui";
import { tariffService } from "../../../../shared/api/tariff-service";
import { UUID } from "../../../../shared/api/types/uuid";
import { snackBarStore } from "../../../../shared/ui/snack-bar/snack-bar-store";
import { Tariff } from "../../../../shared/api/types/tariff";
import { tariffModalStore } from "../../../../widgets/create-tariff-modal";
import { useNavigate } from "react-router-dom";
import { AxiosError, AxiosResponse } from "axios";
import { ACCESS_TOKEN_NAME } from "../../../../shared/lib/constants";
import { useTranslation } from "react-i18next";
import { ROUTES } from "../../../../shared/lib/routes";

const initialValues: CreateTariffDto = {
   title: "",
   currency: currencyStore.currency,
   mondayPrice: 10,
   fridayPrice: 10,
   sundayPrice: 10,
   saturdayPrice: 10,
   thursdayPrice: 10,
   tuesdayPrice: 10,
   wednesdayPrice: 10,
};

function onSubmit(values: CreateTariffDto, accessToken: UUID, onSuccess: (tariff: Tariff) => void, onFail: (err: AxiosError) => void) {
   tariffService.createTariff(values, accessToken).then(onSuccess).catch(onFail);
}

export function CreateTariffForm() {
   const navigate = useNavigate();
   const { t } = useTranslation();

   function onSuccess(tariff: Tariff) {
      snackBarStore.showSnackBar("Тариф успешно создан!");
      tariffModalStore.setIsOpened(false);
      navigate(`${ROUTES.TARIFFS_PAGE}/` + tariff.id, { replace: true });
   }

   function onFail(err: AxiosError, setFieldError: (field: string, message: string) => void) {
      if (err.status === 409) {
         setFieldError("title", "Такой тариф уже существует");
      } else {
         snackBarStore.showSnackBar("Неизвестная ошибка");
      }
   }

   return (
      <Formik
         initialValues={initialValues}
         onSubmit={(values, { setFieldError, resetForm }) => {
            onSubmit(
               values,
               localStorage.getItem(ACCESS_TOKEN_NAME) || "",
               (tariff: Tariff) => {
                  onSuccess(tariff);
                  resetForm();
               },
               err => onFail(err, setFieldError)
            );
         }}>
         {({}) => (
            <Form className="create-tariff-form">
               <div className="wrapper">
                  <Field name="title" label={t("Title")} />
                  <SelectCurrencyDropdown />
               </div>

               <FieldNumber name="mondayPrice" label={t("Price in monday")} min={0} />
               <FieldNumber name="tuesdayPrice" label={t("Price in tuesday")} min={0} />
               <FieldNumber name="wednesdayPrice" label={t("Price in wednesday")} min={0} />
               <FieldNumber name="thursdayPrice" label={t("Price in thursday")} min={0} />
               <FieldNumber name="fridayPrice" label={t("Price in friday")} min={0} />
               <FieldNumber name="saturdayPrice" label={t("Price in saturday")} min={0} />
               <FieldNumber name="sundayPrice" label={t("Price in sunday")} min={0} />
               <button className="submit-button" type="submit">
                  Создать
               </button>
            </Form>
         )}
      </Formik>
   );
}
