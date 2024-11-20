import "./styles.scss";
import { Field } from "../../../../../../shared/ui/field/ui";

export function SelectContacts() {
   return (
      <div className="select-contacts">
         <h2 className="article-title contacts-title">Контактные данные</h2>

         <div className="select-contacts-container">
            <Field name="lastName" label="Фамилия*" placeholder="Иванов" />
            <Field name="firstName" label="Имя*" placeholder="Иван" />
            <Field name="phone" label="Мобильный телефон*" placeholder="+375293218813" />
         </div>
      </div>
   );
}
