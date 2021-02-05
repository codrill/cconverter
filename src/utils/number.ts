export const getParsedNumber = (value: string | number): number => {
  return Number(String(value).replace(',', '.'))
}
