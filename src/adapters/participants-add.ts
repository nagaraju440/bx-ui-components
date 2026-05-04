import * as locales from "date-fns/locale";

export const getLocaleObject = (languageCode = "en") => {
  const normalized = languageCode.replace("-", "");
  return (
    (locales as Record<string, any>)[languageCode] ??
    (locales as Record<string, any>)[normalized] ??
    locales.enUS
  );
};
