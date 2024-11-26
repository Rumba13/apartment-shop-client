import { useTranslation } from "react-i18next";
import { russianTranslation, Translation } from "./translations/ru";

/**
 @deprecated use useTranslation instead
 */
export const useTypedTranslation = () => {
   //Legacy, refactor by boy scout principle
   const trans = useTranslation();

   const typedTFunction = (translationKey: keyof Translation) => trans.t(translationKey);
   return { ...trans, t: typedTFunction };
};
