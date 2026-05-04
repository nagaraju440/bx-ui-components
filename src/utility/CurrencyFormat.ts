/**
 * @description providing the value, thousand separator and decimal delimiter it will set the value in format using the thousand separator and decimal delimiter and return it
 * @example const number = 123456 and if the thousand separator is ',' then it returns 123,456
 *
 * @param value
 * @param thousandSeparator
 * @param decimalDelimiter
 * @returns
 */
export const formatNumber = (
  value: number,
  thousandSeparator = ",",
  decimalDelimiter = "."
) => {
  const parts = value?.toString()?.split(".");
  const integerPart = parts?.[0];
  const decimalPart = parts?.length > 1 ? parts[1] : "";

  const formattedIntegerPart = integerPart?.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    thousandSeparator
  );

  return decimalPart
    ? `${formattedIntegerPart}${decimalDelimiter}${decimalPart}`
    : formattedIntegerPart;
};

/**
 * @description providing the value, thousand separator and decimal delimiter it will set the value in format and return it
 * @example const amount = 123456 and if the thousand separator is ',' then it returns 123,456.00
 * @param value
 * @param thousandSeparator
 * @param decimalDelimiter
 * @returns
 */
export const formatAmount = (
  value: any,
  thousandSeparator = ",",
  decimalDelimiter = ".",
  toFixedCount = 2
) => {
  // Convert value to a number if it is a string
  let num = typeof value === "number" ? value : parseFloat(value);

  // Ensure num is a valid number
  if (isNaN(num)) {
    return "Invalid number";
  }

  // Convert the number to a string with two decimal places
  const fixedValue = num?.toFixed(toFixedCount);

  // Split the value into integer and decimal parts
  const parts = fixedValue?.split(".");
  const integerPart = parts?.[0];
  const decimalPart = parts?.length > 1 ? parts[1] : "";

  // Format the integer part with thousand separators
  const formattedIntegerPart = integerPart?.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    thousandSeparator
  );

  // Return the formatted number with the specified decimal delimiter
  return `${formattedIntegerPart}${decimalDelimiter}${decimalPart}`;
};

/**
 * This function used to check valid amount or not, some times we will get -, null,undefine then i need to pass false
 * @param amount may be "",null,undefined
 * @returns boolean
 */
export const isValidAmount = (amount: any) => {
  if (isNaN(parseFloat(amount))) {
    return false;
  }
  return true;
};

/**
 * @description providing the country code and language code it will set the in locale format based on locale it will return the  corresponding country format
 * @example const number = 123456.789
 * for de-DE locale it returns  123.456,789
 * for en-IN lacale it returns 1,23,456.789
 * @param countryCode
 * @param languageCode
 */
export const getCurrencyFormat = (
  countryCode: string,
  languageCode: string
) => {
  // to join the language code and country code  inorder to get as locale format
  // from url we get the countryCode-langugeCode[ex:ca-en] format but for locale format we need langugeCode-countryCode[ex:en-ca]
  const locale = languageCode.concat("-", countryCode);
  return new Intl.NumberFormat(locale);
};

/**
 * @description providing the country code, language code and currency code it will set the in locale format based on locale and currency code it will return the  corresponding currency symbol.
 * @example for (ca-en locale) and (EUR currencyCode) it returns '€'
 * @example for (ja-jp locale) and (JPY currencyCode) it returns '￥'
 * @param countryCode
 * @param languageCode
 * @param currencyCode
 * @returns
 */
export const getCurrencySymbol = (
  countryCode: string,
  languageCode: string,
  currencyCode = "EUR"
) => {
  // to join the language code and country code  inorder to get as locale format
  // from url we get the countryCode-langugeCode[ex:ca-en] format but for locale format we need langugeCode-countryCode[ex:en-ca]
  const locale = languageCode.concat("-", countryCode);
  return (0)
    .toLocaleString(locale, {
      style: "currency",
      currency: currencyCode,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })
    .replace(/\d/g, "")
    .trim();
};

/**
 * @description Parses a currency string into a number by handling thousands separators and decimal delimiters.
 * @example for ("10.000,00", ".", ",") it returns 10000
 * @param amountString The amount string to be parsed (e.g., "10.000,00").
 * @param thousandsSeparator The character used as the thousands separator (e.g., ".").
 * @param decimalDelimiter The character used as the decimal delimiter (e.g., ",").
 * @example
 * const amount = parseCurrencyString(currencyString, thousandsSeparator, decimalDelimiter);
 * @returns The parsed number.(Output: 10000)
 */
export const parseCurrencyString = (
  amountString: string,
  thousandSeparator = ",",
  decimalDelimiter = "."
): number => {
  // Normalize the number
  const normalizedAmount = amountString
    .replace(new RegExp(`\\${thousandSeparator}`, "g"), "")
    .replace(new RegExp(`\\${decimalDelimiter}`), ".");

  // Parse to a floating-point number
  return parseFloat(normalizedAmount);
};
