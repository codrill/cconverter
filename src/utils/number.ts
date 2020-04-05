export const getParsedNumber = function(value: string | number) {
  return Number(String(value).replace(",", "."));
};