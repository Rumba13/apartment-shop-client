import "i18next";
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import XHR from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { russianTranslation } from "./translations/ru";
import { englishTranslation } from "./translations/en";

i18next
   .use(XHR)
   .use(initReactI18next)
   .use(LanguageDetector)
   .init({
      resources: {
         en: {
            translation: englishTranslation,
         },
         ru: {
            translation: russianTranslation,
         },
      },
      detection: { order: ["path", "navigator"] },
      fallbackLng: "ru",
      interpolation: {
         escapeValue: false,
      },
   });

declare module "i18next" {
   interface CustomTypeOptions {
      defaultNS: "ru";
      resources: {
         en: typeof englishTranslation;
         ru: typeof russianTranslation;
      };
   }
}
