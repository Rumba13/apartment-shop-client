import "./styles.scss";
import { ApartmentList } from "../../../widgets/apartment-list";
import { StandartLayout } from "../../../widgets/layouts/standart-layout";

export function ApartmentsPage() {
   return (
      <StandartLayout className="apartments-page">
         <ApartmentList />
      </StandartLayout>
   );
}
