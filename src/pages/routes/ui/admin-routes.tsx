import { userStore } from "../../../entities/user";
import { Navigate, Outlet } from "react-router-dom";
import { ROUTES } from "../../../shared/lib/routes";
import { observer } from "mobx-react";
import { AppLoader } from "../../../entities/app-loader";

export const AdminRoutes = observer(() => {
   if (userStore.isLoading) return <AppLoader />;

   return userStore.user?.isSuperuser ? <Outlet /> : <Navigate to={ROUTES.NOT_PERMITTED_PAGE} replace />;
});
