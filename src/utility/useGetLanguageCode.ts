import { useRouter } from "next/router";

/**
 * A custom hook to get the language code based on the current locale.
 * The current locale will be stored in the `router.locale` variable.
 * @returns language code
 */
const useGetLanguageCode = () => {
  const { locale } = useRouter();

  const [_, languageCode]: string[] = locale?.split("-") || ["", "en"];

  if (languageCode) {
    return languageCode;
  }
  return "en";
};

export default useGetLanguageCode;

export const getLanguageCodeFromLocale = (locale: string) => {
  const [_, languageCode]: string[] = locale?.split("-") || ["", "en"];

  return languageCode;
};

/**
 * @function loadLanguageModule
 * Loads the appropriate Day.js locale module based on the provided language code.
 * This function dynamically imports the locale module for Day.js, which is useful
 * for internationalization (i18n) and localization (l10n) purposes in your application.
 *
 * @param {string} [language='en'] - The language code for which to load the Day.js locale module.
 *                                   Defaults to 'en' (English) if no language is specified.
 *
 * The supported language codes and their corresponding Day.js locale modules are:
 * - 'en' : English
 * - 'ru' : Russian
 * - 'et' : Estonian
 * - 'fi' : Finnish
 * - 'cs' : Czech
 * - 'fr' : French
 * - 'pt' : Portuguese
 *
 * If the provided language code does not match any of the supported codes,
 * the function defaults to importing the 'en' (English) locale module.
 *
 */
export function loadLanguageModule(language = "en") {
  switch (language) {
    case "de":
      return import("dayjs/locale/de");
    case "en":
      return import("dayjs/locale/en");
    case "fr":
      return import("dayjs/locale/fr");
    case "nl":
      return import("dayjs/locale/nl");
    case "bg":
      return import("dayjs/locale/bg");
    case "et":
      return import("dayjs/locale/et");
    case "cs":
      return import("dayjs/locale/cs");
    case "da":
      return import("dayjs/locale/da");
    case "es":
      return import("dayjs/locale/es");
    case "fi":
      return import("dayjs/locale/fi");
    case "it":
      return import("dayjs/locale/it");
    case "el":
      return import("dayjs/locale/el");
    case "ru":
      return import("dayjs/locale/ru");
    case "sv":
      return import("dayjs/locale/sv");
    case "mt":
      return import("dayjs/locale/mt");
    case "pt":
      return import("dayjs/locale/pt");
    case "ro":
      return import("dayjs/locale/ro");
    case "sr":
      return import("dayjs/locale/sr");
    case "sl":
      return import("dayjs/locale/sl");
    case "sk":
      return import("dayjs/locale/sk");
    case "hu":
      return import("dayjs/locale/hu");
    case "hr":
      return import("dayjs/locale/hr");
    default:
      return import("dayjs/locale/en");
  }
}
