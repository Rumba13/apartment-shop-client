import {useTranslation} from "react-i18next";
import {Translation} from "./translations/ru";

export function UseTypedTranslation(){
    const trans = useTranslation()
    const typedTFunction = (translationKey:keyof Translation) => trans.t(translationKey)
    return {...trans, t:typedTFunction };
}