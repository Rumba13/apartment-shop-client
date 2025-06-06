import "./styles.scss";
import { CreateApartmentForm } from "../../../features/APARTMENT/create-apartment";
import { userStore } from "../../../entities/user";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react";
import { StandartLayout } from "../../../widgets/layouts/standart-layout";

export const CreateApartmentPage = observer(() => {
   return (
      <StandartLayout className="create-apartment-page" noAside>
         <CreateApartmentForm />
      </StandartLayout>
   );
});
