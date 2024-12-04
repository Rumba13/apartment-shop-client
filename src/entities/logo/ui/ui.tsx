import "./styles.scss";
import { Link } from "react-router-dom";
import clsx from "clsx";
import LogoBigImage from "../../../assets/images/logo.png";
import SmallLogoImage from "../../../assets/images/small-logo.png";
import { useTranslation } from "react-i18next";
import { useScreenWidth } from "../../../shared/ui/use-screen-width";
import { ROUTES } from "../../../shared/lib/routes";

export type Props = {
   className?: string;
};

export function Logo({ className }: Props) {
   const { t } = useTranslation();
   const screenWidth = useScreenWidth();

   const isLogoSmall = screenWidth <= 320;

   const LogoImage = isLogoSmall ? SmallLogoImage : LogoBigImage;
   const logoClassName = isLogoSmall ? "small-logo" : "";

   return (
      <Link className={clsx("logo", logoClassName, className)} to={ROUTES.HOME_PAGE}>
         <img className="logo__image" src={LogoImage} alt={t("Website Logo")} />
      </Link>
   );
}
