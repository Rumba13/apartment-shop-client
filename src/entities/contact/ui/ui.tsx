import "./styles.scss";
import { Contacts } from "../../../shared/api/types/contacts";
import PhoneIcon from "../../../assets/images/phone.svg";
import { SvgIcon } from "../../../shared/ui/svg-icon";
import { useState } from "react";
import clsx from "clsx";
import { useTranslation } from "react-i18next";

type PropsType = {
   contact: Contacts;
};

export function Contact({ contact }: PropsType) {
   const [isOpened, setIsOpened] = useState<boolean>(false);
   const { t } = useTranslation();

   return (
      <div className={clsx("contact", isOpened && "opened")}>
         <SvgIcon className="contact__phone-icon" icon={PhoneIcon} />

         <a className="contact__phone" href={`tel: ${contact.phone}`}>{contact.phone}</a>


         {isOpened ? <span className="contact__name">{contact.name}</span> :
            <span className="contact__button" onClick={() => setIsOpened(true)}>{t("Show")}</span>}

         <div className="overlay"></div>
      </div>
   );
}
