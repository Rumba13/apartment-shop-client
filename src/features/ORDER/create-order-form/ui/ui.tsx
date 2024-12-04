import "./styles.scss";
import { Form, Formik, FormikHelpers } from "formik";
import React, { useEffect } from "react";
import { OrderGuestField } from "./order-guest-field";
import { OrderMessage } from "./order-message";
import { GuestsCountByCategory } from "../../../../shared/api/types/guests-count-by-category";
import { UUID } from "../../../../shared/api/types/uuid";
import { observer } from "mobx-react";
import { createOrderFormStore } from "../model/create-order-form-store";
import { currencyStore } from "../../../select-currency";
import { orderPriceStore } from "../../get-order-price";
import dayjs, { Dayjs } from "dayjs";
import { formatGuestCountByCategoryToTitle } from "../../../../shared/lib/format-guest-count-by-category-to-title";
import { SelectDatesField } from "./select-dates-field";
import { SelectContacts } from "./select-contacts";
import { CommentField } from "./comment-field";
import { TravelPurposeField } from "./travel-purpose-field";
import { CreateOrderAside } from "./create-order-aside";
import { updateOrderPrice } from "../api/update-order-price";
import { orderService } from "../../../../shared/api/order-service";
import { snackBarStore } from "../../../../shared/ui/snack-bar/snack-bar-store";
import CrossIcon from "../../../../assets/images/cross.svg";
import { dateFormat } from "../../../../shared/lib/date-format";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { t } from "i18next";
import { orderIsSubmittedModalStore } from "../../../../entities/apartment-details/ui/order-is-submitted-modal/order-is-submitted-modal-store";
import { OrderApartmentFormSkeleton } from "./skeleton";
import { mixed, number, object, string } from "yup";
import { ROUTES } from "../../../../shared/lib/routes";

type PropsType = {
   apartmentId: UUID;
};

type ValuesType = {
   checkInDate: Dayjs | null;
   checkOutDate: Dayjs | null;
   lastName: string;
   firstName: string;
   phone: string;
   comment: string;
} & GuestsCountByCategory;

const initialValues: ValuesType = {
   babyCount: 0,
   kidCount: 0,
   teenCount: 0,
   adultCount: 1,
   petCount: 0,
   checkInDate: null,
   checkOutDate: null,
   lastName: "",
   phone: "",
   firstName: "",
   comment: "",
};

const schema = object().shape({
   babyCount: number(),
   kidCount: number(),
   teenCount: number(),
   adultCount: number(),
   petCount: number(),
   checkInDate: string(),
   checkOutDate: string(),
   lastName: string().required(t("Required Field")),
   phone: string().required(t("Required Field")),
   firstName: string().required(t("Required Field")),
   comment: string(),
} as { [key in keyof ValuesType]: any });

const orderApartment = async (apartmentId: UUID, values: ValuesType, formikHelpers: FormikHelpers<ValuesType>, navigate: NavigateFunction) => {
   if (!values.checkInDate || !values.checkOutDate) return;

   try {
      const response = await orderService.createOrder({
         apartmentId: apartmentId,
         comment: values.comment,
         fromDate: values.checkInDate.format(dateFormat),
         toDate: values.checkOutDate.format(dateFormat),
         phoneNumber: values.phone,
         adultQuantity: values.adultCount,
         teenQuantity: values.teenCount,
         babyQuantity: values.babyCount,
         petQuantity: values.petCount,
         kidQuantity: values.kidCount,
         firstName: values.firstName,
         lastName: values.lastName,
         travelGoal: "",
      });

      orderIsSubmittedModalStore.setIsOpened(true);
      formikHelpers.resetForm();
      navigate(`${ROUTES.APARTMENT_DETAILS}/${apartmentId}`, { relative: "route" });
   } catch (err) {
      snackBarStore.showSnackBar(t("Some error has occurred"), {
         icon: CrossIcon,
         style: { color: "red" },
         timeout: 4500,
      });
   }
};

export const CreateOrderForm = observer(({ apartmentId }: PropsType) => {
   useEffect(() => {
      createOrderFormStore.loadCurrentApartment(apartmentId, currencyStore.currency);
   }, [apartmentId, currencyStore.currency]);

   useEffect(() => {}, [orderPriceStore.orderPrice]);

   const navigate = useNavigate();

   if (createOrderFormStore.isLoading)
      return (
         <div className="create-order-form">
            <OrderApartmentFormSkeleton />
         </div>
      );

   return (
      <Formik initialValues={initialValues} validationSchema={schema} onSubmit={(values, formikHelpers) => orderApartment(apartmentId, values, formikHelpers, navigate)}>
         {({ values }) => {
            useEffect(() => {
               updateOrderPrice(apartmentId, values, [values.checkInDate, values.checkOutDate]);
            }, [values.adultCount, values.adultCount, values.babyCount, values.teenCount, values.kidCount, values.checkInDate, values.checkOutDate]);

            if (!createOrderFormStore.currentApartment) return <>No apartment</>;

            return (
               <Form className="create-order-form">
                  <div className="container">
                     <OrderMessage />
                     <div className="order-article">
                        <SelectDatesField apartmentId={apartmentId} />
                        <div className="article-separator"></div>
                        <OrderGuestField guestCountByCategory={values} subTitle={formatGuestCountByCategoryToTitle(values)} />
                     </div>
                     <div className="order-article">
                        <SelectContacts />
                     </div>
                     <div className="order-article">
                        <TravelPurposeField />
                     </div>
                     <div className="order-article">
                        <CommentField />
                     </div>
                  </div>
                  <CreateOrderAside asidePrice={orderPriceStore.orderPrice} asideImage={createOrderFormStore.currentApartment.photos[0]} asideTitle={createOrderFormStore.currentApartment.address} />
               </Form>
            );
         }}
      </Formik>
   );
});
