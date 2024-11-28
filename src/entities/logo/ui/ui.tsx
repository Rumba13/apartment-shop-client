import "./styles.scss";
import { Link } from "react-router-dom";
import clsx from "clsx";
import LogoImage from "../../../assets/images/logo.png";
import SmallLogoImage from "../../../assets/images/small-logo.png";
import { useTranslation } from "react-i18next";
import { useScreenWidth } from "../../../shared/ui/use-screen-width";

export type Props = {
   className?: string;
};

export function Logo({ className }: Props) {
   const { t } = useTranslation();
   const screenWidth = useScreenWidth();

   if (screenWidth <= 320) {
      return (
         <Link className={clsx("logo small-logo", className)} to="/">
            <img className="logo__image" src={SmallLogoImage} alt={t("Website Logo")} />
         </Link>
      );
   }

   return (
      <Link className={clsx("logo", className)} to="/">
         <img className="logo__image" src={LogoImage} alt={t("Website Logo")} />
      </Link>
   );
}
