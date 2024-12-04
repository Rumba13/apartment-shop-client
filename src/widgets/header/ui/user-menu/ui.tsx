import "./styles.scss";
import { SvgIcon } from "../../../../shared/ui/svg-icon";
import UserIcon from "../../../../assets/images/user-icon.svg";
import { authModalStore } from "../../../auth-modal/model/auth-modal-store";
import { userStore } from "../../../../entities/user";
import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import { ConfirmModalOptions } from "../../../../shared/api/types/confirm-modal-options";
import clsx from "clsx";
import { userMenuPopupStore } from "./user-menu-popup-store";
import { Popup } from "../../../../shared/ui/popup";
import { Link, useNavigate } from "react-router-dom";
import { confirmModalStore } from "../../../../shared/ui/confirm-modal/confirm-modal-store";
import { signOutService } from "../../../../shared/api/sign-out-service";
import { ButtonCool } from "../../../../shared/ui/button-cool";
import { Skeleton } from "antd";
import ExitIcon from "../../../../assets/images/exit.svg";
import OrdersIcon from "../../../../assets/images/orders.svg";
import TariffIcon from "../../../../assets/images/tariff.svg";
import { orderService } from "../../../../shared/api/order-service";
import { useTranslation } from "react-i18next";
import { ordersListStore } from "../../../orders-list/model/orders-list-store";
import { ACCESS_TOKEN_NAME, REFRESH_TOKEN_NAME } from "../../../../shared/lib/constants";
import { ROUTES } from "../../../../shared/lib/routes";

export const UserMenu = observer(() => {
   const navigate = useNavigate();
   const { t } = useTranslation();
   const [pendingOrderCount, setPendingOrderCount] = useState<number>(0);

   const confirmModalOptions: ConfirmModalOptions = {
      description: t("Definitely Sign Out?"),
      confirmButtonText: t("Yes"),
   };

   const askForSignOut = () => {
      confirmModalStore
         .askForConfirm(confirmModalOptions)
         .then(() => signOutService.signOut(localStorage.getItem(REFRESH_TOKEN_NAME) || ""))
         .then(res => userStore.setUser(null))
         .then(() => {
            localStorage.removeItem(ACCESS_TOKEN_NAME);
            localStorage.removeItem(REFRESH_TOKEN_NAME);
            navigate(ROUTES.HOME_PAGE);
         })
         .catch(err => console.log(err));
   };

   useEffect(() => {
      if (userStore.user?.isSuperuser) {
         orderService.getAllOrders().then(orderPagination => {
            //TODO Delegate to backend
            setPendingOrderCount(0);

            let _pendingOrderCount = 0;

            for (let i = 0; i < orderPagination.content.length; i++) {
               if (orderPagination.content[i].status === "PENDING") _pendingOrderCount++;
            }

            setPendingOrderCount(_pendingOrderCount);
         });
      }
   }, [userStore.user, ordersListStore.orders]);
   useEffect(() => {}, [userStore.user]);

   if (userStore.isLoading) {
      return (
         <div className={clsx("user-menu")} style={{ border: 0, marginLeft: 0 }}>
            <Skeleton.Input active />
         </div>
      );
   }

   if (!userStore.user)
      return (
         <div className={clsx("user-menu")} style={{ border: 0, marginLeft: 0 }}>
            <ButtonCool className="user-menu__auth-button" onClick={() => authModalStore.openWithTab(0)}>
               {t("Sign In")}
            </ButtonCool>
         </div>
      );

   return (
      <div className={clsx("user-menu")} style={{ marginLeft: 8 }}>
         <div className="user-menu-button" onClick={userMenuPopupStore.open}>
            <span className="user-menu__user-name">{userStore.user.username}</span>
            <SvgIcon className="user-profile-icon" asImage icon={UserIcon} />
         </div>

         <Popup className="user-menu-options" popupStore={userMenuPopupStore}>
            <div className="user-menu-option" onClick={askForSignOut}>
               <SvgIcon icon={ExitIcon} className="user-menu-option__icon" />
               <span className="user-menu-option__title">{t("Sign Out")}</span>
            </div>

            {userStore.user?.isSuperuser && (
               <>
                  <Link className={clsx("user-menu-option", window.location.pathname === "/orders" && "active")} to={"/orders"} onClick={userMenuPopupStore.close}>
                     <SvgIcon icon={OrdersIcon} className="user-menu-option__icon" />
                     <span className="user-menu-option__title">{t("Orders")}</span>
                     {pendingOrderCount !== 0 && (
                        <span className="user-menu-option__sub-title">
                           Подтвердите {pendingOrderCount} {t("Order", { count: pendingOrderCount })}
                        </span>
                     )}
                  </Link>
                  <Link className={clsx("user-menu-option", window.location.pathname === "/tariffs" && "active")} onClick={userMenuPopupStore.close} to={"/tariffs"}>
                     <SvgIcon icon={TariffIcon} className="user-menu-option__icon" />
                     <span className="user-menu-option__title">{t("Tariffs")}</span>
                  </Link>
               </>
            )}
         </Popup>
      </div>
   );
});
