import {useTranslation} from "react-i18next";
import {russianTranslation, Translation} from "./translations/ru";

export const useTypedTranslation = () => {
    const trans = useTranslation()

    const typedTFunction = (translationKey:keyof Translation)=> trans.t(translationKey)
    return {...trans, t:typedTFunction };
};