import "./styles.scss";
import React, { useState } from "react";
import clsx from "clsx";
import { observer } from "mobx-react";
import { Contact } from "../../../../shared/api/types/contact";
import ViberIcon from "../../../../assets/images/viber.svg";
import TelegramIcon from "../../../../assets/images/telegram.svg";
import { ContactIcon } from "./contact-icon";
import { useTranslation } from "react-i18next";

type Props = {
   contact: Contact;
};

export const ShowContactsButton = observer(({ contact }: Props) => {
   const [isContactExpanded, setIsContactExpanded] = useState<boolean>(false);
   const { t } = useTranslation();

   return (
      <div className={clsx("show-contacts-button", isContactExpanded && "expanded")} onClick={() => setIsContactExpanded(true)}>
         {isContactExpanded ? (
            <>
               <span className="show-contacts__name">{contact.name || "No name"}</span>
               <a className="show-contacts__phone" href={"tel:" + contact.phone}>
                  {contact.phone}
               </a>
               <ContactIcon className="show-contacts__viber-link" icon={ViberIcon} href={`viber://chat?number=%2B${contact.phone}`} />

               <ContactIcon className="show-contacts__telegram-icon" icon={TelegramIcon} href={`https://t.me/+${contact.phone}`} />
            </>
         ) : (
            <span className="show-contacts-button__title">{t("Show Contacts")}</span>
         )}
      </div>
   );
});
