import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  lng: "en",
  fallbackLng: "es",
  debug: false,
  interpolation: {
    escapeValue: false,
  },
  resources: {
    en: {
      translation: {
        monday: "Monday",
        tuesday: "Tuesday",
        wednesday: "Wednesday",
        thursday: "Thursday",
        friday: "Friday",
        saturday: "Saturday",
        sunday: "Sunday",
        open: "Open",
        close: "Close",
        save: "Save",
        saved: "No Changes",
        noSaveFunction: "This button has no save function",
      },
    },
    es: {
      translation: {
        monday: "Lunes",
        tuesday: "Martes",
        wednesday: "Miércoles",
        thursday: "Jueves",
        friday: "Viernes",
        saturday: "Sábado",
        sunday: "Domingo",
        open: "Abierto",
        close: "Cerrado",
        save: "Guardar",
        saved: "Guardado",
        noSaveFunction: "Este botón no tiene función de guardar",
      },
    },
  },
});

export default i18n;
