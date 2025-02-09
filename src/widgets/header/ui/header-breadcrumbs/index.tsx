import "./styles.scss";
import { Breadcrumbs } from "../../../../shared/ui/bread-crumbs";
import { apartmentDetailsStore } from "../../../../entities/apartment-details/model/apartment-details-store";
import { useEffect } from "react";
import { BreadcrumbType } from "../../../../shared/api/types/breadcrumb-type";
import { observer } from "mobx-react";
import { apartmentCalendarStore } from "../../../../entities/calendar/model/apartment-calendar-store";
import { tariffDetailsStore } from "../../../../entities/tariff-details/model/tariff-details-store";
import { ROUTES } from "../../../../shared/lib/routes";

export const HeaderBreadcrumbs = observer(() => {
   useEffect(() => {}, [apartmentDetailsStore.apartment, apartmentCalendarStore.apartment, tariffDetailsStore.tariff]);

   const breadcrumbContents = window.location.pathname.split("/").filter(Boolean);
   const breadCrumbs: BreadcrumbType[] = [];

   breadCrumbs.unshift({
      item: "Главная",
      href: "/",
   });

   for (let i = 0; i < breadcrumbContents.length; i++) {
      const breadcrumb = breadcrumbContents[i];

      if (breadcrumb === "apartment-details") {
         if (!apartmentDetailsStore.apartment) return <></>;
         breadCrumbs.push({
            item: "Квартиры в Гомеле",
            href: "",
         });
         breadCrumbs.push({
            item: apartmentDetailsStore.apartment.title,
            href: "",
         });
      } else if (breadcrumb === "order") {
         // if (!orderApartmentStore.currentApartment) return <></>
         // breadCrumbs.push({
         //     item: "Арендовать",
         //     href: ""
         // })
         // breadCrumbs.push({
         //     item: orderApartmentStore.currentApartment.title,
         //     href: "/apartment-details/" + orderApartmentStore.currentApartment.id,
         // })
      } else if (breadcrumb === "orders") {
         breadCrumbs.push({
            item: "Заказы",
            href: ROUTES.ORDERS_PAGE,
         });
      } else if (breadcrumb === "tariffs") {
         if (!tariffDetailsStore.tariff) return <></>;
         breadCrumbs.push({
            item: "Тарифы",
            href: ROUTES.TARIFFS_PAGE + "/",
         });
         if (breadcrumbContents[i + 1]) {
            breadCrumbs.push({
               item: tariffDetailsStore.tariff.title,
               href: "",
            });
         }
      } else if (breadcrumb === "calendar") {
         if (!apartmentCalendarStore.apartment || !apartmentCalendarStore.tariff) return <></>;
         breadCrumbs.push({
            item: "Календарь",
            href: ROUTES.CALENDAR_PAGE,
         });

         breadCrumbs.push({
            item: `${apartmentCalendarStore.apartment.title} (${apartmentCalendarStore.tariff.title})`,
            href: "",
         });
      } else if (breadcrumb === "favorites") {
         breadCrumbs.push({
            item: "Избранное",
            href: "",
         });
      }
   }

   if (breadCrumbs.length === 1) {
      breadCrumbs.push({
         item: "Квартиры в Гомеле",
         href: "",
      });
   }

   return <Breadcrumbs className="header-breadcrumbs" items={breadCrumbs} />;
});
