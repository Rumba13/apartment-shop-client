import "./styles.scss";
import { Select, SelectProps } from "antd";

const options: SelectProps["options"] = [
   {
      label: "Рабочая поездка",
      value: "work",
   },
   {
      label: "Отдых",
      value: "vacation",
   },
   {
      label: "Мероприятие",
      value: "event",
   },
   {
      label: "Учёба",
      value: "study",
   },
   {
      label: "Посещение родственников",
      value: "relatives",
   },
   {
      label: "Оздоровительная поездка",
      value: "wellness",
   },
];

export function TravelPurposeField() {
   return (
      <div className="travel-purpose-field">
         <h2 className="article-title">Цель поездки</h2>

         <div className="travel-purpose-container">
            <Select className="travel-purpose-select" options={options} defaultValue={options && options[0]} />
         </div>
      </div>
   );
}
