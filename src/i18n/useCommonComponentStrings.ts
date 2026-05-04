import { useMemo, useSyncExternalStore } from "react";
import { commonComponentStrings } from "./locales";

type LocaleStrings = Record<string, string>;

const DEFAULT_LOCALE = "en";

const getLocaleCandidates = (locale: string): string[] => {
  const normalizedLocale = locale.toLowerCase();
  const parts = normalizedLocale.split("-").filter(Boolean);

  return [
    normalizedLocale,
    parts[0],
    parts[1],
    DEFAULT_LOCALE,
  ].filter(Boolean);
};

const getLocaleFromPathname = (pathname: string): string | undefined => {
  return pathname
    .split("/")
    .filter(Boolean)
    .map((segment) => decodeURIComponent(segment).toLowerCase())
    .find((segment) => commonComponentStrings[segment]);
};

const getLocaleFromUrl = (): string => {
  if (typeof window === "undefined") {
    return DEFAULT_LOCALE;
  }

  return (
    getLocaleFromPathname(window.location.pathname) ||
    document.documentElement.lang ||
    DEFAULT_LOCALE
  );
};

const subscribeToLocale = () => {
  return () => {};
};

const getStringsForLocale = (locale: string): LocaleStrings => {
  const matchedLocale = getLocaleCandidates(locale).find(
    (candidate) => commonComponentStrings[candidate]
  );

  return commonComponentStrings[matchedLocale ?? DEFAULT_LOCALE];
};

export const getCommonComponentString = (key: string, locale = getLocaleFromUrl()) => {
  const localeStrings = getStringsForLocale(locale);
  const fallbackStrings = commonComponentStrings[DEFAULT_LOCALE];

  return localeStrings[key] ?? fallbackStrings[key] ?? key;
};

export const useCommonComponentStrings = () => {
  const locale = useSyncExternalStore(
    subscribeToLocale,
    getLocaleFromUrl,
    () => DEFAULT_LOCALE
  );
  const localeStrings = useMemo(() => getStringsForLocale(locale), [locale]);
  const fallbackStrings = commonComponentStrings[DEFAULT_LOCALE];

  return (key: string) => localeStrings[key] ?? fallbackStrings[key] ?? key;
};
