import "./styles.scss";
import { userStore } from "../../../entities/user";
import { useNavigate, useParams } from "react-router-dom";
import { observer } from "mobx-react";
import { UpdateApartmentForm } from "../../../features/APARTMENT/update-apartment";
import { StandartLayout } from "../../../widgets/layouts/standart-layout";
import { ROUTES } from "../../../shared/lib/routes";

export const UpdateApartmentPage = observer(() => {
   const navigate = useNavigate();
   const { apartmentId } = useParams();

   if (!apartmentId) {
      navigate(ROUTES.HOME_PAGE);
      return <></>;
   }

   return (
      <StandartLayout className="update-apartment-page" noAside>
         <UpdateApartmentForm apartmentId={apartmentId} />
      </StandartLayout>
   );
});
